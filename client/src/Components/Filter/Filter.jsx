import { useSelector } from "react-redux";
import { getAllGames } from "../../redux/actions";
import { useDispatch } from "react-redux";
import s from "./Filter.module.css";

export const Filter = ({
  handleChangeAlf,
  handleChangeRat,
  handleChangeGen,
  handleChangeOrigin,
}) => {
  const gamesGenres = useSelector((state) => state.gamesGenres);

  const dispatch = useDispatch();

  const handleOnClick = (event) => {
    event.preventDefault();

    dispatch(getAllGames());
  };

  return (
    <div className={s.container}>
      <label className={s.tag}>
        Order
        <select
          onChange={(event) => {
            handleChangeAlf(event);
          }}
          name="Alphabetically"
        >
          <option hidden>Alphabetically</option>
          <option value="asc">A - Z</option>
          <option value="desc">Z - A</option>
        </select>
        <select
          onChange={(event) => {
            handleChangeRat(event);
          }}
          name="Rating"
        >
          <option hidden>Rating</option>
          <option value="top">Top</option>
          <option value="low">Low</option>
        </select>
      </label>

      <button className={s.btn} onClick={(event) => handleOnClick(event)}>
        Refresh
      </button>

      <label className={s.tag}>
        Filters
        <select
          onChange={(event) => {
            handleChangeGen(event);
          }}
          name="Genders"
        >
          <option value="All">Genders</option>
          {gamesGenres &&
            gamesGenres.map((genre, index) => (
              <option key={index} value={genre.name}>
                {genre.name}
              </option>
            ))}
        </select>
        <select
          onChange={(event) => {
            handleChangeOrigin(event);
          }}
          name="Source"
        >
          <option value="All">Source</option>
          <option value="RawgAPI">API</option>
          <option value="VideogamesDB">Data Base</option>
        </select>
      </label>
    </div>
  );
};
