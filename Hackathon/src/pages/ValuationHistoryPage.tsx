import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useValuationHistory } from '../hooks/useValuationHistory';
import { formatNPR } from '../utils/currency';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { History, Calculator, ArrowRight, Trash2, Clock, FileText, TrendingUp } from 'lucide-react';

export const ValuationHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { history, clearHistory } = useValuationHistory();

  // Chart data for history timeline
  const chartData = [...history].reverse().map((item, idx) => ({
    date: new Date(item.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    value: item.estimatedValue / 10000000, // in Cr
    location: item.input.location
  }));

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-lime-800 bg-palelime px-3 py-1 rounded-full">
            Calculation Archive
          </span>
          <h1 className="text-3xl font-extrabold text-charcoal mt-2">Valuation History</h1>
          <p className="text-secgray text-sm mt-0.5">Track valuation runs, historical changes, and past calculations.</p>
        </div>

        <div className="flex items-center gap-3">
          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className="text-xs font-bold text-secgray hover:text-red-600 px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear History
            </button>
          )}

          <button
            onClick={() => navigate('/valuation')}
            className="bg-primary hover:bg-primary-hover text-charcoal font-black text-xs px-5 py-2.5 rounded-xl shadow flex items-center gap-2"
          >
            <Calculator className="w-4 h-4" />
            <span>New Valuation</span>
          </button>
        </div>
      </div>

      {/* Empty State vs Content */}
      {history.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-gray-200 shadow-subtle space-y-4 max-w-xl mx-auto my-12">
          <div className="w-20 h-20 bg-palelime rounded-full flex items-center justify-center mx-auto text-lime-800">
            <History className="w-10 h-10 text-lime-700" />
          </div>
          <h2 className="text-2xl font-extrabold text-charcoal">Your completed valuations will appear here.</h2>
          <p className="text-secgray text-sm max-w-sm mx-auto">
            Calculate your property market value to save historical records and track price trends over time.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate('/valuation')}
              className="bg-primary hover:bg-primary-hover text-charcoal font-black text-sm px-7 py-3.5 rounded-xl shadow transition-transform active:scale-95"
            >
              Calculate Free Valuation
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-10">
          
          {/* Valuation History Timeline Line Chart */}
          {chartData.length > 1 && (
            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-subtle space-y-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-extrabold text-charcoal">Historical Valuation Trend (NPR Cr)</h3>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                    <XAxis dataKey="date" tick={{ fill: '#666666', fontSize: 12 }} />
                    <YAxis tick={{ fill: '#666666', fontSize: 12 }} />
                    <Tooltip formatter={(val: number) => [`NPR ${val.toFixed(2)} Cr`, 'Value']} />
                    <Line type="monotone" dataKey="value" stroke="#A6CE39" strokeWidth={3} dot={{ r: 5, fill: '#111111' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* History Records Table / List */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-subtle overflow-hidden">
            <div className="p-6 border-b border-gray-100 font-extrabold text-lg text-charcoal">
              Past Valuation Records ({history.length})
            </div>

            <div className="divide-y divide-gray-100">
              {history.map((item, index) => {
                const prevItem = history[index + 1];
                const changePct = prevItem
                  ? (((item.estimatedValue - prevItem.estimatedValue) / prevItem.estimatedValue) * 100).toFixed(1)
                  : null;

                return (
                  <div key={item.id} className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:bg-lightgray/50 transition-colors">
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="bg-palelime text-lime-900 font-extrabold text-[10px] px-2.5 py-0.5 rounded uppercase">
                          {item.input.propertyType}
                        </span>
                        <span className="text-xs text-secgray flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {new Date(item.timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </span>
                      </div>

                      <h4 className="text-lg font-extrabold text-charcoal">{item.input.location}</h4>
                      <p className="text-xs text-secgray">
                        {item.input.landArea} {item.input.landUnit} | {item.input.builtUpArea} sq.ft | {item.input.roadWidth} ft road | {item.input.condition} condition
                      </p>
                    </div>

                    <div className="flex flex-col md:items-end">
                      <span className="text-2xl font-black text-charcoal">{formatNPR(item.estimatedValue, true)}</span>
                      {changePct !== null && (
                        <span className={`text-xs font-bold ${Number(changePct) >= 0 ? 'text-lime-800' : 'text-red-600'}`}>
                          {Number(changePct) >= 0 ? `+${changePct}%` : `${changePct}%`} since previous run
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                      <button
                        onClick={() => {
                          sessionStorage.setItem('meroghar_active_result', JSON.stringify(item));
                          navigate('/valuation-report');
                        }}
                        className="flex-1 md:flex-initial bg-charcoal hover:bg-black text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors"
                      >
                        View Report
                      </button>

                      <button
                        onClick={() => {
                          sessionStorage.setItem('meroghar_active_result', JSON.stringify(item));
                          navigate('/valuation-result');
                        }}
                        className="flex-1 md:flex-initial bg-primary hover:bg-primary-hover text-charcoal font-extrabold text-xs px-4 py-2.5 rounded-xl shadow transition-colors"
                      >
                        Result
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
