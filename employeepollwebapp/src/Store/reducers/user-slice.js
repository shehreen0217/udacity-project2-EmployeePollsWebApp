import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  user: {},
};

const userSlice = createSlice({
  name: "user_info",
  initialState: initialUserState,
  reducers: {
    setUser(state, action) {
      console.log("from user slice: ", action.payload.user);

      state.user = action.payload.user;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
