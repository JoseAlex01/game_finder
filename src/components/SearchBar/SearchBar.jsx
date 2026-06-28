import styles from './SearchBar.module.css';

function SearchBar({ value, onChange }) {
  return (
    <label className={styles.search}>
      <span>Buscar por nombre</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Warframe, RuneScape, Fortnite..."
      />
    </label>
  );
}

export default SearchBar;
