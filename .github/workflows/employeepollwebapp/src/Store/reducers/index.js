import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./login-slice";
import userReducer from "./user-slice";
import questionReducer from "./questions-slice";

const store = configureStore({
  reducer: { auth: authReducer, user: userReducer, questions: questionReducer },
});

export default store;
