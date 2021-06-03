import { useHistory, useLocation } from "react-router-dom";
import { Location } from "history";
import { authType } from "../CostumType";
import { useAuth } from "../context/Auth";
import { SyntheticEvent } from "react";

interface LocationState {
  from: Location;
}

export default function Login() {
  let history = useHistory();
  let location = useLocation<LocationState>();
  let auth = useAuth() as authType;

  let { from } = location.state || { from: { pathname: "/" } };
  let login = (e: SyntheticEvent) => {
    e.preventDefault();
    auth.signin(() => {
      history.replace(from);
    });
  };

  return (
    <div className="flex justify-center">
      <form className="flex flex-col w-72">
        <input
          className="text-center"
          placeholder="Nom"
          type="text"
          name="name"
        />
        <input
          className="text-center"
          placeholder="Password"
          type="text"
          name="name"
        />
        <input type="submit" value="Envoyer" onClick={login} />
      </form>
    </div>
  );
}
