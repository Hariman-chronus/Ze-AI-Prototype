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
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">What are your top goals?</h2>
        <p className="text-gray-600 mt-2">Select up to 2 goals that matter most to you</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4 mb-12">
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

      <div className="flex justify-center">
        <button
          onClick={onExplore}
          className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <ExploreIcon className="w-5 h-5" />
          <span className="text-lg font-medium">Not sure about your goals? Let's explore together</span>
        </button>
      </div>
    </div>
  );
}