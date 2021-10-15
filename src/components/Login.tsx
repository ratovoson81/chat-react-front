import { useHistory, useLocation } from "react-router-dom";
import { Location } from "history";
import { authType } from "../CostumType";
import { useAuth } from "../context/Auth";
import { SyntheticEvent } from "react";
import { useProvideAuth } from "../services/Auth";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../api/mutation";
import { Input } from "antd";

interface LocationState {
  from: Location;
}

export default function Login() {
  const { form, handleChange } = useProvideAuth();
  const [login] = useMutation(LOGIN);

  let history = useHistory();
  let location = useLocation<LocationState>();
  let auth = useAuth() as authType;
  let { from } = location.state || { from: { pathname: "/" } };

  let submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await login({ variables: { data: form } })
      .then((result) => {
        auth.signin(async () => {
          console.log("login ok " + result.data.loginUser.token);
          localStorage.setItem("token", result.data.loginUser.token);
          history.replace(from);
        });
      })
      .catch((err) => {
        console.error("error => ", err);
      });
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={submit} className="flex flex-col w-72">
        <Input
          className="text-center"
          placeholder="Email"
          type="text"
          name="email"
          onChange={handleChange}
          value={form.email}
        />
        <Input.Password
          className="text-center"
          placeholder="Password"
          type="text"
          name="password"
          onChange={handleChange}
          value={form.password}
        />
        <input type="submit" value="Envoyer" />
      </form>
    </div>
  );
}
