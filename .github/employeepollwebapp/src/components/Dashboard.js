import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Poll from "./Poll";
import { question } from "../Store/Actions/question";
import { useEffect } from "react";

const Dashboard = () => {
  const dispatch = useDispatch();
  const initialQuestions = useSelector((state) => state.questions.Questions);
  const currentUser = useSelector((state) => state.user.user);

  const ans = useSelector((state) => state.questions.Answered);
  const unans = useSelector((state) => state.questions.Unanswered);
  const answered = Object.keys(ans).map((key) => {
    return ans[key];
  });
  const unanswered = Object.keys(unans).map((key) => {
    return unans[key];
  });

  useEffect(() => {
    dispatch(question(initialQuestions, currentUser));
  }, [dispatch, initialQuestions, currentUser]);

  answered.sort((x, y) => y.timestamp - x.timestamp);
  unanswered.sort((x, y) => y.timestamp - x.timestamp);

  return (
    <div data-testid="dashboard">
      <h2 style={styles.heading}> New Questions</h2>
      <div style={styles.div}>
        {initialQuestions &&
          unanswered.map((question) => {
            return <Poll key={question.id} question={question} value="Poll" />;
          })}
      </div>
      <br></br>
      <h2 style={styles.heading}> Answered</h2>
      <div style={styles.div}>
        {initialQuestions &&
          answered.map((question) => {
            return <Poll key={question.id} question={question} value="View" />;
          })}
      </div>
    </div>
  );
};

const styles = {
  div: {
    display: "flex",
  },
  heading: {
    textAlign: "center",
  },
};

export default Dashboard;
