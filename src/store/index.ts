import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import poemReducer from "./slices/poemSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    poem: poemReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
