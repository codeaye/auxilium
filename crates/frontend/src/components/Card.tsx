import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Link,
  Stack,
  Chip,
  IconButton,
} from "@mui/material";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import { Fragment } from "react";
import { open } from "@tauri-apps/api/shell";
import customCap from "../functions/customCap";
import stringToColour from "../functions/stringToColour";
import { Item } from "../types/SearchApiResult";
import { useStore } from "../store";

const ANSWER_REF = "https://stackoverflow.com/a/";
const TAG_REF = "https://stackoverflow.com/questions/tagged/";
const USER_REF = "https://stackoverflow.com/users/";

const stags = (store: any) => !store.noTagsMode;

const Card = ({ item }: { item: Item }) => {
  const noTagsMode = useStore(stags);

  return (
    <Fragment>
      <ListItem
        alignItems="flex-start"
        secondaryAction={
          item.accepted_answer_id ? (
            <IconButton
              edge="end"
              onClick={() => open(ANSWER_REF + item.accepted_answer_id)}
            >
              <DoneRoundedIcon color="success" />
            </IconButton>
          ) : null
        }
      >
        <ListItemAvatar>
          <IconButton
            sx={{ margin: 0, padding: 0.5, left: -5 }}
            onClick={() => open(USER_REF + item.owner.user_id)}
          >
            <Avatar
              sx={{ bgcolor: stringToColour(item.owner.display_name) }}
              alt={item.owner.display_name}
              src={item.owner.profile_image}
            />
          </IconButton>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Link
              onClick={() => open(item.link)}
              color="inherit"
              underline="hover"
            >
              {customCap(item.title)}
            </Link>
          }
          secondary={
            noTagsMode ? (
              <Stack
                direction="row"
                spacing={0.5}
                overflow="scroll"
                paddingTop={0.5}
              >
                {item.tags.map((tag) => (
                  <Chip
                    label={tag}
                    variant="filled"
                    size="small"
                    onClick={() => open(TAG_REF + tag)}
                    clickable
                  />
                ))}
              </Stack>
            ) : null
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </Fragment>
  );
};

export default Card;
