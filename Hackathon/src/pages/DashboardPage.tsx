import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSavedProperties } from '../hooks/useSavedProperties';
import { useValuationHistory } from '../hooks/useValuationHistory';
import { formatNPR } from '../utils/currency';
import { Heart, Calculator, TrendingUp, ArrowUpRight, Clock, Plus, Bookmark } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { savedIds, savedProperties } = useSavedProperties();
  const { history } = useValuationHistory();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const recentValuation = history[0];

  const totalEstimatedSum = history.reduce((sum, item) => sum + item.estimatedValue, 0);
  const avgEstimatedValue = history.length > 0 ? Math.round(totalEstimatedSum / history.length) : 23400000;

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-lime-800 bg-palelime px-3 py-1 rounded-full">
            User Overview
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal mt-2">
            {getGreeting()}, Property Owner
          </h1>
          <p className="text-secgray text-sm mt-0.5">Track your saved properties and valuation calculations in one place.</p>
        </div>

        <button
          onClick={() => navigate('/valuation')}
          className="bg-primary hover:bg-primary-hover text-charcoal font-black text-sm px-6 py-3 rounded-xl shadow flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Property Valuation</span>
        </button>
      </div>

      {/* OVERVIEW STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        <div
          onClick={() => navigate('/saved')}
          className="bg-white p-6 rounded-3xl border border-gray-200 shadow-subtle hover:shadow-card transition-all cursor-pointer space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-secgray uppercase">Saved Properties</span>
            <div className="w-10 h-10 bg-palelime rounded-2xl flex items-center justify-center text-lime-800 group-hover:scale-110 transition-transform">
              <Heart className="w-5 h-5 text-lime-700" />
            </div>
          </div>
          <div className="text-3xl font-black text-charcoal">{savedIds.length}</div>
          <p className="text-xs text-secgray">Favorited Nepalese property listings</p>
        </div>

        <div
          onClick={() => navigate('/history')}
          className="bg-white p-6 rounded-3xl border border-gray-200 shadow-subtle hover:shadow-card transition-all cursor-pointer space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-secgray uppercase">Valuations Performed</span>
            <div className="w-10 h-10 bg-palelime rounded-2xl flex items-center justify-center text-lime-800 group-hover:scale-110 transition-transform">
              <Calculator className="w-5 h-5 text-lime-700" />
            </div>
          </div>
          <div className="text-3xl font-black text-charcoal">{history.length}</div>
          <p className="text-xs text-secgray">Completed calculation runs</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-subtle space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-secgray uppercase">Average Estimated Value</span>
            <div className="w-10 h-10 bg-palelime rounded-2xl flex items-center justify-center text-lime-800">
              <TrendingUp className="w-5 h-5 text-lime-700" />
            </div>
          </div>
          <div className="text-3xl font-black text-charcoal">{formatNPR(avgEstimatedValue, true)}</div>
          <p className="text-xs text-secgray">Mean estimated market value across portfolio</p>
        </div>

      </div>

      {/* RECENT VALUATION SECTION */}
      <section className="bg-white p-8 rounded-3xl border border-gray-200 shadow-subtle space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-extrabold text-charcoal">Recent Valuation</h3>
          <Link to="/history" className="text-xs font-extrabold text-lime-800 hover:underline">
            View All History
          </Link>
        </div>

        {recentValuation ? (
          <div className="p-6 bg-lightgray rounded-2xl border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-lime-800 bg-palelime px-2.5 py-0.5 rounded">
                  {recentValuation.input.propertyType}
                </span>
                <span className="text-xs text-secgray flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Updated recently
                </span>
              </div>
              <h4 className="text-xl font-extrabold text-charcoal">{recentValuation.input.location}</h4>
              <p className="text-xs text-secgray font-medium">
                {recentValuation.input.landArea} {recentValuation.input.landUnit} Land | {recentValuation.input.builtUpArea} sq.ft | {recentValuation.input.roadWidth} ft road
              </p>
              <div className="text-2xl font-black text-charcoal pt-2">
                {formatNPR(recentValuation.estimatedValue, false)}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => {
                  sessionStorage.setItem('meroghar_active_result', JSON.stringify(recentValuation));
                  navigate('/valuation-report');
                }}
                className="flex-1 sm:flex-initial bg-charcoal hover:bg-black text-white font-bold text-xs px-5 py-3 rounded-xl transition-colors"
              >
                View Report
              </button>

              <button
                onClick={() => navigate('/valuation')}
                className="flex-1 sm:flex-initial bg-primary hover:bg-primary-hover text-charcoal font-black text-xs px-5 py-3 rounded-xl shadow transition-colors"
              >
                Recalculate
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 space-y-3">
            <p className="text-sm text-secgray">No valuation performed yet.</p>
            <button
              onClick={() => navigate('/valuation')}
              className="bg-primary text-charcoal font-bold text-xs px-5 py-2.5 rounded-xl shadow"
            >
              Start Free Valuation
            </button>
          </div>
        )}
      </section>

      {/* SAVED PROPERTIES PREVIEW */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-extrabold text-charcoal">Your Saved Properties ({savedProperties.length})</h3>
          <Link to="/saved" className="text-xs font-extrabold text-lime-800 hover:underline">
            Manage Saved Properties
          </Link>
        </div>

        {savedProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {savedProperties.slice(0, 3).map((p) => (
              <div key={p.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-subtle flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-3">
                  <img src={p.image} alt={p.title} className="w-14 h-14 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-sm text-charcoal truncate">{p.title}</h4>
                    <p className="text-xs text-secgray truncate">{p.location}</p>
                    <span className="font-black text-sm text-charcoal block mt-0.5">{formatNPR(p.price, true)}</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/property/${p.id}`)}
                  className="w-full bg-lightgray hover:bg-gray-200 text-charcoal font-bold text-xs py-2 rounded-lg transition-colors"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 text-center border border-gray-200 text-xs text-secgray">
            Your saved properties will appear here.
          </div>
        )}
      </section>

    </div>
  );
};
