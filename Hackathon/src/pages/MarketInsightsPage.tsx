import React from 'react';
import { DISTRICT_MARKET_SUMMARIES, HISTORICAL_PRICE_TRENDS, PROPERTY_TYPE_DISTRIBUTION } from '../data/marketData';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { TrendingUp, MapPin, Building2, Layers, AlertCircle, Info } from 'lucide-react';

export const MarketInsightsPage: React.FC = () => {
  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-black uppercase tracking-widest text-lime-800 bg-palelime px-3 py-1 rounded-full">
          Real Estate Market Analytics
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal">Kathmandu & Nepal Market Insights</h1>
        <p className="text-secgray text-sm max-w-2xl">
          Comprehensive market trend analysis, location land rates, and property distribution across major Nepalese urban centers.
        </p>
      </div>

      {/* Top 4 Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {DISTRICT_MARKET_SUMMARIES.map((district) => (
          <div key={district.district} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-subtle space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-secgray uppercase">{district.district} Market</span>
              <span className="text-xs font-bold text-lime-800 bg-palelime px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +{district.priceTrendPct}%
              </span>
            </div>
            <div>
              <div className="text-2xl font-black text-charcoal">{district.avgValueFormatted}</div>
              <div className="text-xs font-bold text-secgray mt-0.5">Avg: {district.avgPerAanaFormatted} / Aana</div>
            </div>
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-secgray">
              <span>Listings: <strong>{district.totalListings}</strong></span>
              <span className="text-lime-700 font-semibold">Active Demand</span>
            </div>
          </div>
        ))}
      </div>

      {/* Demo Notice Alert */}
      <div className="bg-palelime/80 border border-lime-300 p-4 rounded-2xl flex items-center gap-3 text-xs text-darkgray">
        <Info className="w-5 h-5 text-lime-800 shrink-0" />
        <span>
          <strong>Demo Notice:</strong> All market figures presented are generated for MVP demonstration purposes using realistic Nepalese real estate baseline rates.
        </span>
      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Historical Price Trend Line Chart */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-subtle space-y-6">
          <div>
            <h3 className="text-xl font-extrabold text-charcoal">Nepal Residential Price Growth Trend (NPR Cr)</h3>
            <p className="text-xs text-secgray mt-1">Average valuation progression across Kathmandu, Lalitpur, Pokhara, and Bhaktapur.</p>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={HISTORICAL_PRICE_TRENDS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: '#666666', fontSize: 12 }} />
                <YAxis tick={{ fill: '#666666', fontSize: 12 }} />
                <Tooltip formatter={(val: number) => [`NPR ${val.toFixed(2)} Cr`, '']} />
                <Line type="monotone" dataKey="Kathmandu" stroke="#A6CE39" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="Lalitpur" stroke="#111111" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="Pokhara" stroke="#666666" strokeWidth={2} strokeDasharray="4 4" />
                <Line type="monotone" dataKey="Bhaktapur" stroke="#94A3B8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs font-bold">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-primary" />
              <span>Kathmandu</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-charcoal" />
              <span>Lalitpur</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-secgray" />
              <span>Pokhara</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-gray-400" />
              <span>Bhaktapur</span>
            </div>
          </div>
        </div>

        {/* Property Type Distribution Pie Chart */}
        <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-subtle space-y-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-extrabold text-charcoal">Property Type Distribution</h3>
            <p className="text-xs text-secgray mt-1">Breakdown of inventory by category.</p>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PROPERTY_TYPE_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {PROPERTY_TYPE_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val: number) => [`${val}%`, 'Share']} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-2 text-xs font-semibold border-t border-gray-100">
            {PROPERTY_TYPE_DISTRIBUTION.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.name}</span>
                </div>
                <span className="font-extrabold text-charcoal">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
