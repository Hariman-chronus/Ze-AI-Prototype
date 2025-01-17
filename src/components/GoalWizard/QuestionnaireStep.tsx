import React from 'react';
import { Question } from '../../types';
import { Button } from '../ui/Button';

type QuestionnaireStepProps = {
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<string, string>;
  onAnswer: (questionId: string, optionId: string) => void;
};

export function QuestionnaireStep({
  questions,
  currentQuestionIndex,
  answers,
  onAnswer,
}: QuestionnaireStepProps) {
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Let's Find Your Path</h2>
      <p className="text-gray-600 mb-8">
        Question {currentQuestionIndex + 1} of {questions.length}
      </p>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-6">{currentQuestion.text}</h3>
        <div className="space-y-4">
          {currentQuestion.options.map(option => (
            <Button
              key={option.id}
              onClick={() => onAnswer(currentQuestion.id, option.id)}
              variant="card"
              selected={answers[currentQuestion.id] === option.id}
              className="w-full"
            >
              <div className="text-left">
                <p className="text-lg">{option.text}</p>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}