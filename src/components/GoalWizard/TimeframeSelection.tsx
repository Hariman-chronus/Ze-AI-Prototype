import React from 'react';
import { GoalCategory, TimeFrame } from '../../types';
import { Button } from '../ui/Button';

type TimeframeSelectionProps = {
  selectedCategories: string[];
  categories: GoalCategory[];
  timeFrames: TimeFrame[];
  selectedGoals: Array<{ categoryId: string; timeFrameId: string }>;
  onTimeFrameSelect: (categoryId: string, timeFrameId: string) => void;
};

export function TimeframeSelection({
  selectedCategories,
  categories,
  timeFrames,
  selectedGoals,
  onTimeFrameSelect,
}: TimeframeSelectionProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Set Your Timeline</h2>
      <p className="text-gray-600 mb-8">
        Choose an ideal timeframe for each of your selected goals
      </p>

      {selectedCategories.map(categoryId => {
        const category = categories.find(c => c.id === categoryId)!;
        const selectedTimeFrame = selectedGoals.find(
          goal => goal.categoryId === categoryId
        )?.timeFrameId;

        return (
          <div key={categoryId} className="mb-8">
            <h3 className="font-semibold text-lg mb-4">{category.title}</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {timeFrames.map(timeFrame => (
                <Button
                  key={timeFrame.id}
                  onClick={() => onTimeFrameSelect(categoryId, timeFrame.id)}
                  variant="timeframe"
                  selected={selectedTimeFrame === timeFrame.id}
                >
                  <h4 className="font-medium">{timeFrame.duration}</h4>
                  <p className="text-sm text-gray-600">{timeFrame.label}</p>
                </Button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}