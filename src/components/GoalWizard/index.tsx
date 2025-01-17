import React from 'react';
import { goalCategories, timeFrames } from '../../data/goals';
import { questions } from '../../data/questions';
import { useWizard } from '../../hooks/useWizard';
import { WizardProgress } from './WizardProgress';
import { CategorySelection } from './CategorySelection';
import { TimeframeSelection } from './TimeframeSelection';
import { QuestionnaireStep } from './QuestionnaireStep';

export default function GoalWizard() {
  const {
    step,
    selectedGoals,
    selectedCategories,
    isExplorationMode,
    currentQuestionIndex,
    questionnaireAnswers,
    handleCategorySelect,
    handleQuestionAnswer,
    handleTimeFrameSelect,
    handleNext,
    handleBack,
    startExploration,
    isComplete,
  } = useWizard();

  const getStepName = () => {
    if (step === 1) return 'Choose Goals';
    if (step === 2 && isExplorationMode) return 'Exploration Questions';
    return 'Set Timeframes';
  };

  const totalSteps = isExplorationMode ? 3 : 2;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <WizardProgress
        currentStep={step}
        totalSteps={totalSteps}
        stepName={getStepName()}
      />

      {step === 1 && (
        <CategorySelection
          categories={goalCategories}
          selectedCategories={selectedCategories}
          onCategorySelect={handleCategorySelect}
          onExplore={startExploration}
        />
      )}

      {step === 2 && isExplorationMode && (
        <QuestionnaireStep
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
          answers={questionnaireAnswers}
          onAnswer={handleQuestionAnswer}
        />
      )}

      {(step === 2 && !isExplorationMode) || (step === 3 && isExplorationMode) ? (
        <TimeframeSelection
          selectedCategories={selectedCategories}
          categories={goalCategories}
          timeFrames={timeFrames}
          selectedGoals={selectedGoals}
          onTimeFrameSelect={handleTimeFrameSelect}
        />
      ) : null}

      <div className="mt-8 flex justify-between">
        {step > 1 && (
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
        ) : step === 2 && isExplorationMode ? (
          <button
            onClick={() => handleQuestionAnswer(
              questions[currentQuestionIndex].id,
              questions[currentQuestionIndex].options[0].id
            )}
            className="ml-auto px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg"
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