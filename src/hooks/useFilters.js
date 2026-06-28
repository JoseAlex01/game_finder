import { useMemo, useState } from 'react';
import { DEFAULT_FILTERS } from '../utils/filterOptions.js';
import { parseSmartSearch } from '../utils/smartSearch.js';

export function useFilters(initialFilters = DEFAULT_FILTERS) {
  const [filters, setFilters] = useState(initialFilters);
  const [smartMessage, setSmartMessage] = useState('');

  function updateFilter(name, value) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [name]: value,
    }));
  }

  function resetFilters() {
    setFilters(DEFAULT_FILTERS);
    setSmartMessage('');
  }

  function applySmartSearch(query) {
    const parsedFilters = parseSmartSearch(query);

    if (Object.keys(parsedFilters).length === 0) {
      setSmartMessage('No se encontraron filtros automaticos para esa frase.');
      return;
    }

    setFilters((currentFilters) => ({
      ...currentFilters,
      ...parsedFilters,
    }));
    setSmartMessage('Filtros aplicados desde busqueda inteligente.');
  }

  const activeFilterCount = useMemo(
    () =>
      Object.entries(filters).filter(([key, value]) => {
        if (key === 'search') {
          return Boolean(value.trim());
        }

        return value !== DEFAULT_FILTERS[key];
      }).length,
    [filters],
  );

  return {
    filters,
    smartMessage,
    activeFilterCount,
    updateFilter,
    resetFilters,
    applySmartSearch,
  };
}
