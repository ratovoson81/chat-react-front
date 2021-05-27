import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Acceuil from "../components/Accueil";
import Login from "../components/Login";
import Register from "../components/Register";
import SideBar from "../components/SideBar";
import { AuthButton, PrivateRoute } from "../router/RouterGuard";

export default function App() {
  return (
    <Router>
      <div>
        <AuthButton />

        <SideBar />

        <Switch>
          <Route exact path="/" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <PrivateRoute path="/accueil" component={Acceuil}></PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}
