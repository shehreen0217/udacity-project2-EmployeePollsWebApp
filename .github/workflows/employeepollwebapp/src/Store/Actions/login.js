import { authActions } from "../../Store/reducers/login-slice";
import { userActions } from "../reducers/user-slice";
import { QuestionsActions } from "../reducers/questions-slice";
import { _getUsers, _getQuestions } from "../../_DATA";

export const login = (id = "", password = "") => {
  return async (dispatch) => {
    const users = await _getUsers();
    const questions = await _getQuestions();
    const Cuser = Object.keys(users).map((key) => {
      return users[key];
    });
    let currentUser = Cuser.filter((e) => e.id === id);

    if (id) {
      if (currentUser[0].id === id) {
        if (currentUser[0].password === password) {
          dispatch(
            authActions.login({ auth: true, id: id, password: password })
          );
          dispatch(userActions.setUser({ user: currentUser }));
          dispatch(QuestionsActions.setQuestions({ questions: questions }));
          dispatch(userActions.setAllUsers({ allUsers: users }));
        } else {
          console.log("incorrect password!");
        }
      } else {
        console.log("incorrect userid");
      }
    }
  };
};
