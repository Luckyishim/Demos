/**
 * Currency and Nepali Land Unit Formatting Utilities
 */

/**
 * Formats a number into Nepalese currency string format.
 * Example: 24500000 -> "NPR 2,45,00,000" or short format "NPR 2.45 Cr"
 */
export function formatNPR(amount: number, shortFormat = false): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return 'NPR 0';
  }

  if (shortFormat) {
    if (amount >= 10000000) {
      // 1 Crore = 10,000,000 (100 Lakhs)
      const crores = amount / 10000000;
      return `NPR ${crores.toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      // 1 Lakh = 100,000
      const lakhs = amount / 100000;
      return `NPR ${lakhs.toFixed(2)} Lakh`;
    } else {
      return `NPR ${amount.toLocaleString('en-IN')}`;
    }
  }

  // South Asian / Nepalese numbering format (e.g., 2,45,00,000)
  const formatted = amount.toLocaleString('en-IN', {
    maximumFractionDigits: 0,
  });

  return `NPR ${formatted}`;
}

/**
 * Returns a dual format string, e.g. "NPR 2,45,00,000 (NPR 2.45 Cr)"
 */
export function formatNPRFull(amount: number): string {
  if (!amount) return 'NPR 0';
  if (amount >= 100000) {
    const short = formatNPR(amount, true);
    const full = formatNPR(amount, false);
    return `${full} (${short.replace('NPR ', '')})`;
  }
  return formatNPR(amount, false);
}

/**
 * Convert land units to Aana (standard calculation unit for hilly/valley regions in Nepal)
 * 1 Ropani = 16 Aana
 * 1 Aana = 342.25 sq.ft
 * 1 Sq.m = 10.7639 sq.ft
 */
export function convertToAana(area: number, unit: 'Aana' | 'Ropani' | 'Sq.ft' | 'Sq.m'): number {
  if (!area || area <= 0) return 0;
  switch (unit) {
    case 'Ropani':
      return area * 16;
    case 'Aana':
      return area;
    case 'Sq.ft':
      return area / 342.25;
    case 'Sq.m':
      return (area * 10.7639) / 342.25;
    default:
      return area;
  }
}

/**
 * Format land area into human readable Nepali notation
 */
export function formatLandArea(area: number, unit: 'Aana' | 'Ropani' | 'Sq.ft' | 'Sq.m'): string {
  if (unit === 'Aana') {
    if (area >= 16) {
      const ropani = Math.floor(area / 16);
      const remainingAana = (area % 16).toFixed(1);
      return `${ropani} Ropani ${parseFloat(remainingAana) > 0 ? `${remainingAana} Aana` : ''}`.trim();
    }
    return `${area} Aana`;
  }
  return `${area} ${unit}`;
}
