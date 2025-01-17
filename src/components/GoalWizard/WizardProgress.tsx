import React from 'react';

type WizardProgressProps = {
  currentStep: number;
  totalSteps: number;
  stepName: string;
};

export function WizardProgress({ currentStep, totalSteps, stepName }: WizardProgressProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <React.Fragment key={index}>
              <div className={`rounded-full h-8 w-8 flex items-center justify-center ${
                currentStep >= index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}>
                {index + 1}
              </div>
              {index < totalSteps - 1 && (
                <div className={`h-1 w-24 mx-2 ${
                  currentStep > index + 1 ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
        <p className="text-sm text-gray-600">
          Step {currentStep} of {totalSteps}: {stepName}
        </p>
      </div>
    </div>
  );
}