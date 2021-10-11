import classNames from "classnames";
import { NavLink } from "react-router-dom";

const item = classNames(
  "w-20",
  "h-9",
  "flex",
  "items-center",
  "justify-center"
);

const active = classNames(item, "bg-gray-100", "rounded-lg");

export default function NavBar() {
  return (
    <ul className="flex justify-end">
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
    </ul>
  );
}
