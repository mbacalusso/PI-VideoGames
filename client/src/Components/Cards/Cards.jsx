import { Link } from "react-router-dom";
import s from "./Cards.module.css";

export const Cards = ({ id, name, genres, background_image, rating }) => {
  return (
    <div className={s.card} key="general">
      <div className={s.description}>
        <h2>{name}</h2>

        <div className={s.cover} key="img">
          <img src={background_image} alt={`Img of ${name}`} />
        </div>

        <h6 className={s.tag} key="genres">
          {genres}
        </h6>

        <h6 className={s.tag} key="rating">
          Rating: {rating}
        </h6>

        <Link to={`/home/detail/${id}`}>
          <button className={s.btn}>Details</button>
        </Link>
      </div>
    </div>
  );
};
