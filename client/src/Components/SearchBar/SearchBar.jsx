import { useDispatch } from "react-redux";
import { useState } from "react";
import { getGamesByName } from "../../redux/actions";
import s from "./SearchBar.module.css";

export const SearchBar = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const handleInput = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name.length !== 0) {
      dispatch(getGamesByName(name));
      setName("");
    }
  };

  return (
    <div className={s.search}>
      <input
        className={s.search2}
        onChange={(event) => {
          handleInput(event);
        }}
        type="text"
        placeholder="Search Game"
      />

      <button
        className={s.btn}
        onClick={(event) => {
          handleSubmit(event);
        }}
        type="submit"
      >
        Search
      </button>
    </div>
  );
};
