import { BrowserRouter as Router, Switch } from "react-router-dom";
import Acceuil from "../components/Accueil";
import Login from "../components/Login";
import Register from "../components/Register";
import { AppRoute, PrivateRoute } from "../router/PrivateRoute";
import ProvideAuth from "../router/ProvideAuth";
import LoginPage from "../layout/LoginPage";
import PrivatePage from "../layout/PrivatePage";
import Home from "../components/Home";

export default function App() {
  return (
    <ProvideAuth>
      <Router>
        <div>
          <Switch>
            <AppRoute exact path="/" layout={LoginPage} component={Login} />
            <AppRoute
              path="/register"
              layout={LoginPage}
              component={Register}
            />
            <PrivateRoute
              path="/accueil"
              layout={PrivatePage}
              component={Acceuil}
            />
            <PrivateRoute path="/home" layout={PrivatePage} component={Home} />
          </Switch>
        </div>
      </Router>
    </ProvideAuth>
  );
}
