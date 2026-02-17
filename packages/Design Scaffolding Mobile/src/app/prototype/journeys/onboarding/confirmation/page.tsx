"use client";

import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Divider,
  Alert,
  AlertIcon,
  AlertText,
} from "@/components/prototype-ui";
import { CheckCircle2, PartyPopper, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function OnboardingConfirmationPage() {
  return (
    <Box className="min-h-screen bg-bg-base flex flex-col">
      {/* Progress Bar */}
      <Box className="px-6 pt-4">
        <Box className="w-full h-1.5 bg-bg-elevated rounded-full overflow-hidden">
          <Box className="w-full h-full bg-success rounded-full transition-all" />
        </Box>
      </Box>

      {/* Main Content */}
      <Box className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <VStack space="xl" className="max-w-sm mx-auto w-full items-center">
          {/* Success Icon */}
          <Box className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-success" />
          </Box>

          {/* Heading */}
          <VStack space="sm" className="text-center">
            <Heading size="2xl">You&apos;re All Set!</Heading>
            <Text muted className="text-center">
              Your account has been created successfully. Welcome aboard!
            </Text>
          </VStack>

          {/* Success Alert */}
          <Alert action="success" variant="accent" className="w-full">
            <AlertIcon as={PartyPopper} />
            <AlertText>
              Your profile is ready. You can start exploring right away.
            </AlertText>
          </Alert>

          {/* Account Summary */}
          <Box className="w-full p-4 bg-bg-elevated rounded-xl">
            <VStack space="md">
              <Text weight="semibold" size="sm" className="text-text-secondary uppercase tracking-wider">
                Account Summary
              </Text>
              <Divider />
              <HStack className="justify-between items-center">
                <Text muted size="sm">Username</Text>
                <Text weight="medium" size="sm">@johndoe</Text>
              </HStack>
              <HStack className="justify-between items-center">
                <Text muted size="sm">Name</Text>
                <Text weight="medium" size="sm">John Doe</Text>
              </HStack>
              <HStack className="justify-between items-center">
                <Text muted size="sm">Email</Text>
                <Text weight="medium" size="sm">john@example.com</Text>
              </HStack>
              <HStack className="justify-between items-center">
                <Text muted size="sm">Status</Text>
                <HStack space="xs" className="items-center">
                  <Box className="w-2 h-2 rounded-full bg-success" />
                  <Text weight="medium" size="sm" className="text-success">Active</Text>
                </HStack>
              </HStack>
            </VStack>
          </Box>

          {/* Actions */}
          <VStack space="md" className="w-full">
            <Link href="/prototype/journeys/onboarding" className="w-full">
              <Button size="lg" className="w-full" rightIcon={ArrowRight}>
                Get Started
              </Button>
            </Link>
            <Link href="/prototype/journeys/onboarding/login" className="w-full">
              <Button variant="outline" action="secondary" size="lg" className="w-full">
                Back to Login
              </Button>
            </Link>
          </VStack>
        </VStack>
      </Box>
    </Box>
  );
}
