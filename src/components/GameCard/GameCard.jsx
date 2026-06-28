import { Link } from 'react-router-dom';
import styles from './GameCard.module.css';

function GameCard({ game }) {
  return (
    <article className={styles.card}>
      <img src={game.thumbnail} alt={`Portada de ${game.title}`} loading="lazy" />
      <div className={styles.content}>
        <div className={styles.titleRow}>
          <h3>{game.title}</h3>
          <span>{game.genre}</span>
        </div>
        <dl className={styles.meta}>
          <div>
            <dt>Plataforma</dt>
            <dd>{game.platform}</dd>
          </div>
          <div>
            <dt>Publicador</dt>
            <dd>{game.publisher}</dd>
          </div>
          <div>
            <dt>Lanzamiento</dt>
            <dd>{game.release_date}</dd>
          </div>
        </dl>
        <Link className={styles.detailLink} to={`/games/${game.id}`}>
          Ver detalle
        </Link>
      </div>
    </article>
  );
}

export default GameCard;
