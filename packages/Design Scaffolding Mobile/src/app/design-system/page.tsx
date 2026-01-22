"use client";

import {
  Box,
  Divider,
  HStack,
  VStack,
  Heading,
  Text,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  AppHeader,
  AppFooter,
  RolexClockBanner,
  CircleNavigation,
  Tabs,
  type Tab,
  CarouselNews,
  type CarouselNewsItem,
  InstaStoriesSection,
  type InstaStoryData,
  StoriesViewer,
  type StoryData,
  HeadToHead,
  RankingsModule,
  type RankedPlayer,
  type TopMover,
  type AISummary,
  // Gluestack components
  Pressable,
  Skeleton,
  SkeletonText,
  Progress,
  ProgressFilledTrack,
} from "@/components/ui";
import { DSHeader as Header } from "@/components/ds-docs";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

// Demo tabs data
const demoTabs: Tab[] = [
  { id: "account", label: "My Account" },
  { id: "company", label: "Company" },
  { id: "team", label: "Team Members" },
  { id: "billing", label: "Billing" },
  { id: "notifications", label: "Notifications" },
  { id: "integrations", label: "Integrations" },
  { id: "security", label: "Security" },
];

// Demo carousel news data
const demoNewsItems: CarouselNewsItem[] = [
  {
    id: "news-1",
    image: "/images/players/2news-1.jpg",
    imageAlt: "Marta Kostyuk celebrating after defeating Mirra Andreeva in Brisbane",
    badge: {
      text: "BREAKING",
      action: "info",
    },
    subheading: "Breaking Story · WTA",
    heading: "Kostyuk upsets Andreeva in Brisbane; into first semifinal in 21 months",
    body: "Marta Kostyuk defeated Mirra Andreeva in two tight sets in a first-time encounter",
  },
  {
    id: "news-2",
    image: "/images/players/2news-2.jpg",
    imageAlt: "Poland team celebrating United Cup victory over Australia",
    badge: {
      text: "BREAKING",
      action: "info",
    },
    subheading: "Breaking Story · United Cup",
    heading: "Kawa/Zielinski clinch tie-decider, send Poland into United Cup 2026 SFs",
    body: "A deciding mixed-doubles rubber to send Poland past Australia into the United Cup semi-finals",
  },
  {
    id: "news-3",
    image: "/images/players/2news-3.jpg",
    imageAlt: "Marta Kostyuk hitting an angled passing shot in Brisbane",
    badge: {
      text: "MOMENT",
      action: "muted",
    },
    subheading: "Moment · Brisbane",
    heading: "Hot shot: Marta Kostyuk breaks in Brisbane with absurd angled pass",
    body: "Kostyuk captured the first break of serve against Andreeva with some phenomenal defensive work",
  },
];

// Demo InstaStories data
const demoInstaStories: InstaStoryData[] = [
  {
    id: "story-1",
    category: "ATP",
    headline: "Sinner dominates in straight sets victory",
    summary: "World No. 1 Jannik Sinner delivered a masterclass performance, dispatching his opponent in straight sets to advance to the quarterfinals.",
    localImage: "/players/sinner.jpg",
    date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    ctaLabel: "Read Full Story",
  },
  {
    id: "story-2",
    category: "WTA",
    headline: "Sabalenka powers through to semifinals",
    summary: "Aryna Sabalenka showcased her trademark power game, overwhelming her opponent to book her spot in the tournament semifinals.",
    localImage: "/players/sabalenka.jpg",
    date: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    ctaLabel: "Watch Highlights",
  },
  {
    id: "story-3",
    category: "ATP",
    headline: "Alcaraz stages incredible comeback",
    summary: "Carlos Alcaraz fought back from a set down to claim a thrilling five-set victory in one of the matches of the tournament.",
    localImage: "/players/alacaraz.jpg",
    date: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
    ctaLabel: "Read Full Story",
  },
  {
    id: "story-4",
    category: "WTA",
    headline: "Swiatek extends winning streak",
    summary: "Iga Swiatek continued her dominant form, extending her winning streak with another convincing victory on the clay courts.",
    localImage: "/players/swiatek.jpg",
    date: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    ctaLabel: "Match Report",
  },
  {
    id: "story-5",
    category: "ATP",
    headline: "Djokovic makes history again",
    summary: "Novak Djokovic added another milestone to his legendary career with a record-breaking performance at the Grand Slam.",
    localImage: "/players/Djokovic.jpg",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    ctaLabel: "Read Full Story",
  },
];

