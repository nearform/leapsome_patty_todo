"use client";

import { Box, VStack, HStack, Heading, Text, Badge, Card, CardContent, Button } from "@/components/prototype-ui";
import { journey } from "./_journey";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import QRCode from "react-qr-code";

export default function OnboardingJourneyPage() {
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

  return (
    <Box className="min-h-screen bg-bg-base p-8">
      <VStack space="xl" className="max-w-6xl mx-auto">
        {/* Header */}
        <HStack className="w-full justify-between items-start">
          <VStack space="sm" className="items-start">
            <Link href="/prototype/journeys">
              <Button variant="link" action="secondary" leftIcon={ArrowLeft} className="px-0">
                Back to Journeys
              </Button>
            </Link>
            <HStack space="md" className="items-center">
              <Heading size="3xl">{journey.title}</Heading>
              <Badge
                action={
                  journey.status === "completed"
                    ? "success"
                    : journey.status === "in-progress"
                    ? "info"
                    : "muted"
                }
              >
                {journey.status}
              </Badge>
            </HStack>
            <Text muted className="max-w-2xl">
              {journey.description}
            </Text>
          </VStack>
        </HStack>

        {/* Pages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {journey.pages.map((page) => (
            <Card key={page.id} variant="outline" className="overflow-hidden">
              <CardContent className="p-6">
                <VStack space="md" className="items-center">
                  {/* QR Code */}
                  <Box className="p-4 bg-white rounded-lg">
                    <QRCode
                      value={`${baseUrl}${page.path}`}
                      size={120}
                      level="M"
                    />
                  </Box>

                  {/* Page Info */}
                  <VStack space="xs" className="items-center text-center">
                    <Text weight="semibold">{page.name}</Text>
                    {page.description && (
                      <Text size="sm" muted>
                        {page.description}
                      </Text>
                    )}
                  </VStack>

                  {/* Link */}
                  <Link href={page.path} className="w-full">
                    <Button
                      variant="outline"
                      action="secondary"
                      rightIcon={ExternalLink}
                      className="w-full"
                    >
                      Open Page
                    </Button>
                  </Link>
                </VStack>
              </CardContent>
            </Card>
          ))}
        </div>
      </VStack>
    </Box>
  );
}
