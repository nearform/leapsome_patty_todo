'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Bell, BarChart3, Zap, Trophy, User } from 'lucide-react';
import { Box, VStack, HStack, Heading, Text, Button, Switch } from '@/components/ui';
import { Progress } from '@/components/ui/progress';

// Notification settings configuration
interface NotificationSetting {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const notificationSettings: NotificationSetting[] = [
  {
    id: 'match-alerts',
    icon: <Bell className="h-7 w-7" strokeWidth={1.5} />,
    title: 'Match Alerts',
    description: "Get notified when your followed players' matches start",
  },
  {
    id: 'score-updates',
    icon: <BarChart3 className="h-7 w-7" strokeWidth={1.5} />,
    title: 'Score Updates',
    description: 'Final scores and set results for matches you care about',
  },
  {
    id: 'breaking-news',
    icon: <Zap className="h-7 w-7" strokeWidth={1.5} />,
    title: 'Breaking News',
    description: 'Major announcements, withdrawals, and tour updates',
  },
  {
    id: 'tournament-updates',
    icon: <Trophy className="h-7 w-7" strokeWidth={1.5} />,
    title: 'Tournament Updates',
    description: 'Draw releases, schedule changes, and results from followed tournaments',
  },
  {
    id: 'player-news',
    icon: <User className="h-7 w-7" strokeWidth={1.5} />,
    title: 'Player News',
    description: 'News and stories about the players you follow',
  },
];

export default function Onboarding03Page() {
  const [enabledNotifications, setEnabledNotifications] = useState<Set<string>>(
    new Set(['match-alerts', 'score-updates', 'breaking-news'])
  );

  const handleToggle = (id: string) => {
    setEnabledNotifications((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
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
          <Link href="/prototype/journeys/onboarding/onboarding02">
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
            currentStep={3}
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
            Stay in the Loop
          </Heading>
          <Text className="text-text-secondary">
            We&apos;ll only send you the notifications you choose. Select from the categories below:
          </Text>
        </VStack>
      </Box>

      {/* Scrollable Content */}
      <Box className="flex-1 overflow-y-auto px-4 pb-24">
        <VStack space="none" className="divide-y divide-border-decorative">
          {notificationSettings.map((setting) => (
            <HStack
              key={setting.id}
              className="py-4 items-start justify-between gap-4"
            >
              {/* Icon and Text */}
              <HStack className="items-start gap-3 flex-1 min-w-0">
                <Box className="flex-shrink-0 text-accent mt-0.5">
                  {setting.icon}
                </Box>
                <VStack space="xs" className="flex-1 min-w-0">
                  <Text weight="semibold" className="text-text-primary">
                    {setting.title}
                  </Text>
                  <Text size="sm" className="text-text-secondary">
                    {setting.description}
                  </Text>
                </VStack>
              </HStack>

              {/* Toggle */}
              <Box className="flex-shrink-0 pt-1">
                <Switch
                  checked={enabledNotifications.has(setting.id)}
                  onCheckedChange={() => handleToggle(setting.id)}
                  size="md"
                />
              </Box>
            </HStack>
          ))}
        </VStack>
      </Box>

      {/* Sticky Footer */}
      <Box className="fixed bottom-0 left-0 right-0 bg-bg-elevated border-t border-border-decorative p-4 pb-8">
        <Link href="/prototype/journeys/onboarding/signup" className="block">
          <Button
            variant="solid"
            action="primary"
            size="lg"
            isFullWidth
          >
            Continue
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
