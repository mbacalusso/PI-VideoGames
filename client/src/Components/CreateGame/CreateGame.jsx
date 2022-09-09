import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  createGame,
  getGamesGenres,
  clearGameState,
  getPlatforms,
} from "./../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import s from "./CreateGame.module.css";

function validateInput(input) {
  var errors = {};

  if (!input.name) {
    errors.name = "Name is required";
  } else if (/[@=$%&|<>#]/.test(input.name)) {
    errors.name = "Name not accept simbols";
  } else if (input.name.length > 20) {
    errors.name = "Name is too long (Max = 20 characters)";
  }
  if (!input.description) {
    errors.description = "Description is required";
  } else if (/[@=$%&|<>#]/.test(input.description)) {
    errors.description = "Description not accept simbols";
  } else if (input.description.length > 1500) {
    errors.description = "Description is too long. (Max = 1500 characters)";
  }
  if (!input.rating) {
    errors.rating = "Rating is required";
  } else if (input.rating > 5 || input.rating < 0) {
    errors.rating = "Rating must range between 0 to 5";
  }
  if (!input.released) {
    errors.released = "Date of release is required";
  } else if (input.released.length < 10) {
    errors.released = "Date of release is to long";
  }
  if (!input.genres[0]) {
    errors.genres = "Minimun one Genre is required ";
  } else if (input.genres) {
  }
  if (!input.platforms[0]) {
    errors.platforms = "Minimun one Platform is required";
  }

  return errors;
}

export const CreateGame = () => {
  const dispatch = useDispatch();
  const generos = useSelector((state) => state.gamesGenres);
  const platforms = useSelector((state) => state.platforms);
  const history = useHistory();
  const [errors, setErrors] = useState({});

  const [dataForm, setDataForm] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    background_image: "",
    platforms: [],
    genres: [],
  });

  useEffect(() => {
    dispatch(clearGameState());

    dispatch(getGamesGenres());

    dispatch(getPlatforms());
  }, [dispatch]);

  function handleChange(event) {
    setDataForm({
      ...dataForm,
      [event.target.name]: event.target.value,
    });

    setErrors(
      validateInput({
        ...dataForm,
        [event.target.name]: event.target.value,
      })
    );
  }

  function handleSelect(event) {
    setDataForm({
      ...dataForm,
      [event.target.name]: [...dataForm[event.target.name], event.target.value],
    });

    setErrors(
      validateInput({
        ...dataForm,
        [event.target.name]: event.target.value,
      })
    );
  }

  function handlerSelectPlatforms(event) {
    setDataForm({
      ...dataForm,
      platforms: dataForm.platforms.includes(event.target.value)
        ? dataForm.platforms
        : [...dataForm.platforms, event.target.value],
    });

    setErrors(
      validateInput({
        ...dataForm,
        [event.target.name]: event.target.value,
      })
    );
  }

  function handlerSelectGenres(event) {
    setDataForm({
      ...dataForm,
      genres: dataForm.genres.includes(event.target.value)
        ? dataForm.genres
        : [...dataForm.genres, event.target.value],
    });

    setErrors(
      validateInput({
        ...dataForm,
        [event.target.name]: event.target.value,
      })
    );
  }

  function handleDelete(event) {
    event.preventDefault();

    setDataForm({
      ...dataForm,
      genres: dataForm.genres.filter((genero) => genero !== event.target.value),

      platforms: dataForm.platforms.filter(
        (plataformas) => plataformas !== event.target.value
      ),
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!dataForm.background_image) {
      dataForm.background_image =
        "https://d215db645f.cbaul-cdnwnd.com/b939474445ae18f64a8b679a4273d78f/200000016-abf53abf56/generos-de-games.jpg?ph=d215db645f";
    }

    dispatch(createGame(dataForm));

    alert("Video game created successfully!");

    setDataForm({
      name: "",
      description: "",
      released: "",
      rating: "",
      background_image: "",
      genres: [],
      platforms: [],
    });

    history.push("/home");
  }

  return (
    <div className={s.centrar}>
      <div className={s.body}>
        <Link to="/home">
          <button className={s.btn}>Home </button>
        </Link>

        <form autoComplete="off" onSubmit={(event) => handleSubmit(event)}>
          <label className={s.indicar}>Name </label>
          <input
            className={s.crear}
            onChange={(event) => handleChange(event)}
            type="text"
            name="name"
            value={dataForm.name}
            placeholder="Enter name"
          />
          {errors.name && <ul className={s.err}> {errors.name} </ul>}

          <br />

          <label className={s.indicar}>Description </label>
          <input
            className={s.crear}
            onChange={(event) => handleChange(event)}
            type="textarea"
            name="description"
            value={dataForm.description}
            placeholder="Enter description"
          />
          {errors.description && (
            <ul className={s.err}> {errors.description} </ul>
          )}

          <br />

          <label className={s.indicar}>Rating </label>
          <input
            className={s.crear}
            onChange={(event) => handleChange(event)}
            type="number"
            name="rating"
            value={dataForm.rating}
            placeholder="Enter rating"
          />
          {errors.rating && <ul className={s.err}>{errors.rating}</ul>}

          <br />

          <div>
            <label className={s.indicar}>Released </label>
            <input
              onChange={handleChange}
              type="date"
              id="released"
              name="released"
              value={dataForm.released}
            />
            {errors.released && <ul className={s.err}> {errors.released}</ul>}
          </div>

          <br />

          <label className={s.indicar}>Genres </label>
          <select
            className={s.select}
            name="genres"
            onChange={(event) => handlerSelectGenres(event)}
          >
            <option key="unique1" hidden>
              Chose genres
            </option>
            {generos?.map((generos) => (
              <option key={generos.id} value={generos.name}>
                {generos.name}
              </option>
            ))}
          </select>
          {errors.genres && <ul className={s.err}>{errors.genres}</ul>}
          <br />
          {dataForm.genres.map((gen, index) => (
            <div key={index}>
              <button value={gen} onClick={handleDelete}>
                {gen}
              </button>
            </div>
          ))}

          <br />

          <div>
            <label className={s.indicar}>Platforms </label>
            <select
              className={s.select}
              name="platforms"
              onChange={(event) => handlerSelectPlatforms(event)}
            >
              <option hidden>Chose plataform</option>
              {platforms?.map((plat) => (
                <option key={plat} value={plat}>
                  {plat}
                </option>
              ))}
            </select>
            {errors.platforms && <ul className={s.err}>{errors.platforms}</ul>}
          </div>
          <br />
          {dataForm.platforms.map((plat, index) => (
            <div key={index}>
              <button value={plat} onClick={handleDelete}>
                {plat}
              </button>
            </div>
          ))}

          <br />

          <label className={s.indicar}>URL image </label>
          <input
            className={s.crear}
            onChange={(event) => handleChange(event)}
            type="url"
            name="background_image"
            value={dataForm.background_image}
            placeholder="Enter image"
          />
          {errors.background_image && (
            <ul className={s.err}> {errors.background_image} </ul>
          )}

          <br />

          <button
            className={s.btn2}
            disabled={
              dataForm.name === "" ||
              errors.name ||
              dataForm.description === "" ||
              errors.description ||
              dataForm.rating === "" ||
              errors.rating ||
              dataForm.released === "" ||
              errors.released ||
              dataForm.genres[0] === "" ||
              errors.genres ||
              dataForm.platforms[0] === "" ||
              errors.platforms
            }
            type="submit"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};
