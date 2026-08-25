import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { propertyService, PropertyFilterOptions } from '../services/propertyService';
import { PropertyCard } from '../components/common/PropertyCard';
import { MapPlaceholder } from '../components/common/MapPlaceholder';
import { Filter, Search, RotateCcw, Map, Grid, ChevronDown, Building2, SlidersHorizontal } from 'lucide-react';
import { NEPAL_LOCATIONS } from '../data/nepalLocations';

export const PropertySearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Filters State
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [district, setDistrict] = useState(searchParams.get('district') || 'All');
  const [propertyType, setPropertyType] = useState(searchParams.get('type') || 'All');
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [minLandArea, setMinLandArea] = useState<number>(0);
  const [minBedrooms, setMinBedrooms] = useState<number>(0);
  const [minRoadWidth, setMinRoadWidth] = useState<number>(0);
  const [maxBuildingAge, setMaxBuildingAge] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'area-desc' | 'newest'>('newest');

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'split' | 'grid' | 'map'>('split');

  const filterOptions: PropertyFilterOptions = useMemo(() => ({
    searchQuery,
    district,
    propertyType,
    maxPrice: maxPrice > 0 ? maxPrice : undefined,
    minLandArea: minLandArea > 0 ? minLandArea : undefined,
    minBedrooms: minBedrooms > 0 ? minBedrooms : undefined,
    minRoadWidth: minRoadWidth > 0 ? minRoadWidth : undefined,
    maxBuildingAge: maxBuildingAge > 0 ? maxBuildingAge : undefined,
    sortBy
  }), [searchQuery, district, propertyType, maxPrice, minLandArea, minBedrooms, minRoadWidth, maxBuildingAge, sortBy]);

  const properties = useMemo(() => {
    return propertyService.getProperties(filterOptions);
  }, [filterOptions]);

  const resetFilters = () => {
    setSearchQuery('');
    setDistrict('All');
    setPropertyType('All');
    setMaxPrice(0);
    setMinLandArea(0);
    setMinBedrooms(0);
    setMinRoadWidth(0);
    setMaxBuildingAge(0);
    setSortBy('newest');
    setSearchParams({});
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Search & Controls Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-subtle flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search address, neighborhood or title..."
            className="w-full bg-lightgray border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold text-charcoal placeholder-secgray focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
          />
          <Search className="w-4 h-4 text-secgray absolute left-3.5 top-3" />
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden bg-lightgray hover:bg-palelime text-charcoal font-bold text-xs px-3.5 py-2.5 rounded-xl border border-gray-300 flex items-center gap-1.5"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-secgray font-bold hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-lightgray border border-gray-300 rounded-xl px-3 py-2 text-xs font-bold text-charcoal focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="area-desc">Land Area: Largest</option>
            </select>
          </div>

          {/* View Switcher (Desktop) */}
          <div className="hidden lg:flex items-center bg-lightgray p-1 rounded-xl border border-gray-200">
            <button
              onClick={() => setViewMode('split')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'split' ? 'bg-white text-charcoal shadow-sm' : 'text-secgray hover:text-charcoal'
              }`}
            >
              Split View
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'grid' ? 'bg-white text-charcoal shadow-sm' : 'text-secgray hover:text-charcoal'
              }`}
            >
              Grid Only
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'map' ? 'bg-white text-charcoal shadow-sm' : 'text-secgray hover:text-charcoal'
              }`}
            >
              Map Only
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Filter Sidebar (Desktop & Mobile Drawer) */}
        <aside className={`lg:col-span-3 bg-white p-6 rounded-2xl border border-gray-200 shadow-subtle space-y-6 ${
          mobileFilterOpen ? 'block' : 'hidden lg:block'
        }`}>
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-primary" />
              <h3 className="font-extrabold text-charcoal text-base">Filter Properties</h3>
            </div>
            <button
              onClick={resetFilters}
              className="text-xs text-secgray hover:text-charcoal font-semibold flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* District Filter */}
          <div>
            <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">District</label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full bg-lightgray border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-charcoal focus:outline-none"
            >
              <option value="All">All Nepal Districts</option>
              <option value="Kathmandu">Kathmandu</option>
              <option value="Lalitpur">Lalitpur</option>
              <option value="Bhaktapur">Bhaktapur</option>
              <option value="Kaski">Pokhara (Kaski)</option>
            </select>
          </div>

          {/* Property Type Filter */}
          <div>
            <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">Property Type</label>
            <div className="grid grid-cols-2 gap-2">
              {['All', 'House', 'Land', 'Apartment', 'Commercial', 'Office', 'Shop'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setPropertyType(t)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all text-left ${
                    propertyType === t
                      ? 'bg-primary text-charcoal shadow-sm'
                      : 'bg-lightgray text-secgray hover:bg-palelime'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Max Price Range */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Max Price</label>
              <span className="text-xs font-extrabold text-lime-800">
                {maxPrice > 0 ? `NPR ${(maxPrice / 10000000).toFixed(2)} Cr` : 'Any'}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="70000000"
              step="5000000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          {/* Min Land Area */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Min Land Area</label>
              <span className="text-xs font-extrabold text-charcoal">
                {minLandArea > 0 ? `${minLandArea} Aana` : 'Any'}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              step="1"
              value={minLandArea}
              onChange={(e) => setMinLandArea(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          {/* Road Width */}
          <div>
            <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">Min Access Road (ft)</label>
            <select
              value={minRoadWidth}
              onChange={(e) => setMinRoadWidth(Number(e.target.value))}
              className="w-full bg-lightgray border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-charcoal focus:outline-none"
            >
              <option value={0}>Any Road Width</option>
              <option value={12}>12+ ft Road</option>
              <option value={16}>16+ ft Road</option>
              <option value={20}>20+ ft Road</option>
            </select>
          </div>

          {/* Min Bedrooms */}
          <div>
            <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">Min Bedrooms</label>
            <div className="flex gap-2">
              {[0, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setMinBedrooms(n)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold ${
                    minBedrooms === n ? 'bg-charcoal text-white' : 'bg-lightgray text-secgray'
                  }`}
                >
                  {n === 0 ? 'Any' : `${n}+`}
                </button>
              ))}
            </div>
          </div>

        </aside>

        {/* Right Content Area: Cards + Map */}
        <main className={`lg:col-span-9 space-y-6`}>
          
          {/* Results Summary Bar */}
          <div className="flex items-center justify-between text-xs font-semibold text-secgray">
            <span>Showing <strong className="text-charcoal font-extrabold">{properties.length}</strong> Properties in Nepal</span>
            <button onClick={() => navigate('/valuation')} className="text-lime-800 font-bold hover:underline">
              Want to value your property?
            </button>
          </div>

          {/* Empty State */}
          {properties.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 shadow-subtle space-y-4">
              <div className="w-16 h-16 bg-palelime rounded-full flex items-center justify-center mx-auto text-lime-800">
                <Building2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-extrabold text-charcoal">No properties match your current filters</h3>
              <p className="text-secgray text-sm max-w-md mx-auto">
                Try widening your price range, clearing district constraints, or searching another neighborhood.
              </p>
              <button
                onClick={resetFilters}
                className="bg-primary hover:bg-primary-hover text-charcoal font-bold text-xs px-6 py-3 rounded-xl shadow"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              
              {/* Map view (if mode is split or map) */}
              {(viewMode === 'split' || viewMode === 'map') && (
                <div className="w-full">
                  <MapPlaceholder properties={properties} height={viewMode === 'map' ? 'h-[650px]' : 'h-[360px]'} />
                </div>
              )}

              {/* Property Cards Grid (if mode is split or grid) */}
              {(viewMode === 'split' || viewMode === 'grid') && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {properties.map((p) => (
                    <PropertyCard key={p.id} property={p} />
                  ))}
                </div>
              )}

            </div>
          )}

        </main>

      </div>
    </div>
  );
};
