import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PoemState, Poem } from "../../types";

const initialState: PoemState = {
  poems: [],
  currentPoem: null,
  loading: false,
  error: null,
};

const poemSlice = createSlice({
  name: "poem",
  initialState,
  reducers: {
    setPoemLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setPoemError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setPoems: (state, action: PayloadAction<Poem[]>) => {
      state.poems = action.payload;
      state.loading = false;
      state.error = null;
    },
    setCurrentPoem: (state, action: PayloadAction<Poem>) => {
      state.currentPoem = action.payload;
      state.loading = false;
      state.error = null;
    },
    addPoem: (state, action: PayloadAction<Poem>) => {
      state.poems.unshift(action.payload);
      state.loading = false;
      state.error = null;
    },
    updatePoem: (state, action: PayloadAction<Poem>) => {
      const index = state.poems.findIndex((p) => p._id === action.payload._id);
      if (index !== -1) {
        state.poems[index] = action.payload;
      }
      if (state.currentPoem?._id === action.payload._id) {
        state.currentPoem = action.payload;
      }
      state.loading = false;
      state.error = null;
    },
    deletePoem: (state, action: PayloadAction<string>) => {
      state.poems = state.poems.filter((p) => p._id !== action.payload);
      if (state.currentPoem?._id === action.payload) {
        state.currentPoem = null;
      }
      state.loading = false;
      state.error = null;
    },
    clearPoemError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setPoemLoading,
  setPoemError,
  setPoems,
  setCurrentPoem,
  addPoem,
  updatePoem,
  deletePoem,
  clearPoemError,
} = poemSlice.actions;

export default poemSlice.reducer;
