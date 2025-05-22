import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  isLogged: boolean;
  name: string;
  userId: string;
}

const initialState: AuthState = {
  isLogged: false,
  name: "",
  userId: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isLogged = true;
    },
    logout(state) {
      state.isLogged = false;
      state.name = "";
      state.userId = "";
    },
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setUserId(state, action: PayloadAction<string>) {
      state.userId = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
