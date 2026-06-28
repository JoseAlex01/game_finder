import { useEffect, useMemo, useState } from 'react';
import { freeToGameApi } from '../services/freeToGameApi.js';

export function useGames(filters) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadGames() {
      setLoading(true);
      setError('');

      try {
        const data = await freeToGameApi.getGames({
          platform: filters.platform,
          genre: filters.genre,
          sortBy: filters.sortBy,
          signal: controller.signal,
        });

        if (!controller.signal.aborted) {
          setGames(Array.isArray(data) ? data : []);
        }
      } catch (currentError) {
        if (!controller.signal.aborted) {
          setGames([]);
          setError(currentError.message || 'No se pudieron cargar los juegos.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadGames();

    return () => controller.abort();
  }, [filters.platform, filters.genre, filters.sortBy]);

  const filteredGames = useMemo(() => {
    const searchTerm = filters.search.trim().toLowerCase();

    if (!searchTerm) {
      return games;
    }

    return games.filter((game) => game.title.toLowerCase().includes(searchTerm));
  }, [games, filters.search]);

  return {
    games: filteredGames,
    totalGames: games.length,
    loading,
    error,
  };
}
