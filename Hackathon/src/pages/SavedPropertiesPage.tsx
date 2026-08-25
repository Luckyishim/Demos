import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSavedProperties } from '../hooks/useSavedProperties';
import { PropertyCard } from '../components/common/PropertyCard';
import { Heart, Building2, Calculator, ArrowRight } from 'lucide-react';

export const SavedPropertiesPage: React.FC = () => {
  const { savedProperties } = useSavedProperties();
  const navigate = useNavigate();

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-lime-800 bg-palelime px-3 py-1 rounded-full">
            Personal Watchlist
          </span>
          <h1 className="text-3xl font-extrabold text-charcoal mt-2">Saved Properties</h1>
          <p className="text-secgray text-sm mt-0.5">Properties you have bookmarked during your search.</p>
        </div>

        <button
          onClick={() => navigate('/properties')}
          className="bg-white hover:bg-lightgray border border-gray-300 text-charcoal font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm flex items-center gap-2"
        >
          <span>Explore More Properties</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Empty State vs Property Cards Grid */}
      {savedProperties.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-gray-200 shadow-subtle space-y-4 max-w-xl mx-auto my-12">
          <div className="w-20 h-20 bg-palelime rounded-full flex items-center justify-center mx-auto text-lime-800">
            <Heart className="w-10 h-10 text-lime-700" />
          </div>
          <h2 className="text-2xl font-extrabold text-charcoal">Your saved properties will appear here.</h2>
          <p className="text-secgray text-sm max-w-sm mx-auto">
            Click the heart icon on any property card to save it for quick reference and market comparison.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate('/properties')}
              className="bg-primary hover:bg-primary-hover text-charcoal font-black text-sm px-7 py-3.5 rounded-xl shadow transition-transform active:scale-95"
            >
              Browse Nepal Properties
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}

    </div>
  );
};
