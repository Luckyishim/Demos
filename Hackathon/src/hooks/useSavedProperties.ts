import { useState, useEffect, useCallback } from 'react';
import { storageService } from '../services/storageService';
import { propertyService } from '../services/propertyService';
import { Property } from '../data/mockProperties';

export function useSavedProperties() {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [savedProperties, setSavedProperties] = useState<Property[]>([]);

  const loadSaved = useCallback(() => {
    const ids = storageService.getSavedPropertyIds();
    setSavedIds(ids);
    const props = ids
      .map(id => propertyService.getPropertyById(id))
      .filter((p): p is Property => p !== undefined);
    setSavedProperties(props);
  }, []);

  useEffect(() => {
    loadSaved();
  }, [loadSaved]);

  const toggleFavorite = (id: string) => {
    storageService.toggleSavedProperty(id);
    loadSaved();
  };

  const isSaved = (id: string) => savedIds.includes(id);

  return {
    savedIds,
    savedProperties,
    toggleFavorite,
    isSaved,
    refresh: loadSaved,
  };
}
