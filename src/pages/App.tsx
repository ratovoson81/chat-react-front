import { BrowserRouter as Router, Switch } from "react-router-dom";
import Acceuil from "../components/chat/Accueil";
import Login from "../components/connexion/Login";
import Register from "../components/connexion/Register";
import { AppRoute, PrivateRoute } from "../router/PrivateRoute";
import ProvideAuth from "../router/ProvideAuth";
import LoginPage from "../layout/LoginPage";
import PrivatePage from "../layout/PrivatePage";
import Home from "../components/Home";
import LoadingBar from "react-top-loading-bar";
import { useState, useRef, useEffect } from "react";
import { ThemeProvider } from "../components/connexion/ThemeContext";
import Background from "../components/connexion/Background";

export default function App() {
  const [loading, setLoading] = useState<Boolean>(true);
  const ref = useRef<any>(null);

  useEffect(() => {
    ref.current?.continuousStart();
    setTimeout(() => {
      console.log("...loading something");
      ref.current.complete();
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <ProvideAuth>
      <ThemeProvider>
        <Background>
          <LoadingBar color="#f11946" ref={ref} />
          {loading ? (
            ""
          ) : (
            <Router>
              <div>
                <Switch>
                  <AppRoute
                    exact
                    path="/"
                    layout={LoginPage}
                    component={Login}
                  />
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
                  <PrivateRoute
                    path="/home"
                    layout={PrivatePage}
                    component={Home}
                  />
                </Switch>
              </div>
            </Router>
          )}
        </Background>
      </ThemeProvider>
    </ProvideAuth>
  );
}
