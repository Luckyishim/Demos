import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { valuationService, ValuationInput } from '../services/valuationService';
import { storageService } from '../services/storageService';
import { Logo } from '../components/common/Logo';
import { CheckCircle2, Loader2, Sparkles, Circle } from 'lucide-react';

export const ValuationProcessingPage: React.FC = () => {
  const navigate = useNavigate();
  const [completedSteps, setCompletedSteps] = useState<number>(0);

  const processingTasks = [
    'Analyze property characteristics',
    'Analyze location & local rates',
    'Find comparable properties',
    'Calculate estimated market value',
    'Prepare valuation report',
  ];

  useEffect(() => {
    // Read pending valuation input from sessionStorage or fallback to default
    const stored = sessionStorage.getItem('meroghar_pending_valuation');
    let inputData: ValuationInput;

    if (stored) {
      inputData = JSON.parse(stored);
    } else {
      inputData = {
        province: 'Bagmati Province',
        district: 'Kathmandu',
        municipality: 'Kathmandu Metropolitan City',
        ward: 10,
        location: 'Baneshwor, Kathmandu',
        propertyType: 'House',
        landArea: 4,
        landUnit: 'Aana',
        builtUpArea: 2400,
        bedrooms: 4,
        bathrooms: 3,
        floors: 2.5,
        buildingAge: 6,
        roadWidth: 20,
        condition: 'Good',
      };
    }

    // Step-by-step timer animation over ~1.8 seconds
    const timer1 = setTimeout(() => setCompletedSteps(1), 300);
    const timer2 = setTimeout(() => setCompletedSteps(2), 700);
    const timer3 = setTimeout(() => setCompletedSteps(3), 1100);
    const timer4 = setTimeout(() => setCompletedSteps(4), 1500);
    const timer5 = setTimeout(() => {
      setCompletedSteps(5);
      
      // Calculate valuation result
      const result = valuationService.calculateValuation(inputData);
      
      // Save result into localStorage history
      storageService.saveValuation(result);
      sessionStorage.setItem('meroghar_active_result', JSON.stringify(result));

      // Navigate to Valuation Result Page
      navigate('/valuation-result');
    }, 1900);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [navigate]);

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-200 shadow-floating max-w-lg w-full text-center space-y-8">
        
        {/* Animated Brand Pulse */}
        <div className="relative flex items-center justify-center mx-auto">
          <div className="w-20 h-20 bg-palelime rounded-3xl flex items-center justify-center animate-pulse">
            <Logo variant="icon" size="lg" />
          </div>
        </div>

        <div>
          <span className="text-xs font-black uppercase tracking-widest text-lime-800 bg-palelime px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Valuation Engine Active
          </span>
          <h1 className="text-2xl font-black text-charcoal tracking-tight">VALUATING YOUR PROPERTY</h1>
          <p className="text-xs text-secgray mt-1">Please wait while MeroGhar evaluates market variables...</p>
        </div>

        {/* Step Checklist */}
        <div className="bg-lightgray p-5 rounded-2xl border border-gray-200 text-left space-y-3">
          {processingTasks.map((task, idx) => {
            const isDone = completedSteps > idx;
            const isCurrent = completedSteps === idx;

            return (
              <div key={idx} className="flex items-center justify-between text-xs font-semibold">
                <span className={`transition-colors ${isDone ? 'text-charcoal font-bold' : isCurrent ? 'text-lime-800 font-bold' : 'text-secgray'}`}>
                  {task}
                </span>

                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-lime-700 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-lime-700 animate-spin shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-gray-300 shrink-0" />
                )}
              </div>
            );
          })}
        </div>

        <p className="text-[11px] text-secgray">
          Calculating baseline land rates, construction depreciation, and road access modifiers...
        </p>

      </div>
    </div>
  );
};
