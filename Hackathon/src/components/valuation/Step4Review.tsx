import React from 'react';
import { ValuationInput } from '../../services/valuationService';
import { FileCheck, MapPin, Home, Sliders, Calculator, ArrowLeft, Edit3, ShieldAlert } from 'lucide-react';
import { convertToAana, formatLandArea } from '../../utils/currency';

interface Step4Props {
  formData: ValuationInput;
  onCalculate: () => void;
  onPrev: () => void;
  onEditStep: (step: number) => void;
}

export const Step4Review: React.FC<Step4Props> = ({ formData, onCalculate, onPrev, onEditStep }) => {
  const calculatedAana = convertToAana(formData.landArea, formData.landUnit);
  const isLandOnly = formData.propertyType === 'Land';

  return (
    <div className="space-y-6">
      <div className="text-center max-w-lg mx-auto mb-8">
        <div className="w-12 h-12 bg-palelime rounded-2xl flex items-center justify-center mx-auto mb-3 text-lime-800">
          <FileCheck className="w-6 h-6 text-lime-700" />
        </div>
        <h2 className="text-2xl font-extrabold text-charcoal">Review Valuation Request</h2>
        <p className="text-secgray text-sm mt-1">
          Verify your property details before executing the deterministic valuation algorithm.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Location */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <span className="font-extrabold text-xs text-secgray uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-primary" /> 1. Location
              </span>
              <button
                type="button"
                onClick={() => onEditStep(1)}
                className="text-xs font-bold text-secgray hover:text-charcoal flex items-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5" /> Edit
              </button>
            </div>

            <h3 className="text-base font-extrabold text-charcoal mb-2">{formData.location}</h3>
            <ul className="text-xs text-secgray space-y-1.5 font-medium">
              <li>District: <strong className="text-charcoal">{formData.district}</strong></li>
              <li>Municipality: <strong className="text-charcoal">{formData.municipality}</strong></li>
              <li>Ward: <strong className="text-charcoal">No. {formData.ward}</strong></li>
              <li>Province: <strong className="text-charcoal">{formData.province}</strong></li>
            </ul>
          </div>
        </div>

        {/* Card 2: Property Specs */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <span className="font-extrabold text-xs text-secgray uppercase tracking-wider flex items-center gap-1.5">
                <Home className="w-4 h-4 text-primary" /> 2. Specs & Size
              </span>
              <button
                type="button"
                onClick={() => onEditStep(2)}
                className="text-xs font-bold text-secgray hover:text-charcoal flex items-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5" /> Edit
              </button>
            </div>

            <h3 className="text-base font-extrabold text-charcoal mb-2">{formData.propertyType}</h3>
            <ul className="text-xs text-secgray space-y-1.5 font-medium">
              <li>Land Input: <strong className="text-charcoal">{formData.landArea} {formData.landUnit}</strong></li>
              <li>Standard Land: <strong className="text-charcoal">{calculatedAana.toFixed(2)} Aana ({formatLandArea(calculatedAana, 'Aana')})</strong></li>
              {!isLandOnly && (
                <li>Built-Up Area: <strong className="text-charcoal">{formData.builtUpArea} sq.ft</strong></li>
              )}
            </ul>
          </div>
        </div>

        {/* Card 3: Characteristics */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <span className="font-extrabold text-xs text-secgray uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-primary" /> 3. Features & State
              </span>
              <button
                type="button"
                onClick={() => onEditStep(3)}
                className="text-xs font-bold text-secgray hover:text-charcoal flex items-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5" /> Edit
              </button>
            </div>

            <h3 className="text-base font-extrabold text-charcoal mb-2">{formData.roadWidth} ft Access Road</h3>
            <ul className="text-xs text-secgray space-y-1.5 font-medium">
              {!isLandOnly ? (
                <>
                  <li>Age: <strong className="text-charcoal">{formData.buildingAge} years old</strong></li>
                  <li>Condition: <strong className="text-charcoal">{formData.condition}</strong></li>
                  <li>Rooms: <strong className="text-charcoal">{formData.bedrooms} Bed / {formData.bathrooms} Bath / {formData.floors} Storey</strong></li>
                </>
              ) : (
                <li>Vacant land plot</li>
              )}
            </ul>
          </div>
        </div>

      </div>

      {/* Demo Notice Disclaimer */}
      <div className="bg-palelime/80 border border-lime-300 p-4 rounded-xl flex items-start gap-3 text-xs text-darkgray">
        <ShieldAlert className="w-5 h-5 text-lime-800 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-charcoal block">Independent Valuation Engine</span>
          Your property valuation will be processed using configured Nepal regional land rates, building depreciation rates, and local road width factors.
        </div>
      </div>

      {/* Primary Trigger Button */}
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
          type="button"
          onClick={onCalculate}
          className="bg-primary hover:bg-primary-hover text-charcoal font-black text-lg px-10 py-4 rounded-xl shadow-floating flex items-center gap-3 transition-transform active:scale-95 hover:scale-[1.02]"
        >
          <Calculator className="w-6 h-6 text-charcoal" />
          <span>Calculate Property Value</span>
        </button>
      </div>
    </div>
  );
};
