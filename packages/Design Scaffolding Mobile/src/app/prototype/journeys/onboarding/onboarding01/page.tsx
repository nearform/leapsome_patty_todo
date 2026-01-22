'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ChevronLeft, Search } from 'lucide-react';
import { Box, VStack, HStack, Heading, Text, Button, Input, InputField, Tabs, Select, SelectOption } from '@/components/ui';
import { Progress } from '@/components/ui/progress';
import { PlayerListItem } from '@/components/ui/player-list-item';
import playersData from '@/lib/data/players.json';

// Define player type based on the JSON structure
interface Player {
  id: number;
  name: string;
  fullName: string;
  flag: string;
  country: string;
  countryName: string;
  rank: string;
  tour: string;
  image: string;
}

// Tab configuration
const tabs = [
  { id: 'all', label: 'All' },
  { id: 'country', label: 'Country' },
  { id: 'popular', label: 'Popular' },
  { id: 'atp', label: 'ATP' },
  { id: 'wta', label: 'WTA' },
];

// Helper to extract rank number from rank string (e.g., "#3 ATP" -> 3)
function extractRankNumber(rank: string): number {
  const match = rank.match(/#(\d+)/);
  return match ? parseInt(match[1], 10) : 999;
}

// Helper to get country abbreviation for display
function getCountryAbbrev(countryCode: string): string {
  const abbrevMap: Record<string, string> = {
    US: 'USA',
    IT: 'ITA',
    PL: 'POL',
    ES: 'ESP',
    BY: 'BEL', // Belarus shown as BEL in design
    RS: 'SER',
    GB: 'GBR',
    DK: 'DEN',
    RU: 'RUS',
    KZ: 'KAZ',
    AU: 'AUS',
    CA: 'CAN',
    FR: 'FRA',
    DE: 'GER',
  };
  return abbrevMap[countryCode] || countryCode;
}

// Helper to convert image path from players.json to public path
function getImagePath(imagePath: string): string {
  // Convert "Images/sinner.jpg" to "/players/sinner.jpg"
  return imagePath.replace('Images/', '/players/');
}

export default function Onboarding01Page() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [followedPlayers, setFollowedPlayers] = useState<Set<number>>(new Set());
  const [selectedCountry, setSelectedCountry] = useState('');

  // Get unique players (remove duplicates by fullName)
  const uniquePlayers = useMemo(() => {
    const seen = new Set<string>();
    return (playersData.players as Player[]).filter((player) => {
      if (seen.has(player.fullName)) return false;
      seen.add(player.fullName);
      return true;
    });
  }, []);

  // Get unique countries from players data
  const uniqueCountries = useMemo(() => {
    const countriesMap = new Map<string, string>();
    uniquePlayers.forEach((player) => {
      if (!countriesMap.has(player.country)) {
        countriesMap.set(player.country, player.countryName);
      }
    });
    return Array.from(countriesMap.entries())
      .map(([code, name]) => ({ code, name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [uniquePlayers]);

  // Filter players based on active tab and search query
  const filteredPlayers = useMemo(() => {
    let players = [...uniquePlayers];

    // Apply tab filter
    switch (activeTab) {
      case 'country':
        if (selectedCountry) {
          players = players.filter((p) => p.country === selectedCountry);
        }
        break;
      case 'popular':
        players = players
          .sort((a, b) => extractRankNumber(a.rank) - extractRankNumber(b.rank))
          .slice(0, 10);
        break;
      case 'atp':
        players = players.filter((p) => p.tour === 'atp');
        break;
      case 'wta':
        players = players.filter((p) => p.tour === 'wta');
        break;
      default:
        // 'all' - no filter
        break;
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      players = players.filter(
        (p) =>
          p.fullName.toLowerCase().includes(query) ||
          p.name.toLowerCase().includes(query) ||
          p.countryName.toLowerCase().includes(query)
      );
    }

    return players;
  }, [uniquePlayers, activeTab, searchQuery, selectedCountry]);

  // Toggle follow state for a player
  const handleFollowToggle = (playerId: number) => {
    setFollowedPlayers((prev) => {
      const next = new Set(prev);
      if (next.has(playerId)) {
        next.delete(playerId);
      } else {
        next.add(playerId);
      }
      return next;
    });
  };

  return (
    <Box className="min-h-screen bg-bg-elevated flex flex-col">
      {/* Fixed Header */}
      <Box className="sticky top-0 z-20 bg-bg-elevated px-4 pt-4 pb-2">
        {/* Top row: Back, Progress, Skip */}
        <HStack className="items-center justify-between mb-6">
          {/* Back button */}
          <Link href="/prototype/journeys/onboarding/login">
            <Button
              variant="link"
              action="secondary"
              size="sm"
              className="p-0 h-auto"
              leftIcon={<ChevronLeft className="h-5 w-5" />}
            >
              <span className="sr-only">Back</span>
            </Button>
          </Link>

          {/* Progress bar */}
          <Progress
            currentStep={1}
            totalSteps={4}
            className="w-40"
          />

          {/* Skip button */}
          <Link href="/prototype/journeys/homepage-content/homepage">
            <Button
              variant="link"
              action="secondary"
            >
              Skip
            </Button>
          </Link>
        </HStack>

        {/* Title section */}
        <VStack space="xs" className="text-center mb-6">
          <Heading as="h1" size="2xl">
            Follow your players
          </Heading>
          <Text className="text-text-secondary">
            Pick your current favourites. You can change and update whenever you want.
          </Text>
        </VStack>

        {/* Search field */}
        <Box className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-tertiary pointer-events-none z-10" />
          <Input className="bg-bg-elevated">
            <InputField
              placeholder="Search players"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12"
            />
          </Input>
        </Box>

        {/* Tabs */}
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          variant="underline"
          align="start"
        />

        {/* Country Select - shown when Country tab is active */}
        {activeTab === 'country' && (
          <Box className="mt-4">
            <Select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              placeholder="Select a country"
              className="bg-bg-elevated"
            >
              {uniqueCountries.map((country) => (
                <SelectOption key={country.code} value={country.code}>
                  {country.name}
                </SelectOption>
              ))}
            </Select>
          </Box>
        )}
      </Box>

      {/* Scrollable Player List */}
      <Box className="flex-1 overflow-y-auto px-4 pb-24">
        <VStack space="none" className="divide-y divide-border-decorative">
          {filteredPlayers.map((player) => (
            <PlayerListItem
              key={player.id}
              name={player.fullName}
              rankNumber={extractRankNumber(player.rank)}
              countryCode={player.country}
              countryName={getCountryAbbrev(player.country)}
              avatarUrl={getImagePath(player.image)}
              isFollowing={followedPlayers.has(player.id)}
              onFollowToggle={() => handleFollowToggle(player.id)}
            />
          ))}
          {filteredPlayers.length === 0 && (
            <Box className="py-12 text-center">
              <Text className="text-text-tertiary">
                No players found
              </Text>
            </Box>
          )}
        </VStack>
      </Box>

      {/* Sticky Footer */}
      <Box className="fixed bottom-0 left-0 right-0 bg-bg-elevated border-t border-border-decorative p-4 pb-8">
        <Link href="/prototype/journeys/onboarding/onboarding02" className="block">
          <Button
            variant="solid"
            action="primary"
            size="lg"
            isFullWidth
          >
            {followedPlayers.size > 0
              ? `Continue (${followedPlayers.size} selected)`
              : 'Continue'}
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
