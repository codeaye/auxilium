import { Typography, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { MouseEvent, ReactNode } from "react";

interface Props {
  title: string;
  value: string;
  onChange: (_event: MouseEvent<HTMLElement>, newMode: string | null) => void;
  val1: string;
  val2: string;
  icon1: ReactNode;
  icon2: ReactNode;
  t1: string;
  t2: string;
}
const Toggle = (props: Props) => {
  return (
    <>
      <Typography variant="button" align="center">
        {props.title}
      </Typography>
      <ToggleButtonGroup
        exclusive
        value={props.value}
        onChange={props.onChange}
        fullWidth
      >
        <ToggleButton value={props.val1}>
          {props.icon1}
          {props.t1}
        </ToggleButton>
        <ToggleButton value={props.val2}>
          {props.icon2}
          {props.t2}
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
};

export default Toggle;
