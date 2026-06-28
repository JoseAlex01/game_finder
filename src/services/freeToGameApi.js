const API_BASE_URL = 'https://www.freetogame.com/api';

const SORT_FALLBACK = 'popularity';

function buildUrl(path, params = {}) {
  const url = new URL(`${API_BASE_URL}${path}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value && value !== 'all') {
      url.searchParams.set(key, value);
    }
  });

  return url.toString();
}

async function request(path, params, options = {}) {
  const response = await fetch(buildUrl(path, params), options);

  if (!response.ok) {
    throw new Error(`FreeToGame respondio con estado ${response.status}`);
  }

  return response.json();
}

export async function getGames({
  platform = 'all',
  genre = 'all',
  sortBy = SORT_FALLBACK,
  signal,
} = {}) {
  return request(
    '/games',
    {
      platform,
      category: genre,
      'sort-by': sortBy || SORT_FALLBACK,
    },
    { signal },
  );
}

export async function getGameById(gameId) {
  if (!gameId) {
    throw new Error('El id del juego es obligatorio');
  }

  return request('/game', { id: gameId });
}

export const freeToGameApi = {
  getGames,
  getGameById,
};
