import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "@mui/material/Avatar";
import loginAvatar from "../avatars/loginavatar.jpg";
import "../index.css";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { _getUsers } from "../_DATA";
import { Link } from "react-router-dom";
import { login } from "../Store/Actions/login";

const Login = () => {
  const users = ["sarahedo", "tylermcginnis", "mtsamis", "zoshikanlu"];
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const [reload, setReload] = useState(false);

  useEffect(() => {
    const loginHandler = async () => {
      console.log("username from component: ", user);
      dispatch(login(user, password));

      setReload(false);
    };
    loginHandler();
  }, [reload]);

  const clickHandler = () => {
    setReload(true);
  };

  return (
    !auth && (
      <div className="Login">
        <Stack spacing={2}>
          <Avatar
            className="avatar"
            alt="login avatar"
            src={loginAvatar}
            sx={{ width: 150, height: 150 }}
          />
          <h1 className="login-text">Login</h1>
          <Autocomplete
            inputValue={user}
            onInputChange={(e, currentUser) => {
              setUser(currentUser);
            }}
            disablePortal
            id="combo-box-demo"
            options={users}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="User" />}
          />
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            name="password"
            type="password"
            placeholder="password"
            label="Password"
          />
          <Link to="/home">
            {user && password && (
              <Button
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
                  disabled
                  sx={{
                    mt: 1, // margin top
                  }}
                  onClick={clickHandler}
                >
                  Log in
                </Button>
              ))}
          </Link>
        </Stack>
      </div>
    )
  );
};

export default Login;
