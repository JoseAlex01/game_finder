import styles from './NoResults.module.css';

function NoResults() {
  return (
    <div className={styles.noResults}>
      <h2>Sin resultados</h2>
      <p>Prueba con otro nombre, genero o plataforma.</p>
    </div>
  );
}

export default NoResults;
