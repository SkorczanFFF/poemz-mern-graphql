import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: { isLogged: false, name: "" },
  reducers: {
    login(state) {
      state.isLogged = true;
    },
    logout(state) {
      state.isLogged = false;
      state.name = "";
    },
    setName(state, action) {
      state.name = action.payload;
    },
  },
});

export const authAuctions = authSlice.actions;
