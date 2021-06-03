import classNames from "classnames";
import { Link } from "react-router-dom";

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
      <li className={active}>
        <Link to="/">Login</Link>
      </li>
      <li className={item}>
        <Link to="/register">Register</Link>
      </li>
      <li className={item}>
        <Link to="/accueil">Acceuil</Link>
      </li>
      <li className={item}>
        <Link to="/home">Home</Link>
      </li>
    </ul>
  );
}
