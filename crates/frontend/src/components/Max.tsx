import { Box, LinearProgress, List, Paper } from "@mui/material";
import { useStore } from "../store";
import { Item } from "../types/SearchApiResult";
import Card from "./Card";

const sitems = (store: any) => store.items;
const sloading = (store: any) => store.loading;
const sdenseMode = (store: any) => store.denseMode;

const Max = () => {
  const items = useStore(sitems);
  const loading = useStore(sloading);
  const denseMode = useStore(sdenseMode);

  return (
    <Paper>
      <List
        sx={{
          width: "97.5vw",
          height: "82vh",
          overflowY: "scroll",
          bgcolor: "background.paper[2]",
          paddingTop: 0,
        }}
        dense={denseMode}
      >
        <Box sx={{ height: "4px" }}>
          {loading && <LinearProgress sx={{ marginTop: 0 }} color="success" />}
        </Box>
        {items.map((item: Item) => (
          <Card item={item} key={item.question_id} />
        ))}
      </List>
    </Paper>
  );
};

export default Max;
