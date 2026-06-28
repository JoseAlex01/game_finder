import { useState } from 'react';
import styles from './SmartSearch.module.css';

function SmartSearch({ message, onApply }) {
  const [query, setQuery] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    onApply(query);
  }

  return (
    <section className={styles.smartSearch}>
      <div>
        <h2>Busqueda Inteligente</h2>
        <p>Describe lo que quieres jugar y GameFinder AI convertira tu frase en filtros.</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Quiero juegos de disparos para navegador"
        />
        <button type="submit">Aplicar</button>
      </form>
      {message ? <p className={styles.message}>{message}</p> : null}
    </section>
  );
}

export default SmartSearch;
