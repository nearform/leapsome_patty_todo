'use client';

import { useState } from 'react';
import {
  AppHeader,
  AppFooter,
  Tabs,
  CircleNavigation,
  CarouselNews,
  RolexClockBanner,
  StoriesViewer,
  InstaStoriesSection,
} from '@/components/ui';
import type { Tab } from '@/components/ui';
import type { CircleNavigationItem } from '@/components/ui';
import type { CarouselNewsItem } from '@/components/ui';
import type { StoryData, InstaStoryData } from '@/components/ui';

// Import stories data
import storiesData from '@/lib/data/stories.json';

// Get stories for InstaStories section (uses same data)
const instaStories: InstaStoryData[] = storiesData.stories;

// Sample data for Tabs
const tabsData: Tab[] = [
  { id: 'latest', label: 'Latest' },
  { id: 'following', label: 'Following' },
  { id: 'watch', label: 'Watch' },
];

// Get stories from JSON
const stories: StoryData[] = storiesData.stories;

// Map stories to Circle Navigation items
// First 8 stories map to the circle navigation
const circleNavigationItems: CircleNavigationItem[] = stories.slice(0, 8).map((story, index) => ({
  id: story.id,
  label: story.headline.split(' ').slice(0, 2).join(' '), // First 2 words as label
  image: story.localImage,
  isLive: index < 2, // First 2 items show as live
}));

// Sample data for Carousel News
const carouselNewsItems: CarouselNewsItem[] = [
  {
    id: '1',
    image: '/players/2news-1.jpg',
    imageAlt: 'Tennis player in action',
    badge: { text: 'Breaking', action: 'error' },
    subheading: 'ATP Tour',
    heading: 'Alcaraz Claims Victory in Epic Five-Set Final',
    body: 'The young Spaniard showcased his remarkable talent in a thrilling match that kept fans on the edge of their seats.',
    href: '#',
  },
  {
    id: '2',
    image: '/players/2news-2.jpg',
    imageAlt: 'Tennis championship trophy',
    badge: { text: 'Live', action: 'success' },
    subheading: 'WTA Tour',
    heading: 'Sabalenka Dominates in Straight Sets',
    body: 'World number one continues her impressive form with another commanding performance on the hard courts.',
    href: '#',
  },
  {
    id: '3',
    image: '/players/2news-3.jpg',
    imageAlt: 'Tennis court aerial view',
    badge: { text: 'Feature', action: 'info' },
    subheading: 'Grand Slam',
    heading: 'Australian Open 2026: What to Expect',
    body: 'A comprehensive preview of the first major of the year, including key matchups and dark horse predictions.',
    href: '#',
  },
];

export default function HomepagePage() {
  const [activeTab, setActiveTab] = useState('latest');
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null);

  // Handle circle navigation click - open corresponding story
  const handleStoryClick = (index: number) => {
    setSelectedStoryIndex(index);
  };

  // Handle story viewer close
  const handleCloseStories = () => {
    setSelectedStoryIndex(null);
  };

  // Create navigation items with click handlers
  const navigationItemsWithHandlers: CircleNavigationItem[] = circleNavigationItems.map(
    (item, index) => ({
      ...item,
      onClick: () => handleStoryClick(index),
    })
  );

  return (
    <div className="min-h-screen bg-bg-base flex flex-col">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-bg-base">
        <AppHeader variant="logo" />
      </div>

      {/* Sticky Tabs */}
      <div className="sticky top-[72px] z-40 bg-bg-base">
        <Tabs
          tabs={tabsData}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          align="stretch"
        />
      </div>

      {/* Main Scrollable Content */}
      <main className="flex-1">
        {activeTab === 'latest' && (
          <>
            {/* Circle Navigation */}
            <div className="px-4 py-4">
              <CircleNavigation items={navigationItemsWithHandlers} />
            </div>

            {/* Carousel News - flush with Rolex Banner below */}
            <div className="w-full">
              <CarouselNews items={carouselNewsItems} autoPlay autoPlayInterval={6000} />
            </div>

            {/* Rolex Clock Banner - flush directly below carousel */}
            <div className="w-full">
              <RolexClockBanner />
            </div>

            {/* InstaStories Section - using react-instastories library */}
            <InstaStoriesSection stories={instaStories} title="Must Watch Stories" layout="horizontal" />
          </>
        )}

        {activeTab === 'following' && (
          <>
            {/* Circle Navigation */}
            <div className="px-4 py-4">
              <CircleNavigation items={navigationItemsWithHandlers} />
            </div>

            {/* Carousel News - flush with Rolex Banner below */}
            <div className="w-full">
              <CarouselNews items={carouselNewsItems} autoPlay autoPlayInterval={6000} />
            </div>

            {/* Rolex Clock Banner - flush directly below carousel */}
            <div className="w-full">
              <RolexClockBanner />
            </div>

            {/* InstaStories Section - using react-instastories library */}
            <InstaStoriesSection stories={instaStories} title="Must Watch Stories" layout="horizontal" />
          </>
        )}

        {activeTab === 'watch' && (
          <>
            {/* InstaStories Section in 2-column grid layout */}
            <InstaStoriesSection 
              stories={instaStories} 
              title="Watch" 
              layout="full" 
              showTitle={false}
            />
          </>
        )}
      </main>

      {/* Sticky Footer */}
      <div className="sticky bottom-0 z-50">
        <AppFooter activeItem="home" />
      </div>

      {/* Stories Viewer - renders when a story is selected */}
      {selectedStoryIndex !== null && (
        <StoriesViewer
          stories={stories}
          initialStoryIndex={selectedStoryIndex}
          onClose={handleCloseStories}
        />
      )}
    </div>
  );
}