// Demo Rankings data
const demoAtpRankings: RankedPlayer[] = [
  { name: "C. Alcaraz", countryCode: "ES", rank: 1 },
  { name: "J. Sinner", countryCode: "IT", rank: 2 },
  { name: "A. Zverev", countryCode: "DE", rank: 3 },
  { name: "N. Djokovic", countryCode: "RS", rank: 4 },
  { name: "F. Auger-Aliassime", countryCode: "CA", rank: 5 },
];

const demoWtaRankings: RankedPlayer[] = [
  { name: "A. Sabalenka", countryCode: "BY", rank: 1 },
  { name: "I. Swiatek", countryCode: "PL", rank: 2 },
  { name: "A. Anisimova", countryCode: "US", rank: 3 },
  { name: "C. Gauff", countryCode: "US", rank: 4 },
  { name: "E. Rybakina", countryCode: "KZ", rank: 5 },
];

// Demo data for medium variant (with avatars and points)
const demoAtpRankingsMedium: RankedPlayer[] = [
  { name: "J. Sinner", countryCode: "IT", rank: 1, avatarUrl: "/players/sinner.jpg", points: 11830 },
  { name: "C. Alcaraz", countryCode: "ES", rank: 2, avatarUrl: "/players/alacaraz.jpg", points: 9675 },
  { name: "A. Zverev", countryCode: "DE", rank: 3, avatarUrl: "/players/zverev.jpg", points: 8135 },
];

const demoWtaRankingsMedium: RankedPlayer[] = [
  { name: "A. Sabalenka", countryCode: "BY", rank: 1, avatarUrl: "/players/sabalenka.jpg", points: 10990 },
  { name: "I. Swiatek", countryCode: "PL", rank: 2, avatarUrl: "/players/swiatek.jpg", points: 8328 },
  { name: "C. Gauff", countryCode: "US", rank: 3, avatarUrl: "/players/gauff.jpg", points: 6423 },
];

// Demo data for expanded variant (WTA Singles)
const demoWtaRankingsExpanded: RankedPlayer[] = [
  { name: "A. Sabalenka", countryCode: "BY", rank: 1, avatarUrl: "/players/sabalenka.jpg", points: 10990 },
  { name: "I. Swiatek", countryCode: "PL", rank: 2, avatarUrl: "/players/swiatek.jpg", points: 8328 },
  { name: "C. Gauff", countryCode: "US", rank: 3, avatarUrl: "/players/gauff.jpg", points: 6423 },
];

// Demo data for AI Enhanced variant (ATP Singles)
const demoAtpRankingsAIEnhanced: RankedPlayer[] = [
  { name: "C. Alcaraz", countryCode: "ES", rank: 1, avatarUrl: "/players/alacaraz.jpg", points: 12050 },
  { name: "J. Sinner", countryCode: "IT", rank: 2, avatarUrl: "/players/sinner.jpg", points: 11500 },
  { name: "A. Zverev", countryCode: "DE", rank: 3, avatarUrl: "/players/zverev.jpg", points: 5105 },
];

// Demo AI Summary
const demoAISummary: AISummary = {
  title: "This Week in Rankings",
  description: "Major movement. Rune drops 4 spots after early exit. De Minaur rises to career-high #6.",
};

// Demo Top Movers
const demoTopMovers: TopMover[] = [
  {
    player: {
      name: "A. de Minaur",
      countryCode: "AU",
      rank: 6,
      avatarUrl: "/players/Minaur.jpeg",
    },
    isUpward: true,
    positionsChanged: 4,
    newRank: 6,
  },
  {
    player: {
      name: "H. Rune",
      countryCode: "DK",
      rank: 17,
      avatarUrl: "/players/Rune.jpg",
    },
    isUpward: false,
    positionsChanged: 4,
    newRank: 17,
  },
];

