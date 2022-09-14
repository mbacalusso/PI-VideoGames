import { Link } from "react-router-dom";
import s from "./LandingPage.module.css";
/* import React from "react"; */

export const LandingPage = () => {
  return (
    <div className={s.landing}>
      <p className={s.title}>Pi Video Games</p>
      <p className={s.parr}>
        Library with more than 100 games, of which you can see the details,
      </p>
      <p className={s.parr}>
        filter by gender or source, order by rating or alphabetically
      </p>
      <p className={s.parr}>and create your own games to add to the library.</p>

      <div className={s.landingImg}>
        <Link to="/home">
          <button className={s.btn}>Home</button>
        </Link>
      </div>
    </div>
  );
};

/* export class LandingPage extends React.Component {
  render() {
    return (
      <div className={s.landing}>
        <p className={s.title}>Pi video games</p>

        <div className={s.landingImg}>
          <Link to="/home">
            <button className={s.btn}>Home</button>
          </Link>
        </div>
      </div>
    );
  }
} */
