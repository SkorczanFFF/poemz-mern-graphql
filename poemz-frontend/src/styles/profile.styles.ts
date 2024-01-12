import { SxProps } from "@mui/material";

type Styles = {
  [key: string]: SxProps;
};

export const profileStyles: Styles = {
  container: {
    backgroundColor: "#213721",
    color: "#FFFFFF",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteUserButton: {
    backgroundColor: "#ed0018",
    color: "white",
    ":hover": {
      backgroundColor: "orange",
      transitionDuration: "0.5",
    },
  },
};
