import { SxProps } from "@mui/material";

type Styles = {
  [key: string]: SxProps;
};

export const footerStyles: Styles = {
  container: {
    backgroundColor: "#000000",
    color: "#FFFFFF",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
