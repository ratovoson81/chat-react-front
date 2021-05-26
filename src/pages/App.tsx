import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Acceuil from "../components/Accueil";
import Login from "../components/Login";
import Register from "../components/Register";
import SideBar from "../components/SideBar";
import { AuthButton, PrivateRoute, ProvideAuth } from "../router/RouterGuard";

export default function App() {
  return (
    <ProvideAuth>
      <Router>
        <div>
          <AuthButton />

          <SideBar />

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
