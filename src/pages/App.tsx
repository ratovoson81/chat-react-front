import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import Acceuil from "../components/Accueil";
import Login from "../components/Login";
import Register from "../components/Register";
import SideBar from "../components/SideBar";

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Login</Link>
          </li>
          <li>
            <Link to="/acceuil">Acceuil</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>

        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/acceuil">
            <Acceuil />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
