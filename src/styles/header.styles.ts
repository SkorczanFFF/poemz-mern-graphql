import { SxProps } from "@mui/material";

type Styles = {
  [key: string]: SxProps;
};

export const headerStyles: Styles = {
  container: {
    backgroundColor: "#324212",
    position: "sticky",
  },
  logo: {
    fontWeight: "600",
    fontSize: "20px",
  },
  menuTabs: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  singleTab: {
    height: "65px",
  },
  loginButton: {
    color: "white",
    padding: "20px 10px",
    ":hover": {
      backgroundColor: "#adadcd",
    },
  },
};
