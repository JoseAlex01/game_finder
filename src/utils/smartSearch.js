const GENRE_KEYWORDS = [
  { value: 'shooter', keywords: ['shooter', 'disparos', 'disparo', 'tiros', 'fps'] },
  { value: 'mmorpg', keywords: ['mmorpg', 'rol masivo'] },
  { value: 'moba', keywords: ['moba'] },
  { value: 'racing', keywords: ['racing', 'carreras', 'autos', 'coches'] },
  { value: 'sports', keywords: ['sports', 'deportes', 'futbol', 'basket'] },
  { value: 'fighting', keywords: ['fighting', 'lucha', 'peleas'] },
  { value: 'strategy', keywords: ['strategy', 'estrategia', 'tactica'] },
  { value: 'card', keywords: ['card', 'cartas'] },
  { value: 'battle-royale', keywords: ['battle royale', 'batalla real'] },
  { value: 'fantasy', keywords: ['fantasy', 'fantasia'] },
  { value: 'action-rpg', keywords: ['action rpg', 'rpg de accion'] },
  { value: 'mmo', keywords: ['mmo'] },
  { value: 'sandbox', keywords: ['sandbox'] },
  { value: 'open-world', keywords: ['open world', 'mundo abierto'] },
  { value: 'survival', keywords: ['survival', 'supervivencia'] },
  { value: 'anime', keywords: ['anime'] },
  { value: 'pixel', keywords: ['pixel', 'pixel art'] },
  { value: 'sci-fi', keywords: ['sci-fi', 'scifi', 'ciencia ficcion', 'futurista'] },
  { value: 'pvp', keywords: ['pvp', 'jugador contra jugador'] },
  { value: 'pve', keywords: ['pve', 'cooperativo', 'contra entorno'] },
];

const PLATFORM_KEYWORDS = [
  { value: 'pc', keywords: ['windows', 'pc', 'computadora', 'ordenador'] },
  { value: 'browser', keywords: ['browser', 'navegador', 'web'] },
];

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function findMatch(text, dictionary) {
  return dictionary.find((entry) =>
    entry.keywords.some((keyword) => text.includes(normalizeText(keyword))),
  );
}

export function parseSmartSearch(query) {
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery) {
    return {};
  }

  const genreMatch = findMatch(normalizedQuery, GENRE_KEYWORDS);
  const platformMatch = findMatch(normalizedQuery, PLATFORM_KEYWORDS);

  return {
    ...(genreMatch ? { genre: genreMatch.value } : {}),
    ...(platformMatch ? { platform: platformMatch.value } : {}),
  };
}

export function hasSmartSearchMatches(query) {
  return Object.keys(parseSmartSearch(query)).length > 0;
}
