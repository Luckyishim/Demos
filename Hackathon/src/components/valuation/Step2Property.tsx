import React from 'react';
import { ValuationInput } from '../../services/valuationService';
import { Home, LandPlot, Building2, Store, ArrowLeft, ArrowRight, Info } from 'lucide-react';
import { convertToAana, formatLandArea } from '../../utils/currency';

interface Step2Props {
  formData: ValuationInput;
  updateFormData: (fields: Partial<ValuationInput>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Step2Property: React.FC<Step2Props> = ({ formData, updateFormData, onNext, onPrev }) => {
  const propertyTypes = [
    { type: 'House', label: 'Residential House', icon: Home, desc: 'Bungalow, 2.5 storey home or villa' },
    { type: 'Land', label: 'Land Plot', icon: LandPlot, desc: 'Vacant plot or agricultural land parcel' },
    { type: 'Apartment', label: 'Apartment / Flat', icon: Building2, desc: 'High-rise housing unit or flat' },
    { type: 'Commercial', label: 'Commercial Building', icon: Store, desc: 'Office building, retail space or shop' },
  ] as const;

  const units = ['Aana', 'Ropani', 'Sq.ft', 'Sq.m'] as const;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const calculatedAana = convertToAana(formData.landArea, formData.landUnit);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center max-w-lg mx-auto mb-8">
        <div className="w-12 h-12 bg-palelime rounded-2xl flex items-center justify-center mx-auto mb-3 text-lime-800">
          <Building2 className="w-6 h-6 text-lime-700" />
        </div>
        <h2 className="text-2xl font-extrabold text-charcoal">Tell us about your property</h2>
        <p className="text-secgray text-sm mt-1">
          Select property type and specify exact land area and built-up measurements.
        </p>
      </div>

      {/* Property Type Selector */}
      <div>
        <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-3">
          Property Type
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {propertyTypes.map((item) => {
            const IconComp = item.icon;
            const isSelected = formData.propertyType === item.type;

            return (
              <button
                type="button"
                key={item.type}
                onClick={() => updateFormData({ propertyType: item.type as ValuationInput['propertyType'] })}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-primary bg-palelime/60 ring-2 ring-primary/40 shadow-sm'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-lightgray'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-primary text-charcoal' : 'bg-lightgray text-secgray'}`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  {isSelected && (
                    <span className="w-3 h-3 bg-primary rounded-full shadow-sm" />
                  )}
                </div>
                <div>
                  <h3 className="font-extrabold text-charcoal text-sm">{item.label}</h3>
                  <p className="text-xs text-secgray mt-1 leading-snug">{item.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Area Specs Card */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-subtle space-y-6">
        
        {/* Land Area Input & Unit */}
        <div>
          <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">
            Land Area
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="number"
              step="0.01"
              min="0.1"
              required
              value={formData.landArea || ''}
              onChange={(e) => updateFormData({ landArea: parseFloat(e.target.value) || 0 })}
              placeholder="e.g. 4"
              className="flex-1 bg-lightgray border border-gray-300 rounded-xl px-4 py-3 text-base font-extrabold text-charcoal focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
            />
            <select
              value={formData.landUnit}
              onChange={(e) => updateFormData({ landUnit: e.target.value as ValuationInput['landUnit'] })}
              className="bg-lightgray border border-gray-300 rounded-xl px-5 py-3 text-sm font-bold text-charcoal focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
            >
              {units.map(u => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>

          {/* Unit helper display */}
          <div className="mt-2.5 flex items-center gap-2 text-xs text-secgray bg-lightgray px-3.5 py-2 rounded-lg w-fit">
            <Info className="w-4 h-4 text-primary shrink-0" />
            <span>
              Calculated Standard Area: <strong className="text-charcoal">{calculatedAana.toFixed(2)} Aana</strong> ({formatLandArea(calculatedAana, 'Aana')})
            </span>
          </div>
        </div>

        {/* Built-Up Area Input (hidden if propertyType === 'Land') */}
        {formData.propertyType !== 'Land' && (
          <div>
            <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">
              Total Built-Up Construction Area (sq.ft)
            </label>
            <input
              type="number"
              step="10"
              min="100"
              required
              value={formData.builtUpArea || ''}
              onChange={(e) => updateFormData({ builtUpArea: parseInt(e.target.value, 10) || 0 })}
              placeholder="e.g. 2400"
              className="w-full bg-lightgray border border-gray-300 rounded-xl px-4 py-3 text-base font-extrabold text-charcoal focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
            />
            <p className="text-xs text-secgray mt-1.5">
              Include all covered floors combined (e.g. 3 floors × 800 sq.ft = 2,400 sq.ft).
            </p>
          </div>
        )}

      </div>

      {/* Buttons */}
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
          <span>Continue to Characteristics</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};
