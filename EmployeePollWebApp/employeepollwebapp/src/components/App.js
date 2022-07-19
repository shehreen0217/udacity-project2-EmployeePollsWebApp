import Login from "./Login";
import { useSelector } from "react-redux";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import { Route } from "react-router-dom";
import PollDetails from "./PollDetails";
import LeaderBoard from "./LeaderBoard";
import CreatePoll from "./CreatePoll";
import PrivateRoute from "./PrivateRoute";

function App() {
  const auth = useSelector((state) => state.auth.isAuthenticated);
  return (
    <div>
      {console.log("App is renndering")}
      <Route to="/login">
        <Login />
      </Route>
      {auth && (
        <Route path="/">
          <Navbar />
        </Route>
      )}

      <Route exact path="/add">
        <PrivateRoute>
          <CreatePoll />
        </PrivateRoute>
      </Route>
      <Route exact path="/">
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      </Route>
      <Route exact path="/question/:questionid">
        <PrivateRoute>
          <PollDetails />
        </PrivateRoute>
      </Route>
      <Route exact path="/leaderboard">
        <PrivateRoute>
          <LeaderBoard />
        </PrivateRoute>
      </Route>
    </div>
  );
}

export default App;
