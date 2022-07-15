import { _getUsers } from "../_DATA";

export function handleInitialUsers() {
  return (dispatch) => {
    return _getUsers().then(({ id, password }) => {});
  };
}
