import { ValuationResult } from './valuationService';

const SAVED_PROPERTIES_KEY = 'meroghar_saved_properties';
const VALUATION_HISTORY_KEY = 'meroghar_valuation_history';

export class StorageService {
  /**
   * Get list of saved property IDs
   */
  public getSavedPropertyIds(): string[] {
    try {
      const stored = localStorage.getItem(SAVED_PROPERTIES_KEY);
      return stored ? JSON.parse(stored) : ['prop-1', 'prop-4']; // default mock saved items for demo richness
    } catch {
      return ['prop-1', 'prop-4'];
    }
  }

  /**
   * Save or remove a property ID from favorites
   */
  public toggleSavedProperty(id: string): boolean {
    const current = this.getSavedPropertyIds();
    let updated: string[];
    let isSaved = false;

    if (current.includes(id)) {
      updated = current.filter(item => item !== id);
      isSaved = false;
    } else {
      updated = [...current, id];
      isSaved = true;
    }

    try {
      localStorage.setItem(SAVED_PROPERTIES_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }

    return isSaved;
  }

  /**
   * Check if a property is saved
   */
  public isPropertySaved(id: string): boolean {
    return this.getSavedPropertyIds().includes(id);
  }

  /**
   * Get all valuation history entries
   */
  public getValuationHistory(): ValuationResult[] {
    try {
      const stored = localStorage.getItem(VALUATION_HISTORY_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to read valuation history', e);
    }
    
    // Default initial mock history so page isn't blank on first load
    return [
      {
        id: 'val-sample-1',
        timestamp: '2026-08-25T10:30:00.000Z',
        input: {
          province: 'Bagmati Province',
          district: 'Kathmandu',
          municipality: 'Kathmandu Metropolitan City',
          ward: 10,
          location: 'Baneshwor, Kathmandu',
          propertyType: 'House',
          landArea: 4,
          landUnit: 'Aana',
          builtUpArea: 2400,
          bedrooms: 4,
          bathrooms: 3,
          floors: 2.5,
          buildingAge: 6,
          roadWidth: 20,
          condition: 'Good'
        },
        estimatedValue: 24800000,
        estimatedRange: { min: 23500000, max: 26000000 },
        breakdown: {
          landValue: 22000000,
          buildingValue: 8500000,
          ageAdjustment: 700000,
          conditionAdjustment: 400000,
          roadAdjustment: 600000,
          locationAdjustment: 600000,
          total: 24800000
        },
        breakdownItems: [],
        appliedFactors: {
          landRatePerAana: 5500000,
          buildingRatePerSqFt: 4000,
          ageFactor: 0.92,
          conditionFactor: 0.93,
          roadFactor: 1.05,
          typeMultiplier: 1.0
        },
        explanations: []
      },
      {
        id: 'val-sample-2',
        timestamp: '2026-05-20T14:15:00.000Z',
        input: {
          province: 'Bagmati Province',
          district: 'Kathmandu',
          municipality: 'Kathmandu Metropolitan City',
          ward: 10,
          location: 'Baneshwor, Kathmandu',
          propertyType: 'House',
          landArea: 4,
          landUnit: 'Aana',
          builtUpArea: 2400,
          bedrooms: 4,
          bathrooms: 3,
          floors: 2.5,
          buildingAge: 6,
          roadWidth: 20,
          condition: 'Good'
        },
        estimatedValue: 23400000,
        estimatedRange: { min: 22200000, max: 24500000 },
        breakdown: {
          landValue: 21000000,
          buildingValue: 8000000,
          ageAdjustment: 600000,
          conditionAdjustment: 300000,
          roadAdjustment: 500000,
          locationAdjustment: 500000,
          total: 23400000
        },
        breakdownItems: [],
        appliedFactors: {
          landRatePerAana: 5200000,
          buildingRatePerSqFt: 3900,
          ageFactor: 0.92,
          conditionFactor: 0.93,
          roadFactor: 1.05,
          typeMultiplier: 1.0
        },
        explanations: []
      }
    ];
  }

  /**
   * Save a new valuation result to history
   */
  public saveValuation(result: ValuationResult): void {
    const current = this.getValuationHistory();
    // Prepend new result
    const updated = [result, ...current.filter(item => item.id !== result.id)];
    try {
      localStorage.setItem(VALUATION_HISTORY_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save valuation history', e);
    }
  }

  /**
   * Clear valuation history
   */
  public clearValuationHistory(): void {
    try {
      localStorage.removeItem(VALUATION_HISTORY_KEY);
    } catch (e) {
      console.error('Failed to clear valuation history', e);
    }
  }
}

export const storageService = new StorageService();
