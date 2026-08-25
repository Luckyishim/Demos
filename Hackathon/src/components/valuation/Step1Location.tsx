import React from 'react';
import { ValuationInput } from '../../services/valuationService';
import { NEPAL_LOCATIONS } from '../../data/nepalLocations';
import { MapPin, Building, ArrowRight } from 'lucide-react';

interface Step1Props {
  formData: ValuationInput;
  updateFormData: (fields: Partial<ValuationInput>) => void;
  onNext: () => void;
}

export const Step1Location: React.FC<Step1Props> = ({ formData, updateFormData, onNext }) => {
  const selectedProvince = NEPAL_LOCATIONS.find(p => p.province === formData.province) || NEPAL_LOCATIONS[0];
  const selectedDistrictObj = selectedProvince.districts.find(d => d.name === formData.district) || selectedProvince.districts[0];
  const selectedMunicipalityObj = selectedDistrictObj.municipalities.find(m => m.name === formData.municipality) || selectedDistrictObj.municipalities[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.location) {
      updateFormData({ location: `${selectedMunicipalityObj.popularAreas[0] || 'Baneshwor'}, ${formData.district}` });
    }
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center max-w-lg mx-auto mb-8">
        <div className="w-12 h-12 bg-palelime rounded-2xl flex items-center justify-center mx-auto mb-3 text-lime-800">
          <MapPin className="w-6 h-6 text-lime-700" />
        </div>
        <h2 className="text-2xl font-extrabold text-charcoal">Where is your property located?</h2>
        <p className="text-secgray text-sm mt-1">
          Property valuations in Nepal are strongly driven by exact district and micro-location rates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-subtle">
        
        {/* Province */}
        <div>
          <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">
            Province
          </label>
          <select
            value={formData.province}
            onChange={(e) => {
              const prov = NEPAL_LOCATIONS.find(p => p.province === e.target.value);
              const dist = prov?.districts[0]?.name || 'Kathmandu';
              const muni = prov?.districts[0]?.municipalities[0]?.name || 'Kathmandu Metropolitan City';
              updateFormData({ province: e.target.value, district: dist, municipality: muni });
            }}
            className="w-full bg-lightgray border border-gray-300 rounded-xl px-4 py-3 text-sm font-semibold text-charcoal focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
          >
            {NEPAL_LOCATIONS.map(p => (
              <option key={p.province} value={p.province}>{p.province}</option>
            ))}
          </select>
        </div>

        {/* District */}
        <div>
          <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">
            District
          </label>
          <select
            value={formData.district}
            onChange={(e) => {
              const distObj = selectedProvince.districts.find(d => d.name === e.target.value);
              const muni = distObj?.municipalities[0]?.name || '';
              updateFormData({ district: e.target.value, municipality: muni });
            }}
            className="w-full bg-lightgray border border-gray-300 rounded-xl px-4 py-3 text-sm font-semibold text-charcoal focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
          >
            {selectedProvince.districts.map(d => (
              <option key={d.name} value={d.name}>{d.name}</option>
            ))}
          </select>
        </div>

        {/* Municipality / Local Body */}
        <div>
          <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">
            Municipality / Metropolitan
          </label>
          <select
            value={formData.municipality}
            onChange={(e) => updateFormData({ municipality: e.target.value })}
            className="w-full bg-lightgray border border-gray-300 rounded-xl px-4 py-3 text-sm font-semibold text-charcoal focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
          >
            {selectedDistrictObj.municipalities.map(m => (
              <option key={m.name} value={m.name}>{m.name}</option>
            ))}
          </select>
        </div>

        {/* Ward Number */}
        <div>
          <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">
            Ward Number
          </label>
          <select
            value={formData.ward || 10}
            onChange={(e) => updateFormData({ ward: Number(e.target.value) })}
            className="w-full bg-lightgray border border-gray-300 rounded-xl px-4 py-3 text-sm font-semibold text-charcoal focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
          >
            {selectedMunicipalityObj.wards.map(w => (
              <option key={w} value={w}>Ward No. {w}</option>
            ))}
          </select>
        </div>

        {/* Specific Area / Address */}
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">
            Specific Area / Locality Address
          </label>
          <div className="relative">
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => updateFormData({ location: e.target.value })}
              placeholder="e.g. Baneshwor, Baluwatar, Sanepa, Lakeside..."
              className="w-full bg-lightgray border border-gray-300 rounded-xl pl-11 pr-4 py-3.5 text-sm font-semibold text-charcoal placeholder-secgray focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
            />
            <Building className="w-5 h-5 text-secgray absolute left-3.5 top-3.5" />
          </div>
          
          {/* Quick Area Pill suggestions */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-xs text-secgray font-medium">Popular in {formData.district}:</span>
            {selectedMunicipalityObj.popularAreas.slice(0, 5).map(area => (
              <button
                type="button"
                key={area}
                onClick={() => updateFormData({ location: `${area}, ${formData.district}` })}
                className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors ${
                  formData.location.includes(area)
                    ? 'bg-primary text-charcoal font-bold'
                    : 'bg-lightgray hover:bg-palelime text-darkgray'
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        </div>

      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="bg-primary hover:bg-primary-hover text-charcoal font-extrabold text-base px-8 py-3.5 rounded-xl shadow-md flex items-center gap-2 transition-transform active:scale-95"
        >
          <span>Continue to Property Details</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};
