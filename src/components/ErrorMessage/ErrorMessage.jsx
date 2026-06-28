import styles from './ErrorMessage.module.css';

function ErrorMessage({ message }) {
  return (
    <div className={styles.error} role="alert">
      <strong>Error de conexion</strong>
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;
