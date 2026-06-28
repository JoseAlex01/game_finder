export const PLATFORM_OPTIONS = [
  { label: 'Todas', value: 'all' },
  { label: 'Windows', value: 'pc' },
  { label: 'Browser', value: 'browser' },
];

export const GENRE_OPTIONS = [
  { label: 'Todos', value: 'all' },
  { label: 'Shooter', value: 'shooter' },
  { label: 'MMORPG', value: 'mmorpg' },
  { label: 'MOBA', value: 'moba' },
  { label: 'Racing', value: 'racing' },
  { label: 'Sports', value: 'sports' },
  { label: 'Fighting', value: 'fighting' },
  { label: 'Strategy', value: 'strategy' },
  { label: 'Card', value: 'card' },
  { label: 'Battle Royale', value: 'battle-royale' },
  { label: 'Fantasy', value: 'fantasy' },
  { label: 'Action RPG', value: 'action-rpg' },
  { label: 'MMO', value: 'mmo' },
  { label: 'Sandbox', value: 'sandbox' },
  { label: 'Open World', value: 'open-world' },
  { label: 'Survival', value: 'survival' },
  { label: 'Anime', value: 'anime' },
  { label: 'Pixel', value: 'pixel' },
  { label: 'Sci-Fi', value: 'sci-fi' },
  { label: 'PvP', value: 'pvp' },
  { label: 'PvE', value: 'pve' },
];

export const SORT_OPTIONS = [
  { label: 'Popularidad', value: 'popularity' },
  { label: 'Fecha de lanzamiento', value: 'release-date' },
  { label: 'Orden alfabetico', value: 'alphabetical' },
];

export const DEFAULT_FILTERS = {
  search: '',
  platform: 'all',
  genre: 'all',
  sortBy: 'popularity',
};

export function getOptionLabel(options, value) {
  return options.find((option) => option.value === value)?.label ?? value;
}
