import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import SmartSearch from '../../components/SmartSearch/SmartSearch.jsx';
import { render, screen } from '../testUtils.jsx';

describe('SmartSearch', () => {
  it('envia la frase escrita al aplicar la busqueda', async () => {
    const user = userEvent.setup();
    const handleApply = vi.fn();

    render(<SmartSearch message="" onApply={handleApply} />);

    await user.type(
      screen.getByPlaceholderText('Quiero juegos de disparos para navegador'),
      'Busco MMORPG para navegador',
    );
    await user.click(screen.getByRole('button', { name: 'Aplicar' }));

    expect(handleApply).toHaveBeenCalledWith('Busco MMORPG para navegador');
  });

  it('muestra el mensaje recibido desde la logica de filtros', () => {
    render(<SmartSearch message="Filtros aplicados desde busqueda inteligente." onApply={vi.fn()} />);

    expect(screen.getByText('Filtros aplicados desde busqueda inteligente.')).toBeInTheDocument();
  });
});
