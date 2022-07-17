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
              <NavLink activeClassName={classes.active} to="/">
                home
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName={classes.active} to="/leaderboard">
                Leaderboard
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName={classes.active} to="/add">
                New
              </NavLink>
            </li>
            <span style={styles.logout}>
              <li>
                <Stack direction="row" spacing={2}>
                  <Link style={styles.links} to="/profile">
                    <Avatar
                      className="avatar"
                      alt="Current User avatar"
                      src={isUser[0].avatarURL}
                      sx={{ width: 40, height: 40 }}
                    />
                  </Link>

                  <h5 style={styles.username}>{isUser[0].name}</h5>
                </Stack>
              </li>
              <li>
                <NavLink
                  activeClassName={classes.active}
                  to="/"
                  onClick={logoutHandler}
                >
                  logout
                </NavLink>
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
  links: {
    marginTop: "-20px",
    marginLeft: "-5px",
  },
  username: {
    marginTop: "18px",
    marginLeft: "-13px",
    marginRight: "8px",
  },
};

export default Navbar;
