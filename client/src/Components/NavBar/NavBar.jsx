import { Link } from "react-router-dom";
import { SearchBar } from "../SearchBar/SearchBar";
import s from "./NavBar.module.css";
import logo from "../Styles/img/logo.png";

export const NavBar = () => {
  return (
    <header>
      <Link to="/">
        <img className={s.imagen} src={logo} alt="img" />
      </Link>

      <SearchBar />

      <Link to="/create">
        <button className={s.btn}>Create game</button>
      </Link>
    </header>
  );
};
