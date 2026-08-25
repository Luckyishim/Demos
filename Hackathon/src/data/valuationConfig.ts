export interface LocationRateConfig {
  defaultRatePerAana: number;
  areaRates: Record<string, number>;
}

export const VALUATION_CONFIG = {
  // Demo base rates per district (in NPR / Aana)
  locationRates: {
    Kathmandu: {
      defaultRatePerAana: 4800000,
      areaRates: {
        Baneshwor: 5500000,
        Baluwatar: 6200000,
        Lazimpat: 6000000,
        Naxal: 6500000,
        Maharajgunj: 5800000,
        Kalanki: 4200000,
        Koteshwor: 4500000,
        Chabahil: 4600000,
        Hattigauda: 4000000,
      }
    },
    Lalitpur: {
      defaultRatePerAana: 4800000,
      areaRates: {
        Sanepa: 6000000,
        Jhamsikhel: 6200000,
        Pulchowk: 5800000,
        Jawalakhel: 5500000,
        Kupondole: 5200000,
        Khumaltar: 4500000,
        Imadol: 3800000,
      }
    },
    Bhaktapur: {
      defaultRatePerAana: 3500000,
      areaRates: {
        Gatthaghar: 4000000,
        Lokanthali: 4200000,
        Sallaghari: 3800000,
        Sanothimi: 3600000,
      }
    },
    Kaski: {
      defaultRatePerAana: 4000000,
      areaRates: {
        Lakeside: 6500000,
        Chipledhunga: 5500000,
        'New Road Pokhara': 5000000,
        Birauta: 3800000,
      }
    }
  } as Record<string, LocationRateConfig>,

  // Default fallback rate if location not found
  defaultLandRatePerAana: 4000000,

  // Building Construction Base Rate (NPR / sq.ft)
  buildingBaseRatePerSqFt: 4000,

  // Property Type Adjustments
  propertyTypeMultipliers: {
    House: 1.0,
    Land: 1.0,
    Apartment: 1.15,
    Commercial: 1.30,
    Office: 1.20,
    Shop: 1.25,
  } as Record<string, number>,

  // Age Adjustments
  ageAdjustments: [
    { maxAge: 3, factor: 1.00, label: '0–3 years (100%)' },
    { maxAge: 7, factor: 0.92, label: '4–7 years (92%)' },
    { maxAge: 12, factor: 0.82, label: '8–12 years (82%)' },
    { maxAge: 20, factor: 0.70, label: '13–20 years (70%)' },
    { maxAge: Infinity, factor: 0.55, label: '20+ years (55%)' },
  ],

  // Condition Adjustments
  conditionAdjustments: {
    New: 1.00,
    Excellent: 0.97,
    Good: 0.93,
    Average: 0.85,
    'Needs Renovation': 0.70,
  } as Record<string, number>,

  // Road Width Adjustments
  roadWidthAdjustments: [
    { minWidth: 0, maxWidth: 7.9, factor: 0.90, label: 'Less than 8 ft (-10%)' },
    { minWidth: 8, maxWidth: 12.9, factor: 0.95, label: '8–12 ft (-5%)' },
    { minWidth: 13, maxWidth: 16.9, factor: 1.00, label: '13–16 ft (Base)' },
    { minWidth: 17, maxWidth: 20.9, factor: 1.05, label: '17–20 ft (+5%)' },
    { minWidth: 21, maxWidth: Infinity, factor: 1.08, label: '20+ ft (+8%)' },
  ],

  // Range percentage (±5%)
  rangeVariationFactor: 0.05,
};
