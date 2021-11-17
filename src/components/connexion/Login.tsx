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
      className="max-w-sm m-4 p-10 bg-white bg-opacity-25 rounded shadow-xl"
    >
      <p className="text-white font-medium text-center text-lg font-bold">
        LOGIN
      </p>
      <div className="">
        <label className="block text-sm text-white">E-mail</label>
        <input
          className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
          placeholder="email"
          type="text"
          name="email"
          onChange={handleChange}
          value={form.email}
          required
        />
      </div>
      <div className="mt-2">
        <label className="block  text-sm text-white">Password</label>
        <input
          className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
          placeholder="password"
          type="text"
          name="password"
          onChange={handleChange}
          value={form.password}
          required
        />
      </div>

      <div className="mt-4 items-center flex justify-between">
        <button
          className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
          type="submit"
        >
          Se connecter
        </button>
        <a
          className="inline-block right-0 align-baseline font-bold text-sm text-500 text-white hover:text-red-400"
          href="#exemple.com"
        >
          mot de passe oublié ?
        </a>
      </div>
      <div className="text-center">
        {/*<a
          className="inline-block right-0 align-baseline font-light text-sm text-500 hover:text-red-400"
          href="#exemple.com"
        >
          Créer un compte
        </a>*/}
        <Link to="/register">{"Créer un compte"}</Link>
      </div>
    </form>
  );
}
