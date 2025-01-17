import { Question } from '../types';

export const questions: Question[] = [
  {
    id: 'interests',
    text: 'What interests you most in your current role?',
    options: [
      {
        id: 'technical',
        text: 'Solving complex technical problems and learning new technologies',
        categories: ['technical-skills']
      },
      {
        id: 'people',
        text: 'Working with and helping other team members grow',
        categories: ['leadership']
      },
      {
        id: 'business',
        text: 'Understanding the business impact of technical decisions',
        categories: ['business-skills']
      },
      {
        id: 'growth',
        text: 'Advancing my career and taking on more responsibilities',
        categories: ['career-growth']
      }
    ]
  },
  {
    id: 'challenges',
    text: 'What's your biggest challenge right now?',
    options: [
      {
        id: 'technical-gap',
        text: 'Keeping up with new technologies and technical requirements',
        categories: ['technical-skills']
      },
      {
        id: 'team-dynamics',
        text: 'Managing team dynamics and communication',
        categories: ['leadership', 'business-skills']
      },
      {
        id: 'career-path',
        text: 'Understanding my next career move',
        categories: ['career-growth']
      },
      {
        id: 'impact',
        text: 'Making a bigger impact in the organization',
        categories: ['business-skills', 'leadership']
      }
    ]
  },
  {
    id: 'future',
    text: 'Where do you see yourself in the next few years?',
    options: [
      {
        id: 'tech-expert',
        text: 'A technical expert in my field',
        categories: ['technical-skills']
      },
      {
        id: 'team-lead',
        text: 'Leading and growing a team',
        categories: ['leadership']
      },
      {
        id: 'strategic',
        text: 'Making strategic decisions that impact the business',
        categories: ['business-skills']
      },
      {
        id: 'senior',
        text: 'In a more senior position with broader responsibilities',
        categories: ['career-growth']
      }
    ]
  }
];