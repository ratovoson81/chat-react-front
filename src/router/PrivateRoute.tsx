import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { authType } from "../CostumType";

export function PrivateRoute({ children, ...rest }: any) {
  let auth = useAuth() as authType;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
