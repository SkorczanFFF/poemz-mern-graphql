import { SxProps } from "@mui/material";

type Styles = {
  [key: string]: SxProps;
};

export const poemStyles: Styles = {
  container: {
    width: "100%",
    minHeight: "88.6vh",
    backgroundColor: "#afdfed",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heading: {
    padding: "20px 0",
    fontFamily: "'Meow Script'",
    fontWeight: 700,
    fontSize: "3rem",
  },
  poemContainer: {
    width: "1200px",
    padding: "60px 0",
    backgroundColor: "#FFC784",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: "30px",
  },
  singlePoem: {
    width: "450px",
    padding: "0 25px",
  },
  poemPlate: {
    backgroundColor: "grey",
    height: "250px",
  },
  poemTitle: {
    padding: "0",
    fontFamily: "'Meow Script'",
    fontWeight: 700,
    fontSize: "2.5rem",
  },
  poemDetails: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
  },
  poemDate: {
    padding: "0",
  },
  poemAuthor: {
    padding: "0",
  },
};
