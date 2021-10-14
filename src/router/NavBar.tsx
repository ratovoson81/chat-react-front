import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { authType } from "../CostumType";

const item = classNames(
  "w-20",
  "h-9",
  "flex",
  "items-center",
  "justify-center"
);

const active = classNames(item, "bg-gray-100", "rounded-lg");

export default function NavBar() {
  let auth = useAuth() as authType;

  function Login() {
    return (
      <>
        <li className={item}>
          <NavLink exact activeClassName={active} to="/">
            Login
          </NavLink>
        </li>
        <li className={item}>
          <NavLink activeClassName={active} to="/register">
            Register
          </NavLink>
        </li>
      </>
    );
  }

  function Home() {
    return (
      <>
        <li className={item}>
          <NavLink activeClassName={active} to="/accueil">
            Acceuil
          </NavLink>
        </li>
        <li className={item}>
          <NavLink activeClassName={active} to="/home">
            Home
          </NavLink>
        </li>
      </>
    );
  }

  return (
    <ul className="flex justify-end">
      {!auth.user && <Login />}
      {auth.user && <Home />}
    </ul>
  );
}
