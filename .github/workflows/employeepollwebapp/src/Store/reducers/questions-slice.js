import { createSlice } from "@reduxjs/toolkit";
import userActions from "./user-slice";

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
      console.log(action.payload.newQuestion.id);
      state.Questions[action.payload.newQuestion.id] =
        action.payload.newQuestion;
    },
    setAnsweredAndUnanswered(state, action) {
      state.Answered = action.payload.Answered;
      state.Unanswered = action.payload.Unanswered;
    },
    addNewAnswer(state, action) {
      if (action.payload.option === "optionOne") {
        state.Questions[action.payload.id].optionOne.votes.push(
          action.payload.userid
        );
      } else if (action.payload.option === "optionTwo") {
        state.Questions[action.payload.id].optionTwo.votes.push(
          action.payload.userid
        );
      }
    },
  },
});

export const QuestionsActions = QuestionSlice.actions;

export default QuestionSlice.reducer;
