import s from "./Pages.module.css";

export const Pages = ({ pagina, setPagina, maxrender }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(setPagina / pagina); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      {pageNumbers?.map((number) => (
        <button
          className={s.btn}
          onClick={() => maxrender(number)}
          key={number}
        >
          {number}
        </button>
      ))}
    </nav>
  );
};
