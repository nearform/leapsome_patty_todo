import type { JourneyConfig } from '@/lib/types/journey';

export const journey: JourneyConfig = {
  id: 'banking',
  title: 'Banking App',
  description: 'Sample mobile banking app journey with login and dashboard screens',
  status: 'in-progress',
  pages: [
    {
      id: 'login',
      name: 'Login',
      path: '/prototype/journeys/banking/login',
      description: 'User authentication screen',
    },
    {
      id: 'dashboard',
      name: 'Dashboard',
      path: '/prototype/journeys/banking/dashboard',
      description: 'Account overview and quick actions',
    },
  ],
};
