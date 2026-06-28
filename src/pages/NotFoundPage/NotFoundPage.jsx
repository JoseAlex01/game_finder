import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

function NotFoundPage() {
  return (
    <section className={styles.notFound}>
      <h1>Pagina no encontrada</h1>
      <p>La ruta que intentas abrir no existe en GameFinder AI.</p>
      <Link to="/">Volver al catalogo</Link>
    </section>
  );
}

export default NotFoundPage;
