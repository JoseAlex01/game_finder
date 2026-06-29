import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import DetailPage from '../../pages/DetailPage/DetailPage.jsx';
import { useGameDetail } from '../../hooks/useGameDetail.js';
import { gameDetailMock } from '../mocks/gamesMock.js';
import { render, screen } from '../testUtils.jsx';

vi.mock('../../hooks/useGameDetail.js', () => ({
  useGameDetail: vi.fn(),
}));

function renderDetailPage() {
  return render(
    <MemoryRouter initialEntries={['/games/1']}>
      <Routes>
        <Route path="/games/:gameId" element={<DetailPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('DetailPage', () => {
  beforeEach(() => {
    useGameDetail.mockReset();
  });

  it('muestra estado de carga del detalle', () => {
    useGameDetail.mockReturnValue({ game: null, loading: true, error: '' });

    renderDetailPage();

    expect(screen.getByRole('status')).toHaveTextContent('Cargando detalle...');
  });

  it('muestra error si no se puede cargar el detalle', () => {
    useGameDetail.mockReturnValue({ game: null, loading: false, error: 'Detalle no disponible' });

    renderDetailPage();

    expect(screen.getByRole('alert')).toHaveTextContent('Detalle no disponible');
  });

  it('muestra el detalle del juego cargado', () => {
    useGameDetail.mockReturnValue({ game: gameDetailMock, loading: false, error: '' });

    renderDetailPage();

    expect(screen.getByRole('heading', { name: 'Mock Shooter' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Volver al catalogo' })).toHaveAttribute('href', '/');
  });
});
