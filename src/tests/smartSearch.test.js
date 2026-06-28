import { describe, expect, it } from 'vitest';
import { parseSmartSearch } from '../utils/smartSearch.js';

describe('parseSmartSearch', () => {
  it('convierte palabras clave de genero en filtros de API', () => {
    expect(parseSmartSearch('Quiero juegos de disparos')).toEqual({
      genre: 'shooter',
    });
  });

  it('combina genero y plataforma cuando la frase contiene ambas intenciones', () => {
    expect(parseSmartSearch('Busco MMORPG para navegador')).toEqual({
      genre: 'mmorpg',
      platform: 'browser',
    });
  });

  it('normaliza acentos y mayusculas', () => {
    expect(parseSmartSearch('QUIERO un juego de estrategia para Windows')).toEqual({
      genre: 'strategy',
      platform: 'pc',
    });
  });

  it('devuelve un objeto vacio si no encuentra coincidencias', () => {
    expect(parseSmartSearch('algo relajado para jugar')).toEqual({});
  });
});
