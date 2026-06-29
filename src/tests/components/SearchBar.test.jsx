import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import { render, screen } from '../testUtils.jsx';

describe('SearchBar', () => {
  it('renderiza el valor recibido', () => {
    render(<SearchBar value="warframe" onChange={vi.fn()} />);

    expect(screen.getByLabelText('Buscar por nombre')).toHaveValue('warframe');
  });

  it('notifica cada cambio de texto al componente padre', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<SearchBar value="" onChange={handleChange} />);

    await user.type(screen.getByLabelText('Buscar por nombre'), 'doom');

    expect(handleChange).toHaveBeenCalledTimes(4);
    expect(handleChange).toHaveBeenLastCalledWith('m');
  });
});
