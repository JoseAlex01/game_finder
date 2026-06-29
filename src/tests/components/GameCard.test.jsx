import { describe, expect, it } from 'vitest';
import GameCard from '../../components/GameCard/GameCard.jsx';
import { gamesMock } from '../mocks/gamesMock.js';
import { renderWithRouter, screen } from '../testUtils.jsx';

describe('GameCard', () => {
  it('muestra la informacion principal del juego', () => {
    renderWithRouter(<GameCard game={gamesMock[0]} />);

    expect(screen.getByRole('heading', { name: 'Mock Shooter' })).toBeInTheDocument();
    expect(screen.getByText('Shooter')).toBeInTheDocument();
    expect(screen.getByText('Windows')).toBeInTheDocument();
    expect(screen.getByText('Mock Publisher')).toBeInTheDocument();
    expect(screen.getByText('2026-01-15')).toBeInTheDocument();
  });

  it('enlaza correctamente con la pagina de detalle', () => {
    renderWithRouter(<GameCard game={gamesMock[0]} />);

    expect(screen.getByRole('link', { name: 'Ver detalle' })).toHaveAttribute('href', '/games/1');
  });
});