// Demo Stories Viewer data (uses StoryData type)
const demoStoriesViewerData: StoryData[] = [
  {
    id: "viewer-story-1",
    category: "ATP",
    headline: "Sinner dominates in straight sets victory",
    summary: "World No. 1 Jannik Sinner delivered a masterclass performance, dispatching his opponent in straight sets to advance to the quarterfinals. His powerful serve and precise groundstrokes were on full display.",
    localImage: "/players/sinner.jpg",
    date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    ctaLabel: "Read Full Story",
  },
  {
    id: "viewer-story-2",
    category: "WTA",
    headline: "Sabalenka powers through to semifinals",
    summary: "Aryna Sabalenka showcased her trademark power game, overwhelming her opponent to book her spot in the tournament semifinals. Her aggressive baseline play proved too much to handle.",
    localImage: "/players/sabalenka.jpg",
    date: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    ctaLabel: "Watch Highlights",
  },
  {
    id: "viewer-story-3",
    category: "ATP",
    headline: "Alcaraz stages incredible comeback",
    summary: "Carlos Alcaraz fought back from a set down to claim a thrilling five-set victory in one of the matches of the tournament. The young Spaniard showed incredible mental fortitude.",
    localImage: "/players/alacaraz.jpg",
    date: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    ctaLabel: "Read Full Story",
  },
];

