import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import GameFilters from '../../components/GameFilters/GameFilters.jsx';
import { DEFAULT_FILTERS } from '../../utils/filterOptions.js';
import { render, screen } from '../testUtils.jsx';

describe('GameFilters', () => {
  it('muestra los filtros actuales', () => {
    render(
      <GameFilters
        filters={{ ...DEFAULT_FILTERS, platform: 'browser', genre: 'strategy' }}
        activeFilterCount={2}
        onChange={vi.fn()}
        onReset={vi.fn()}
      />,
    );

    expect(screen.getByLabelText('Plataforma')).toHaveValue('browser');
    expect(screen.getByLabelText('Genero')).toHaveValue('strategy');
    expect(screen.getByLabelText('Ordenar por')).toHaveValue('popularity');
  });

  it('emite cambios de plataforma, genero y orden', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <GameFilters
        filters={DEFAULT_FILTERS}
        activeFilterCount={0}
        onChange={handleChange}
        onReset={vi.fn()}
      />,
    );

    await user.selectOptions(screen.getByLabelText('Plataforma'), 'pc');
    await user.selectOptions(screen.getByLabelText('Genero'), 'shooter');
    await user.selectOptions(screen.getByLabelText('Ordenar por'), 'alphabetical');

    expect(handleChange).toHaveBeenCalledWith('platform', 'pc');
    expect(handleChange).toHaveBeenCalledWith('genre', 'shooter');
    expect(handleChange).toHaveBeenCalledWith('sortBy', 'alphabetical');
  });

  it('permite limpiar los filtros', async () => {
    const user = userEvent.setup();
    const handleReset = vi.fn();

    render(
      <GameFilters
        filters={{ ...DEFAULT_FILTERS, platform: 'pc' }}
        activeFilterCount={1}
        onChange={vi.fn()}
        onReset={handleReset}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Limpiar filtros (1)' }));

    expect(handleReset).toHaveBeenCalledTimes(1);
  });
});
