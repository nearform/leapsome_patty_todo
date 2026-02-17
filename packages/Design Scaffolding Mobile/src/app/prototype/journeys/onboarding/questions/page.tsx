"use client";

import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Input,
  InputField,
  InputSlot,
  InputIcon,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
  Textarea,
  TextareaInput,
} from "@/components/prototype-ui";
import { ArrowLeft, User, AtSign, FileText } from "lucide-react";
import Link from "next/link";

export default function OnboardingQuestionsPage() {
  return (
    <Box className="min-h-screen bg-bg-base flex flex-col">
      {/* Header */}
      <Box className="px-6 py-4 flex items-center justify-between border-b border-border-subtle">
        <Link href="/prototype/journeys/onboarding/login">
          <button
            type="button"
            className="p-2 rounded-full hover:bg-bg-elevated transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-text-primary" />
          </button>
        </Link>
        <Text size="sm" muted>
          Step 2 of 3
        </Text>
        <Box className="w-9" />
      </Box>

      {/* Progress Bar */}
      <Box className="px-6 pt-4">
        <Box className="w-full h-1.5 bg-bg-elevated rounded-full overflow-hidden">
          <Box className="w-2/3 h-full bg-accent rounded-full transition-all" />
        </Box>
      </Box>

      {/* Main Content */}
      <Box className="flex-1 px-6 py-8">
        <VStack space="xl" className="max-w-sm mx-auto w-full">
          {/* Heading */}
          <VStack space="sm">
            <Heading size="2xl">Complete Your Profile</Heading>
            <Text muted>
              Tell us a bit about yourself so we can personalize your experience.
            </Text>
          </VStack>

          {/* Form Fields */}
          <VStack space="lg" className="w-full">
            {/* Username */}
            <FormControl isRequired>
              <FormControlLabel>
                <FormControlLabelText>Username</FormControlLabelText>
              </FormControlLabel>
              <Input size="lg" variant="outline">
                <InputSlot className="pl-3">
                  <InputIcon as={AtSign} />
                </InputSlot>
                <InputField placeholder="Choose a username" />
              </Input>
              <FormControlHelper>
                <FormControlHelperText>
                  This will be your unique identifier
                </FormControlHelperText>
              </FormControlHelper>
            </FormControl>

            {/* First Name */}
            <FormControl isRequired>
              <FormControlLabel>
                <FormControlLabelText>First Name</FormControlLabelText>
              </FormControlLabel>
              <Input size="lg" variant="outline">
                <InputSlot className="pl-3">
                  <InputIcon as={User} />
                </InputSlot>
                <InputField placeholder="Your first name" />
              </Input>
            </FormControl>

            {/* Last Name */}
            <FormControl isRequired>
              <FormControlLabel>
                <FormControlLabelText>Last Name</FormControlLabelText>
              </FormControlLabel>
              <Input size="lg" variant="outline">
                <InputSlot className="pl-3">
                  <InputIcon as={User} />
                </InputSlot>
                <InputField placeholder="Your last name" />
              </Input>
            </FormControl>

            {/* Bio */}
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Bio</FormControlLabelText>
              </FormControlLabel>
              <Textarea size="md" variant="outline">
                <TextareaInput placeholder="Tell us a little about yourself..." />
              </Textarea>
              <FormControlHelper>
                <FormControlHelperText>
                  Optional - you can always add this later
                </FormControlHelperText>
              </FormControlHelper>
            </FormControl>
          </VStack>

          {/* Continue Button */}
          <Link href="/prototype/journeys/onboarding/confirmation" className="w-full">
            <Button size="lg" className="w-full">
              Continue
            </Button>
          </Link>
        </VStack>
      </Box>
    </Box>
  );
}
