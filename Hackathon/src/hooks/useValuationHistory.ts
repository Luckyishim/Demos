import { useState, useEffect, useCallback } from 'react';
import { storageService } from '../services/storageService';
import { ValuationResult } from '../services/valuationService';

export function useValuationHistory() {
  const [history, setHistory] = useState<ValuationResult[]>([]);

  const loadHistory = useCallback(() => {
    const data = storageService.getValuationHistory();
    setHistory(data);
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const saveValuation = (result: ValuationResult) => {
    storageService.saveValuation(result);
    loadHistory();
  };

  const clearHistory = () => {
    storageService.clearValuationHistory();
    setHistory([]);
  };

  return {
    history,
    saveValuation,
    clearHistory,
    refresh: loadHistory
  };
}
