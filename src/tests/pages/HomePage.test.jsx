import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import HomePage from '../../pages/HomePage/HomePage.jsx';
import { freeToGameApi } from '../../services/freeToGameApi.js';
import { gamesMock } from '../mocks/gamesMock.js';
import { renderWithRouter, screen, waitFor } from '../testUtils.jsx';

vi.mock('../../services/freeToGameApi.js', () => ({
  freeToGameApi: {
    getGames: vi.fn(),
    getGameById: vi.fn(),
  },
}));

describe('HomePage', () => {
  beforeEach(() => {
    freeToGameApi.getGames.mockReset();
  });

  it('muestra estado de carga mientras se obtiene el catalogo', () => {
    freeToGameApi.getGames.mockImplementation(() => new Promise(() => {}));

    renderWithRouter(<HomePage />);

    expect(screen.getByRole('status')).toHaveTextContent('Cargando juegos...');
  });

  it('muestra el catalogo cuando la API responde correctamente', async () => {
    freeToGameApi.getGames.mockResolvedValue(gamesMock);

    renderWithRouter(<HomePage />);

    expect(await screen.findByRole('heading', { name: 'Mock Shooter' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Mock Strategy' })).toBeInTheDocument();
    expect(screen.getByText('2 resultados visibles de 2 juegos cargados')).toBeInTheDocument();
  });

  it('filtra los juegos por nombre desde el buscador', async () => {
    const user = userEvent.setup();
    freeToGameApi.getGames.mockResolvedValue(gamesMock);

    renderWithRouter(<HomePage />);

    await screen.findByRole('heading', { name: 'Mock Shooter' });
    await user.type(screen.getByLabelText('Buscar por nombre'), 'strategy');

    expect(screen.queryByRole('heading', { name: 'Mock Shooter' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Mock Strategy' })).toBeInTheDocument();
    expect(screen.getByText('1 resultados visibles de 2 juegos cargados')).toBeInTheDocument();
  });

  it('solicita nuevos datos al cambiar plataforma y genero', async () => {
    const user = userEvent.setup();
    freeToGameApi.getGames.mockResolvedValue(gamesMock);

    renderWithRouter(<HomePage />);

    await screen.findByRole('heading', { name: 'Mock Shooter' });

    await user.selectOptions(screen.getByLabelText('Plataforma'), 'pc');

    await waitFor(() => {
      expect(freeToGameApi.getGames).toHaveBeenLastCalledWith(
        expect.objectContaining({ platform: 'pc', genre: 'all' }),
      );
    });

    await user.selectOptions(screen.getByLabelText('Genero'), 'shooter');

    await waitFor(() => {
      expect(freeToGameApi.getGames).toHaveBeenLastCalledWith(
        expect.objectContaining({ platform: 'pc', genre: 'shooter' }),
      );
    });
  });

  it('aplica filtros desde la busqueda inteligente', async () => {
    const user = userEvent.setup();
    freeToGameApi.getGames.mockResolvedValue(gamesMock);

    renderWithRouter(<HomePage />);

    await screen.findByRole('heading', { name: 'Mock Shooter' });
    await user.type(
      screen.getByPlaceholderText('Quiero juegos de disparos para navegador'),
      'Quiero juegos de disparos para navegador',
    );
    await user.click(screen.getByRole('button', { name: 'Aplicar' }));

    expect(screen.getByLabelText('Plataforma')).toHaveValue('browser');
    expect(screen.getByLabelText('Genero')).toHaveValue('shooter');

    await waitFor(() => {
      expect(freeToGameApi.getGames).toHaveBeenLastCalledWith(
        expect.objectContaining({ platform: 'browser', genre: 'shooter' }),
      );
    });
  });

  it('muestra error cuando falla la carga del catalogo', async () => {
    freeToGameApi.getGames.mockRejectedValue(new Error('API down'));

    renderWithRouter(<HomePage />);

    expect(await screen.findByRole('alert')).toHaveTextContent('API down');
  });

  it('muestra estado sin resultados cuando no hay juegos', async () => {
    freeToGameApi.getGames.mockResolvedValue([]);

    renderWithRouter(<HomePage />);

    expect(await screen.findByRole('heading', { name: 'Sin resultados' })).toBeInTheDocument();
  });
});
