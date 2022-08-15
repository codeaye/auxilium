import { emit } from "@tauri-apps/api/event";
import { Store } from "tauri-plugin-store-api";
import create from "zustand";
import getSaved from "./functions/getSaved";
import { Item } from "./types/SearchApiResult";

interface State {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  items: Item[];
  setItems: (items: Item[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  fullForm: boolean;
  setFullForm: (fullForm: boolean) => void;
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  denseMode: boolean;
  setDenseMode: (darkMode: boolean) => void;
  noTagsMode: boolean;
  setTagsMode: (noTagsMode: boolean) => void;
  saveStore: () => void;
  reload: () => void;
}

const store = new Store(".settings.dat");
const values = await getSaved(store);

export const useStore = create<State>()((set) => ({
  searchQuery: "",
  setSearchQuery: (searchQuery: string) => set({ searchQuery }),
  items: [],
  setItems: (items: Item[]) => set({ items }),
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
  fullForm: false,
  setFullForm: (fullForm: boolean) => set({ fullForm }),

  darkMode: values.darkMode,
  setDarkMode: (darkMode: boolean) => {
    set({ darkMode });
    store.set("darkMode", darkMode);
  },
  denseMode: values.denseMode,
  setDenseMode: (denseMode: boolean) => {
    set({ denseMode });
    store.set("denseMode", denseMode);
  },
  noTagsMode: values.noTagsMode,
  setTagsMode: (noTagsMode: boolean) => {
    set({ noTagsMode });
    store.set("noTagsMode", noTagsMode);
  },
  saveStore: () => {
    store.save();
    emit("reload_store");
  },
  reload: async () => {
    const { darkMode, denseMode, noTagsMode } = await getSaved(store);
    set({ darkMode, denseMode, noTagsMode });
  },
}));
