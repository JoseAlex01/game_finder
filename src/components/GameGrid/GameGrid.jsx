import GameCard from '../GameCard/GameCard.jsx';
import styles from './GameGrid.module.css';

function GameGrid({ games }) {
  return (
    <section className={styles.grid} aria-label="Catalogo de juegos">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </section>
  );
}

export default GameGrid;
