import { SxProps } from "@mui/material";

type Styles = {
  [key: string]: SxProps;
};

export const homeStyles: Styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
  randomPoem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "500px",
    minHeight: "300px",
    backgroundColor: "#4287f5",
  },
  randomPoemDetails: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  randomPoemTitle: {
    fontSize: "32px",
  },
  randomPoemDate: {
    fontSize: "20px",
  },
  randomPoemContent: {
    fontSize: "26px",
  },
};
