import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearGameState, getGamesDetails } from "../../redux/actions";
import e from "../Styles/Loading.module.css";
import s from "./GamesDetails.module.css";
import loading from "../Styles/img/loading.gif";

export const GamesDetails = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const game = useSelector((state) => state.gamesDetails);

  useEffect(() => {
    dispatch(getGamesDetails(id));
    dispatch(clearGameState());
  }, [id, dispatch]);

  if (game.length > 2 || game.length < 1) {
    return (
      <div className={e.loading}>
        <img className={e.img} src={loading} alt="loading" />
      </div>
    );
  }

  /* if (game.length === 0) {
    console.log("hola")
  } else if (game.length > 2 || game.length < 1) {
    return (
      <div className={loading}>
        <img className={s.img2} src={loading} alt="loading" />
      </div>
    );
  } */

  return (
    <div>
      <Link to="/home">
        <button className={s.btn}>Home</button>
      </Link>

      <div className={s.detail}>
        <div className={s.desc}>
          <h2 className={s.tagnombre}>{game.name}</h2>
          <img
            className={s.cov}
            src={game.background_image}
            alt="img"
            width="50%"
            height="50%"
          />

          <h3>
            <span className={s.tag1}>Rating: </span>
          </h3>
          <span className={s.tag10}>{game.rating}</span>

          <h3>
            <span className={s.tag2}>Platforms: </span>
          </h3>
          <span className={s.tag11}>
            {game.id?.length > 7
              ? game.platforms?.map((plat) => plat).join(" - ")
              : game.platforms?.map((plat) => plat.platform.name).join(" - ")}
          </span>

          <h3>
            <span className={s.tag3}>Genres: </span>
          </h3>
          <span className={s.tag12}>
            {game.genres?.map((gen) => gen.name).join(" - ")}
          </span>

          <h3>
            <span className={s.tag4}>Released: </span>
          </h3>
          <span className={s.tag13}>{game.released}</span>

          <h3>
            <span className={s.tag5}>Description: </span>
          </h3>
          <span className={s.tag14}>{game.description}</span>
        </div>
      </div>
    </div>
  );
};
