import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Calculator, ShieldCheck, MapPin, TrendingUp, Sparkles, Building2, CheckCircle2, ArrowRight, Layers, Award } from 'lucide-react';
import { DISTRICT_MARKET_SUMMARIES, HISTORICAL_PRICE_TRENDS } from '../data/marketData';
import { MOCK_PROPERTIES } from '../data/mockProperties';
import { PropertyCard } from '../components/common/PropertyCard';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { formatNPR } from '../utils/currency';

export const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const featuredProperties = MOCK_PROPERTIES.filter(p => p.featured).slice(0, 3);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/properties?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/properties');
    }
  };

  return (
    <div className="space-y-20 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 bg-gradient-to-b from-white via-lightgray/50 to-[#F1F1F1] overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-palelime text-lime-900 border border-lime-300 px-3.5 py-1.5 rounded-full text-xs font-extrabold shadow-sm">
                <Sparkles className="w-4 h-4 text-lime-700" />
                <span>Nepal's Premier Property Intelligence Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-charcoal tracking-tight leading-[1.1]">
                Know What Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-charcoal via-lime-800 to-lime-600">
                  Property Is Worth.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-secgray max-w-xl font-normal leading-relaxed">
                Get a data-driven estimate of your property's market value using location rates, property characteristics, and real comparable properties across Nepal.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => navigate('/valuation')}
                  className="bg-primary hover:bg-primary-hover text-charcoal font-black text-base px-8 py-4 rounded-xl shadow-floating flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Calculator className="w-5 h-5 text-charcoal" />
                  <span>Get Free Valuation</span>
                </button>

                <button
                  onClick={() => navigate('/properties')}
                  className="bg-white hover:bg-lightgray border border-gray-300 text-charcoal font-bold text-base px-7 py-4 rounded-xl shadow-sm flex items-center gap-2 transition-colors"
                >
                  <span>Explore Properties</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Prominent Search Box */}
              <div className="pt-4 max-w-2xl">
                <form onSubmit={handleSearchSubmit} className="bg-white p-2.5 rounded-2xl border border-gray-300 shadow-card flex flex-col sm:flex-row items-center gap-2">
                  <div className="flex-1 flex items-center gap-3 px-3 w-full">
                    <Search className="w-5 h-5 text-secgray shrink-0" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Enter address, location (e.g., Baneshwor, Sanepa)..."
                      className="w-full text-sm font-semibold text-charcoal placeholder-secgray focus:outline-none bg-transparent"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-charcoal hover:bg-black text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors shrink-0 flex items-center justify-center gap-2"
                  >
                    <span>Get Valuation</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Right Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative bg-white p-4 sm:p-6 rounded-3xl border border-gray-200 shadow-floating">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1000&q=80"
                    alt="Nepalese Modern Residential Home"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-charcoal/80 backdrop-blur-md text-white text-xs font-extrabold px-3 py-1 rounded-lg">
                    Baneshwor, Kathmandu
                  </div>
                </div>

                {/* Valuation Highlights Floating Box */}
                <div className="bg-palelime border border-lime-300 p-4 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-extrabold text-lime-900 uppercase tracking-wider block">Estimated Market Value</span>
                    <span className="text-2xl font-black text-charcoal">NPR 2.45 Cr</span>
                    <span className="text-xs text-secgray block mt-0.5">Range: NPR 2.32 Cr — NPR 2.58 Cr</span>
                  </div>
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-charcoal font-bold shadow-sm">
                    <Award className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* HOW MEROGHAR WORKS */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-black uppercase tracking-widest text-lime-800 mb-2">Simple & Transparent</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-charcoal">How MeroGhar Works</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: '01',
              title: 'Enter Property',
              desc: 'Provide your property location, land area in Aana/Ropani, built-up size, road width, and building characteristics.',
              icon: Building2
            },
            {
              step: '02',
              title: 'Analyze Market',
              desc: 'Our deterministic algorithm evaluates district land rates, building construction depreciation, and road access factors.',
              icon: TrendingUp
            },
            {
              step: '03',
              title: 'Get Your Value',
              desc: 'Receive a transparent market valuation breakdown, value range, comparable properties, and formal downloadable report.',
              icon: Calculator
            }
          ].map((item) => {
            const IconComp = item.icon;
            return (
              <div key={item.step} className="bg-white p-8 rounded-3xl border border-gray-200 shadow-subtle hover:shadow-card transition-all relative group">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-black text-lime-600 font-mono">{item.step}</span>
                  <div className="w-12 h-12 bg-lightgray group-hover:bg-palelime rounded-2xl flex items-center justify-center text-charcoal transition-colors">
                    <IconComp className="w-6 h-6 text-charcoal" />
                  </div>
                </div>
                <h4 className="text-xl font-extrabold text-charcoal mb-2">{item.title}</h4>
                <p className="text-secgray text-sm leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="bg-white py-16 border-y border-gray-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-3xl font-extrabold text-charcoal">Property insights you can understand</h3>
            <p className="text-secgray text-sm mt-2">Built specifically for the unique dynamics of Nepalese real estate markets.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Market-Based Estimates', desc: 'Calibrated with verified local land and construction rates per Aana across major Nepal hubs.', icon: ShieldCheck },
              { title: 'Comparable Properties', desc: 'Weighted similarity scoring matching nearby properties by area, road access, and age.', icon: Layers },
              { title: 'Location Insights', desc: 'District and municipal level breakdown reflecting micro-location demand factors.', icon: MapPin },
              { title: 'Transparent Breakdown', desc: 'Clear distinction between base land value, structural construction value, and road adjustments.', icon: CheckCircle2 }
            ].map((card, idx) => {
              const IconComp = card.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-lightgray border border-gray-200">
                  <div className="w-10 h-10 bg-palelime rounded-xl flex items-center justify-center mb-4 text-lime-800">
                    <IconComp className="w-5 h-5 text-lime-700" />
                  </div>
                  <h4 className="font-extrabold text-charcoal text-base mb-1.5">{card.title}</h4>
                  <p className="text-xs text-secgray leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MARKET SNAPSHOT */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-lime-800 block mb-1">Nepal Real Estate</span>
            <h3 className="text-3xl font-extrabold text-charcoal">Nepal Property Market Snapshot</h3>
            <p className="text-xs text-secgray mt-1">* Based on demo property database assumptions.</p>
          </div>
          <Link to="/market-insights" className="text-sm font-extrabold text-charcoal hover:text-lime-700 flex items-center gap-1">
            <span>View Complete Market Analytics</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {DISTRICT_MARKET_SUMMARIES.map((district) => (
              <div key={district.district} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-subtle">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-charcoal">{district.district}</span>
                  <span className="text-xs font-bold text-lime-800 bg-palelime px-2 py-0.5 rounded">
                    +{district.priceTrendPct}% YoY
                  </span>
                </div>
                <div className="text-xl font-black text-charcoal">{district.avgValueFormatted}</div>
                <div className="text-xs text-secgray mt-1">Avg: {district.avgPerAanaFormatted} / Aana</div>
              </div>
            ))}
          </div>

          {/* Right Chart */}
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-gray-200 shadow-subtle flex flex-col justify-between">
            <h4 className="font-extrabold text-sm text-charcoal mb-4">Average Residential Property Value by Location (NPR Cr)</h4>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DISTRICT_MARKET_SUMMARIES} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="district" tick={{ fill: '#666666', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#666666', fontSize: 12 }} />
                  <Tooltip
                    formatter={(val: number) => [`NPR ${(val / 10000000).toFixed(2)} Cr`, 'Avg Value']}
                    contentStyle={{ backgroundColor: '#111111', color: '#FFFFFF', borderRadius: '12px', border: 'none' }}
                  />
                  <Bar dataKey="avgValue" fill="#A6CE39" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-charcoal">Featured Nepalese Properties</h3>
            <p className="text-secgray text-sm mt-1">Discover recently valued houses, apartments, and land plots.</p>
          </div>
          <Link to="/properties" className="text-sm font-extrabold text-charcoal hover:text-lime-700 hidden sm:flex items-center gap-1">
            <span>View All Properties</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProperties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </section>

    </div>
  );
};
