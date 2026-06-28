import { GENRE_OPTIONS, PLATFORM_OPTIONS, SORT_OPTIONS } from '../../utils/filterOptions.js';
import styles from './GameFilters.module.css';

function GameFilters({ filters, activeFilterCount, onChange, onReset }) {
  return (
    <section className={styles.filters} aria-label="Filtros de juegos">
      <div className={styles.filterGrid}>
        <label>
          <span>Plataforma</span>
          <select value={filters.platform} onChange={(event) => onChange('platform', event.target.value)}>
            {PLATFORM_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Genero</span>
          <select value={filters.genre} onChange={(event) => onChange('genre', event.target.value)}>
            {GENRE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Ordenar por</span>
          <select value={filters.sortBy} onChange={(event) => onChange('sortBy', event.target.value)}>
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button type="button" className={styles.resetButton} onClick={onReset}>
        Limpiar filtros ({activeFilterCount})
      </button>
    </section>
  );
}

export default GameFilters;
