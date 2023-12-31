import { SxProps } from "@mui/material";

type Styles = {
  [key: string]: SxProps;
};

export const authStyles: Styles = {
  container: {
    display: "flex",
    minHeight: "88.6vh",
    backgroundColor: "#fcba03",

    justifyContent: "center",
  },
  authContainer: {
    width: "320px",
    backgroundColor: "#799e99",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: "40px 0",
  },
  heading: {},
  formSection: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  submitBtn: {
    backgroundColor: "wheat",
    text: "white",
    margin: "10px 0 0",
    height: "60px",
  },
};
