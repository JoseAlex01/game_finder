import { describe, expect, it } from 'vitest';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx';
import Loading from '../../components/Loading/Loading.jsx';
import NoResults from '../../components/NoResults/NoResults.jsx';
import { render, screen } from '../testUtils.jsx';

describe('Feedback states', () => {
  it('muestra el estado de carga', () => {
    render(<Loading />);

    expect(screen.getByRole('status')).toHaveTextContent('Cargando juegos...');
  });

  it('muestra un mensaje de error de conexion', () => {
    render(<ErrorMessage message="No se pudieron cargar los juegos." />);

    expect(screen.getByRole('alert')).toHaveTextContent('Error de conexion');
    expect(screen.getByText('No se pudieron cargar los juegos.')).toBeInTheDocument();
  });

  it('muestra el estado sin resultados', () => {
    render(<NoResults />);

    expect(screen.getByRole('heading', { name: 'Sin resultados' })).toBeInTheDocument();
    expect(screen.getByText('Prueba con otro nombre, genero o plataforma.')).toBeInTheDocument();
  });
});
