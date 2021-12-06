import { Link, useHistory, useLocation } from "react-router-dom";
import { Location } from "history";
import { authType } from "../../CostumType";
import { useAuth } from "../../context/Auth";
import { SyntheticEvent } from "react";
import { useProvideAuth } from "../../services/Auth";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../api/mutation";
import { notification } from "antd";
import { useAppDispatch } from "../../Hooks";
import { setMe } from "../../store/User";
import { socket } from "../../api";

interface LocationState {
  from: Location;
}

export default function Login() {
  const dispatch = useAppDispatch();
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
          dispatch(setMe(result.data.loginUser.theUser));
          localStorage.setItem("token", result.data.loginUser.token);
          socket.emit("login", result.data.loginUser.token);
          history.replace(from);
        });
      })
      .catch((err) => {
        console.error(err);
        const placement = "bottomRight";
        notification.error({
          message: `Notification`,
          description: err.graphQLErrors[0].message,
          placement,
        });
      });
  };

  return (
    <form
      onSubmit={submit}
      className="max-w-md m-auto p-10 bg-white rounded shadow-xl space-y-8"
    >
      <p className="text-lg text-center">Login to your account</p>
      <div>
        <label className="block">E-mail</label>
        <input
          className="w-full px-5 py-2 mt-2 text-gray-700 border rounded-md focus:outline-none focus:bg-white"
          placeholder="Email"
          type="text"
          name="email"
          onChange={handleChange}
          value={form.email}
          required
        />
      </div>
      <div>
        <label className="block">Password</label>
        <input
          className="w-full px-5 py-2 mt-2 text-gray-700 border rounded-md focus:outline-none focus:bg-white"
          placeholder="Password"
          type="password"
          name="password"
          onChange={handleChange}
          value={form.password}
          required
        />
      </div>
      {/*<div className="text-center">
        <a
          className="inline-block right-0 align-baseline text-sm text-500 hover:text-red-400 text-gray-400"
          href="#exemple.com"
        >
          mot de passe oublié ?
        </a>
      </div>*/}
      <div className="mt-4 items-center flex justify-between">
        <button
          className="px-8 py-2 text-white tracking-wider bg-gradient-to-br from-pink-500 to-purple-800 transition duration-500 ease-in-out rounded-md"
          type="submit"
        >
          Se connecter
        </button>
        <Link to="/register" className="text-purple-700 hover:text-purple-800">
          {"Créer un compte"}
        </Link>
      </div>
    </form>
  );
}
