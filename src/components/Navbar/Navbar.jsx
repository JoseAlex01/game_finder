import { Link, NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Navegacion principal">
        <Link to="/" className={styles.brand}>
          <span className={styles.logoMark}>GF</span>
          <span>GameFinder AI</span>
        </Link>
        <div className={styles.links}>
          <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : styles.link)}>
            Catalogo
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
