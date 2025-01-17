export type GoalCategory = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type TimeFrame = {
  id: string;
  label: string;
  duration: string;
};

export type SelectedGoal = {
  categoryId: string;
  timeFrameId: string;
};

export type Question = {
  id: string;
  text: string;
  options: Array<{
    id: string;
    text: string;
    categories: string[];
  }>;
};