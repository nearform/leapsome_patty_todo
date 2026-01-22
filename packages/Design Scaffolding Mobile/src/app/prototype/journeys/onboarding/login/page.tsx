'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Box, VStack, HStack, Heading, Text, Button } from '@/components/ui';

export default function LoginPage() {
  return (
    <Box className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <Box className="fixed inset-0 z-0">
        <Image
          src="/images/LoadingScreen.jpg"
          alt="Tennis court background"
          fill
          priority
          className="object-cover"
          quality={90}
        />
        {/* Dark overlay for text readability */}
        <Box className="absolute inset-0 bg-black/40" />
      </Box>

      {/* Content */}
      <Box className="relative z-10 flex min-h-screen flex-col px-6 py-8">
        {/* Skip Button - Top Right */}
        <Box className="flex justify-end">
          <Link href="/prototype/journeys/homepage-content/homepage">
            <Button
              variant="link"
              action="secondary"
              className="text-white hover:text-white/80 animate-fade-in"
            >
              Skip
            </Button>
          </Link>
        </Box>

        {/* Main Content - Centered */}
        <Box className="flex flex-1 flex-col items-center justify-center">
          <VStack space="xl" className="w-full max-w-md text-center">
            {/* Logos */}
            <HStack space="md" className="items-center justify-center animate-fade-in animate-delay-100">
              <Image
                src="/images/ATP_Logo_White.svg"
                alt="ATP Logo"
                width={120}
                height={36}
                className="h-9 w-auto"
                priority
              />
              <Image
                src="/images/WTA_Logo_White.svg"
                alt="WTA Logo"
                width={100}
                height={36}
                className="h-9 w-auto"
                priority
              />
            </HStack>

            {/* Heading and Subtitle */}
            <VStack space="xs" className="animate-fade-in-up animate-delay-200">
              <Heading 
                as="h1" 
                size="4xl" 
                className="text-white font-bold leading-tight uppercase"
              >
                THE HOME OF TENNIS
              </Heading>
              <Text 
                size="lg" 
                className="text-white leading-relaxed"
              >
                Every match. Every player. Every story.
              </Text>
            </VStack>
          </VStack>
        </Box>

        {/* Action Buttons - Anchored to Bottom */}
        <Box className="w-full max-w-md mx-auto pb-8 animate-fade-in-up animate-delay-400">
          <VStack space="md" className="w-full">
            <Link href="/prototype/journeys/onboarding/onboarding01" className="w-full">
              <Button
                size="xl"
                variant="solid"
                action="primary"
                isFullWidth
              >
                Create an account
              </Button>
            </Link>
            
            <Link href="/prototype/journeys/onboarding/welcome" className="w-full text-center">
              <Button
                variant="link"
                className="text-white hover:text-white/80"
              >
                Sign in
              </Button>
            </Link>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
}
