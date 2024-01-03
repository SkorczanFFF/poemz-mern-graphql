import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { USER_SIGNIN, USER_SIGNUP } from "../../mutations/mutations";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { authStyles } from "../../styles/auth.styles";
import { useDispatch, useSelector } from "react-redux";
import { authAuctions } from "../../store/auth-slice";
import { useNavigate } from "react-router-dom";

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

const Auth = () => {
  const navigate = useNavigate();
  const isLogged = useSelector((state: any) => state.isLogged);
  console.log(isLogged);
  const dispatch = useDispatch();
  const [loginSelected, setLoginSelected] = useState<boolean>(true);
  const [signin] = useMutation(USER_SIGNIN);
  const [signup] = useMutation(USER_SIGNUP);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputs>();

  const onSubmit = async ({ name, email, password }: FormInputs) => {
    if (loginSelected) {
      //login
      try {
        const res = await signin({ variables: { email, password } });
        if (res.data) {
          const { id, email, name } = res.data.signin;
          localStorage.setItem("userData", JSON.stringify({ id, name, email }));
          dispatch(authAuctions.login());
          dispatch(authAuctions.setName(res.data.signin.name));
          return navigate("/profile");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      //register
      try {
        const res = await signup({ variables: { name, email, password } });
        if (res.data) {
          const { id, email, name } = res.data.signup;
          localStorage.setItem("userData", JSON.stringify({ id, name, email }));
          dispatch(authAuctions.logout());
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Box sx={authStyles.container}>
      <Box sx={authStyles.authContainer}>
        <Typography variant="h4" sx={authStyles.heading}>
          {loginSelected ? "Login" : "Register"}
        </Typography>
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
                  error={Boolean(errors.email)}
                  {...register("name", { required: true, minLength: 2 })}
                />
              </>
            )}
            <InputLabel aria-label=" email" />
            <TextField
              aria-label="email"
              label="Email"
              type="mail"
              sx={authStyles.input}
              error={Boolean(errors.email)}
              {...register("email", {
                required: true,
                validate: (val: string) =>
                  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
              })}
            />
            <InputLabel aria-label="password" />
            <TextField
              aria-label="password"
              label="Password"
              type="password"
              error={Boolean(errors.password)}
              helperText={
                Boolean(errors.password)
                  ? "Length of the password must be at least 8 characters"
                  : ""
              }
              {...register("password", {
                required: true,
                minLength: 8,
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
