import { SxProps } from "@mui/material";

type Styles = {
  [key: string]: SxProps;
};

export const viewPoemStyles: Styles = {
  container: {
    backgroundColor: "#902230",
    color: "#FFFFFF",
    height: "95vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
};
