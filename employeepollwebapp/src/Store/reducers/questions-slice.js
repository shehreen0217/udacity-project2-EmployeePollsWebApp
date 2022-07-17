import { createSlice } from "@reduxjs/toolkit";

const initialQuestionState = {
  Questions: {},
  Answered: [],
  Unanswered: [],
};

const QuestionSlice = createSlice({
  name: "Questions",
  initialState: initialQuestionState,
  reducers: {
    setQuestions(state, action) {
      state.Questions = action.payload.questions;
    },
    addNewQuestion(state, action) {
      state.Questions = { ...(state.Questions + action.payload.newQuestion) };
      console.log(state.Questions);
    },
    setAnsweredAndUnanswered(state, action) {
      state.Answered = action.payload.Answered;
      state.Unanswered = action.payload.Unanswered;
      console.log(state.Answered);
    },
    updateAnsweredPoll(state, action) {
      console.log("i was running");
      state.Answered.push(action.payload.Answered);
      console.log(state.Answered);
    },
    updateUnansweredPoll(state, action) {
      state.Unanswered.push(action.payload.Unanswered);
    },
  },
});

export const QuestionsActions = QuestionSlice.actions;

export default QuestionSlice.reducer;
