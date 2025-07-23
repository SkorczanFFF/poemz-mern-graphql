import React from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/auth-slice";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { profileStyles } from "../../../styles/profile.styles";
const LoggedIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = () => {
    localStorage.clear();
    dispatch(authActions.logout());
    navigate("/");
  };

  return (
    <>
      <Button sx={profileStyles.logoutUserButton} onClick={logout}>
        Logout
      </Button>
    </>
  );
};

export default LoggedIn;
