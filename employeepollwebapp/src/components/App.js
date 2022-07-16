import Login from "./Login";
import { useSelector } from "react-redux";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import { Route, Redirect } from "react-router-dom";
import PollDetails from "./PollDetails";

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
          {/* <Route exact path="/add">
           
          </Route> */}
          <Route exact path="/home">
            <Dashboard />
          </Route>
          <Route exact path="/question/:questionid">
            <PollDetails />
          </Route>
        </div>
      )}
      {!auth && <Redirect to="/" />}
    </div>
  );
}

export default App;
