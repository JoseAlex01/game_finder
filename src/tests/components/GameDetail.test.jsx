import { describe, expect, it } from 'vitest';
import GameDetail from '../../components/GameDetail/GameDetail.jsx';
import { gameDetailMock } from '../mocks/gamesMock.js';
import { render, screen } from '../testUtils.jsx';

describe('GameDetail', () => {
  it('muestra informacion completa del juego', () => {
    render(<GameDetail game={gameDetailMock} />);

    expect(screen.getByRole('heading', { name: 'Mock Shooter' })).toBeInTheDocument();
    expect(screen.getByText('Detailed mocked game description.')).toBeInTheDocument();
    expect(screen.getByText('Mock Studio')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ir al sitio oficial' })).toHaveAttribute(
      'href',
      'https://example.com/mock-shooter',
    );
  });

  it('renderiza capturas de pantalla cuando existen', () => {
    render(<GameDetail game={gameDetailMock} />);

    expect(screen.getByRole('heading', { name: 'Capturas de pantalla' })).toBeInTheDocument();
    expect(screen.getByAltText('Captura 11 de Mock Shooter')).toHaveAttribute(
      'src',
      'https://example.com/mock-screenshot-1.jpg',
    );
  });
});
