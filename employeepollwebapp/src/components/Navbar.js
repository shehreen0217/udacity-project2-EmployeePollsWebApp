import React from "react";
import { Link, NavLink } from "react-router-dom";
import classes from "../nav.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../Store/reducers/login-slice";
import { userActions } from "../Store/reducers/user-slice";
import Avatar from "@mui/material/Avatar";
import { Stack } from "@mui/material";

const Navbar = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const isUser = useSelector((state) => state.user.user);
  console.log(isUser);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(authActions.logout());
  };
  return (
    <header className={classes.header}>
      {isAuth && (
        <nav>
          <ul>
            <li>
              <NavLink activeClassName={classes.active} to="/home">
                home
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName={classes.active} to="/leaderboard">
                Leaderboard
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName={classes.active} to="/question">
                New
              </NavLink>
            </li>
            <span>
              <li style={styles.logout}>
                <NavLink
                  activeClassName={classes.active}
                  to="/"
                  onClick={logoutHandler}
                >
                  logout
                </NavLink>
              </li>
              <li>
                <Stack>
                  <Link to="/profile">
                    <Avatar
                      className="avatar"
                      alt="login avatar"
                      src={isUser[0].avatarURL}
                      sx={{ width: 50, height: 50 }}
                    />
                    {isUser[0].name}
                  </Link>
                </Stack>
              </li>
            </span>
          </ul>
        </nav>
      )}
    </header>
  );
};

const styles = {
  logout: {
    float: "right",
  },
  icon: {
    padding: "0px",
  },
};

export default Navbar;
