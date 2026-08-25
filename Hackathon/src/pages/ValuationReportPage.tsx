import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { valuationService, ValuationResult } from '../services/valuationService';
import { propertyService, ComparableProperty } from '../services/propertyService';
import { formatNPR, formatNPRFull, formatLandArea } from '../utils/currency';
import { Logo } from '../components/common/Logo';
import { Printer, Download, Share2, Bookmark, CheckCircle2, ShieldCheck, MapPin, Building, Calendar, ArrowLeft } from 'lucide-react';

export const ValuationReportPage: React.FC = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<ValuationResult | null>(null);
  const [comparables, setComparables] = useState<ComparableProperty[]>([]);

  useEffect(() => {
    const stored = sessionStorage.getItem('meroghar_active_result');
    let res: ValuationResult;
    if (stored) {
      res = JSON.parse(stored);
    } else {
      res = valuationService.calculateValuation({
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
        condition: 'Good',
      });
    }

    setResult(res);
    setComparables(propertyService.getComparableProperties(res.input, 3));
  }, []);

  if (!result) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Action Bar (hidden when printing) */}
      <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
        <button
          onClick={() => navigate(-1)}
          className="text-xs font-bold text-secgray hover:text-charcoal flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Valuation
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="bg-charcoal hover:bg-black text-white font-bold text-xs px-5 py-2.5 rounded-xl flex items-center gap-2 shadow transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* PRINTABLE FORMAL REPORT CONTAINER */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-300 shadow-floating space-y-10 print:shadow-none print:border-none print:p-0">
        
        {/* Report Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-8 border-b-2 border-charcoal gap-4">
          <Logo variant="full" size="lg" />
          
          <div className="text-right">
            <h2 className="text-lg font-black tracking-wider text-charcoal uppercase">PROPERTY VALUATION REPORT</h2>
            <p className="text-xs font-bold text-secgray mt-1">Ref ID: #{result.id.toUpperCase()}</p>
            <p className="text-xs text-secgray">Issued: {new Date(result.timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>

        {/* Executive Summary Card */}
        <div className="bg-palelime/60 p-6 rounded-2xl border border-lime-300 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-lime-900 block mb-1">Valued Property</span>
            <h3 className="text-2xl font-black text-charcoal">{result.input.location}</h3>
            <p className="text-xs text-secgray mt-0.5">{result.input.municipality}, {result.input.district}, Ward No. {result.input.ward}</p>
          </div>

          <div className="md:text-right bg-white p-4 rounded-xl border border-lime-300">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-secgray block">Estimated Market Value</span>
            <div className="text-2xl font-black text-charcoal">{formatNPR(result.estimatedValue, false)}</div>
            <div className="text-xs font-bold text-lime-800 mt-0.5">Range: {formatNPR(result.estimatedRange.min, true)} – {formatNPR(result.estimatedRange.max, true)}</div>
          </div>
        </div>

        {/* Section 1: Property Specifications Summary */}
        <div className="space-y-3">
          <h4 className="text-sm font-black text-charcoal uppercase tracking-wider border-b border-gray-200 pb-2">
            1. Property Characteristics & Measurements
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-lightgray p-4 rounded-xl text-xs">
            <div>
              <span className="text-secgray block">Property Type</span>
              <span className="font-extrabold text-charcoal">{result.input.propertyType}</span>
            </div>
            <div>
              <span className="text-secgray block">Land Area</span>
              <span className="font-extrabold text-charcoal">{result.input.landArea} {result.input.landUnit} ({formatLandArea(result.input.landArea, result.input.landUnit)})</span>
            </div>
            <div>
              <span className="text-secgray block">Built-Up Area</span>
              <span className="font-extrabold text-charcoal">{result.input.builtUpArea} sq.ft</span>
            </div>
            <div>
              <span className="text-secgray block">Road Access</span>
              <span className="font-extrabold text-charcoal">{result.input.roadWidth} ft</span>
            </div>
            <div>
              <span className="text-secgray block">Building Age</span>
              <span className="font-extrabold text-charcoal">{result.input.buildingAge} Years</span>
            </div>
            <div>
              <span className="text-secgray block">Condition</span>
              <span className="font-extrabold text-charcoal">{result.input.condition}</span>
            </div>
            <div>
              <span className="text-secgray block">Rooms</span>
              <span className="font-extrabold text-charcoal">{result.input.bedrooms} Bed / {result.input.bathrooms} Bath</span>
            </div>
            <div>
              <span className="text-secgray block">Floors</span>
              <span className="font-extrabold text-charcoal">{result.input.floors} Storey</span>
            </div>
          </div>
        </div>

        {/* Section 2: Valuation Breakdown */}
        <div className="space-y-3">
          <h4 className="text-sm font-black text-charcoal uppercase tracking-wider border-b border-gray-200 pb-2">
            2. Deterministic Valuation Breakdown
          </h4>

          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-lightgray text-charcoal font-black border-b border-gray-300">
                <th className="py-2.5 px-3">Valuation Component</th>
                <th className="py-2.5 px-3">Basis / Rate</th>
                <th className="py-2.5 px-3 text-right">Calculated Amount (NPR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="py-3 px-3 font-bold text-charcoal">Base Land Value</td>
                <td className="py-3 px-3 text-secgray">NPR {(result.appliedFactors.landRatePerAana / 100000).toFixed(1)} Lakh / Aana</td>
                <td className="py-3 px-3 text-right font-bold text-charcoal">{formatNPR(result.breakdown.landValue, false)}</td>
              </tr>
              {result.input.propertyType !== 'Land' && (
                <>
                  <tr>
                    <td className="py-3 px-3 font-bold text-charcoal">Building Construction Base Value</td>
                    <td className="py-3 px-3 text-secgray">{result.input.builtUpArea} sq.ft @ NPR {result.appliedFactors.buildingRatePerSqFt}/sq.ft</td>
                    <td className="py-3 px-3 text-right font-bold text-charcoal">{formatNPR(Math.round(result.input.builtUpArea * result.appliedFactors.buildingRatePerSqFt), false)}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold text-amber-800">Age Depreciation ({result.input.buildingAge} Yrs)</td>
                    <td className="py-3 px-3 text-secgray">Factor: {(result.appliedFactors.ageFactor * 100).toFixed(0)}%</td>
                    <td className="py-3 px-3 text-right font-bold text-amber-800">-NPR {result.breakdown.ageAdjustment.toLocaleString('en-IN')}</td>
                  </tr>
                </>
              )}
              <tr>
                <td className="py-3 px-3 font-bold text-lime-800">Road Width Adjustment ({result.input.roadWidth} ft)</td>
                <td className="py-3 px-3 text-secgray">Factor: {(result.appliedFactors.roadFactor * 100).toFixed(0)}%</td>
                <td className="py-3 px-3 text-right font-bold text-lime-800">{result.breakdown.roadAdjustment >= 0 ? '+' : ''}NPR {result.breakdown.roadAdjustment.toLocaleString('en-IN')}</td>
              </tr>
              <tr className="bg-palelime/40 font-black text-sm text-charcoal">
                <td className="py-3 px-3" colSpan={2}>FINAL ESTIMATED MARKET VALUE</td>
                <td className="py-3 px-3 text-right">{formatNPR(result.estimatedValue, false)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section 3: Comparable Properties */}
        <div className="space-y-3">
          <h4 className="text-sm font-black text-charcoal uppercase tracking-wider border-b border-gray-200 pb-2">
            3. Key Comparable Properties
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {comparables.map((c) => (
              <div key={c.id} className="p-3.5 bg-lightgray rounded-xl text-xs space-y-1">
                <div className="flex justify-between font-bold text-charcoal">
                  <span>{c.location}</span>
                  <span className="text-lime-800">{c.similarityPercentage}% Match</span>
                </div>
                <div className="text-secgray">{c.landArea} Aana | {c.builtUpArea} sq.ft</div>
                <div className="font-black text-charcoal pt-1">{formatNPR(c.price, true)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Sign-off & Assumptions */}
        <div className="pt-6 border-t border-gray-200 text-[11px] text-secgray space-y-2">
          <p className="font-bold text-charcoal">Calculation Assumptions & Disclaimer:</p>
          <p>
            This valuation report is generated by the MeroGhar automated valuation engine using regional district land rates and standard Nepalese building construction depreciation metrics. This report is produced for informational and MVP demonstration purposes.
          </p>
        </div>

      </div>
    </div>
  );
};
