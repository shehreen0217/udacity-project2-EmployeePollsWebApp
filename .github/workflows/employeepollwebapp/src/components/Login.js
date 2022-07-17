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
import { Link, Redirect } from "react-router-dom";
import { login } from "../Store/Actions/login";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";

const Login = () => {
  const users = ["sarahedo", "tylermcginnis", "mtsamis", "zoshikanlu"];
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [invalidPass, setInvalidPass] = useState(false);
  const [open, setOpen] = useState(true);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const getuser = async () => {
      const allusers = await _getUsers();

      const Cuser = Object.keys(allusers).map((key) => {
        return allusers[key];
      });
      let currentUser = Cuser.filter((e) => e.id === user);

      if (user && password) {
        if (currentUser[0].password !== password) {
          setInvalidPass(true);
        }
      }
    };
    getuser();
    const loginHandler = async () => {
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
          <form>
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
              sx={{ width: 300 }}
            />
          </form>
          <Link to="/">
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

          {invalidPass && (
            <Collapse in={open}>
              <Alert onClose={() => setOpen(false)} severity="error">
                Invalid Password!
              </Alert>
              <Redirect to="/login" />
            </Collapse>
          )}
        </Stack>
      </div>
    )
  );
};

export default Login;
