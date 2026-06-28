import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx';
import GameFilters from '../../components/GameFilters/GameFilters.jsx';
import GameGrid from '../../components/GameGrid/GameGrid.jsx';
import Loading from '../../components/Loading/Loading.jsx';
import NoResults from '../../components/NoResults/NoResults.jsx';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import SmartSearch from '../../components/SmartSearch/SmartSearch.jsx';
import { useFilters } from '../../hooks/useFilters.js';
import { useGames } from '../../hooks/useGames.js';
import styles from './HomePage.module.css';

function HomePage() {
  const {
    filters,
    smartMessage,
    activeFilterCount,
    updateFilter,
    resetFilters,
    applySmartSearch,
  } = useFilters();
  const { games, totalGames, loading, error } = useGames(filters);

  return (
    <div className={styles.page}>
      <section className={styles.intro}>
        <div>
          <span className={styles.eyebrow}>Free-to-Play Explorer</span>
          <h1>Encuentra tu proximo juego sin perderte en listas infinitas.</h1>
        </div>
        <p>
          Explora el catalogo publico de FreeToGame, filtra por plataforma y genero,
          ordena los resultados y usa frases naturales para descubrir opciones mas rapido.
        </p>
      </section>

      <div className={styles.controls}>
        <SearchBar value={filters.search} onChange={(value) => updateFilter('search', value)} />
        <SmartSearch message={smartMessage} onApply={applySmartSearch} />
        <GameFilters
          filters={filters}
          activeFilterCount={activeFilterCount}
          onChange={updateFilter}
          onReset={resetFilters}
        />
      </div>

      <section className={styles.resultsHeader}>
        <div>
          <h2>Catalogo</h2>
          <p>
            {games.length} resultados visibles de {totalGames} juegos cargados
          </p>
        </div>
      </section>

      {loading ? <Loading /> : null}
      {!loading && error ? <ErrorMessage message={error} /> : null}
      {!loading && !error && games.length === 0 ? <NoResults /> : null}
      {!loading && !error && games.length > 0 ? <GameGrid games={games} /> : null}
    </div>
  );
}

export default HomePage;
