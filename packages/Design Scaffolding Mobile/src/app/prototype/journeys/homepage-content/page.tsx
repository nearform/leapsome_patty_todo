'use client';

import Link from 'next/link';
import { ArrowLeft, MousePointerClick, SquareCheckBig } from 'lucide-react';
import { Box, VStack, HStack, Heading, Text, Button } from '@/components/ui';
import { journey } from './_journey';
import QRCode from 'react-qr-code';
import { useEffect, useState } from 'react';

export default function HomepageContentJourneyPage() {
  const [baseUrl, setBaseUrl] = useState("https://main.d2bprmygt7j0ws.amplifyapp.com");

  useEffect(() => {
    // Use current origin if available, fallback to deployed URL
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
  }, []);

  return (
    <Box className="min-h-screen bg-bg-base transition-colors">
      {/* Hero Section */}
      <Box className="relative overflow-hidden">
        <Box className="absolute inset-0 bg-gradient-to-br from-success/5 via-transparent to-accent/5" />
        <Box className="relative py-6 lg:py-8 px-4 lg:px-8 max-w-[1800px] mx-auto">
          <VStack space="xl" className="max-w-full">
            {/* Title Section with Back Button and Navigation */}
            <VStack space="md" className="w-full">
              <HStack space="md" className="items-center justify-between w-full">
                <HStack space="md" className="items-center">
                  <Link href="/prototype">
                    <Button 
                      variant="solid"
                      action="primary"
                      size="sm"
                      className="rounded-full w-8 h-8 p-0"
                    >
                      <ArrowLeft className="w-4 h-4 text-white" />
                    </Button>
                  </Link>
                  <Heading as="h1" size="5xl" className="text-accent">
                    {journey.title}
                  </Heading>
                </HStack>
                <HStack space="sm" className="items-center">
                  <Link href="/prototype/whiteboard">
                    <Button 
                      variant="outline"
                      action="primary"
                      leftIcon={<MousePointerClick className="w-4 h-4" />}
                      className="rounded-full"
                    >
                      Whiteboard
                    </Button>
                  </Link>
                  <Link href="/prototype/journeys">
                    <Button 
                      variant="outline"
                      action="primary"
                      leftIcon={<SquareCheckBig className="w-4 h-4" />}
                      className="rounded-full"
                    >
                      Status
                    </Button>
                  </Link>
                </HStack>
              </HStack>
              {/* Divider Line */}
              <Box className="w-full h-px bg-border-decorative" />
            </VStack>

            {/* Description Text */}
            <Text size="lg" muted className="w-full">
              Explore interactive pages in this journey. Each page forms part of a complete user flow. 
              Scan the QR codes with your mobile device to view pages on mobile, or click the boxes to navigate directly to each page.
            </Text>

            {/* Pages Grid with QR Codes */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-6 w-full mt-8">
              {journey.pages.map((page) => {
                const fullUrl = `${baseUrl}${page.path}`;
                return (
                  <Link key={page.id} href={page.path}>
                    <VStack space="sm" className="items-center group cursor-pointer transition-transform hover:-translate-y-1 duration-200">
                      {/* QR Code Box */}
                      <Box className="w-full aspect-square p-6 bg-bg-primary border border-gray-300 rounded-lg hover:border-accent hover:shadow-lg transition-all flex items-center justify-center">
                        <QRCode
                          value={fullUrl}
                          size={128}
                          level="M"
                          className="w-full h-full"
                        />
                      </Box>
                      {/* Page Name */}
                      <Text size="sm" className="text-center text-text-secondary group-hover:text-accent transition-colors font-medium">
                        {page.name}
                      </Text>
                    </VStack>
                  </Link>
                );
              })}
            </div>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
}
