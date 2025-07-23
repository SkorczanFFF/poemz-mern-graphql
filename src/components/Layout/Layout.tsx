import React from "react";
import { Box, Container, CssBaseline } from "@mui/material";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <CssBaseline />
      <Header />
      <Container
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;
