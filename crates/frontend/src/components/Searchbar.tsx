import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useStore } from "../store";

const fsetSearch = (store: any) => store.setSearchQuery;

const Searchbar = () => {
  const [searchRaw, setSearchRaw] = useState("");
  const setSearch = useStore(fsetSearch);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearch(searchRaw);
    }, 1500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchRaw]);

  return (
    <TextField
      fullWidth
      color="success"
      margin="none"
      placeholder="Search"
      value={searchRaw}
      onChange={(e) => setSearchRaw(e.target.value)}
      sx={{ pb: 1 }}
    />
  );
};

export default Searchbar;
