import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false,
  id: "",
  password: "",
  location: "",
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = action.payload.auth;
      state.id = action.payload.id;
      state.password = action.payload.password;
      state.location = "/";
    },
    logout(state, action) {
      state.isAuthenticated = false;
      state.id = "";
      state.password = "";
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
