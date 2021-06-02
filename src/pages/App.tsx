import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Acceuil from "../components/Accueil";
import Login from "../components/Login";
import Register from "../components/Register";
import NavBar from "../router/NavBar";
import { AuthButton } from "../components/AuthButton";
import { PrivateRoute } from "../router/PrivateRoute";
import ProvideAuth from "../router/ProvideAuth";
import LoginPage from "../layout/LoginPage";
import PrivatePage from "../layout/PrivatePage";

const AppRoute: React.ComponentType<any> = ({
  component: Component,
  layout: Layout,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout>
          <Component {...props}></Component>
        </Layout>
      )}
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
