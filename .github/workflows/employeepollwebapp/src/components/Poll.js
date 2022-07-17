import React from "react";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Link, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import PollDetails from "./PollDetails";
import { _getUsers } from "../_DATA";

import { formatDate } from "../helper";
import { useEffect } from "react";

const Poll = (props) => {
  const [clicked, setClicked] = useState(false);

  let route = "/question/" + props.question.id;

  const clickHandler = () => {
    setClicked(!clicked);
  };
  return (
    <div style={styles.poll}>
      <h3 style={styles.author}>{props.question.author}</h3>
      <p style={styles.time}>{formatDate(props.question.timestamp)}</p>
      <Link to={route}>
        <Button style={styles.btn} variant="outlined" onClick={clickHandler}>
          {props.value}
        </Button>
      </Link>
    </div>
  );
};

const styles = {
  poll: {
    borderStyle: "inset",
    padding: "5px",
    borderRadius: "8px",
    margin: "15px",
    width: "225px",
    textAlign: "center",
  },
  author: {
    marginTop: "5px",
    marginBottom: "3px",
    fontFamily: "'Garamond' , serif ",
  },
  time: {
    marginTop: "5px",
    marginBottom: "15px",
    fontFamily: " 'Lucida Handwriting', cursive",
  },
  btn: {
    borderColor: "#0f9684",
    color: "#0f9684",
  },
};

export default Poll;
