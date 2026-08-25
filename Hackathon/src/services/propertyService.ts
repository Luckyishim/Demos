import { MOCK_PROPERTIES, Property } from '../data/mockProperties';
import { ValuationInput } from './valuationService';
import { convertToAana } from '../utils/currency';

export interface PropertyFilterOptions {
  searchQuery?: string;
  district?: string;
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  minLandArea?: number; // Aana
  maxLandArea?: number; // Aana
  minBedrooms?: number;
  minBathrooms?: number;
  minRoadWidth?: number;
  maxBuildingAge?: number;
  condition?: string;
  sortBy?: 'price-asc' | 'price-desc' | 'area-desc' | 'newest';
}

export interface ComparableProperty extends Property {
  similarityPercentage: number;
  distanceKm: number;
}

export class PropertyService {
  private properties: Property[] = [...MOCK_PROPERTIES];

  /**
   * Retrieves all properties or filters them based on criteria
   */
  public getProperties(filters?: PropertyFilterOptions): Property[] {
    let result = [...this.properties];

    if (!filters) return result;

    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      result = result.filter(
        p => p.title.toLowerCase().includes(q) ||
             p.location.toLowerCase().includes(q) ||
             p.district.toLowerCase().includes(q) ||
             p.municipality.toLowerCase().includes(q)
      );
    }

    if (filters.district && filters.district !== 'All') {
      result = result.filter(p => p.district.toLowerCase() === filters.district!.toLowerCase());
    }

    if (filters.propertyType && filters.propertyType !== 'All') {
      result = result.filter(p => p.propertyType === filters.propertyType);
    }

    if (filters.minPrice !== undefined && filters.minPrice > 0) {
      result = result.filter(p => p.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined && filters.maxPrice > 0) {
      result = result.filter(p => p.price <= filters.maxPrice!);
    }

    if (filters.minLandArea !== undefined && filters.minLandArea > 0) {
      result = result.filter(p => p.landArea >= filters.minLandArea!);
    }

    if (filters.maxLandArea !== undefined && filters.maxLandArea > 0) {
      result = result.filter(p => p.landArea <= filters.maxLandArea!);
    }

    if (filters.minBedrooms !== undefined && filters.minBedrooms > 0) {
      result = result.filter(p => p.bedrooms >= filters.minBedrooms!);
    }

    if (filters.minRoadWidth !== undefined && filters.minRoadWidth > 0) {
      result = result.filter(p => p.roadWidth >= filters.minRoadWidth!);
    }

    if (filters.maxBuildingAge !== undefined && filters.maxBuildingAge > 0) {
      result = result.filter(p => p.buildingAge <= filters.maxBuildingAge!);
    }

    if (filters.condition && filters.condition !== 'All') {
      result = result.filter(p => p.condition === filters.condition);
    }

    // Sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price-asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'area-desc':
          result.sort((a, b) => b.landArea - a.landArea);
          break;
        case 'newest':
          result.sort((a, b) => new Date(b.listingDate).getTime() - new Date(a.listingDate).getTime());
          break;
      }
    }

    return result;
  }

  /**
   * Get single property by ID
   */
  public getPropertyById(id: string): Property | undefined {
    return this.properties.find(p => p.id === id);
  }

  /**
   * Find Comparable Properties based on Valuation Input or Target Property
   * Formula weights:
   * Location: 30%
   * Land Area: 25%
   * Built-up Area: 20%
   * Property Type: 10%
   * Building Age: 5%
   * Road Width: 5%
   * Condition: 5%
   */
  public getComparableProperties(target: ValuationInput | Property, limit = 4): ComparableProperty[] {
    const isValuationInput = 'landUnit' in target;
    const targetDistrict = target.district;
    const targetLocation = target.location;
    const targetType = target.propertyType;
    
    const targetLandAana = isValuationInput
      ? convertToAana(target.landArea, (target as ValuationInput).landUnit)
      : (target as Property).landArea;
      
    const targetBuiltUp = target.builtUpArea || 0;
    const targetAge = target.buildingAge || 0;
    const targetRoad = target.roadWidth || 12;
    const targetCondition = target.condition || 'Good';

    const scored = this.properties
      .filter(p => 'id' in target ? p.id !== target.id : true) // Exclude self if comparing against existing property
      .map(p => {
        // 1. Location similarity (30%)
        let locScore = 0;
        if (p.location.toLowerCase() === targetLocation.toLowerCase()) {
          locScore = 1.0;
        } else if (p.location.toLowerCase().includes(targetLocation.toLowerCase()) || targetLocation.toLowerCase().includes(p.location.toLowerCase())) {
          locScore = 0.85;
        } else if (p.district.toLowerCase() === targetDistrict.toLowerCase()) {
          locScore = 0.60;
        } else {
          locScore = 0.30;
        }

        // 2. Land Area similarity (25%)
        const landDiffRatio = Math.abs(p.landArea - targetLandAana) / Math.max(targetLandAana, 1);
        const landScore = Math.max(0, 1 - landDiffRatio);

        // 3. Built-up area similarity (20%)
        let builtUpScore = 1.0;
        if (targetType !== 'Land' && targetBuiltUp > 0) {
          const builtDiffRatio = Math.abs(p.builtUpArea - targetBuiltUp) / targetBuiltUp;
          builtUpScore = Math.max(0, 1 - builtDiffRatio);
        }

        // 4. Property type match (10%)
        const typeScore = p.propertyType === targetType ? 1.0 : 0.2;

        // 5. Building age match (5%)
        const ageDiff = Math.abs(p.buildingAge - targetAge);
        const ageScore = Math.max(0, 1 - ageDiff / 20);

        // 6. Road width match (5%)
        const roadDiff = Math.abs(p.roadWidth - targetRoad);
        const roadScore = Math.max(0, 1 - roadDiff / 20);

        // 7. Condition match (5%)
        const conditionScore = p.condition === targetCondition ? 1.0 : 0.6;

        // Weighted total
        const totalScore = (
          locScore * 0.30 +
          landScore * 0.25 +
          builtUpScore * 0.20 +
          typeScore * 0.10 +
          ageScore * 0.05 +
          roadScore * 0.05 +
          conditionScore * 0.05
        );

        const similarityPercentage = Math.min(99, Math.round(totalScore * 100));

        // Mock distance calculation based on location similarity
        const distanceKm = locScore === 1.0 ? 0.4 : locScore >= 0.85 ? 0.8 : locScore >= 0.6 ? 2.5 : 5.8;

        return {
          ...p,
          similarityPercentage,
          distanceKm
        } as ComparableProperty;
      });

    // Sort by similarity percentage descending
    scored.sort((a, b) => b.similarityPercentage - a.similarityPercentage);

    return scored.slice(0, limit);
  }
}

export const propertyService = new PropertyService();
