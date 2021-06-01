import { useHistory, useLocation } from "react-router-dom";
import { Location } from "history";
import { authType } from "../CostumType";
import { useAuth } from "../context/Auth";

interface LocationState {
  from: Location;
}

export default function Login() {
  let history = useHistory();
  let location = useLocation<LocationState>();
  let auth = useAuth() as authType;

  let { from } = location.state || { from: { pathname: "/" } };
  let login = () => {
    auth.signin(() => {
      history.replace(from);
    });
  };

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
    </div>
  );
}
