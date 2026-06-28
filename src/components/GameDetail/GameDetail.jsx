import styles from './GameDetail.module.css';

function GameDetail({ game }) {
  const screenshots = game.screenshots ?? [];

  return (
    <article className={styles.detail}>
      <section className={styles.hero}>
        <img src={game.thumbnail} alt={`Imagen principal de ${game.title}`} />
        <div className={styles.heroContent}>
          <span className={styles.badge}>{game.genre}</span>
          <h1>{game.title}</h1>
          <p>{game.short_description}</p>
          <a href={game.game_url} target="_blank" rel="noreferrer" className={styles.externalLink}>
            Ir al sitio oficial
          </a>
        </div>
      </section>

      <section className={styles.body}>
        <div className={styles.description}>
          <h2>Descripcion</h2>
          <p>{game.description}</p>
        </div>

        <dl className={styles.facts} aria-label="Informacion del juego">
          <Info label="Genero" value={game.genre} />
          <Info label="Plataforma" value={game.platform} />
          <Info label="Publicador" value={game.publisher} />
          <Info label="Desarrollador" value={game.developer} />
          <Info label="Lanzamiento" value={game.release_date} />
        </dl>
      </section>

      {screenshots.length > 0 ? (
        <section className={styles.screenshots}>
          <h2>Capturas de pantalla</h2>
          <div className={styles.screenshotGrid}>
            {screenshots.map((screenshot) => (
              <img key={screenshot.id} src={screenshot.image} alt={`Captura ${screenshot.id} de ${game.title}`} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{value || 'No disponible'}</dd>
    </div>
  );
}

export default GameDetail;
