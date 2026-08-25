import React, { useState } from 'react';
import { Property } from '../../data/mockProperties';
import { formatNPR } from '../../utils/currency';
import { MapPin, Navigation, Compass, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MapPlaceholderProps {
  properties: Property[];
  selectedPropertyId?: string;
  onSelectProperty?: (property: Property) => void;
  height?: string;
}

export const MapPlaceholder: React.FC<MapPlaceholderProps> = ({
  properties,
  selectedPropertyId,
  onSelectProperty,
  height = 'h-[500px]'
}) => {
  const [activeProperty, setActiveProperty] = useState<Property | null>(
    properties.find(p => p.id === selectedPropertyId) || properties[0] || null
  );
  const navigate = useNavigate();

  const handleMarkerClick = (p: Property) => {
    setActiveProperty(p);
    if (onSelectProperty) {
      onSelectProperty(p);
    }
  };

  return (
    <div className={`relative w-full ${height} bg-[#E5E9EC] rounded-2xl overflow-hidden border border-gray-300 shadow-inner flex flex-col justify-between p-4 select-none`}>
      {/* Map Graphic Canvas (Styled Vector Grid + Topography accent) */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#A6CE39_1px,transparent_1px)] [background-size:16px_16px]" />
      
      {/* Kathmandu Valley Topography paths mock SVG */}
      <svg className="absolute inset-0 w-full h-full text-gray-300 opacity-60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M-50 120 C 150 200, 300 50, 600 250 C 800 350, 1000 100, 1200 400" stroke="#CBD5E1" strokeWidth="8" />
        <path d="M100 -50 C 250 150, 450 350, 750 200 C 950 100, 1100 300, 1300 150" stroke="#CBD5E1" strokeWidth="4" strokeDasharray="6 6" />
        <path d="M-20 350 C 200 300, 500 450, 800 320" stroke="#A6CE39" strokeWidth="3" strokeOpacity="0.4" />
      </svg>

      {/* Top Map Controls */}
      <div className="relative z-10 flex items-center justify-between pointer-events-auto">
        <div className="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-2">
          <Navigation className="w-4 h-4 text-primary shrink-0" />
          <span className="text-xs font-bold text-charcoal">Nepal Property Map View</span>
          <span className="text-[10px] bg-palelime text-lime-900 px-2 py-0.5 rounded-md font-semibold">
            {properties.length} Pins
          </span>
        </div>

        <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-gray-200 shadow-sm text-xs font-semibold text-secgray flex items-center gap-1.5">
          <Compass className="w-4 h-4 text-primary" />
          <span>Interactive Demo Map</span>
        </div>
      </div>

      {/* Map Pins Grid */}
      <div className="relative z-10 flex-1 my-6">
        {properties.map((p, idx) => {
          const isSelected = activeProperty?.id === p.id;
          // Calculate mock map grid position based on index & coordinates
          const leftPercent = 15 + ((idx * 23) % 70);
          const topPercent = 20 + ((idx * 17) % 60);

          return (
            <div
              key={p.id}
              style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
              onClick={() => handleMarkerClick(p)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-110 z-20 group"
            >
              {/* Pin Badge */}
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-extrabold shadow-md border transition-colors ${
                  isSelected
                    ? 'bg-charcoal text-white border-primary scale-110 ring-4 ring-primary/30'
                    : 'bg-white text-charcoal border-gray-300 hover:border-primary'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-primary animate-pulse' : 'bg-lime-500'}`} />
                <span>{formatNPR(p.price, true)}</span>
              </div>

              {/* Pin Marker Arrow */}
              <div
                className={`w-2 h-2 mx-auto rotate-45 transform -mt-1 ${
                  isSelected ? 'bg-charcoal' : 'bg-white'
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* Bottom Floating Active Property Preview Card */}
      {activeProperty && (
        <div className="relative z-30 bg-white rounded-xl p-3 shadow-floating border border-gray-200 max-w-sm w-full mx-auto flex items-center justify-between gap-3 animate-fade-in pointer-events-auto">
          <img
            src={activeProperty.image}
            alt={activeProperty.title}
            className="w-16 h-16 rounded-lg object-cover shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-charcoal truncate">{activeProperty.title}</h4>
            <p className="text-[11px] text-secgray truncate flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-primary shrink-0" />
              {activeProperty.location}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-extrabold text-charcoal">{formatNPR(activeProperty.price, true)}</span>
              <span className="text-[10px] text-lime-700 bg-palelime font-bold px-1.5 py-0.5 rounded">
                Val: {formatNPR(activeProperty.estimatedValue, true)}
              </span>
            </div>
          </div>
          <button
            onClick={() => navigate(`/property/${activeProperty.id}`)}
            className="bg-charcoal hover:bg-black text-white font-bold text-xs px-3 py-2 rounded-lg transition-colors shrink-0"
          >
            View
          </button>
        </div>
      )}
    </div>
  );
};
