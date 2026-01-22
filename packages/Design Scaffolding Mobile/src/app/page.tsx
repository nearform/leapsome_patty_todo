"use client";

import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui";
import { ArrowRight, SwatchBook, MonitorSmartphone, MousePointerClick } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <Box className="min-h-screen bg-bg-base transition-colors">
      {/* Hero Section */}
      <Box className="relative overflow-hidden">
        <Box className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-success/5" />
        <Box className="relative py-12 lg:py-20 px-4 lg:px-8 max-w-7xl mx-auto">
          <VStack space="xl" className="max-w-5xl mx-auto">
            <VStack space="lg" className="text-left">
              <HStack space="md" className="items-center">
                <Image
                  src="/images/ATP_Logo_Color.svg"
                  alt="ATP Logo"
                  width={80}
                  height={40}
                  className="h-10 w-auto"
                />
                <Image
                  src="/images/WTA_Logo_Color.svg"
                  alt="WTA Logo"
                  width={80}
                  height={40}
                  className="h-10 w-auto"
                />
              </HStack>
              <Heading as="h1" size="5xl" className="bg-gradient-to-r from-accent to-accent-dark bg-clip-text text-transparent">
                Design System & Prototype
              </Heading>
              <Text size="xl" muted className="w-full">
                Welcome to the ATP/WTA design system and prototype workspace. 
                Explore the design system components, user journeys, and sprint prototypes. 
                Use the whiteboard to collaborate and add feedback on journey flows and designs.
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

              {/* Whiteboard Card */}
              <Link href="/whiteboard">
                <Card variant="outline" className="h-full hover:border-accent transition-colors cursor-pointer p-6">
                  <CardHeader className="p-0">
                    <HStack space="md" className="items-center">
                      <Box className="p-2 bg-accent/10 rounded-lg">
                        <MousePointerClick className="w-12 h-12 text-accent" strokeWidth={0.75} />
                      </Box>
                      <VStack space="xs" className="items-start flex-1">
                        <CardTitle>Whiteboard</CardTitle>
                        <CardDescription>
                          Collaborative whiteboard for journey mapping
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