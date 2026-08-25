import { VALUATION_CONFIG } from '../data/valuationConfig';
import { convertToAana } from '../utils/currency';

export interface ValuationInput {
  province: string;
  district: string;
  municipality: string;
  ward?: number;
  location: string;
  propertyType: 'House' | 'Land' | 'Apartment' | 'Commercial' | 'Office' | 'Shop';
  landArea: number;
  landUnit: 'Aana' | 'Ropani' | 'Sq.ft' | 'Sq.m';
  builtUpArea: number; // in sq.ft
  bedrooms?: number;
  bathrooms?: number;
  floors?: number;
  buildingAge: number;
  roadWidth: number; // in ft
  condition: 'New' | 'Excellent' | 'Good' | 'Average' | 'Needs Renovation';
}

export interface ValuationBreakdownItem {
  label: string;
  value: number;
  formattedValue: string;
  description: string;
  type: 'base' | 'addition' | 'subtraction' | 'neutral';
}

export interface ValuationResult {
  id: string;
  timestamp: string;
  input: ValuationInput;
  estimatedValue: number;
  estimatedRange: {
    min: number;
    max: number;
  };
  breakdown: {
    landValue: number;
    buildingValue: number;
    ageAdjustment: number;
    conditionAdjustment: number;
    roadAdjustment: number;
    locationAdjustment: number;
    total: number;
  };
  breakdownItems: ValuationBreakdownItem[];
  appliedFactors: {
    landRatePerAana: number;
    buildingRatePerSqFt: number;
    ageFactor: number;
    conditionFactor: number;
    roadFactor: number;
    typeMultiplier: number;
  };
  explanations: {
    title: string;
    rating: string;
    details: string;
  }[];
}

