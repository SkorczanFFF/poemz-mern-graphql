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
  },
  poemContainer: {
    margin: "60px 0",
    textAlign: "center",
  },
  commentsContainer: {
    display: "flex",
    flexDirection: "column",
    width: "90%",
  },
  addCommentContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginTop: "10px",
    backgroundColor: "tomato",
  },
  commentImput: {
    width: "100%",
  },
  sendCommentButton: {
    backgroundColor: "blue",
  },
};
