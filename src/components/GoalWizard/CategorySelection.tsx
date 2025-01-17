import React from 'react';
import * as icons from 'lucide-react';
import { GoalCategory } from '../../types';
import { Button } from '../ui/Button';
import { explorationOption } from '../../data/goals';

type CategorySelectionProps = {
  categories: GoalCategory[];
  selectedCategories: string[];
  onCategorySelect: (categoryId: string) => void;
  onExplore: () => void;
};

export function CategorySelection({
  categories,
  selectedCategories,
  onCategorySelect,
  onExplore,
}: CategorySelectionProps) {
  const ExploreIcon = icons[explorationOption.icon as keyof typeof icons];

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-2xl font-bold">What are your top goals?</h2>
        <p className="text-gray-600 mt-2">Select up to 2 goals that matter most to you</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        {categories.map(category => {
          const CategoryIcon = icons[category.icon as keyof typeof icons];
          return (
            <Button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              variant="card"
              selected={selectedCategories.includes(category.id)}
            >
              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-blue-100 p-3">
                  <CategoryIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-lg">{category.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {category.description}
                  </p>
                </div>
              </div>
            </Button>
          );
        })}
      </div>

      <div className="border-t border-gray-200 pt-8">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 text-gray-500">Not seeing what you're looking for?</div>
          <button
            onClick={onExplore}
            className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-2xl hover:from-indigo-700 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <div className="rounded-full bg-white/20 p-2">
              <ExploreIcon className="w-6 h-6" />
            </div>
            <span className="text-lg font-medium">Let's explore your goals together</span>
          </button>
          <p className="mt-3 text-sm text-gray-500">
            We'll help you discover the right path through a few questions
          </p>
        </div>
      </div>
    </div>
  );
}
