import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { propertyService } from '../services/propertyService';
import { formatNPR, formatNPRFull, formatLandArea } from '../utils/currency';
import { useSavedProperties } from '../hooks/useSavedProperties';
import { PropertyCard } from '../components/common/PropertyCard';
import { MapPlaceholder } from '../components/common/MapPlaceholder';
import { MapPin, Heart, Bed, Bath, Layers, Compass, Calendar, Navigation, CheckCircle2, Calculator, Share2, ArrowLeft, ShieldCheck, Award } from 'lucide-react';

export const PropertyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isSaved, toggleFavorite } = useSavedProperties();

  const property = propertyService.getPropertyById(id || 'prop-1') || propertyService.getProperties()[0];
  const comparables = propertyService.getComparableProperties(property, 3);
  const saved = isSaved(property.id);

  const [activeImage, setActiveImage] = useState(property.image);

  const galleryImages = property.gallery && property.gallery.length > 0 ? property.gallery : [property.image];

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="text-xs font-extrabold text-secgray hover:text-charcoal flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Properties
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => toggleFavorite(property.id)}
            className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all ${
              saved
                ? 'bg-red-50 text-red-600 border-red-200'
                : 'bg-white text-charcoal border-gray-300 hover:bg-lightgray'
            }`}
          >
            <Heart className={`w-4 h-4 ${saved ? 'fill-red-600' : ''}`} />
            <span>{saved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Top Gallery Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 aspect-[16/10] rounded-3xl overflow-hidden bg-gray-100 border border-gray-200 shadow-card">
          <img
            src={activeImage}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Thumbnails */}
        <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4">
          {galleryImages.map((imgUrl, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(imgUrl)}
              className={`aspect-[16/10] rounded-2xl overflow-hidden border-2 transition-all ${
                activeImage === imgUrl ? 'border-primary ring-2 ring-primary/40' : 'border-transparent opacity-80 hover:opacity-100'
              }`}
            >
              <img src={imgUrl} alt={`Gallery thumbnail ${idx}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Main Content & Right Valuation Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Property Details */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Header Title & Location */}
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-secgray mb-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{property.district} Ward No. {property.ward}, {property.municipality}</span>
            </div>
            <h1 className="text-3xl font-extrabold text-charcoal">{property.title}</h1>
            <p className="text-xl font-bold text-secgray mt-1">{property.location}</p>
          </div>

          {/* Key Specs Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-white rounded-2xl border border-gray-200 shadow-subtle text-center">
            <div>
              <span className="text-xs text-secgray font-bold block mb-1">Land Area</span>
              <span className="text-lg font-black text-charcoal">{formatLandArea(property.landArea, property.landUnit)}</span>
            </div>
            {property.propertyType !== 'Land' && (
              <>
                <div>
                  <span className="text-xs text-secgray font-bold block mb-1">Built-Up</span>
                  <span className="text-lg font-black text-charcoal">{property.builtUpArea} sq.ft</span>
                </div>
                <div>
                  <span className="text-xs text-secgray font-bold block mb-1">Bed / Bath</span>
                  <span className="text-lg font-black text-charcoal">{property.bedrooms} Bed / {property.bathrooms} Bath</span>
                </div>
              </>
            )}
            <div>
              <span className="text-xs text-secgray font-bold block mb-1">Road Width</span>
              <span className="text-lg font-black text-charcoal">{property.roadWidth} ft</span>
            </div>
          </div>

          {/* Specs Table */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-subtle space-y-4">
            <h3 className="font-extrabold text-lg text-charcoal pb-3 border-b border-gray-100">
              Property Specifications
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm">
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-secgray font-medium">Property Type</span>
                <span className="font-bold text-charcoal">{property.propertyType}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-secgray font-medium">Building Age</span>
                <span className="font-bold text-charcoal">{property.buildingAge ? `${property.buildingAge} Years` : 'N/A'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-secgray font-medium">Condition</span>
                <span className="font-bold text-charcoal">{property.condition}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-secgray font-medium">Storey / Floors</span>
                <span className="font-bold text-charcoal">{property.floors ? `${property.floors} Storey` : 'N/A'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-secgray font-medium">Parking</span>
                <span className="font-bold text-charcoal">{property.parking ? 'Yes (Ample)' : 'Street Parking'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-secgray font-medium">Listed Date</span>
                <span className="font-bold text-charcoal">{property.listingDate}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-subtle space-y-3">
            <h3 className="font-extrabold text-lg text-charcoal">About this Property</h3>
            <p className="text-secgray text-sm leading-relaxed">{property.description}</p>
          </div>

        </div>

        {/* Right Column: Estimated Market Value Card */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white p-6 rounded-3xl border-2 border-primary shadow-floating space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-lime-700" />
                <span className="text-xs font-black uppercase tracking-wider text-charcoal">MeroGhar Value Intelligence</span>
              </div>
              <span className="bg-palelime text-lime-900 text-[10px] font-black px-2.5 py-1 rounded-md">
                Verified Engine
              </span>
            </div>

            {/* Value Figures */}
            <div className="space-y-1">
              <span className="text-xs text-secgray font-bold block uppercase tracking-wider">Estimated Market Value</span>
              <div className="text-3xl font-black text-charcoal">
                {formatNPRFull(property.estimatedValue)}
              </div>
              <div className="text-xs font-semibold text-lime-800 bg-palelime px-3 py-1.5 rounded-xl mt-2 inline-block">
                Estimated Range: {formatNPR(property.estimatedValue * 0.95, true)} — {formatNPR(property.estimatedValue * 1.05, true)}
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100 space-y-3">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-secgray">Asking Listing Price:</span>
                <span className="text-charcoal font-bold">{formatNPRFull(property.price)}</span>
              </div>
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-secgray">Valuation Difference:</span>
                <span className={`font-bold ${property.estimatedValue >= property.price ? 'text-lime-800' : 'text-amber-700'}`}>
                  {property.estimatedValue >= property.price ? '+' : ''}{formatNPR(property.estimatedValue - property.price, true)}
                </span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => navigate(`/valuation?location=${encodeURIComponent(property.location)}&landArea=${property.landArea}`)}
                className="w-full bg-primary hover:bg-primary-hover text-charcoal font-black text-sm py-3.5 rounded-xl shadow flex items-center justify-center gap-2 transition-colors"
              >
                <Calculator className="w-4 h-4" />
                Recalculate with Custom Specs
              </button>

              <button
                onClick={() => navigate('/valuation-report')}
                className="w-full bg-lightgray hover:bg-gray-200 text-charcoal font-bold text-xs py-3 rounded-xl transition-colors"
              >
                Generate Formal Valuation Report
              </button>
            </div>

          </div>

          {/* Location Map Placeholder */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-subtle space-y-3">
            <h4 className="font-extrabold text-sm text-charcoal">Location Context</h4>
            <MapPlaceholder properties={[property]} height="h-[220px]" />
          </div>

        </div>

      </div>

      {/* COMPARABLE PROPERTIES SECTION */}
      <section className="pt-10 border-t border-gray-200 space-y-6">
        <div>
          <h3 className="text-2xl font-extrabold text-charcoal">Similar Properties Near {property.location}</h3>
          <p className="text-secgray text-sm mt-1">Based on similarity score matching land area, road access, and age.</p>
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
