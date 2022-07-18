import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { Redirect, useParams } from "react-router-dom";
import { useState } from "react";
import Page404 from "./Page404";
import Button from "@mui/material/Button";
import { PollDetail } from "../Store/Actions/question";
const PollDetails = () => {
  const { questionid } = useParams();
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);
  const [option, setOption] = useState(0);
  const answered = useSelector((state) => state.questions.Answered);
  const unanswered = useSelector((state) => state.questions.Unanswered);
  const isAnswered = answered.filter((e) => e.id === questionid);
  const isUnanswered = unanswered.filter((e) => e.id === questionid);
  const initialQuestions = useSelector((state) => state.questions.Questions);
  const Ques = Object.keys(initialQuestions).map((key) => {
    return initialQuestions[key];
  });
  let Q = Ques.find((e) => {
    return e.id === questionid;
  });

  const totalVotes =
    initialQuestions[questionid].optionOne.votes.length +
    initialQuestions[questionid].optionTwo.votes.length;
  const b2 = initialQuestions[questionid].optionTwo.votes.length;
  const b1 = initialQuestions[questionid].optionOne.votes.length;

  let first = Math.round((b1 / totalVotes) * 100);
  let second = Math.round((b2 / totalVotes) * 100);

  const currentQuestion = Ques.filter((e) => e.id === questionid);
  const allUsers = useSelector((state) => state.user.allUsers);
  const allUsers_array = Object.keys(allUsers).map((key) => {
    return allUsers[key];
  });
  const userQuestion = allUsers_array.filter((e) => {
    let qid = e.questions.filter((f) => {
      return f === questionid;
    });

    if (qid.length === 0) {
      return null;
    } else {
      return e;
    }
  });

  const currentUser = useSelector((state) => state.user.user);

  const userOption1 = initialQuestions[questionid].optionOne.votes.find(
    (e) => e === currentUser[0].id
  );
  const userOption2 = initialQuestions[questionid].optionTwo.votes.find(
    (e) => e === currentUser[0].id
  );

  const clickHandlerOne = () => {
    setClick(true);
    setOption(1);
  };

  const clickHandlerTwo = () => {
    setClick(true);
    setOption(2);
  };

  useEffect(() => {
    if (option === 1) {
      dispatch(
        PollDetail(currentUser[0].id, questionid, "optionOne", currentQuestion)
      );
    } else if (option === 2) {
      dispatch(
        PollDetail(currentUser[0].id),
        questionid,
        "optionTwo",
        currentQuestion
      );
    }
  }, [
    click,
    dispatch,
    Q,
    initialQuestions,
    currentQuestion,
    currentUser,
    option,
    questionid,
  ]);

  return (
    <div>
      {userQuestion[0] !== undefined && (
        <div>
          <h3 style={styles.text}>Poll by {currentQuestion[0].author}</h3>
          <Avatar
            style={styles.avatar}
            alt="author avatar"
            src={userQuestion[0].avatarURL}
            sx={{ width: 150, height: 150 }}
          />
          <h3 style={styles.text}>Would You Rather</h3>

          {isUnanswered.length > 0 && !click && (
            <span style={styles.span}>
              <Button
                style={styles.button1}
                variant="contained"
                onClick={clickHandlerOne}
              >
                {currentQuestion[0].optionOne.text}
              </Button>

              <Button
                style={styles.button2}
                variant="contained"
                onClick={clickHandlerTwo}
              >
                {currentQuestion[0].optionTwo.text}
              </Button>
            </span>
          )}
          {isUnanswered.length > 0 && click && option === 1 && (
            <span style={styles.span}>
              <Button disabled style={styles.button1} variant="contained">
                {currentQuestion[0].optionOne.text}{" "}
              </Button>

              <Button
                disabled
                style={styles.btn_notSelected}
                variant="contained"
              >
                {currentQuestion[0].optionTwo.text}
              </Button>
            </span>
          )}
          {isUnanswered.length > 0 && click && option === 2 && (
            <span style={styles.span}>
              <Button
                disabled
                style={styles.btn_notSelected}
                variant="contained"
              >
                {currentQuestion[0].optionOne.text}{" "}
              </Button>

              <Button disabled style={styles.button2} variant="contained">
                {currentQuestion[0].optionTwo.text}
              </Button>
            </span>
          )}

          {isAnswered.length > 0 && userOption1 !== undefined && (
            <span style={styles.span}>
              <div style={styles.divSelected}>
                <h2>{currentQuestion[0].optionOne.text}</h2>
                <p> {first} % users voted for this</p>
              </div>
              <div style={styles.div}>
                <h2>{currentQuestion[0].optionTwo.text}</h2>
                <p>{second} % users voted for this</p>
              </div>
            </span>
          )}
          {isAnswered.length > 0 && userOption2 !== undefined && (
            <span style={styles.span}>
              <div style={styles.div}>
                <h2>{currentQuestion[0].optionOne.text}</h2>
                <p> {first} % users voted for this</p>
              </div>
              <div style={styles.divSelected}>
                <h2>{currentQuestion[0].optionTwo.text}</h2>
                <p>{second} % users voted for this</p>
              </div>
            </span>
          )}
        </div>
      )}
      {userQuestion[0] === undefined && (
        <>
          <Redirect to="/login" />
          <Page404></Page404>
        </>
      )}
    </div>
  );
};

const styles = {
  button1: {
    marginRight: "10px",
    background: "#0f9684",
  },
  button2: {
    marginLeft: "10px",
    background: "#0f9684",
  },
  text: {
    textAlign: "center",
  },
  span: {
    marginLeft: "20%",
    display: "flex",
  },
  avatar: {
    marginLeft: "46%",
  },
  btn_notSelected: {
    background: "#bfbcbb",
  },
  div: {
    borderStyle: "outset",
    padding: "5px",
    borderRadius: "8px",
    margin: "20px",
    width: "400px",
    textAlign: "center",
    marginLeft: "5px",
  },
  divSelected: {
    borderStyle: "outset",
    padding: "5px",
    borderRadius: "8px",
    margin: "15px",
    width: "400px",
    textAlign: "center",
    background: "#95bf7a",
  },
};

export default PollDetails;
