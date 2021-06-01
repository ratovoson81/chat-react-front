import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Acceuil from "../components/Accueil";
import Login from "../components/Login";
import Register from "../components/Register";
import NavBar from "../router/NavBar";
import { AuthButton } from "../components/AuthButton";
import { PrivateRoute } from "../router/PrivateRoute";
import ProvideAuth from "../router/ProvideAuth";

export default function App() {
  return (
    <ProvideAuth>
      <Router>
        <div>
          <AuthButton />

          <NavBar />

          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <PrivateRoute path="/accueil">
              <Acceuil />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </ProvideAuth>
  );
}
