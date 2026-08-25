export interface DistrictMarketSummary {
  district: string;
  avgValue: number; // in NPR
  avgValueFormatted: string;
  avgPerAana: number; // in NPR
  avgPerAanaFormatted: string;
  totalListings: number;
  priceTrendPct: number; // percentage change
  description: string;
}

export const DISTRICT_MARKET_SUMMARIES: DistrictMarketSummary[] = [
  {
    district: 'Kathmandu',
    avgValue: 24200000,
    avgValueFormatted: 'NPR 2.42 Cr',
    avgPerAana: 5800000,
    avgPerAanaFormatted: 'NPR 58 Lakh',
    totalListings: 1284,
    priceTrendPct: 6.4,
    description: 'High demand in core city areas like Baneshwor, Baluwatar, and Lazimpat driving consistent valuation growth.'
  },
  {
    district: 'Lalitpur',
    avgValue: 21800000,
    avgValueFormatted: 'NPR 2.18 Cr',
    avgPerAana: 5200000,
    avgPerAanaFormatted: 'NPR 52 Lakh',
    totalListings: 940,
    priceTrendPct: 5.1,
    description: 'Jhamsikhel, Sanepa, and Pulchowk remain highly sought-after for expat housing and modern apartment projects.'
  },
  {
    district: 'Pokhara (Kaski)',
    avgValue: 17200000,
    avgValueFormatted: 'NPR 1.72 Cr',
    avgPerAana: 4200000,
    avgPerAanaFormatted: 'NPR 42 Lakh',
    totalListings: 510,
    priceTrendPct: 7.2,
    description: 'Rapid growth around Lakeside and highway connector roads following international airport operation.'
  },
  {
    district: 'Bhaktapur',
    avgValue: 14600000,
    avgValueFormatted: 'NPR 1.46 Cr',
    avgPerAana: 3600000,
    avgPerAanaFormatted: 'NPR 36 Lakh',
    totalListings: 620,
    priceTrendPct: 4.8,
    description: 'Steady residential expansion along Arniko highway corridor with affordable family housing options.'
  }
];

export const HISTORICAL_PRICE_TRENDS = [
  { month: 'Sep 2025', Kathmandu: 2.25, Lalitpur: 2.02, Pokhara: 1.58, Bhaktapur: 1.38 },
  { month: 'Nov 2025', Kathmandu: 2.28, Lalitpur: 2.05, Pokhara: 1.61, Bhaktapur: 1.40 },
  { month: 'Jan 2026', Kathmandu: 2.32, Lalitpur: 2.09, Pokhara: 1.64, Bhaktapur: 1.42 },
  { month: 'Mar 2026', Kathmandu: 2.35, Lalitpur: 2.12, Pokhara: 1.67, Bhaktapur: 1.43 },
  { month: 'May 2026', Kathmandu: 2.38, Lalitpur: 2.15, Pokhara: 1.69, Bhaktapur: 1.45 },
  { month: 'Jul 2026', Kathmandu: 2.42, Lalitpur: 2.18, Pokhara: 1.72, Bhaktapur: 1.46 },
];

export const PROPERTY_TYPE_DISTRIBUTION = [
  { name: 'Residential House', value: 48, color: '#A6CE39' },
  { name: 'Land Plots', value: 28, color: '#111111' },
  { name: 'Apartments', value: 14, color: '#333333' },
  { name: 'Commercial & Office', value: 10, color: '#666666' },
];
