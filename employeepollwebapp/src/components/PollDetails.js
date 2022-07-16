import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Page404 from "./Page404";
import Button from "@mui/material/Button";
import { PollDetail } from "../Store/Actions/question";
const PollDetails = () => {
  const { questionid } = useParams();
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);
  const [checkQues, setCheckQues] = useState(false);
  const [option, setOption] = useState(0);

  const initialQuestions = useSelector((state) => state.questions.Questions);
  const Ques = Object.keys(initialQuestions).map((key) => {
    return initialQuestions[key];
  });
  let Q = Ques.find((e) => {
    return e.id === questionid;
  });

  useEffect(() => {
    if (Q) {
      setCheckQues(true);
    }
  });

  const currentQuestion = Ques.filter((e) => e.id === questionid);
  const allUsers = useSelector((state) => state.user.allUsers);
  const allUsers_array = Object.keys(allUsers).map((key) => {
    return allUsers[key];
  });
  const userQuestion = allUsers_array.filter((e) => {
    // console.log(e);
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
  console.log(currentQuestion, allUsers_array, currentUser, userQuestion);

  // autheduser , question id, answer (option one or optiontwo)
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
      console.log(currentUser[0].id, questionid, "OptionOne", currentQuestion);
      dispatch(
        PollDetail(currentUser[0].id, questionid, "OptionOne", currentQuestion)
      );
    } else if (option === 2) {
      console.log(currentUser[0].id, questionid, "OptionTwo", currentQuestion);

      dispatch(
        PollDetail(currentUser[0].id),
        questionid,
        "OptionTwo",
        currentQuestion
      );
    }
  }, [click, dispatch]);

  return (
    <div>
      {checkQues && (
        <div>
          <h3 style={styles.text}>Poll by {currentQuestion[0].author}</h3>
          <Avatar
            style={styles.avatar}
            alt="author avatar"
            src={userQuestion[0].avatarURL}
            sx={{ width: 150, height: 150 }}
          />
          <h3 style={styles.text}>Would You Rather</h3>
          {!click && (
            <span style={styles.span}>
              <Button
                style={styles.button1}
                variant="contained"
                onClick={clickHandlerOne}
              >
                {currentQuestion[0].optionOne.text}{" "}
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
          {click && option === 1 && (
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
          {click && option === 2 && (
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
        </div>
      )}
      {!checkQues && <Page404></Page404>}
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
    marginLeft: "25%",
  },
  avatar: {
    marginLeft: "46%",
  },
  btn_notSelected: {
    background: "#bfbcbb",
  },
};

export default PollDetails;
