import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { authStyles } from "../../../styles/auth.styles";

const Login = () => {
  return (
    <Box sx={authStyles.authContainer}>
      {/* @ts-ignore */}
      <form style={authStyles.formSection}>
        <InputLabel aria-label=" email" />
        <TextField aria-label="email" label="Email" />
        <InputLabel aria-label="password" />
        <TextField aria-label="password" label="Password" />
        <Button sx={authStyles.submitBtn}>Submit</Button>
      </form>
    </Box>
  );
};

export default Login;
