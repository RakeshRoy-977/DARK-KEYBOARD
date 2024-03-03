import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./isLoggedInSlice";
import isLoggedInReducer from "./isLoggedInSlice";

const rootReducer = combineReducers({
  isLoggedIn: isLoggedInReducer,
  user: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
