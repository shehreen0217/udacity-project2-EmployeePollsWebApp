import { authActions } from "../../Store/reducers/login-slice";
import { userActions } from "../reducers/user-slice";
import { _getUsers } from "../../_DATA";

export const login = (id = "", password = "") => {
  return async (dispatch) => {
    const users = await _getUsers();
    const Cuser = Object.keys(users).map((key) => {
      return users[key];
    });

    // console.log(users);
    // console.log(Cuser);
    let currentUser = Cuser.filter((e) => e.id === id);
    console.log(currentUser);

    if (id) {
      if (currentUser[0].id === id) {
        if (currentUser[0].password === password) {
          dispatch(
            authActions.login({ auth: true, id: id, password: password })
          );
          dispatch(userActions.setUser({ user: currentUser }));
        } else {
          console.log("incorrect password!");
        }
      } else {
        console.log("incorrect userid");
      }
    }
  };
};
