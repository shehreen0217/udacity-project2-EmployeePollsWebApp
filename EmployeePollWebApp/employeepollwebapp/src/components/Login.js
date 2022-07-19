import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "@mui/material/Avatar";
import loginAvatar from "../avatars/loginavatar.jpg";
import "../index.css";
// import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { Redirect } from "react-router-dom";
import { login, settingUsers } from "../Store/Actions/login";
// import Alert from "@mui/material/Alert";
// import Collapse from "@mui/material/Collapse";

const Login = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(settingUsers());
  }, [dispatch]);

  const auth = useSelector((state) => state.auth.isAuthenticated);
  const allusers = useSelector((state) => state.user.allUsers);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  // const [open, setOpen] = useState(true);

  if (auth) {
    console.log("in redirect if");
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get("redirectTo");
    return <Redirect to={redirectUrl ? redirectUrl : "/"} />;
  }

  console.log("login is gone mad");
  const Cuser = Object.keys(allusers).map((key) => {
    return allusers[key];
  });
  let allUsers = Cuser.map((e) => e.id);

  const clickHandler = () => {
    dispatch(login(user, password));
    // setReload(true);
  };

  return (
    !auth && (
      <div className="Login">
        <span>
          <Avatar
            className="avatar"
            alt="login avatar"
            src={loginAvatar}
            sx={{ width: 150, height: 150 }}
          />
          <h1 className="login-text">Login</h1>
          <form>
            <Autocomplete
              data-testid="username"
              inputValue={user}
              onInputChange={(e, currentUser) => {
                setUser(currentUser);
              }}
              disablePortal
              id="combo-box-demo"
              options={allUsers}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="User" />}
            />
            <TextField
              data-testid="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              name="password"
              type="password"
              placeholder="password"
              label="Password"
              sx={{ width: 300 }}
            />
          </form>

          {user && password && (
            <Button
              alt="submit"
              aria-label="submit"
              data-testid="submit-btn"
              sx={{
                mt: 1, // margin top
              }}
              onClick={clickHandler}
            >
              Log in
            </Button>
          )}
          {!user ||
            (!password && (
              <Button
                alt="submit"
                aria-label="submit"
                data-testid="submit-btn"
                disabled
                sx={{
                  mt: 1, // margin top
                }}
                onClick={clickHandler}
              >
                Log in
              </Button>
            ))}

          {/* {invalidPass && (
            <Collapse in={open}>
              <Alert onClose={() => setOpen(false)} severity="error">
                Invalid Password!
              </Alert>
              <Redirect to="/login" />
            </Collapse>
          )} */}
        </span>
      </div>
    )
  );
};

export default Login;
