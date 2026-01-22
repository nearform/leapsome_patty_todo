import type { JourneyConfig } from '@/lib/types/journey';

export const journey: JourneyConfig = {
  id: 'onboarding',
  title: 'Onboarding Flow',
  description: 'New user registration and initial setup experience',
  status: 'in-progress',
  pages: [
    { 
      id: 'login', 
      name: 'Login', 
      path: '/prototype/journeys/onboarding/login',
      description: 'User authentication page'
    },
    { 
      id: 'onboarding01', 
      name: 'Follow Players', 
      path: '/prototype/journeys/onboarding/onboarding01',
      description: 'Select favorite players to follow'
    },
    { 
      id: 'onboarding02', 
      name: 'Follow Tournaments', 
      path: '/prototype/journeys/onboarding/onboarding02',
      description: 'Select favorite tournaments to follow'
    },
    { 
      id: 'onboarding03', 
      name: 'Notifications', 
      path: '/prototype/journeys/onboarding/onboarding03',
      description: 'Configure notification preferences'
    },
    { 
      id: 'signup', 
      name: 'Sign Up', 
      path: '/prototype/journeys/onboarding/signup',
      description: 'New account creation'
    },
    { 
      id: 'welcome', 
      name: 'Welcome', 
      path: '/prototype/journeys/onboarding/welcome',
      description: 'Post-signup welcome screen'
    },
  ],
};
