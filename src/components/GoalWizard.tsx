import React, { useState } from 'react';
import { Icon } from 'lucide-react';
import * as icons from 'lucide-react';
import { goalCategories, timeFrames } from '../data/goals';
import { SelectedGoal } from '../types';

export default function GoalWizard() {
  const [step, setStep] = useState(1);
  const [selectedGoals, setSelectedGoals] = useState<SelectedGoal[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategorySelect = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else if (selectedCategories.length < 2) {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const handleTimeFrameSelect = (categoryId: string, timeFrameId: string) => {
    setSelectedGoals(prev => [
      ...prev.filter(goal => goal.categoryId !== categoryId),
      { categoryId, timeFrameId }
    ]);
  };

  const handleNext = () => {
    if (step === 1 && selectedCategories.length > 0) {
      setStep(2);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setSelectedGoals([]);
    }
  };

  const isComplete = selectedCategories.length > 0 && 
    selectedCategories.every(catId => 
      selectedGoals.some(goal => goal.categoryId === catId)
    );

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`rounded-full h-8 w-8 flex items-center justify-center ${
              step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}>
              1
            </div>
            <div className={`h-1 w-24 mx-2 ${
              step > 1 ? 'bg-blue-600' : 'bg-gray-200'
            }`} />
            <div className={`rounded-full h-8 w-8 flex items-center justify-center ${
              step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}>
              2
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Step {step} of 2: {step === 1 ? 'Choose Goals' : 'Set Timeframes'}
          </p>
        </div>
      </div>

      {step === 1 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">What are your top goals?</h2>
          <p className="text-gray-600 mb-8">Select up to 2 goals that matter most to you</p>
          
          <div className="grid md:grid-cols-2 gap-4">
            {goalCategories.map(category => {
              const IconComponent = icons[category.icon as keyof typeof icons];
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className={`p-6 rounded-lg border-2 transition-all ${
                    selectedCategories.includes(category.id)
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="rounded-full bg-blue-100 p-3">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-lg">{category.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Set Your Timeline</h2>
          <p className="text-gray-600 mb-8">
            Choose an ideal timeframe for each of your selected goals
          </p>

          {selectedCategories.map(categoryId => {
            const category = goalCategories.find(c => c.id === categoryId)!;
            const selectedTimeFrame = selectedGoals.find(
              goal => goal.categoryId === categoryId
            )?.timeFrameId;

            return (
              <div key={categoryId} className="mb-8">
                <h3 className="font-semibold text-lg mb-4">{category.title}</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {timeFrames.map(timeFrame => (
                    <button
                      key={timeFrame.id}
                      onClick={() => handleTimeFrameSelect(categoryId, timeFrame.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedTimeFrame === timeFrame.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <h4 className="font-medium">{timeFrame.duration}</h4>
                      <p className="text-sm text-gray-600">{timeFrame.label}</p>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-8 flex justify-between">
        {step === 2 && (
          <button
            onClick={handleBack}
            className="px-6 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
          >
            Back
          </button>
        )}
        {step === 1 ? (
          <button
            onClick={handleNext}
            disabled={selectedCategories.length === 0}
            className={`ml-auto px-6 py-2 rounded-lg ${
              selectedCategories.length > 0
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            Next
          </button>
        ) : (
          <button
            onClick={() => console.log('Goals set:', selectedGoals)}
            disabled={!isComplete}
            className={`ml-auto px-6 py-2 rounded-lg ${
              isComplete
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            Complete
          </button>
        )}
      </div>
    </div>
  );
}