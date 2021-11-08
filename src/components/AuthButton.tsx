import { useHistory } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { authType } from "../CostumType";

export function AuthButton() {
  let history = useHistory();
  let auth = useAuth() as authType;

  return auth.user ? (
    <div className="m-auto">
      <button
        onClick={() => {
          auth.signout(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </div>
  ) : (
    <p>You are not logged in.</p>
  );
}
