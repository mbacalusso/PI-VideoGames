import { Cards } from "../Cards/Cards";
import { Pages } from "../Pages/Pages";
import { Filter } from "../Filter/Filter";
import { NavBar } from "../NavBar/NavBar";
import { Footer } from "../Footer/Footer";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllGames,
  getGamesGenres,
  setGamesOrder,
  setGamesOrigin,
  setGamesGenres,
  setGamesRating,
} from "../../redux/actions";
import s from "./Home.module.css";
import e from "../Styles/Loading.module.css";
import loading from "../Styles/img/loading.gif";
import { Link } from "react-router-dom";

export const Home = () => {
  const dispatch = useDispatch();

  const games = useSelector((state) => state.games);

  useEffect(() => {
    dispatch(getGamesGenres());
    dispatch(getAllGames());
  }, [dispatch]);

  const [order, setOrder] = useState("");

  const [pagina, setPagina] = useState(1);
  const [juegosPorPagina] = useState(15);
  const paginado = (pageNumber) => {
    setPagina(pageNumber);
  };

  /* const maxrender = videogames.length / juegosPorPagina; */

  const handleChangeAlf = (event) => {
    dispatch(setGamesOrder(event.target.value));
    setPagina(1);
    setOrder(event.target.value);
  };

  const handleChangeRat = (event) => {
    dispatch(setGamesRating(event.target.value));
    setPagina(1);
    setOrder(event.target.value);
  };

  const handleChangeGen = (event) => {
    dispatch(setGamesGenres(event.target.value));
    setPagina(1);
    setOrder(event.target.value);
  };

  const handleChangeOrigin = (event) => {
    dispatch(setGamesOrigin(event.target.value));
    setPagina(1);
    setOrder(event.target.value);
  };

  const hanleClick = (event) => {
    event.preventDefault();
    dispatch(getAllGames());
    setPagina(1);
  };

  if (!games.length) {
    return (
      <div className={e.loading}>
        <img className={e.img} src={loading} alt="loading" />

        <Link to="/home">
          <button onClick={(event) => hanleClick(event)} className={e.btn}>
            Back
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className={s.body}>
      <NavBar />

      <Filter
        handleChangeAlf={handleChangeAlf}
        handleChangeRat={handleChangeRat}
        handleChangeGen={handleChangeGen}
        handleChangeOrigin={handleChangeOrigin}
      />

      <button className={s.page} disabled>
        Page {pagina}
      </button>

      <Pages
        pagina={juegosPorPagina}
        setPagina={games.length}
        maxrender={paginado}
      />
      {/* <Pages pagina={pagina} setPagina={setPagina} maxrender={maxrender} /> */}

      <div key="card" className={s.cardcontainer}>
        {games &&
          games
            .slice(
              (pagina - 1) * juegosPorPagina,
              (pagina - 1) * juegosPorPagina + juegosPorPagina
            )
            .map((juego) => {
              return (
                <div key={juego.id}>
                  <Cards
                    key={juego.id}
                    id={juego.id}
                    name={juego.name}
                    genres={juego.genres?.map((gan, index) => (
                      <div key={index}>{gan.name}</div>
                    ))}
                    background_image={juego.background_image}
                    rating={juego.rating}
                  />
                </div>
              );
            })}
      </div>

      <br />

      <button className={s.page} disabled>
        Page {pagina}
      </button>

      <Pages
        pagina={juegosPorPagina}
        setPagina={games.length}
        maxrender={paginado}
      />

      <br />

      <Footer />
    </div>
  );
};
