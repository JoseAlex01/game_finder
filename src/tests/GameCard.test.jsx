import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import GameCard from '../components/GameCard/GameCard.jsx';

const game = {
  id: 12,
  title: 'Test Arena',
  thumbnail: 'https://example.com/test.jpg',
  genre: 'Shooter',
  platform: 'Windows',
  publisher: 'Example Studio',
  release_date: '2025-01-10',
};

describe('GameCard', () => {
  it('muestra la informacion clave del juego y enlaza al detalle', () => {
    render(
      <MemoryRouter>
        <GameCard game={game} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: 'Test Arena' })).toBeInTheDocument();
    expect(screen.getByText('Shooter')).toBeInTheDocument();
    expect(screen.getByText('Windows')).toBeInTheDocument();
    expect(screen.getByText('Example Studio')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ver detalle' })).toHaveAttribute('href', '/games/12');
  });
});
