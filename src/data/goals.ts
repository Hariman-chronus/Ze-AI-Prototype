import { GoalCategory, TimeFrame } from '../types';

export const goalCategories: GoalCategory[] = [
  {
    id: 'career-growth',
    title: 'Career Growth',
    description: 'Advance your career through promotions, skill development, or career transitions',
    icon: 'Briefcase'
  },
  {
    id: 'technical-skills',
    title: 'Technical Skills',
    description: 'Master specific technical skills or new technologies',
    icon: 'Code2'
  },
  {
    id: 'leadership',
    title: 'Leadership Development',
    description: 'Develop leadership abilities and team management skills',
    icon: 'Users'
  },
  {
    id: 'business-skills',
    title: 'Business Skills',
    description: 'Improve business acumen, communication, and strategic thinking',
    icon: 'LineChart'
  }
];

export const explorationOption = {
  id: 'explore',
  title: 'Help Me Figure Out My Goals',
  description: "Not sure what to focus on? Let's explore your interests and potential paths together",
  icon: 'Compass'
};

export const timeFrames: TimeFrame[] = [
  {
    id: 'short',
    label: '1-3 months',
    duration: 'Short term'
  },
  {
    id: 'medium',
    label: '3-6 months',
    duration: 'Medium term'
  },
  {
    id: 'long',
    label: '6-12 months',
    duration: 'Long term'
  }
];