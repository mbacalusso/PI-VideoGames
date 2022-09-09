import github from "../Styles/img/github.png";
import linkedin from "../Styles/img/linkedin.png";
import s from "./Footer.module.css";

const handleClickGit = () => {
  window.open("https://github.com/mbacalusso");
};

const handleClickLinkedin = () => {
  window.open("https://www.linkedin.com/in/martinbacalusso/");
};

export const Footer = () => {
  return (
    <footer className={s.footer}>
      <img
        onClick={handleClickGit}
        className={s.github}
        src={github}
        alt="github"
        height="10%"
        width="10%"
      />

      <img
        onClick={handleClickLinkedin}
        className={s.linkedin}
        src={linkedin}
        alt="linkedin"
        height="10%"
        width="10%"
      />
    </footer>
  );
};
