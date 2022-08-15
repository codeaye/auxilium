import { Box } from "@mui/material";
import Max from "../components/Max";
import Searchbar from "../components/Searchbar";
import { useStore } from "../store";

const Root = () => {
  const fullForm = useStore((store) => store.fullForm);

  return (
    <Box p={1}>
      <Searchbar />
      {fullForm && <Max />}
    </Box>
  );
};

export default Root;
