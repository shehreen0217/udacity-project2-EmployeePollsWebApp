import Login from "./Login";
import { useSelector } from "react-redux";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import { Route, Redirect } from "react-router-dom";

function App() {
  const auth = useSelector((state) => state.auth.isAuthenticated);
  return (
    <div>
      {!auth && <Login />}

      {auth && (
        <div>
          <Route path="/">
            <Navbar />
          </Route>
          <Route exact path="/home">
            <Dashboard />
            {!auth && <Redirect to="/" />}
          </Route>
        </div>
      )}
    </div>
  );
}

export default App;
