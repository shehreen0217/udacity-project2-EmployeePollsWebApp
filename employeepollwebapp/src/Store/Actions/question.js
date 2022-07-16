import { QuestionsActions } from "../reducers/questions-slice";
import { useSelector } from "react-redux";
import { _saveQuestionAnswer } from "../../_DATA";

export const question = (Ques = [], currentUser) => {
  return (dispatch) => {
    const answered = Ques.filter((e) => {
      let option1 = e.optionOne.votes.filter((f) => f === currentUser[0].id);
      let option2 = e.optionTwo.votes.filter((f) => f === currentUser[0].id);
      if (option1.length != 0 || option2.length != 0) {
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
    console.log(authedUser, questionid, answer, question);
    let savedAnswer = await _saveQuestionAnswer({
      authedUser: authedUser,
      qid: questionid,
      answer: answer,
    });
    console.log(savedAnswer);

    dispatch(QuestionsActions.updateAnsweredPoll({ Answered: question }));

    // autheduser , question id, answer (option one or optiontwo)
  };
};
