import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Property } from '../../data/mockProperties';
import { formatNPR, formatLandArea } from '../../utils/currency';
import { Heart, MapPin, Bed, Bath, Layers, Compass, ArrowUpRight } from 'lucide-react';
import { useSavedProperties } from '../../hooks/useSavedProperties';

interface PropertyCardProps {
  property: Property;
  similarityScore?: number;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, similarityScore }) => {
  const { isSaved, toggleFavorite } = useSavedProperties();
  const saved = isSaved(property.id);
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-subtle hover:shadow-card transition-all duration-300 group flex flex-col h-full">
      {/* Property Image & Overlay Badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
          <span className="bg-charcoal/85 backdrop-blur-md text-white font-bold text-xs px-2.5 py-1 rounded-lg">
            {property.propertyType}
          </span>
          {similarityScore !== undefined && (
            <span className="bg-primary text-charcoal font-extrabold text-xs px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1">
              {similarityScore}% Match
            </span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(property.id);
          }}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all z-10 ${
            saved
              ? 'bg-white text-red-550 shadow-md scale-110'
              : 'bg-charcoal/40 text-white hover:bg-white hover:text-charcoal'
          }`}
          title={saved ? 'Remove from Saved' : 'Save Property'}
        >
          <Heart className={`w-4 h-4 ${saved ? 'fill-red-500 text-red-500' : ''}`} />
        </button>

        {/* Price Tag Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md">
            <span className="text-xs text-secgray block font-medium">Asking Price</span>
            <span className="text-base font-extrabold text-charcoal">
              {formatNPR(property.price, true)}
            </span>
          </div>
          <div className="bg-palelime/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-lime-300">
            <span className="text-[10px] text-lime-800 block font-bold uppercase tracking-wider">Est. Value</span>
            <span className="text-xs font-black text-charcoal">
              {formatNPR(property.estimatedValue, true)}
            </span>
          </div>
        </div>
      </div>

      {/* Property Details Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-secgray mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>

          <h3 className="text-base font-bold text-charcoal line-clamp-1 group-hover:text-primary-dark transition-colors mb-3">
            <Link to={`/property/${property.id}`}>{property.title}</Link>
          </h3>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-3 gap-2 py-2.5 px-3 bg-lightgray rounded-xl text-xs text-darkgray font-medium mb-4">
            <div className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-secgray shrink-0" />
              <span>{formatLandArea(property.landArea, property.landUnit)}</span>
            </div>
            {property.propertyType !== 'Land' && (
              <>
                <div className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-secgray shrink-0" />
                  <span>{property.builtUpArea} sq.ft</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Bed className="w-3.5 h-3.5 text-secgray shrink-0" />
                  <span>{property.bedrooms} Beds</span>
                </div>
              </>
            )}
            {property.propertyType === 'Land' && (
              <div className="col-span-2 flex items-center gap-1.5">
                <span className="text-secgray">Road:</span>
                <span className="font-bold">{property.roadWidth} ft</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex items-center justify-between border-t border-gray-100 mt-auto">
          <span className="text-xs text-secgray">
            Age: <span className="font-semibold text-charcoal">{property.buildingAge ? `${property.buildingAge} yrs` : 'N/A'}</span>
          </span>
          <Link
            to={`/property/${property.id}`}
            className="text-xs font-bold text-charcoal hover:text-lime-700 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
          >
            <span>View Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
