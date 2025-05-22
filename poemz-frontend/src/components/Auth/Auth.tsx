import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { USER_SIGNIN, USER_SIGNUP } from "../../mutations/mutations";
import {
  Box,
  Button,
  InputLabel,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { authStyles } from "../../styles/auth.styles";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { useNavigate } from "react-router-dom";

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

const Auth = () => {
  const navigate = useNavigate();
  const isLogged = useSelector((state: any) => state.isLogged);
  const dispatch = useDispatch();
  const [loginSelected, setLoginSelected] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [signin] = useMutation(USER_SIGNIN);
  const [signup] = useMutation(USER_SIGNUP);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputs>();

  const onSubmit = async ({ name, email, password }: FormInputs) => {
    setError(null);

    if (loginSelected) {
      // login
      try {
        const res = await signin({ variables: { email, password } });
        if (res.data) {
          const { id, email, name } = res.data.signin;
          localStorage.setItem("userData", JSON.stringify({ id, name, email }));
          dispatch(authActions.login());
          dispatch(authActions.setName(name));
          dispatch(authActions.setUserId(id));
          return navigate("/profile");
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Login failed. Please check your credentials.");
      }
    } else {
      // register
      try {
        const res = await signup({ variables: { name, email, password } });
        if (res.data) {
          const { id, email, name } = res.data.signup;
          localStorage.setItem("userData", JSON.stringify({ id, name, email }));
          dispatch(authActions.login());
          dispatch(authActions.setName(name));
          dispatch(authActions.setUserId(id));
          return navigate("/profile");
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Registration failed. Please try again.");
      }
    }
  };

  return (
    <Box sx={authStyles.container}>
      <Box sx={authStyles.authContainer}>
        <Typography variant="h4" sx={authStyles.heading}>
          {loginSelected ? "Login" : "Register"}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={authStyles.authContainer}>
          <form
            style={authStyles.formSection as React.CSSProperties}
            onSubmit={handleSubmit(onSubmit)}
          >
            {!loginSelected && (
              <>
                <InputLabel aria-label="name" />
                <TextField
                  aria-label="name"
                  label="Name"
                  sx={authStyles.input}
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message}
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                />
              </>
            )}
            <InputLabel aria-label=" email" />
            <TextField
              aria-label="email"
              label="Email"
              type="email"
              sx={authStyles.input}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              {...register("email", {
                required: "Email is required",
                validate: (val: string) =>
                  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ||
                  "Invalid email format",
              })}
            />
            <InputLabel aria-label="password" />
            <TextField
              aria-label="password"
              label="Password"
              type="password"
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            <Button type="submit" sx={authStyles.submitBtn}>
              Submit
            </Button>
          </form>
        </Box>
        <Button onClick={() => setLoginSelected(!loginSelected)}>
          Switch to {loginSelected ? "register" : "login"}
        </Button>
      </Box>
    </Box>
  );
};

export default Auth;
