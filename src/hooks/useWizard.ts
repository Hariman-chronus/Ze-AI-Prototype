import { useState, useCallback } from 'react';
import { SelectedGoal } from '../types';
import { questions } from '../data/questions';
import { goalCategories } from '../data/goals';

export function useWizard() {
  const [step, setStep] = useState(1);
  const [selectedGoals, setSelectedGoals] = useState<SelectedGoal[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isExplorationMode, setIsExplorationMode] = useState(false);
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState<Record<string, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const startExploration = useCallback(() => {
    setIsExplorationMode(true);
    setSelectedCategories([]);
    setStep(2);
  }, []);

  const handleCategorySelect = useCallback((categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else if (selectedCategories.length < 2) {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  }, [selectedCategories]);

  const handleQuestionAnswer = useCallback((questionId: string, optionId: string) => {
    setQuestionnaireAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Calculate recommended categories based on answers
      const recommendedCategories = new Map<string, number>();
      
      Object.entries(questionnaireAnswers).forEach(([qId, aId]) => {
        const question = questions.find(q => q.id === qId);
        const answer = question?.options.find(o => o.id === aId);
        
        answer?.categories.forEach(category => {
          recommendedCategories.set(
            category,
            (recommendedCategories.get(category) || 0) + 1
          );
        });
      });

      // Sort categories by frequency and select top 2
      const sortedCategories = Array.from(recommendedCategories.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2)
        .map(([category]) => category);

      setSelectedCategories(sortedCategories);
      setStep(3);
    }
  }, [currentQuestionIndex, questionnaireAnswers]);

  const handleTimeFrameSelect = useCallback((categoryId: string, timeFrameId: string) => {
    setSelectedGoals(prev => [
      ...prev.filter(goal => goal.categoryId !== categoryId),
      { categoryId, timeFrameId }
    ]);
  }, []);

  const handleNext = useCallback(() => {
    if (step === 1 && selectedCategories.length > 0) {
      setStep(2);
    }
  }, [step, selectedCategories]);

  const handleBack = useCallback(() => {
    if (step === 2 && isExplorationMode) {
      setStep(1);
      setIsExplorationMode(false);
      setSelectedCategories([]);
      setQuestionnaireAnswers({});
      setCurrentQuestionIndex(0);
    } else if (step === 3) {
      if (isExplorationMode) {
        setStep(2);
      } else {
        setStep(1);
      }
      setSelectedGoals([]);
    }
  }, [step, isExplorationMode]);

  const isComplete = selectedCategories.length > 0 && 
    selectedCategories.every(catId => 
      selectedGoals.some(goal => goal.categoryId === catId)
    );

  return {
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
  };
}