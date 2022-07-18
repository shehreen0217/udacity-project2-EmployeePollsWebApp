import {
  _saveQuestion,
  _saveQuestionAnswer,
  _getQuestions,
  _getUsers,
} from "./_DATA";
import LeaderBoard from "./components/LeaderBoard";
import App from "./components/App";
import { Provider } from "react-redux";
import store from "./Store/reducers";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

describe("testing async function SaveQuestion", () => {
  it("will return an object if correct values are passed", async () => {
    let question = {
      optionOneText: "work from home",
      optionTwoText: "work from office",
      author: "sarahedo",
    };
    let result = await _saveQuestion(question);
    expect(result.optionOne.text).toEqual(question.optionOneText);
    expect(result.optionTwo.text).toEqual(question.optionTwoText);
    expect(result.author).toEqual(question.author);
  });

  it("will reject the promise and throw error if incorrect values are passed", async () => {
    let question = {
      optionOneText: "work from home",
      optionTwoText: "work from office",
    };
    await expect(_saveQuestion(question)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});

describe("testing async function SaveQuestionAnswer", () => {
  it("will resolve with true if correct values are passed", async () => {
    let authedUser = "sarahedo";
    let questionid = "vthrdm985a262al8qx3do";
    let answer = "optionOne";
    let result = await _saveQuestionAnswer({
      authedUser: authedUser,
      qid: questionid,
      answer: answer,
    });
    expect(result).toEqual(true);
  });

  it("will reject the promise and throw error if incorrect values are passed", async () => {
    let authedUser = "sarahedo";
    let questionid = "vthrdm262al8qx3do";

    await expect(
      _saveQuestionAnswer({
        authedUser: authedUser,
        qid: questionid,
      })
    ).rejects.toEqual("Please provide authedUser, qid, and answer");
  });
});

describe("testing _Users and _Questions", () => {
  it("will return all users from database", async () => {
    await expect(_getUsers()).not.toBeNull();
  });

  it("will return all questions from database", async () => {
    await expect(_getQuestions()).not.toBeNull();
  });
});

describe("testing snapshot", () => {
  it("App component", () => {
    let component = render(
      <MemoryRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    expect(component).toMatchSnapshot();
  });

  it("Leaderboard Component", () => {
    let component = render(
      <MemoryRouter>
        <Provider store={store}>
          <LeaderBoard />
        </Provider>
      </MemoryRouter>
    );
    expect(component).toMatchSnapshot();
  });

  it("Navbar ", () => {
    let component = render(
      <MemoryRouter>
        <Provider store={store}>
          <Navbar />
        </Provider>
      </MemoryRouter>
    );
    expect(component).toMatchSnapshot();
  });
});

describe("testing DOM", () => {
  it("Login", () => {
    let component = render(
      <MemoryRouter>
        <Provider store={store}>
          <Login />

          <Dashboard></Dashboard>
        </Provider>
      </MemoryRouter>
    );
    let userid = component.getByTestId("username").querySelector("input");
    fireEvent.change(userid, { target: { value: "tylermcginnis" } });
    let password = component.getByTestId("password").querySelector("input");
    fireEvent.change(password, { target: { value: "abc321" } });
    let submitButtom = component.getByRole("button");
    fireEvent.click(submitButtom);
  });
});
