import s from "./Pages.module.css";
/* import { useState } from "react"; */
/* import React from "react"; */

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

/* export class Pages extends React.Component {
  render() {
    const pageNumbers = [];

    for (
      let i = 1;
      i <= Math.ceil(this.props.setPagina / this.props.pagina);
      i++
    ) {
      pageNumbers.push(i);
    }
    return (
      <nav>
        {pageNumbers?.map((number) => (
          <button
            className={s.btn}
            onClick={() => this.props.maxrender(number)}
            key={number}
          >
            {number}
          </button>
        ))}
      </nav>
    );
  }
} */

/* export const Pages = ({ pagina, setPagina, maxrender }) => {
  const [input, setInput] = useState(1);
  const proximaPagina = () => {
    setInput(parseInt(input) + 1);
    setPagina(parseInt(pagina) + 1);
  };
  const volverPagina = () => {
    setInput(parseInt(input) - 1);
    setPagina(parseInt(pagina) - 1);
  };
  return (
    <div>
      <button disabled={pagina <= 1} onClick={volverPagina}>
        Prev
      </button>

      <button>{input}</button>

      <label>OF</label>

      <button>{Math.ceil(maxrender)}</button>

      <button disabled={pagina >= Math.ceil(maxrender)} onClick={proximaPagina}>
        Next
      </button>
    </div>
  );
};
*/
