import { useState } from "react";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { fakeAuth } from "../router/RouterGuard";

type Props = RouteComponentProps & {
  location: {
    state: { from: any };
  };
};

const Login: React.FC<Props> = ({ location }) => {
  const [state, setState] = useState({ redirectToReferrer: false });
  let login = () => {
    fakeAuth.authenticate(() => {
      setState({ redirectToReferrer: true });
    });
  };

  let { from } = location.state || { from: { pathname: "/" } };
  let { redirectToReferrer } = state;

  if (redirectToReferrer) return <Redirect to={from} />;

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
    </div>
  );
};

export default Login;
