import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  console.log("private route is rendering");
  const auth = useSelector((state) => state.auth.isAuthenticated);

  const redirectUrl = window.location.href
    .toString()
    .split(window.location.host)[1];

  return auth ? children : <Redirect to={`/login?redirectTo=${redirectUrl}`} />;
};

export default PrivateRoute;
