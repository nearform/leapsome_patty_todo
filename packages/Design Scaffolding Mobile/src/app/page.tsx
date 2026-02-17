"use client";

import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/prototype-ui";
import { ArrowRight, SwatchBook, MonitorSmartphone, MousePointerClick } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <Box className="min-h-screen bg-bg-base transition-colors">
      {/* Hero Section */}
      <Box className="relative overflow-hidden">
        <Box className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-success/5" />
        <Box className="relative py-12 lg:py-20 px-4 lg:px-8 max-w-7xl mx-auto">
          <VStack space="xl" className="max-w-5xl mx-auto">
            <VStack space="lg" className="text-left">
              <Box className="p-3 bg-accent/10 rounded-xl w-fit">
                <SwatchBook className="w-12 h-12 text-accent" strokeWidth={1} />
              </Box>
              <Heading as="h1" size="5xl" className="bg-gradient-to-r from-accent to-accent-dark bg-clip-text text-transparent">
                Design System & Prototype
              </Heading>
              <Text size="xl" muted className="w-full">
                Welcome to your design system and prototype workspace. 
                Explore components, build user journeys, and create sprint prototypes. 
                Use the canvas to collaborate and add feedback on journey flows and designs.
              </Text>
            </VStack>

            {/* Navigation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mt-8">
              {/* Design System Card */}
              <Link href="/design-system">
                <Card variant="outline" className="h-full hover:border-accent transition-colors cursor-pointer p-6">
                  <CardHeader className="p-0">
                    <HStack space="md" className="items-center">
                      <Box className="p-2 bg-accent/10 rounded-lg">
                        <SwatchBook className="w-12 h-12 text-accent" strokeWidth={0.75} />
                      </Box>
                      <VStack space="xs" className="items-start flex-1">
                        <CardTitle>Design System</CardTitle>
                        <CardDescription>
                          Browse components, tokens, and design guidelines
                        </CardDescription>
                      </VStack>
                      <ArrowRight className="w-5 h-5 text-text-tertiary" />
                    </HStack>
                  </CardHeader>
                </Card>
              </Link>

              {/* Prototype Card */}
              <Link href="/prototype">
                <Card variant="outline" className="h-full hover:border-accent transition-colors cursor-pointer p-6">
                  <CardHeader className="p-0">
                    <HStack space="md" className="items-center">
                      <Box className="p-2 bg-accent/10 rounded-lg">
                        <MonitorSmartphone className="w-12 h-12 text-accent" strokeWidth={0.75} />
                      </Box>
                      <VStack space="xs" className="items-start flex-1">
                        <CardTitle>Prototype</CardTitle>
                        <CardDescription>
                          Interactive prototypes and user journeys
                        </CardDescription>
                      </VStack>
                      <ArrowRight className="w-5 h-5 text-text-tertiary" />
                    </HStack>
                  </CardHeader>
                </Card>
              </Link>

              {/* Canvas Card */}
              <Link href="/canvas">
                <Card variant="outline" className="h-full hover:border-accent transition-colors cursor-pointer p-6">
                  <CardHeader className="p-0">
                    <HStack space="md" className="items-center">
                      <Box className="p-2 bg-accent/10 rounded-lg">
                        <MousePointerClick className="w-12 h-12 text-accent" strokeWidth={0.75} />
                      </Box>
                      <VStack space="xs" className="items-start flex-1">
                      <CardTitle>Canvas</CardTitle>
                        <CardDescription>
                          Collaborative canvas for journey mapping
                        </CardDescription>
                      </VStack>
                      <ArrowRight className="w-5 h-5 text-text-tertiary" />
                    </HStack>
                  </CardHeader>
                </Card>
              </Link>
            </div>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
}
