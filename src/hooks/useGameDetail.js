import { useEffect, useState } from 'react';
import { freeToGameApi } from '../services/freeToGameApi.js';

export function useGameDetail(gameId) {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadGame() {
      setLoading(true);
      setError('');

      try {
        const data = await freeToGameApi.getGameById(gameId);

        if (active) {
          setGame(data);
        }
      } catch (currentError) {
        if (active) {
          setError(currentError.message || 'No se pudo cargar el detalle.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadGame();

    return () => {
      active = false;
    };
  }, [gameId]);

  return { game, loading, error };
}
