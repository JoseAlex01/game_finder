import { afterEach, describe, expect, it, vi } from 'vitest';
import { freeToGameApi } from '../services/freeToGameApi.js';

describe('freeToGameApi', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('construye la URL de catalogo con filtros compatibles con FreeToGame', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([]),
    });
    vi.stubGlobal('fetch', fetchMock);

    await freeToGameApi.getGames({
      platform: 'browser',
      genre: 'strategy',
      sortBy: 'release-date',
    });

    const requestedUrl = new URL(fetchMock.mock.calls[0][0]);

    expect(requestedUrl.pathname).toBe('/api/games');
    expect(requestedUrl.searchParams.get('platform')).toBe('browser');
    expect(requestedUrl.searchParams.get('category')).toBe('strategy');
    expect(requestedUrl.searchParams.get('sort-by')).toBe('release-date');
  });

  it('lanza un error claro cuando la API responde con fallo', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      }),
    );

    await expect(freeToGameApi.getGames()).rejects.toThrow('FreeToGame respondio con estado 500');
  });
});
