import { SxProps } from "@mui/material";

type Styles = {
  [key: string]: SxProps;
};

export const addPoemStyles: Styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "88.6vh",
    backgroundColor: "#fcba03",
    alignItems: "center",
  },
  heading: {
    fontSize: "24px",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};
