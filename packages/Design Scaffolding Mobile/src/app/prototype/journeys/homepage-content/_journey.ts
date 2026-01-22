import type { JourneyConfig } from '@/lib/types/journey';

export const journey: JourneyConfig = {
  id: 'homepage-content',
  title: 'Homepage Content',
  description: 'Main app homepage with navigation and content showcase',
  status: 'draft',
  pages: [
    { 
      id: 'homepage', 
      name: 'Homepage', 
      path: '/prototype/journeys/homepage-content/homepage',
      description: 'Full-width responsive homepage with all main components',
      height: 1200
    },
  ],
};
