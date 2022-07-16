import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  allUsers: {},
  user: {},
  answeredPolls: 0,
  createdPolls: 0,
};

const userSlice = createSlice({
  name: "user_info",
  initialState: initialUserState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
    },
    setAnsweredPolls(state, action) {
      state.answeredPolls += action.payload.answeredPoll;
    },
    setCreatedPolls(state, action) {
      state.createdPolls += action.payload.newPollCreated;
    },
    setAllUsers(state, action) {
      state.allUsers = action.payload.allUsers;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
