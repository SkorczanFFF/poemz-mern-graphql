import { SxProps } from "@mui/material";

type Styles = {
  [key: string]: SxProps;
};

export const profileStyles: Styles = {
  container: {
    backgroundColor: "#213721",
    color: "#FFFFFF",
    minHeight: "90vh",
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
  logoutUserButton: {
    backgroundColor: "#FCBA03",
    color: "white",
    ":hover": {
      backgroundColor: "orange",
      transitionDuration: "0.5",
    },
    addPoemButton: {
      backgroundColor: "#7f43ba",
      color: "white",
      ":hover": {
        backgroundColor: "orange",
        transitionDuration: "0.5",
      },
    },
  },
};
