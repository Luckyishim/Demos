import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { valuationService, ValuationResult } from '../services/valuationService';
import { propertyService, ComparableProperty } from '../services/propertyService';
import { formatNPR, formatNPRFull } from '../utils/currency';
import { PropertyCard } from '../components/common/PropertyCard';
import { MapPlaceholder } from '../components/common/MapPlaceholder';
import { useValuationHistory } from '../hooks/useValuationHistory';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Calculator, FileText, Bookmark, Share2, CheckCircle2, Award, Info, ArrowRight, ShieldCheck, MapPin, Building } from 'lucide-react';

export const ValuationResultPage: React.FC = () => {
  const navigate = useNavigate();
  const { saveValuation } = useValuationHistory();
  const [result, setResult] = useState<ValuationResult | null>(null);
  const [comparables, setComparables] = useState<ComparableProperty[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Read active valuation result from sessionStorage or calculate default for Baneshwor house
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
    const compList = propertyService.getComparableProperties(res.input, 3);
    setComparables(compList);
  }, []);

  if (!result) return null;

  const handleSaveResult = () => {
    saveValuation(result);
    setIsSaved(true);
  };

  // Recharts Donut data
  const pieData = [
    { name: 'Land Value', value: result.breakdown.landValue, color: '#A6CE39' },
    { name: 'Building Value', value: Math.max(0, result.breakdown.buildingValue), color: '#111111' },
  ].filter(d => d.value > 0);

  // Price comparison data
  const priceComparisonData = [
    { name: 'Your Property', value: result.estimatedValue / 10000000, fill: '#A6CE39' },
    { name: 'Local Average', value: 2.35, fill: '#333333' },
    { name: 'Comparable Avg', value: 2.41, fill: '#666666' },
  ];

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Top Banner & Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-lime-800 bg-palelime px-3 py-1 rounded-full">
            Completed Valuation Analysis
          </span>
          <h1 className="text-3xl font-extrabold text-charcoal mt-2">Valuation Result</h1>
          <p className="text-secgray text-sm flex items-center gap-1.5 mt-0.5">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{result.input.location}, {result.input.district}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleSaveResult}
            disabled={isSaved}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 border transition-all ${
              isSaved
                ? 'bg-palelime text-lime-900 border-lime-300'
                : 'bg-white text-charcoal border-gray-300 hover:bg-lightgray'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>{isSaved ? 'Valuation Saved!' : 'Save Valuation'}</span>
          </button>

          <button
            onClick={() => navigate('/valuation-report')}
            className="bg-primary hover:bg-primary-hover text-charcoal font-black text-xs px-6 py-2.5 rounded-xl shadow flex items-center gap-2 transition-colors"
          >
            <FileText className="w-4 h-4 text-charcoal" />
            <span>View Full Report</span>
          </button>
        </div>
      </div>

      {/* HERO VALUATION CARD */}
      <section className="bg-white rounded-3xl border-2 border-primary p-8 sm:p-10 shadow-floating text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-palelime text-lime-900 border border-lime-300 px-4 py-1.5 rounded-full text-xs font-black">
          <Award className="w-4 h-4 text-lime-700" />
          <span>Independent Deterministic Estimate</span>
        </div>

        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-secgray block mb-1">
            Your Estimated Property Value
          </span>
          <div className="text-4xl sm:text-5xl font-black text-charcoal tracking-tight">
            {formatNPRFull(result.estimatedValue)}
          </div>
        </div>

        <div className="inline-block bg-lightgray px-6 py-2.5 rounded-2xl border border-gray-200">
          <span className="text-xs text-secgray font-bold">Estimated Market Range: </span>
          <span className="text-sm font-extrabold text-charcoal">
            {formatNPR(result.estimatedRange.min, true)} — {formatNPR(result.estimatedRange.max, true)}
          </span>
        </div>

        <p className="text-xs text-secgray max-w-xl mx-auto">
          Calculated based on {result.input.landArea} {result.input.landUnit} land, {result.input.builtUpArea} sq.ft construction, {result.input.roadWidth} ft road access in {result.input.location}.
        </p>
      </section>

      {/* VALUATION BREAKDOWN SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Donut Chart */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-gray-200 shadow-subtle flex flex-col justify-between">
          <h3 className="font-extrabold text-lg text-charcoal mb-4">Value Composition</h3>
          
          <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: number) => [formatNPR(val, true), 'Value']}
                  contentStyle={{ backgroundColor: '#111111', color: '#FFFFFF', borderRadius: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-center gap-6 pt-4 border-t border-gray-100 text-xs font-bold">
            {pieData.map((d) => (
              <div key={d.name} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                <span>{d.name} ({formatNPR(d.value, true)})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Breakdown Items Table */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-gray-200 shadow-subtle space-y-4">
          <h3 className="font-extrabold text-lg text-charcoal pb-3 border-b border-gray-100">
            Valuation Breakdown Details
          </h3>

          <div className="space-y-3">
            {result.breakdownItems.map((item, idx) => (
              <div key={idx} className="p-3.5 bg-lightgray rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-extrabold text-sm text-charcoal">{item.label}</div>
                  <div className="text-xs text-secgray mt-0.5">{item.description}</div>
                </div>
                <div className={`font-black text-sm ${
                  item.type === 'addition' ? 'text-lime-800' : item.type === 'subtraction' ? 'text-amber-700' : 'text-charcoal'
                }`}>
                  {item.formattedValue}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
            <span className="font-extrabold text-base text-charcoal">Final Calculated Estimate</span>
            <span className="font-black text-xl text-charcoal">{formatNPR(result.estimatedValue, true)}</span>
          </div>
        </div>

      </section>

      {/* WHY THIS PROPERTY IS VALUED THIS WAY */}
      <section className="space-y-6">
        <h3 className="text-2xl font-extrabold text-charcoal">Why this property is valued this way</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {result.explanations.map((exp, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-subtle space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-secgray font-bold uppercase">{exp.title}</span>
                <span className="text-xs font-black bg-palelime text-lime-900 px-2 py-0.5 rounded">
                  {exp.rating}
                </span>
              </div>
              <p className="text-xs text-darkgray leading-relaxed pt-1">{exp.details}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICE COMPARISON CHART */}
      <section className="bg-white p-8 rounded-3xl border border-gray-200 shadow-subtle space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-extrabold text-charcoal">Local Price Benchmark Comparison</h3>
            <p className="text-xs text-secgray mt-1">Comparing your calculated value against local neighborhood and comparable property averages.</p>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={priceComparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" tick={{ fill: '#666666', fontSize: 12 }} />
              <YAxis tick={{ fill: '#666666', fontSize: 12 }} />
              <Tooltip formatter={(val: number) => [`NPR ${val.toFixed(2)} Cr`, 'Value']} />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {priceComparisonData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* COMPARABLE PROPERTIES */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-extrabold text-charcoal">Similar Properties Near You</h3>
            <p className="text-secgray text-sm mt-1">Top weighted comparable properties matching area and road specifications.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {comparables.map((comp) => (
            <PropertyCard key={comp.id} property={comp} similarityScore={comp.similarityPercentage} />
          ))}
        </div>
      </section>

    </div>
  );
};
