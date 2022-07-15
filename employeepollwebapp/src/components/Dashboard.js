import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../Store/reducers/login-slice";
import { Redirect } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.isAuthenticated);

  console.log("i am in dashboard");
  return (
    <div>
      Dashboard
      {!auth && <Redirect to="/" />}
    </div>
  );
};

export default Dashboard;
