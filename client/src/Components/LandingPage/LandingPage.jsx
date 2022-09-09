import { Link } from "react-router-dom";
import s from "./LandingPage.module.css";

export const LandingPage = () => {
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
};