export class ValuationService {
  /**
   * Calculates estimated market value deterministically based on parameters
   */
  public calculateValuation(input: ValuationInput): ValuationResult {
    // 1. Convert land area to Aana
    const areaInAana = convertToAana(input.landArea, input.landUnit);

    // 2. Determine location rate per Aana
    const districtConfig = VALUATION_CONFIG.locationRates[input.district];
    let landRatePerAana = districtConfig?.defaultRatePerAana || VALUATION_CONFIG.defaultLandRatePerAana;

    // Check specific area match inside district
    if (districtConfig?.areaRates) {
      for (const [areaKeyword, rate] of Object.entries(districtConfig.areaRates)) {
        if (input.location.toLowerCase().includes(areaKeyword.toLowerCase())) {
          landRatePerAana = rate;
          break;
        }
      }
    }

    // Base Land Value
    const baseLandValue = areaInAana * landRatePerAana;

    // 3. Building Base Construction Value
    const isLandOnly = input.propertyType === 'Land';
    const effectiveBuiltUpArea = isLandOnly ? 0 : input.builtUpArea;
    const baseBuildingRate = VALUATION_CONFIG.buildingBaseRatePerSqFt;
    const typeMultiplier = VALUATION_CONFIG.propertyTypeMultipliers[input.propertyType] || 1.0;
    
    const unadjustedBuildingValue = effectiveBuiltUpArea * baseBuildingRate * typeMultiplier;

    // 4. Age Adjustment Factor
    let ageFactor = 1.0;
    if (!isLandOnly) {
      const ageRule = VALUATION_CONFIG.ageAdjustments.find(a => input.buildingAge <= a.maxAge);
      ageFactor = ageRule ? ageRule.factor : 0.55;
    }

    // 5. Condition Adjustment Factor
    const conditionFactor = isLandOnly ? 1.0 : (VALUATION_CONFIG.conditionAdjustments[input.condition] || 1.0);

    // 6. Road Width Factor
    const roadRule = VALUATION_CONFIG.roadWidthAdjustments.find(
      r => input.roadWidth >= r.minWidth && input.roadWidth <= r.maxWidth
    );
    const roadFactor = roadRule ? roadRule.factor : 1.0;

    // Calculate component adjustments
    const ageAdjustedBuildingValue = unadjustedBuildingValue * ageFactor;
    const conditionAdjustedBuildingValue = ageAdjustedBuildingValue * conditionFactor;
    const buildingValue = Math.round(conditionAdjustedBuildingValue);

    // Road adjustment applied to land value
    const roadAdjustedLandValue = Math.round(baseLandValue * roadFactor);
    const landValue = roadAdjustedLandValue;

    // Location adjustment differential
    const locationDiff = landRatePerAana > (districtConfig?.defaultRatePerAana || 4000000)
      ? (landRatePerAana - (districtConfig?.defaultRatePerAana || 4000000)) * areaInAana
      : 0;

    // Final total calculation
    const totalEstimatedValue = Math.round(landValue + buildingValue);

    // Range (±5%)
    const minRange = Math.round(totalEstimatedValue * (1 - VALUATION_CONFIG.rangeVariationFactor));
    const maxRange = Math.round(totalEstimatedValue * (1 + VALUATION_CONFIG.rangeVariationFactor));

    // Calculate individual dollar amounts for breakdown UI
    const ageDiff = Math.round(unadjustedBuildingValue - ageAdjustedBuildingValue);
    const conditionDiff = Math.round(ageAdjustedBuildingValue - conditionAdjustedBuildingValue);
    const roadDiff = Math.round(roadAdjustedLandValue - baseLandValue);

    const breakdownItems: ValuationBreakdownItem[] = [
      {
        label: 'Base Land Value',
        value: Math.round(baseLandValue),
        formattedValue: `NPR ${Math.round(baseLandValue).toLocaleString('en-IN')}`,
        description: `${areaInAana.toFixed(2)} Aana @ NPR ${(landRatePerAana / 100000).toFixed(1)} Lakh/Aana`,
        type: 'base'
      },
      ...(!isLandOnly ? [{
        label: 'Building Construction Value',
        value: Math.round(unadjustedBuildingValue),
        formattedValue: `NPR ${Math.round(unadjustedBuildingValue).toLocaleString('en-IN')}`,
        description: `${effectiveBuiltUpArea} sq.ft @ NPR ${baseBuildingRate}/sq.ft (${input.propertyType})`,
        type: 'base' as const
      }] : []),
      {
        label: 'Road Width Adjustment',
        value: roadDiff,
        formattedValue: `${roadDiff >= 0 ? '+' : ''}NPR ${Math.abs(roadDiff).toLocaleString('en-IN')}`,
        description: `${input.roadWidth} ft road (${roadFactor >= 1 ? '+' : ''}${Math.round((roadFactor - 1) * 100)}%)`,
        type: roadDiff >= 0 ? 'addition' : 'subtraction'
      },
      ...(!isLandOnly ? [
        {
          label: 'Building Age Depreciation',
          value: -ageDiff,
          formattedValue: `-NPR ${ageDiff.toLocaleString('en-IN')}`,
          description: `${input.buildingAge} years old (${Math.round((1 - ageFactor) * 100)}% depreciation)`,
          type: 'subtraction' as const
        },
        {
          label: 'Condition Adjustment',
          value: -conditionDiff,
          formattedValue: `${conditionDiff <= 0 ? '+' : '-'}NPR ${Math.abs(conditionDiff).toLocaleString('en-IN')}`,
          description: `Property in ${input.condition} condition`,
          type: conditionDiff <= 0 ? 'addition' as const : 'subtraction' as const
        }
      ] : [])
    ];

    // Qualitative explanations for Result Page Cards
    const explanations = [
      {
        title: 'Location & Area',
        rating: landRatePerAana >= 5000000 ? 'Prime' : 'Favorable',
        details: `Located in ${input.location}, ${input.district} with estimated baseline rate of NPR ${(landRatePerAana / 100000).toFixed(1)} Lakh/Aana.`
      },
      {
        title: 'Property Size',
        rating: areaInAana >= 4 ? 'Above Average' : 'Standard',
        details: `${areaInAana.toFixed(2)} Aana land with ${effectiveBuiltUpArea} sq.ft built-up space provides optimal local market utility.`
      },
      {
        title: 'Road Access',
        rating: input.roadWidth >= 16 ? 'Excellent' : input.roadWidth >= 12 ? 'Good' : 'Moderate',
        details: `${input.roadWidth} ft access road provides ${input.roadWidth >= 16 ? 'strong commercial/residential liquidity' : 'adequate vehicular access'}.`
      },
      {
        title: 'Building State',
        rating: input.condition,
        details: isLandOnly ? 'Vacant land parcel ready for construction.' : `${input.buildingAge} years old structure in ${input.condition} condition.`
      }
    ];

    return {
      id: `val-${Date.now()}`,
      timestamp: new Date().toISOString(),
      input,
      estimatedValue: totalEstimatedValue,
      estimatedRange: {
        min: minRange,
        max: maxRange,
      },
      breakdown: {
        landValue: Math.round(landValue),
        buildingValue,
        ageAdjustment: ageDiff,
        conditionAdjustment: conditionDiff,
        roadAdjustment: roadDiff,
        locationAdjustment: Math.round(locationDiff),
        total: totalEstimatedValue
      },
      breakdownItems,
      appliedFactors: {
        landRatePerAana,
        buildingRatePerSqFt: baseBuildingRate,
        ageFactor,
        conditionFactor,
        roadFactor,
        typeMultiplier
      },
      explanations
    };
  }
}

export const valuationService = new ValuationService();
