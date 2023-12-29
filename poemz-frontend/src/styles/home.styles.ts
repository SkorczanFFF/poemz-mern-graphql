import { SxProps } from "@mui/material";

type Styles = {
  [key: string]: SxProps;
};

export const homeStyles: Styles = {
  container: {
    display: "flex",
    backgroundColor: "#fcba03",
    minHeight: "150.2vh",
  },
  hello: {
    color: "white",
    width: "100%",
    margin: "20px 0",
    fontSize: "40px",
    display: "flex",
    justifyContent: "center",
  },
};
