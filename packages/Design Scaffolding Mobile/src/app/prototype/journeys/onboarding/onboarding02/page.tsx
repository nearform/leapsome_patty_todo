'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Box, VStack, HStack, Heading, Text, Button, Tabs, TournamentListItem } from '@/components/ui';
import { Progress } from '@/components/ui/progress';
import tournamentsData from '@/lib/data/tournaments.json';

// Define tournament type based on the JSON structure
interface Tournament {
  id: string;
  name: string;
  surface: string;
  location: string;
  tour: 'atp' | 'wta' | 'both';
  category: string;
}

// Tab configuration
const tabs = [
  { id: 'all', label: 'All' },
  { id: 'atp', label: 'ATP' },
  { id: 'wta', label: 'WTA' },
];

// Group tournaments by category/surface for display
interface TournamentGroup {
  title: string;
  tournaments: Tournament[];
}

function groupTournaments(tournaments: Tournament[]): TournamentGroup[] {
  const groups: TournamentGroup[] = [];
  
  // Grand Slams first
  const grandSlams = tournaments.filter(t => t.category === 'grand-slam');
  if (grandSlams.length > 0) {
    groups.push({ title: 'Grand Slams', tournaments: grandSlams });
  }
  
  // Hard Court tournaments
  const hardCourt = tournaments.filter(t => 
    t.surface === 'Hard' && t.category !== 'grand-slam'
  );
  if (hardCourt.length > 0) {
    groups.push({ title: 'Hard Court', tournaments: hardCourt });
  }
  
  // Clay Court tournaments
  const clayCourt = tournaments.filter(t => 
    t.surface === 'Clay' && t.category !== 'grand-slam'
  );
  if (clayCourt.length > 0) {
    groups.push({ title: 'Clay Court', tournaments: clayCourt });
  }
  
  // Grass Court tournaments (excluding Grand Slams)
  const grassCourt = tournaments.filter(t => 
    t.surface === 'Grass' && t.category !== 'grand-slam'
  );
  if (grassCourt.length > 0) {
    groups.push({ title: 'Grass Court', tournaments: grassCourt });
  }
  
  return groups;
}

export default function Onboarding02Page() {
  const [activeTab, setActiveTab] = useState('all');
  const [followedTournaments, setFollowedTournaments] = useState<Set<string>>(new Set());

  // Filter tournaments based on active tab
  const filteredTournaments = useMemo(() => {
    const allTournaments = tournamentsData.tournaments as Tournament[];
    
    switch (activeTab) {
      case 'atp':
        return allTournaments.filter(t => t.tour === 'atp' || t.tour === 'both');
      case 'wta':
        return allTournaments.filter(t => t.tour === 'wta' || t.tour === 'both');
      default:
        return allTournaments;
    }
  }, [activeTab]);

  // Group filtered tournaments
  const groupedTournaments = useMemo(() => {
    return groupTournaments(filteredTournaments);
  }, [filteredTournaments]);

  // Toggle follow state for a tournament
  const handleFollowToggle = (tournamentId: string) => {
    setFollowedTournaments((prev) => {
      const next = new Set(prev);
      if (next.has(tournamentId)) {
        next.delete(tournamentId);
      } else {
        next.add(tournamentId);
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
          <Link href="/prototype/journeys/onboarding/onboarding01">
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
            currentStep={2}
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
            Follow your tournaments
          </Heading>
          <Text className="text-text-secondary">
            Get updates when your favourite tournaments are live. You can change this anytime.
          </Text>
        </VStack>

        {/* Tabs */}
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          variant="underline"
          align="start"
        />
      </Box>

      {/* Scrollable Tournament List */}
      <Box className="flex-1 overflow-y-auto px-4 pb-24">
        {groupedTournaments.map((group) => (
          <Box key={group.title} className="mb-6">
            {/* Section Header */}
            <Text weight="semibold" size="sm" className="text-text-tertiary uppercase tracking-loose-lg mb-2">
              {group.title}
            </Text>
            
            {/* Tournament Items */}
            <VStack space="none" className="divide-y divide-border-decorative">
              {group.tournaments.map((tournament) => (
                <TournamentListItem
                  key={tournament.id}
                  name={tournament.name}
                  surface={tournament.surface}
                  isFollowing={followedTournaments.has(tournament.id)}
                  onFollowToggle={() => handleFollowToggle(tournament.id)}
                />
              ))}
            </VStack>
          </Box>
        ))}
        
        {groupedTournaments.length === 0 && (
          <Box className="py-12 text-center">
            <Text className="text-text-tertiary">
              No tournaments found
            </Text>
          </Box>
        )}
      </Box>

      {/* Sticky Footer */}
      <Box className="fixed bottom-0 left-0 right-0 bg-bg-elevated border-t border-border-decorative p-4 pb-8">
        <Link href="/prototype/journeys/onboarding/onboarding03" className="block">
          <Button
            variant="solid"
            action="primary"
            size="lg"
            isFullWidth
          >
            {followedTournaments.size > 0
              ? `Continue (${followedTournaments.size} selected)`
              : 'Continue'}
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
