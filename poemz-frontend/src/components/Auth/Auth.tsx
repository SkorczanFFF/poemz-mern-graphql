import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import Login from "./Partials/Login";
import Register from "./Partials/Register";
import { authStyles } from "../../styles/auth.styles";

const Auth = () => {
  const [loginSelected, setLoginSelected] = useState<boolean>(true);
  return (
    <Box sx={authStyles.container}>
      <Box sx={authStyles.authContainer}>
        <Typography variant="h4" sx={authStyles.heading}>
          {loginSelected ? "Login" : "Register"}
        </Typography>
        {loginSelected ? <Login /> : <Register />}
        <Button onClick={() => setLoginSelected(!loginSelected)}>
          Switch to {loginSelected ? "register" : "login"}
        </Button>
      </Box>
    </Box>
  );
};

export default Auth;
