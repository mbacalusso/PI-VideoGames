import s from "./Pages.module.css";

export const Pages = ({ perPage, allGames, setPagina }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allGames / perPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      {pageNumbers.map((number) => (
        <button
          className={s.btn}
          onClick={() => setPagina(number)}
          key={number}
        >
          {number}
        </button>
      ))}
    </nav>
  );
};
