import { Link } from "react-router-dom";

export default function SideBar() {
  return (
    <ul>
      <li>
        <Link to="/">Login</Link>
      </li>
      <li>
        <Link to="/acceuil">Acceuil</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
    </ul>
  );
}
