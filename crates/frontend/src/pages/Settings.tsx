import { Box, Button, Paper, Stack } from "@mui/material";
import Brightness4RoundedIcon from "@mui/icons-material/Brightness4Rounded";
import Brightness5RoundedIcon from "@mui/icons-material/Brightness5Rounded";
import ViewCompactAltRoundedIcon from "@mui/icons-material/ViewCompactAltRounded";
import ViewComfyAltRoundedIcon from "@mui/icons-material/ViewComfyAltRounded";
import TurnedInRoundedIcon from "@mui/icons-material/TurnedInRounded";
import TurnedInNotRoundedIcon from "@mui/icons-material/TurnedInNotRounded";
import Toggle from "../components/Toggle";
import { useStore } from "../store";
import { MouseEvent } from "react";

const dSelector = (store: any) => (store.darkMode ? "dark" : "light");
const dFSelector = (store: any) => store.setDarkMode;
const deSelector = (store: any) => (store.denseMode ? "dense" : "comfy");
const deFSelector = (store: any) => store.setDenseMode;
const tSelector = (store: any) => (store.noTagsMode ? "notags" : "tags");
const tFSelector = (store: any) => store.setTagsMode;
const sFSelector = (store: any) => store.saveStore;

const Settings = () => {
  const mode = useStore(dSelector);
  const setMode = useStore(dFSelector);
  const handleModeChange = (
    _event: MouseEvent<HTMLElement>,
    newMode: string | null
  ) => newMode !== null && setMode(newMode === "dark" ? true : false);

  const dense = useStore(deSelector);
  const setDenseMode = useStore(deFSelector);
  const handleDenseChange = (
    _event: MouseEvent<HTMLElement>,
    newMode: string | null
  ) => newMode !== null && setDenseMode(newMode === "dense" ? true : false);
  const tags = useStore(tSelector);
  const setTags = useStore(tFSelector);
  const handleTagChange = (
    _event: MouseEvent<HTMLElement>,
    newMode: string | null
  ) => newMode !== null && setTags(newMode === "notags" ? true : false);
  const saveStore = useStore(sFSelector);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      width="100%"
    >
      <Paper elevation={1} sx={{ width: "80%" }}>
        <Stack gap={1} margin={2}>
          <Toggle
            title="Dark Mode"
            value={mode}
            onChange={handleModeChange}
            val1="dark"
            val2="light"
            t1="Dark"
            t2="Light"
            icon1={<Brightness4RoundedIcon sx={{ marginRight: 1 }} />}
            icon2={<Brightness5RoundedIcon sx={{ marginRight: 1 }} />}
          />
          <Toggle
            title="Dense Mode"
            value={dense}
            onChange={handleDenseChange}
            val1="dense"
            val2="comfy"
            t1="Dense"
            t2="Comfy"
            icon1={<ViewCompactAltRoundedIcon sx={{ marginRight: 1 }} />}
            icon2={<ViewComfyAltRoundedIcon sx={{ marginRight: 1 }} />}
          />
          <Toggle
            title="Tags Mode"
            value={tags}
            onChange={handleTagChange}
            val1="tags"
            val2="notags"
            t1="Tags"
            t2="No Tags"
            icon1={<TurnedInRoundedIcon sx={{ marginRight: 1 }} />}
            icon2={<TurnedInNotRoundedIcon sx={{ marginRight: 1 }} />}
          />
          <Button variant="outlined" sx={{ marginTop: 2 }} onClick={saveStore}>
            Save Changes
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Settings;
