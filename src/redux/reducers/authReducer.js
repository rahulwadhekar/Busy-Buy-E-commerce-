import { createSlice } from "@reduxjs/toolkit";

const INITIAL = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  cart:[]
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL,
  reducers: {
    signupStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signupSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    signupFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setAuthUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions;
export default  authSlice.reducer;

export const authSelector = (state) => state.auth;
