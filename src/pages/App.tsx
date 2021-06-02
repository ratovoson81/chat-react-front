import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Acceuil from "../components/Accueil";
import Login from "../components/Login";
import Register from "../components/Register";
import NavBar from "../router/NavBar";
import { AuthButton } from "../components/AuthButton";
import { PrivateRoute } from "../router/PrivateRoute";
import ProvideAuth from "../router/ProvideAuth";
import LoginPage from "../layout/LoginPage";
import PrivatePage from "../layout/PrivatePage";
import { useAuth } from "../context/Auth";
import { authType } from "../CostumType";

const AppRoute: React.ComponentType<any> = ({
  component: Component,
  layout: Layout,
  ...rest
}) => {
  let auth = useAuth() as authType;

  return (
    <Route
      {...rest}
      render={(props) =>
        auth.user ? (
          <Redirect
            to={{
              pathname: "/accueil",
              state: { from: props.location },
            }}
          />
        ) : (
          <Layout>
            <Component {...props} />
          </Layout>
        )
      }
    ></Route>
  );
};

export default function App() {
  return (
    <ProvideAuth>
      <Router>
        <div>
          <AuthButton />

          <NavBar />

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
          </Switch>
        </div>
      </Router>
    </ProvideAuth>
  );
}
