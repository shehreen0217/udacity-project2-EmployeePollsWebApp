import { QuestionsActions } from "../reducers/questions-slice";
import { _saveQuestionAnswer, _saveQuestion } from "../../_DATA";
import { userActions } from "../reducers/user-slice";

export const question = (initialQuestions = {}, currentUser) => {
  return (dispatch) => {
    const Ques = Object.keys(initialQuestions).map((key) => {
      return initialQuestions[key];
    });
    const answered = Ques.filter((e) => {
      let option1 = e.optionOne.votes.filter((f) => f === currentUser[0].id);
      let option2 = e.optionTwo.votes.filter((f) => f === currentUser[0].id);
      if (option1.length !== 0 || option2.length !== 0) {
        return e;
      } else {
        return null;
      }
    });

    const unanswered = Ques.filter((e) => {
      let option1 = e.optionOne.votes.filter((f) => f === currentUser[0].id);
      let option2 = e.optionTwo.votes.filter((f) => f === currentUser[0].id);
      if (option1.length === 0 && option2.length === 0) {
        return e;
      } else {
        return null;
      }
    });

    dispatch(
      QuestionsActions.setAnsweredAndUnanswered({
        Answered: answered,
        Unanswered: unanswered,
      })
    );
  };
};

export const PollDetail = (
  authedUser = "",
  questionid = "",
  answer = "",
  question
) => {
  return async (dispatch) => {
    let savedAnswer = await _saveQuestionAnswer({
      authedUser: authedUser,
      qid: questionid,
      answer: answer,
    });

    dispatch(
      QuestionsActions.addNewAnswer({
        id: questionid,
        userid: authedUser,
        option: answer,
      })
    );

    dispatch(
      userActions.updateAllUsersAns({
        userid: authedUser,
        questionid: questionid,
        answer: answer,
      })
    );
  };
};

export const newPoll = (id, optionOne, optionTwo) => {
  return async (dispatch) => {
    console.log({
      author: id[0].id,
      optionOneText: optionOne,
      optionTwoText: optionTwo,
    });
    let newQuestion = await _saveQuestion({
      author: id[0].id,
      optionOneText: optionOne,
      optionTwoText: optionTwo,
    });

    dispatch(QuestionsActions.addNewQuestion({ newQuestion: newQuestion }));
    dispatch(
      userActions.updateAllUsersQues({
        userid: id[0].id,
        questionid: newQuestion.id,
      })
    );
  };
};
