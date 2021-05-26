import { useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../router/RouterGuard";

export default function Login() {
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth() as any;

  let { from }: any = location.state || { from: { pathname: "/" } };
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
