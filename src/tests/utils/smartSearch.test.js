import { describe, expect, it } from 'vitest';
import { hasSmartSearchMatches, parseSmartSearch } from '../../utils/smartSearch.js';

describe('parseSmartSearch', () => {
  it('interpreta palabras clave de genero', () => {
    expect(parseSmartSearch('Quiero juegos de disparos')).toEqual({ genre: 'shooter' });
    expect(parseSmartSearch('Quiero un juego de estrategia')).toEqual({ genre: 'strategy' });
    expect(parseSmartSearch('Busco carreras')).toEqual({ genre: 'racing' });
  });

  it('interpreta palabras clave de plataforma', () => {
    expect(parseSmartSearch('juegos para navegador')).toEqual({ platform: 'browser' });
    expect(parseSmartSearch('algo para windows')).toEqual({ platform: 'pc' });
  });

  it('combina genero y plataforma en una sola frase', () => {
    expect(parseSmartSearch('Busco MMORPG para navegador')).toEqual({
      genre: 'mmorpg',
      platform: 'browser',
    });
  });

  it('normaliza acentos, espacios y mayusculas', () => {
    expect(parseSmartSearch('  QUIERO ciencia ficción para WINDOWS  ')).toEqual({
      genre: 'sci-fi',
      platform: 'pc',
    });
  });

  it('permite saber si una frase tiene coincidencias inteligentes', () => {
    expect(hasSmartSearchMatches('estrategia')).toBe(true);
    expect(hasSmartSearchMatches('algo tranquilo')).toBe(false);
  });
});
