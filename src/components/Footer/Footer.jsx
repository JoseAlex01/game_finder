import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <span>GameFinder AI</span>
      <span>Datos proporcionados por FreeToGame.</span>
    </footer>
  );
}

export default Footer;
