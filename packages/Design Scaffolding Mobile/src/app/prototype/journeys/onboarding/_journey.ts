import type { JourneyConfig } from '@/lib/types/journey';

export const journey: JourneyConfig = {
  id: 'onboarding',
  title: 'Onboarding Flow',
  description: 'User onboarding journey with login, profile setup, and confirmation screens',
  status: 'in-progress',
  pages: [
    {
      id: 'login',
      name: 'Login',
      path: '/prototype/journeys/onboarding/login',
      description: 'User authentication screen',
    },
    {
      id: 'questions',
      name: 'Questions',
      path: '/prototype/journeys/onboarding/questions',
      description: 'Profile setup with username, name, and details',
    },
    {
      id: 'confirmation',
      name: 'Confirmation',
      path: '/prototype/journeys/onboarding/confirmation',
      description: 'Account creation success and summary',
    },
  ],
};