export default function ComponentsPage() {
  const [activeTab, setActiveTab] = useState("team");
  const [activePillTab, setActivePillTab] = useState("account");
  const [showStoriesViewer, setShowStoriesViewer] = useState(false);

  return (
    <Box className="min-h-screen bg-bg-base transition-colors">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <Box className="relative overflow-hidden">
        <Box className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-success/5" />
        <Box className="relative py-12 lg:py-20 px-4 lg:px-8 max-w-[1800px] mx-auto w-full">
          <VStack space="lg" className="items-start w-full">
            <Heading as="h1" size="5xl" className="bg-gradient-to-r from-accent to-accent-dark bg-clip-text text-transparent">
              Duet Design System
            </Heading>
            <Text size="xl" muted className="max-w-2xl text-left">
              Where simplicity meets elegance. Duet unites ATP and WTA under one harmonious 
              design language. Built with React, Tailwind CSS, and modern tooling to create 
              beautiful, accessible mobile and web experiences.
            </Text>
            <HStack space="md" className="pt-4">
              <Button size="lg" rightIcon={ArrowRight}>
                Get Started
              </Button>
              <Button variant="outline" size="lg" action="secondary">
                Documentation
              </Button>
            </HStack>
          </VStack>
        </Box>
      </Box>

      {/* Components Showcase - Bento Box Layout */}
      <Box className="max-w-[1800px] mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Navigation & Layout - Large feature card: 2 cols, 2 rows */}
          <div className="relative md:col-span-2 lg:col-span-2 lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-bg-elevated lg:rounded-l-[2rem]" />
            <Card variant="ghost" size="lg" className="relative h-full rounded-lg lg:rounded-l-[calc(2rem+1px)] overflow-hidden">
              <CardHeader>
                <CardTitle>Navigation & Layout</CardTitle>
                <CardDescription>Headers, footers, tabs, and navigation components</CardDescription>
              </CardHeader>
              <CardContent>
                <VStack space="xl">
                  {/* AppHeader - Logo Variant */}
                  <Box>
                    <Text weight="semibold" className="mb-3">App Header - Logo Variant</Text>
                    <Text size="sm" muted className="mb-4">
                      Header with ATP logo on the left and action buttons on the right. Theme-aware logo switching.
                    </Text>
                    <Box className="rounded-lg overflow-hidden bg-bg-base">
                      <AppHeader variant="logo" />
                    </Box>
                  </Box>

                  <Divider />

                  {/* AppHeader - Title Variant */}
                  <Box>
                    <Text weight="semibold" className="mb-3">App Header - Title Variant</Text>
                    <Text size="sm" muted className="mb-4">
                      Header with page title for nested pages and detail views.
                    </Text>
                    <Box className="rounded-lg overflow-hidden bg-bg-base">
                      <AppHeader variant="title" title="Home" />
                    </Box>
                  </Box>

                  <Divider />

                  {/* AppFooter */}
                  <Box>
                    <Text weight="semibold" className="mb-3">App Footer</Text>
                    <Text size="sm" muted className="mb-4">
                      Bottom navigation with Home, Matches, Tournaments, Rankings, and Discover sections.
                    </Text>
                    <Box className="rounded-lg overflow-hidden bg-bg-elevated">
                      <AppFooter activeItem="matches" />
                    </Box>
                  </Box>

                  <Divider />

                  {/* Circle Navigation */}
                  <Box>
                    <Text weight="semibold" className="mb-3">Circle Navigation</Text>
                    <Text size="sm" muted className="mb-4">
                      Horizontally scrollable navigation with circular items and mobile swipe support.
                    </Text>
                    <Box className="rounded-lg p-6 bg-bg-base">
                      <CircleNavigation
                        items={[
                          { id: "1", label: "Live Matches", image: "/images/players/Alcaraz.png", isLive: true },
                          { id: "2", label: "Upcoming", image: "/images/players/Bencic.png" },
                          { id: "3", label: "Highlights", image: "/images/players/Sabalenka.png" },
                          { id: "4", label: "Standings", image: "/images/players/ClayCourt.png" },
                          { id: "5", label: "News", image: "/images/players/BlueCourt.png" },
                        ]}
                      />
                    </Box>
                  </Box>

                  <Divider />

                  {/* Tabs */}
                  <Box>
                    <Text weight="semibold" className="mb-3">Tabs</Text>
                    <Text size="sm" muted className="mb-4">
                      Scrollable tab navigation with animated underline indicator and keyboard navigation.
                    </Text>
                    <VStack space="lg">
                      <Box>
                        <Text size="sm" weight="medium" className="mb-2 text-text-secondary">Underline Variant</Text>
                        <Box className="rounded-lg overflow-hidden bg-bg-base">
                          <Tabs
                            tabs={demoTabs}
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                          />
                          <Box className="p-4">
                            <Text size="sm" muted>Active tab: <span className="text-accent font-medium">{activeTab}</span></Text>
                          </Box>
                        </Box>
                      </Box>
                      <Box>
                        <Text size="sm" weight="medium" className="mb-2 text-text-secondary">Pill Variant</Text>
                        <Box className="rounded-lg p-4 bg-bg-base">
                          <Tabs
                            tabs={demoTabs.slice(0, 4)}
                            activeTab={activePillTab}
                            onTabChange={setActivePillTab}
                            variant="pill"
                            align="stretch"
                          />
                        </Box>
                      </Box>
                    </VStack>
                  </Box>
                </VStack>
              </CardContent>
            </Card>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 dark:ring-white/10 lg:rounded-l-[2rem]" />
          </div>

          {/* Feedback & Loading - Tall card: 1 col, 2 rows */}
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-bg-elevated lg:rounded-tr-[2rem]" />
            <Card variant="ghost" size="lg" className="relative h-full rounded-lg lg:rounded-tr-[calc(2rem+1px)] overflow-hidden">
              <CardHeader>
                <CardTitle>Feedback & Loading</CardTitle>
                <CardDescription>Loading states, progress indicators, and interactive elements</CardDescription>
              </CardHeader>
              <CardContent>
                <VStack space="xl">
                  {/* Skeleton Component */}
                  <Box>
                    <Text weight="semibold" className="mb-3">Skeleton</Text>
                    <Text size="sm" muted className="mb-4">
                      Loading state placeholders with various shapes.
                    </Text>
                    <Box className="rounded-lg p-6 bg-bg-base">
                      <VStack space="md">
                        <HStack space="md" className="items-center">
                          <Skeleton variant="circular" className="w-12 h-12" />
                          <VStack space="sm" className="flex-1">
                            <Skeleton variant="rounded" className="h-4 w-3/4" />
                            <Skeleton variant="rounded" className="h-3 w-1/2" />
                          </VStack>
                        </HStack>
                        <SkeletonText numberOfLines={3} />
                      </VStack>
                    </Box>
                  </Box>

                  <Divider />

                  {/* Progress Component */}
                  <Box>
                    <Text weight="semibold" className="mb-3">Progress</Text>
                    <Text size="sm" muted className="mb-4">
                      Percentage-based and stepped progress indicators.
                    </Text>
                    <Box className="rounded-lg p-6 bg-bg-base">
                      <VStack space="md">
                        <Progress value={60} size="md">
                          <ProgressFilledTrack />
                        </Progress>
                        <Progress value={30} size="lg">
                          <ProgressFilledTrack colorScheme="success" />
                        </Progress>
                        <Progress totalSteps={5} currentStep={3} size="md" />
                      </VStack>
                    </Box>
                  </Box>

                  <Divider />

                  {/* Pressable Component */}
                  <Box>
                    <Text weight="semibold" className="mb-3">Pressable</Text>
                    <Text size="sm" muted className="mb-4">
                      Touch-friendly wrapper with feedback states.
                    </Text>
                    <Box className="rounded-lg p-6 bg-bg-base">
                      <HStack space="md">
                        <Pressable 
                          onPress={() => alert("Pressed!")}
                          className="p-4 bg-bg-tertiary rounded-lg hover:bg-bg-secondary active:scale-95 transition-all"
                        >
                          <Text>Press me</Text>
                        </Pressable>
                        <Pressable 
                          onPress={() => {}}
                          isDisabled
                          className="p-4 bg-bg-tertiary rounded-lg"
                        >
                          <Text>Disabled</Text>
                        </Pressable>
                      </HStack>
                    </Box>
                  </Box>

                  <Divider />

                  {/* Rolex Clock Banner */}
                  <Box>
                    <Text weight="semibold" className="mb-3">Rolex Clock Banner</Text>
                    <Text size="sm" muted className="mb-4">
                      Responsive banner ad component displaying a Rolex world clock widget.
                    </Text>
                    <Box className="rounded-lg overflow-hidden bg-bg-base">
                      <RolexClockBanner />
                    </Box>
                  </Box>
                </VStack>
              </CardContent>
            </Card>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 dark:ring-white/10 lg:rounded-tr-[2rem]" />
          </div>

          {/* Content Carousels - Full width: 3 cols on desktop */}
          <div className="relative md:col-span-2 lg:col-span-3">
            <div className="absolute inset-px rounded-lg bg-bg-elevated" />
            <Card variant="ghost" size="lg" className="relative h-full rounded-lg overflow-hidden">
              <CardHeader>
                <CardTitle>Content Carousels</CardTitle>
                <CardDescription>News carousels, stories, and media content components</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Carousel News & Stories Viewer - 1/3 width */}
                  <VStack space="xl">
                    {/* Carousel News */}
                    <Box>
                      <Text weight="semibold" className="mb-3">Carousel News</Text>
                      <Text size="sm" muted className="mb-4">
                        Mobile-first swipeable news carousel with indicator dots and badge overlays.
                      </Text>
                      <Box className="rounded-lg overflow-hidden bg-bg-base p-4">
                        <CarouselNews items={demoNewsItems} />
                      </Box>
                    </Box>

                    {/* Stories Viewer */}
                    <Box>
                      <Text weight="semibold" className="mb-3">Stories Viewer</Text>
                      <Text size="sm" muted className="mb-4">
                        Fullscreen story viewer with progress indicators and tap-to-navigate zones.
                      </Text>
                      <Box className="rounded-lg p-6 bg-bg-base">
                        <VStack space="md" className="items-start">
                          <Text size="sm" className="text-text-secondary">
                            Click the button below to open the fullscreen Stories Viewer demo.
                          </Text>
                          <Button 
                            onClick={() => setShowStoriesViewer(true)}
                            action="primary"
                          >
                            Open Stories Viewer Demo
                          </Button>
                        </VStack>
                      </Box>
                    </Box>
                  </VStack>

                  {/* InstaStories - 2/3 width */}
                  <Box className="lg:col-span-2">
                    <Text weight="semibold" className="mb-3">InstaStories</Text>
                    <Text size="sm" muted className="mb-4">
                      Instagram-style stories with horizontal scroll and fullscreen viewer.
                    </Text>
                    <VStack space="lg">
                      <Box>
                        <Text size="sm" weight="medium" className="mb-2 text-text-secondary">Horizontal Layout</Text>
                        <Box className="rounded-lg overflow-hidden bg-bg-base">
                          <InstaStoriesSection 
                            stories={demoInstaStories} 
                            title="Latest Stories"
                            layout="horizontal"
                          />
                        </Box>
                      </Box>
                      <Box>
                        <Text size="sm" weight="medium" className="mb-2 text-text-secondary">Grid Layout</Text>
                        <Box className="rounded-lg overflow-hidden bg-bg-base">
                          <InstaStoriesSection 
                            stories={demoInstaStories.slice(0, 4)} 
                            title="Featured Stories"
                            layout="grid"
                          />
                        </Box>
                      </Box>
                    </VStack>
                  </Box>
                </div>

                {/* Stories Viewer Modal */}
                {showStoriesViewer && (
                  <StoriesViewer
                    stories={demoStoriesViewerData}
                    initialStoryIndex={0}
                    onClose={() => setShowStoriesViewer(false)}
                  />
                )}
              </CardContent>
            </Card>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 dark:ring-white/10" />
          </div>

          {/* Rankings - Full width: 3 cols */}
          <div className="relative md:col-span-2 lg:col-span-3">
            <div className="absolute inset-px rounded-lg bg-bg-elevated" />
            <Card variant="ghost" size="lg" className="relative h-full rounded-lg overflow-hidden">
              <CardHeader>
                <CardTitle>Rankings</CardTitle>
                <CardDescription>ATP and WTA player rankings with multiple display variants</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Column 1: Simple + Medium stacked */}
                  <VStack space="lg">
                    <Box>
                      <Text size="sm" weight="medium" className="mb-2 text-text-secondary">Simple Variant</Text>
                      <Box className="rounded-lg p-4 bg-bg-base">
                        <RankingsModule
                          atpPlayers={demoAtpRankings}
                          wtaPlayers={demoWtaRankings}
                          onFullRankingsClick={() => console.log("View full rankings")}
                        />
                      </Box>
                    </Box>
                    <Box>
                      <Text size="sm" weight="medium" className="mb-2 text-text-secondary">Medium Variant</Text>
                      <Box className="rounded-lg p-4 bg-bg-base">
                        <RankingsModule
                          variant="medium"
                          atpPlayers={demoAtpRankingsMedium}
                          wtaPlayers={demoWtaRankingsMedium}
                          onFullRankingsClick={() => console.log("View full rankings")}
                        />
                      </Box>
                    </Box>
                  </VStack>
                  {/* Column 2: Expanded */}
                  <Box>
                    <Text size="sm" weight="medium" className="mb-2 text-text-secondary">Expanded Variant</Text>
                    <Box className="rounded-lg p-4 bg-bg-base">
                      <RankingsModule
                        variant="expanded"
                        atpPlayers={demoAtpRankingsMedium}
                        wtaPlayers={demoWtaRankingsExpanded}
                        updatedDate="Jan 15, 2025"
                        onSearchClick={() => console.log("Search rankings")}
                        onCategoryChange={(cat) => console.log("Category changed:", cat)}
                      />
                    </Box>
                  </Box>
                  {/* Column 3: AI Enhanced */}
                  <Box>
                    <Text size="sm" weight="medium" className="mb-2 text-text-secondary">AI Enhanced Variant</Text>
                    <Box className="rounded-lg p-4 bg-bg-base">
                      <RankingsModule
                        variant="ai-enhanced"
                        tour="atp"
                        category="singles"
                        atpPlayers={demoAtpRankingsAIEnhanced}
                        wtaPlayers={demoWtaRankingsExpanded}
                        aiSummary={demoAISummary}
                        topMovers={demoTopMovers}
                        onExplainChangesClick={() => console.log("Explain changes clicked")}
                      />
                    </Box>
                  </Box>
                </div>
              </CardContent>
            </Card>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 dark:ring-white/10" />
          </div>

          {/* Head to Head - Full width: 3 cols */}
          <div className="relative md:col-span-2 lg:col-span-3">
            <div className="absolute inset-px rounded-lg bg-bg-elevated lg:rounded-b-[2rem]" />
            <Card variant="ghost" size="lg" className="relative h-full rounded-lg lg:rounded-b-[calc(2rem+1px)] overflow-hidden">
              <CardHeader>
                <CardTitle>Head to Head</CardTitle>
                <CardDescription>Player comparison components with H2H scores and surface statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Column 1: Simple + With Names + Medium stacked */}
                  <VStack space="lg">
                    <Box>
                      <Text size="sm" weight="medium" className="mb-2 text-text-secondary">Simple Variant</Text>
                      <Box className="rounded-lg p-4 bg-bg-base">
                        <HeadToHead
                          player1={{
                            name: "C. Alcaraz",
                            imageUrl: "/players/alacaraz.jpg",
                            countryCode: "es",
                            ranking: 1,
                          }}
                          player2={{
                            name: "J. Sinner",
                            imageUrl: "/players/sinner.jpg",
                            countryCode: "it",
                            ranking: 2,
                          }}
                          score={{ player1: 10, player2: 6 }}
                        />
                      </Box>
                    </Box>
                    <Box>
                      <Text size="sm" weight="medium" className="mb-2 text-text-secondary">With Names</Text>
                      <Box className="rounded-lg p-4 bg-bg-base">
                        <HeadToHead
                          player1={{
                            name: "C. Alcaraz",
                            imageUrl: "/players/alacaraz.jpg",
                            countryCode: "es",
                            ranking: 1,
                          }}
                          player2={{
                            name: "J. Sinner",
                            imageUrl: "/players/sinner.jpg",
                            countryCode: "it",
                            ranking: 2,
                          }}
                          score={{ player1: 10, player2: 6 }}
                          showNames
                        />
                      </Box>
                    </Box>
                    <Box>
                      <Text size="sm" weight="medium" className="mb-2 text-text-secondary">Medium Variant</Text>
                      <Box className="rounded-lg p-4 bg-bg-base">
                        <HeadToHead
                          player1={{
                            name: "C. Alcaraz",
                            imageUrl: "/players/alacaraz.jpg",
                            countryCode: "es",
                            ranking: 1,
                          }}
                          player2={{
                            name: "J. Sinner",
                            imageUrl: "/players/sinner.jpg",
                            countryCode: "it",
                            ranking: 2,
                          }}
                          score={{ player1: 10, player2: 6 }}
                          showNames
                          surfaceStats={{ hard: "7-3", clay: "3-1", grass: "0-2" }}
                          lastMatch={{ winner: "player2", score: "6-4, 6-4", tournament: "Nitto ATP Finals" }}
                        />
                      </Box>
                    </Box>
                  </VStack>
                  {/* Column 2: Expanded */}
                  <Box>
                    <Text size="sm" weight="medium" className="mb-2 text-text-secondary">Expanded Variant</Text>
                    <Box className="rounded-lg p-4 bg-bg-base">
                      <HeadToHead
                        player1={{
                          name: "C. Alcaraz",
                          imageUrl: "/players/alacaraz.jpg",
                          countryCode: "es",
                          ranking: 1,
                        }}
                        player2={{
                          name: "J. Sinner",
                          imageUrl: "/players/sinner.jpg",
                          countryCode: "it",
                          ranking: 2,
                        }}
                        score={{ player1: 10, player2: 6 }}
                        expandedSurfaceStats={{
                          hard: { player1: 7, player2: 3 },
                          clay: { player1: 3, player2: 1 },
                          grass: { player1: 0, player2: 2 },
                        }}
                      />
                    </Box>
                  </Box>
                  {/* Column 3: AI Enhanced */}
                  <Box>
                    <Text size="sm" weight="medium" className="mb-2 text-text-secondary">AI-Enhanced Variant</Text>
                    <Box className="rounded-lg p-4 bg-bg-base">
                      <HeadToHead
                        player1={{
                          name: "C. Alcaraz",
                          imageUrl: "/players/alacaraz.jpg",
                          countryCode: "es",
                          ranking: 1,
                        }}
                        player2={{
                          name: "J. Sinner",
                          imageUrl: "/players/sinner.jpg",
                          countryCode: "it",
                          ranking: 2,
                        }}
                        score={{ player1: 10, player2: 6 }}
                        showNames
                        aiAnalysis={{
                          title: "Rivalry Analysis",
                          content: "Their last 3 meetings went to a final set. Alcaraz dominates on hard, but Sinner has the edge on grass."
                        }}
                        aiFollowUp={{ question: "Why does Sinner dominate on grass?" }}
                        onAskFollowUp={(question) => console.log("Ask:", question)}
                      />
                    </Box>
                  </Box>
                </div>
              </CardContent>
            </Card>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 dark:ring-white/10 lg:rounded-b-[2rem]" />
          </div>

        </div>
      </Box>
    </Box>
  );
}
