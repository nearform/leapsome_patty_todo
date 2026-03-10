'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, Plus, MousePointerClick, SquareCheckBig } from 'lucide-react';
import { Box, VStack, HStack, Heading, Text, Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, Divider } from '@/components/prototype-ui';
import { getAllJourneys, getJourneysByStatus } from '@/lib/data/journeys-registry';

export default function JourneysIndexPage() {
  const journeys = getAllJourneys();
  const activeJourneys = getJourneysByStatus('in-progress');
  const draftJourneys = getJourneysByStatus('draft');
  const completedJourneys = getJourneysByStatus('completed');

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
                    All Journeys
                  </Heading>
                </HStack>
                <HStack space="sm" className="items-center">
                  <Link href="/canvas">
                    <Button 
                      variant="outline"
                      action="primary"
                      leftIcon={<MousePointerClick className="w-4 h-4" />}
                      className="rounded-full"
                    >
                      Canvas
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
              Browse and explore all user journeys in the prototype. Each journey contains 
              multiple interactive pages that demonstrate different flows. Journeys are marked 
              as <strong>Active</strong> when they're currently being worked on, <strong>Draft</strong> when 
              they're in the planning phase, and <strong>Completed</strong> when they're finished.
            </Text>

          {/* Quick Stats */}
          <HStack space="lg" className="flex-wrap">
            <Card className="px-6 py-4">
              <HStack space="md" className="items-center">
                <Badge variant="solid" action="info">{activeJourneys.length}</Badge>
                <Text>Active</Text>
              </HStack>
            </Card>
            <Card className="px-6 py-4">
              <HStack space="md" className="items-center">
                <Badge variant="solid" action="muted">{draftJourneys.length}</Badge>
                <Text>Draft</Text>
              </HStack>
            </Card>
            <Card className="px-6 py-4">
              <HStack space="md" className="items-center">
                <Badge variant="solid" action="success">{completedJourneys.length}</Badge>
                <Text>Completed</Text>
              </HStack>
            </Card>
          </HStack>

          <Divider />

          {/* Journeys Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {journeys.map((journey) => (
              <Link key={journey.id} href={`/prototype/journeys/${journey.id}`}>
                <Card variant="outline" className="h-full hover:border-accent hover:shadow-lg transition-all cursor-pointer">
                  <CardHeader>
                    <HStack space="md" className="items-start justify-between">
                      <VStack space="sm" className="items-start flex-1">
                        <HStack space="sm" className="items-center">
                          <CardTitle>{journey.title}</CardTitle>
                        </HStack>
                        <Badge 
                          variant="outline"
                          action={
                            journey.status === 'in-progress' ? 'info' : 
                            journey.status === 'completed' ? 'success' : 'muted'
                          }
                        >
                          {journey.status === 'in-progress' ? 'Active' : 
                           journey.status === 'completed' ? 'Completed' : 'Draft'}
                        </Badge>
                      </VStack>
                      <ArrowRight className="w-5 h-5 text-text-muted" />
                    </HStack>
                    <CardDescription className="mt-2">{journey.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Text size="sm" muted>
                      {journey.pages.length} {journey.pages.length === 1 ? 'page' : 'pages'}
                    </Text>
                    {journey.pages.length > 0 && (
                      <VStack space="xs" className="mt-3">
                        {journey.pages.slice(0, 3).map((page) => (
                          <Text key={page.id} size="xs" className="text-text-muted">
                            • {page.name}
                          </Text>
                        ))}
                        {journey.pages.length > 3 && (
                          <Text size="xs" className="text-accent">
                            +{journey.pages.length - 3} more
                          </Text>
                        )}
                      </VStack>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}

            {/* Add New Journey Placeholder */}
            <Card variant="outline" className="border-dashed border-2 hover:border-accent transition-colors">
              <CardContent className="h-full flex items-center justify-center py-12">
                <VStack space="md" className="items-center text-center">
                  <Box className="p-4 bg-bg-subtle rounded-full">
                    <Plus className="w-8 h-8 text-text-muted" />
                  </Box>
                  <Text weight="semibold">Add New Journey</Text>
                  <Text size="sm" muted className="max-w-[200px]">
                    Create a new journey folder in src/app/prototype/journeys/
                  </Text>
                </VStack>
              </CardContent>
            </Card>
          </div>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
}
