import EventHandler from "./components/EventHandler";
import { useStore } from "./store";
import "./index.css";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme, Theme } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Root from "./pages/Root";
import Settings from "./pages/Settings";
import { useEffect, useState } from "react";

const sdarkMode = (store: any) => store.darkMode;
const App = () => {
  const darkMode = useStore(sdarkMode);
  const [theme, setTheme] = useState<Theme>(createTheme());
  useEffect(
    () =>
      setTheme(
        createTheme({
          palette: {
            mode: darkMode ? "dark" : "light",
          },
        })
      ),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <EventHandler />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="app_settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
