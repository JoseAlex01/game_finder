import { afterEach, describe, expect, it, vi } from 'vitest';
import { freeToGameApi } from '../../services/freeToGameApi.js';
import { gameDetailMock, gamesMock } from '../mocks/gamesMock.js';

describe('freeToGameApi', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('consulta el catalogo con plataforma, genero y ordenamiento', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(gamesMock),
    });
    vi.stubGlobal('fetch', fetchMock);

    const games = await freeToGameApi.getGames({
      platform: 'browser',
      genre: 'strategy',
      sortBy: 'alphabetical',
    });

    const requestedUrl = new URL(fetchMock.mock.calls[0][0]);

    expect(games).toEqual(gamesMock);
    expect(requestedUrl.pathname).toBe('/api/games');
    expect(requestedUrl.searchParams.get('platform')).toBe('browser');
    expect(requestedUrl.searchParams.get('category')).toBe('strategy');
    expect(requestedUrl.searchParams.get('sort-by')).toBe('alphabetical');
  });

  it('omite filtros con valor all para pedir el catalogo general', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(gamesMock),
    });
    vi.stubGlobal('fetch', fetchMock);

    await freeToGameApi.getGames({ platform: 'all', genre: 'all', sortBy: 'popularity' });

    const requestedUrl = new URL(fetchMock.mock.calls[0][0]);

    expect(requestedUrl.searchParams.get('platform')).toBeNull();
    expect(requestedUrl.searchParams.get('category')).toBeNull();
    expect(requestedUrl.searchParams.get('sort-by')).toBe('popularity');
  });

  it('consulta el detalle de un juego por id', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(gameDetailMock),
    });
    vi.stubGlobal('fetch', fetchMock);

    const game = await freeToGameApi.getGameById(1);
    const requestedUrl = new URL(fetchMock.mock.calls[0][0]);

    expect(game).toEqual(gameDetailMock);
    expect(requestedUrl.pathname).toBe('/api/game');
    expect(requestedUrl.searchParams.get('id')).toBe('1');
  });

  it('lanza error cuando la API responde con estado no exitoso', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      }),
    );

    await expect(freeToGameApi.getGames()).rejects.toThrow('FreeToGame respondio con estado 500');
  });

  it('valida que el id sea obligatorio para consultar detalle', async () => {
    await expect(freeToGameApi.getGameById()).rejects.toThrow('El id del juego es obligatorio');
  });
});
