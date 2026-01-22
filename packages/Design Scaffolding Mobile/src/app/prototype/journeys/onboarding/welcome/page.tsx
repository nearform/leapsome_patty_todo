'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Box, Heading, Text, Button } from '@/components/ui';

export default function WelcomePage() {
  return (
    <Box className="min-h-screen bg-bg-elevated flex items-center justify-center p-4">
      <div className="flex flex-col items-center gap-8 w-full max-w-md text-center">
        {/* Title */}
        <Heading as="h1" size="3xl">
          You&apos;re all set
        </Heading>

        {/* Tennis Ball Icon - accent color in light mode, white in dark mode */}
        <div className="flex items-center justify-center">
          <Image
            src="/images/tennis-ball-outline.svg"
            alt="Tennis ball"
            width={100}
            height={100}
            className="dark:invert dark:brightness-100 brightness-0 saturate-100 [filter:invert(32%)_sepia(98%)_saturate(1234%)_hue-rotate(222deg)_brightness(95%)_contrast(93%)] dark:[filter:invert(1)]"
          />
        </div>

        {/* Description */}
        <Text size="lg" className="text-text-secondary">
          Your personalised tennis experience is ready. Enjoy the action.
        </Text>

        {/* CTA Button */}
        <div className="w-full px-4">
          <Link href="/prototype/journeys/homepage-content/homepage" className="block">
            <Button
              variant="solid"
              action="primary"
              size="lg"
              isFullWidth
            >
              Start exploring
            </Button>
          </Link>
        </div>
      </div>
    </Box>
  );
}
