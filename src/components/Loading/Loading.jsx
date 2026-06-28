import styles from './Loading.module.css';

function Loading({ label = 'Cargando juegos...' }) {
  return (
    <div className={styles.loading} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

export default Loading;
