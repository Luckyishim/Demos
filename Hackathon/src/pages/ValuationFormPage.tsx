import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ValuationInput } from '../services/valuationService';
import { Step1Location } from '../components/valuation/Step1Location';
import { Step2Property } from '../components/valuation/Step2Property';
import { Step3Characteristics } from '../components/valuation/Step3Characteristics';
import { Step4Review } from '../components/valuation/Step4Review';
import { MapPin, Building2, Sliders, FileCheck, Check } from 'lucide-react';

export const ValuationFormPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Step state (1 to 4)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Pre-filled defaults as requested in Requirement #36
  const [formData, setFormData] = useState<ValuationInput>({
    province: 'Bagmati Province',
    district: searchParams.get('district') || 'Kathmandu',
    municipality: 'Kathmandu Metropolitan City',
    ward: 10,
    location: searchParams.get('location') || 'Baneshwor, Kathmandu',
    propertyType: (searchParams.get('type') as any) || 'House',
    landArea: Number(searchParams.get('landArea')) || 4,
    landUnit: 'Aana',
    builtUpArea: 2400,
    bedrooms: 4,
    bathrooms: 3,
    floors: 2.5,
    buildingAge: 6,
    roadWidth: 20,
    condition: 'Good',
  });

  const updateFormData = (fields: Partial<ValuationInput>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const handleCalculate = () => {
    // Save form data into session state / navigate to Valuation Processing
    sessionStorage.setItem('meroghar_pending_valuation', JSON.stringify(formData));
    navigate('/valuation-processing');
  };

  const steps = [
    { number: 1, title: 'Location', icon: MapPin },
    { number: 2, title: 'Property', icon: Building2 },
    { number: 3, title: 'Characteristics', icon: Sliders },
    { number: 4, title: 'Review', icon: FileCheck },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Page Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-black uppercase tracking-widest text-lime-800 bg-palelime px-3 py-1 rounded-full">
          Free Property Assessment
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal">Get Your Property Valuation</h1>
        <p className="text-secgray text-sm max-w-xl mx-auto">
          Complete the 4 simple steps below to generate an instant data-driven valuation report.
        </p>
      </div>

      {/* Step Progress Indicator Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-gray-200 shadow-subtle">
        <div className="flex items-center justify-between relative">
          
          {/* Connector Line behind steps */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0 hidden sm:block" />
          <div
            className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 z-0 transition-all duration-500 hidden sm:block"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />

          {steps.map((step) => {
            const IconComp = step.icon;
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;

            return (
              <button
                key={step.number}
                type="button"
                onClick={() => {
                  if (step.number <= currentStep || isCompleted) {
                    setCurrentStep(step.number);
                  }
                }}
                className={`relative z-10 flex flex-col items-center group focus:outline-none`}
              >
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center font-extrabold text-sm transition-all duration-300 ${
                    isCompleted
                      ? 'bg-charcoal text-primary shadow-md'
                      : isCurrent
                      ? 'bg-primary text-charcoal shadow-floating scale-110 ring-4 ring-primary/30'
                      : 'bg-lightgray text-secgray border border-gray-300'
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : <IconComp className="w-5 h-5" />}
                </div>

                <span
                  className={`text-xs font-bold mt-2 transition-colors hidden sm:block ${
                    isCurrent ? 'text-charcoal' : 'text-secgray'
                  }`}
                >
                  {step.number}. {step.title}
                </span>
              </button>
            );
          })}

        </div>
      </div>

      {/* Step Content Render */}
      <div className="transition-all duration-300">
        {currentStep === 1 && (
          <Step1Location
            formData={formData}
            updateFormData={updateFormData}
            onNext={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 2 && (
          <Step2Property
            formData={formData}
            updateFormData={updateFormData}
            onNext={() => setCurrentStep(3)}
            onPrev={() => setCurrentStep(1)}
          />
        )}

        {currentStep === 3 && (
          <Step3Characteristics
            formData={formData}
            updateFormData={updateFormData}
            onNext={() => setCurrentStep(4)}
            onPrev={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 4 && (
          <Step4Review
            formData={formData}
            onCalculate={handleCalculate}
            onPrev={() => setCurrentStep(3)}
            onEditStep={(stepNum) => setCurrentStep(stepNum)}
          />
        )}
      </div>

    </div>
  );
};
