import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Poll from "./Poll";
import { question } from "../Store/Actions/question";
import { useState, useEffect } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const Dashboard = () => {
  const [value, setValue] = useState("New");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

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
    <>
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">Polls</FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel value="New" control={<Radio />} label="New Polls" />
          <FormControlLabel
            value="Answered"
            control={<Radio />}
            label="Answered Polls"
          />
        </RadioGroup>
      </FormControl>

      {value === "New" && (
        <div>
          <h2 style={styles.heading}> New Questions</h2>
          <div style={styles.div}>
            {initialQuestions &&
              unanswered.map((question) => {
                return (
                  <Poll key={question.id} question={question} value="Poll" />
                );
              })}
          </div>
        </div>
      )}
      {value === "Answered" && (
        <div>
          <h2 style={styles.heading}> Answered</h2>
          <div style={styles.div}>
            {initialQuestions &&
              answered.map((question) => {
                return (
                  <Poll key={question.id} question={question} value="View" />
                );
              })}
          </div>
        </div>
      )}
    </>
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
