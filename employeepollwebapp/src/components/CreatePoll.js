import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useState } from "react";

const CreatePoll = () => {
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");

  return (
    <div>
      <h2 style={styles.text}>Would You Rather</h2>
      <p style={styles.p}>Create your Own Poll</p>

      <Box
        style={styles.box}
        sx={{
          width: 500,
          maxWidth: "100%",
        }}
      >
        <TextField
          fullWidth
          label="Option One"
          id="fullWidth"
          onChange={(e) => {
            setOptionOne(e.target.value);
          }}
        />
      </Box>
      <Box
        style={styles.box}
        sx={{
          width: 500,
          maxWidth: "100%",
        }}
      >
        <TextField
          fullWidth
          label="Option Two"
          id="fullWidth"
          onChange={(e) => {
            setOptionTwo(e.target.value);
          }}
        />
      </Box>
      <Button style={styles.button} variant="contained">
        Post
      </Button>
    </div>
  );
};

const styles = {
  text: {
    textAlign: "center",
  },
  p: {
    textAlign: "center",
    marginTop: "-10px",
  },
  box: {
    marginTop: "2%",
    marginLeft: "38%",
    marginBottom: "3%",
  },
  button: {
    marginLeft: "50%",
    background: "#0f9684",
  },
};

export default CreatePoll;
