import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
    },
    secondary: {
      main: "#9c27b0",
      light: "#ba68c8",
      dark: "#7b1fa2",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Delius Swash Caps"',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      fontFamily: "'Meow Script'",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 700,
      fontFamily: "'Meow Script'",
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 700,
      fontFamily: "'Meow Script'",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 700,
      fontFamily: "'Meow Script'",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
  },
});
