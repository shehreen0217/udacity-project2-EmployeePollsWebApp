import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  allUsers: {},
  user: {},
};

const userSlice = createSlice({
  name: "user_info",
  initialState: initialUserState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
    },

    setAllUsers(state, action) {
      state.allUsers = action.payload.allUsers;
      console.log(state.allUsers);
    },
    updateAllUsersQues(state, action) {
      state.allUsers[action.payload.userid].questions.push(
        action.payload.questionid
      );
    },
    updateAllUsersAns(state, action) {
      state.allUsers[action.payload.userid].answers[action.payload.questionid] =
        action.payload.answer;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
