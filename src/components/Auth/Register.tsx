import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import { REGISTER } from "../../mutations";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../store/slices/authSlice";
import { RegisterInput } from "../../types";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { error }] = useMutation(REGISTER);

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>();

  const onSubmit = async (data: RegisterInput) => {
    try {
      dispatch(loginStart());
      const response = await register({
        variables: {
          name: data.name,
          email: data.email,
          password: data.password,
        },
      });

      if (response.data) {
        dispatch(loginSuccess(response.data.register));
        navigate("/");
      }
    } catch (err) {
      dispatch(
        loginFailure(err instanceof Error ? err.message : "Registration failed")
      );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "70vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Register
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error.message}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            {...registerField("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <TextField
            fullWidth
            label="Email"
            margin="normal"
            {...registerField("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            {...registerField("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3 }}
          >
            Register
          </Button>

          <Button
            fullWidth
            variant="text"
            size="large"
            sx={{ mt: 1 }}
            onClick={() => navigate("/login")}
          >
            Already have an account? Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Register;
