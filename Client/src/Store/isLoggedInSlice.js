import { createSlice } from "@reduxjs/toolkit";

// Check if authentication token cookie exists
const isAuthenticated = document.cookie.includes("token");

export const isLoggedInSlice = createSlice({
  name: "isLoggedIn",
  initialState: {
    loggedIn: isAuthenticated,
  },
  reducers: {
    login: (state) => {
      state.loggedIn = true;
    },
    logout: (state) => {
      state.loggedIn = false;
    },
  },
});

export const { login, logout } = isLoggedInSlice.actions;

// Selectors
export const selectIsLoggedIn = (state) => state.isLoggedIn.loggedIn;

export default isLoggedInSlice.reducer;
