import React from 'react';
import { ValuationInput } from '../../services/valuationService';
import { Sliders, Bed, Bath, Layers, Calendar, Navigation, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';

interface Step3Props {
  formData: ValuationInput;
  updateFormData: (fields: Partial<ValuationInput>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Step3Characteristics: React.FC<Step3Props> = ({ formData, updateFormData, onNext, onPrev }) => {
  const isLandOnly = formData.propertyType === 'Land';

  const conditions = [
    { value: 'New', label: 'New / Under Construction', desc: '0–1 years old, modern specs' },
    { value: 'Excellent', label: 'Excellent', desc: 'Well maintained, high finish' },
    { value: 'Good', label: 'Good', desc: 'Normal wear & tear, fully functional' },
    { value: 'Average', label: 'Average', desc: 'Requires minor repairs or repaint' },
    { value: 'Needs Renovation', label: 'Needs Renovation', desc: 'Requires structural/interior work' },
  ] as const;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center max-w-lg mx-auto mb-8">
        <div className="w-12 h-12 bg-palelime rounded-2xl flex items-center justify-center mx-auto mb-3 text-lime-800">
          <Sliders className="w-6 h-6 text-lime-700" />
        </div>
        <h2 className="text-2xl font-extrabold text-charcoal">Property Characteristics</h2>
        <p className="text-secgray text-sm mt-1">
          Specify building age, road access width, room counts, and overall physical condition.
        </p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-subtle space-y-6">
        
        {/* Road Width */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-charcoal uppercase tracking-wider flex items-center gap-1.5">
              <Navigation className="w-4 h-4 text-primary" /> Road Access Width (ft)
            </label>
            <span className="font-black text-sm bg-palelime text-charcoal px-3 py-1 rounded-lg">
              {formData.roadWidth} ft
            </span>
          </div>
          <input
            type="range"
            min="4"
            max="40"
            step="1"
            value={formData.roadWidth}
            onChange={(e) => updateFormData({ roadWidth: Number(e.target.value) })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-[11px] text-secgray font-semibold mt-1">
            <span>4 ft (Narrow)</span>
            <span>12–16 ft (Standard)</span>
            <span>20+ ft (Main Road)</span>
          </div>
        </div>

        {!isLandOnly && (
          <>
            {/* Rooms & Floors Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4 border-t border-gray-100">
              
              {/* Bedrooms */}
              <div>
                <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Bed className="w-4 h-4 text-secgray" /> Bedrooms
                </label>
                <select
                  value={formData.bedrooms || 4}
                  onChange={(e) => updateFormData({ bedrooms: Number(e.target.value) })}
                  className="w-full bg-lightgray border border-gray-300 rounded-xl px-4 py-3 text-sm font-bold text-charcoal focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                    <option key={n} value={n}>{n} Bedrooms</option>
                  ))}
                </select>
              </div>

              {/* Bathrooms */}
              <div>
                <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Bath className="w-4 h-4 text-secgray" /> Bathrooms
                </label>
                <select
                  value={formData.bathrooms || 3}
                  onChange={(e) => updateFormData({ bathrooms: Number(e.target.value) })}
                  className="w-full bg-lightgray border border-gray-300 rounded-xl px-4 py-3 text-sm font-bold text-charcoal focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
                >
                  {[1, 2, 3, 4, 5, 6].map(n => (
                    <option key={n} value={n}>{n} Bathrooms</option>
                  ))}
                </select>
              </div>

              {/* Floors */}
              <div>
                <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-secgray" /> Floors
                </label>
                <select
                  value={formData.floors || 2.5}
                  onChange={(e) => updateFormData({ floors: Number(e.target.value) })}
                  className="w-full bg-lightgray border border-gray-300 rounded-xl px-4 py-3 text-sm font-bold text-charcoal focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
                >
                  {[1, 1.5, 2, 2.5, 3, 3.5, 4, 5].map(n => (
                    <option key={n} value={n}>{n} Storey</option>
                  ))}
                </select>
              </div>

            </div>

            {/* Building Age */}
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-charcoal uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-secgray" /> Building Age (Years)
                </label>
                <span className="font-black text-sm bg-lightgray text-charcoal px-3 py-1 rounded-lg">
                  {formData.buildingAge} {formData.buildingAge === 1 ? 'Year' : 'Years'} Old
                </span>
              </div>
              <input
                type="number"
                min="0"
                max="50"
                required
                value={formData.buildingAge}
                onChange={(e) => updateFormData({ buildingAge: Number(e.target.value) })}
                className="w-full bg-lightgray border border-gray-300 rounded-xl px-4 py-3 text-sm font-bold text-charcoal focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
              />
            </div>

            {/* Overall Condition Options */}
            <div className="pt-4 border-t border-gray-100">
              <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-3">
                Building Condition
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {conditions.map((cond) => {
                  const isSelected = formData.condition === cond.value;
                  return (
                    <button
                      type="button"
                      key={cond.value}
                      onClick={() => updateFormData({ condition: cond.value as ValuationInput['condition'] })}
                      className={`p-3.5 rounded-xl border text-left flex items-start justify-between transition-all ${
                        isSelected
                          ? 'border-primary bg-palelime/70 ring-2 ring-primary/40'
                          : 'border-gray-200 bg-white hover:bg-lightgray'
                      }`}
                    >
                      <div>
                        <div className="font-extrabold text-sm text-charcoal">{cond.label}</div>
                        <div className="text-xs text-secgray mt-0.5">{cond.desc}</div>
                      </div>
                      {isSelected && <CheckCircle2 className="w-5 h-5 text-lime-800 shrink-0 mt-0.5" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}

      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={onPrev}
          className="bg-white hover:bg-lightgray border border-gray-300 text-charcoal font-bold text-sm px-6 py-3 rounded-xl flex items-center gap-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          type="submit"
          className="bg-primary hover:bg-primary-hover text-charcoal font-extrabold text-base px-8 py-3.5 rounded-xl shadow-md flex items-center gap-2 transition-transform active:scale-95"
        >
          <span>Review Valuation Summary</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};
