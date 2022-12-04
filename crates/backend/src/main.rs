#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

#[cfg(target_os = "macos")]
#[macro_use]
extern crate objc;

mod window_custom;
use std::{thread, time::Duration};

use tauri::{
    generate_handler, AppHandle, CustomMenuItem, GlobalShortcutManager, LogicalSize, Manager,
    RunEvent, Size, SystemTray, SystemTrayEvent, SystemTrayMenu, SystemTrayMenuItem, Window,
};
use tauri_plugin_store::PluginBuilder;
use window_custom::WindowExt as _;

const TOGGLE_SHORTCUT: &str = "Alt+Space";
const QUIT_SHORTCUT: &str = "Alt+Q";
const PREFERENCES_SHORTCUT: &str = "Alt+P";

fn open_settings(handle: AppHandle) {
    thread::spawn(move || {
        tauri::WindowBuilder::new(
            &handle,
            "settings",
            tauri::WindowUrl::App("app_settings".parse().unwrap()),
        )
        .title("Settings")
        .resizable(false)
        .inner_size(415., 440.)
        .visible(true)
        .build()
        .expect("Could not launch settings window");
    });
}

fn user_open_request(handle: AppHandle) {
    let window = handle.get_window("settings");
    match window {
        Some(window) => {
            if !window.is_visible().unwrap() {
                window.show().expect("Could not show settings window!");
                window
                    .set_focus()
                    .expect("Could not focus settings window!");
            }
        }
        None => open_settings(handle),
    }
}

#[tauri::command]
fn set_mini(window: Window) {
    window.set_size(Size::new(LogicalSize { width: 630, 73 })).unwrap();
}

#[tauri::command]
fn set_max(window: Window) {
     window.set_size(Size::new(LogicalSize { width: 630, 430 })).unwrap();
}

fn main() {
    // System tray configuration
    let tray = SystemTray::new().with_menu(
        SystemTrayMenu::new()
            .add_item(
                CustomMenuItem::new("show_auxilium", "Show Auxilium").accelerator(TOGGLE_SHORTCUT),
            )
            .add_item(
                CustomMenuItem::new("preference", "Preferences").accelerator(PREFERENCES_SHORTCUT),
            )
            .add_native_item(SystemTrayMenuItem::Separator)
            .add_item(CustomMenuItem::new("quit".to_string(), "Quit").accelerator(QUIT_SHORTCUT)),
    );

    let app = tauri::Builder::default()
        .plugin(PluginBuilder::default().build())
        .setup(|app| {
            let window = app.get_window("main").unwrap();
            // Use the window shadows plugin
            window_shadows::set_shadow(&window, true).expect("Unsupported platform!");
            // Use transparent titlebar for macos
            #[cfg(target_os = "macos")]
            window.set_transparent_titlebar(true, true);
            // Move the window to the center of the screen
            window.center().expect("Cannot move window!");

            // Open dev tools
            #[cfg(debug_assertions)]
            window.open_devtools();
            Ok(())
        })
        // Add the system tray
        .system_tray(tray)
        // Handle system tray events
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                "quit" => std::process::exit(0),
                "show_auxilium" => {
                    let window = app.get_window("main").unwrap();
                    window.show().unwrap();
                    window.set_focus().unwrap();
                }
                "preference" => user_open_request(app.app_handle()),
                _ => {}
            },
            _ => {}
        })
        .on_window_event(|event| {
            if let tauri::WindowEvent::Focused(f) = event.event() {
                if let false = f {
                    event.window().hide().unwrap()
                }
            }
        })
        .invoke_handler(generate_handler![set_mini, set_max])
        .build(tauri::generate_context!())
        .expect("An error occured while running the app!");

    app.run(|app_handle, e| match e {
        RunEvent::Ready => {
            let app_handle = app_handle.clone();
            // Get the global shortcut manager
            let mut gsm = app_handle.global_shortcut_manager();

            // Register the shortcut to show the app
            let handler = app_handle.clone();
            gsm.register(TOGGLE_SHORTCUT, move || {
                let app_handle = handler.clone();
                let window = app_handle.get_window("main").unwrap();
                if !window.is_visible().unwrap() {
                    window.show().unwrap();
                    window.set_focus().unwrap();
                }
            })
            .unwrap();

            // Register the shortcut to quit the app
            gsm.register(QUIT_SHORTCUT, || std::process::exit(0))
                .unwrap();

            // Register the shortcut to open the settings
            gsm.register(PREFERENCES_SHORTCUT, move || {
                user_open_request(app_handle.clone())
            })
            .unwrap();
        }
        RunEvent::ExitRequested { api, .. } => api.prevent_exit(),
        _ => {}
    })
}
