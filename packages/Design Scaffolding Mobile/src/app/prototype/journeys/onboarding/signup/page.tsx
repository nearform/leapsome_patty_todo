'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react';
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Card,
  Input,
  InputField,
  Divider,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [updates, setUpdates] = useState(false);

  return (
    <Box className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <Box className="fixed inset-0 z-0">
        <Image
          src="/images/LoginScreen.jpg"
          alt="Tennis court background"
          fill
          priority
          className="object-cover"
          quality={90}
        />
        {/* Purple overlay */}
        <Box className="absolute inset-0 bg-accent/80" />
      </Box>

      {/* Content */}
      <Box className="relative z-10 flex min-h-screen flex-col">
        {/* Navigation Header */}
        <HStack className="items-center justify-between px-4 pt-4">
          {/* Back button */}
          <Link href="/prototype/journeys/onboarding/onboarding03">
            <Button
              variant="link"
              action="secondary"
              size="sm"
              className="p-0 h-auto text-white hover:text-white/80"
              leftIcon={<ChevronLeft className="h-5 w-5" />}
            >
              <span className="sr-only">Back</span>
            </Button>
          </Link>

          {/* Skip button */}
          <Link href="/prototype/journeys/homepage-content/homepage">
            <Button
              variant="link"
              action="secondary"
              className="text-white hover:text-white/80"
            >
              Skip
            </Button>
          </Link>
        </HStack>

        {/* Upper Section - Purple with Logos */}
        <Box className="flex-1 flex flex-col items-center justify-center px-6 py-4 md:py-6">
          <VStack space="md" className="w-full max-w-md text-center">
            {/* Logos */}
            <HStack space="md" className="items-center justify-center flex-wrap">
              <Image
                src="/images/ATP_Logo_White.svg"
                alt="ATP Logo"
                width={120}
                height={36}
                className="h-8 md:h-9 w-auto"
                priority
              />
              <Image
                src="/images/WTA_Logo_White.svg"
                alt="WTA Logo"
                width={100}
                height={36}
                className="h-8 md:h-9 w-auto"
                priority
              />
            </HStack>
            <Text size="lg" className="text-white">
              Unlock the full tennis experience
            </Text>
          </VStack>
        </Box>

        {/* Lower Section - White Roll-up with Form */}
        <Box className="relative z-20 mt-auto">
          <Box className="bg-bg-elevated rounded-t-3xl w-full min-h-[60vh]">
            <Box className="max-w-md mx-auto px-6 pb-8 md:pb-12 pt-8 md:pt-12">
              <VStack space="xl" className="w-full">
                {/* Header */}
                <VStack space="xs" className="text-center">
                  <Heading size="3xl" className="text-text-primary font-bold">
                    Create Account
                  </Heading>
                  <Text size="md" className="text-text-secondary">
                    Sign up to your personalised experience.
                  </Text>
                </VStack>

                {/* Social Login Buttons */}
                <VStack space="md" className="w-full">
                  <Button
                    variant="outline"
                    action="secondary"
                    size="lg"
                    isFullWidth
                    className="bg-bg-elevated border-border-decorative hover:bg-bg-secondary text-text-primary"
                    leftIcon={
                      <Image
                        src="/images/Apple_Logo.svg"
                        alt="Apple"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                    }
                  >
                    Continue with Apple
                  </Button>
                  <Button
                    variant="outline"
                    action="secondary"
                    size="lg"
                    isFullWidth
                    className="bg-bg-elevated border-border-decorative hover:bg-bg-secondary text-text-primary"
                    leftIcon={
                      <Image
                        src="/images/Google_Logo.svg"
                        alt="Google"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                    }
                  >
                    Continue with Google
                  </Button>
                </VStack>

                {/* Divider with "or sign up with email" */}
                <Box className="relative flex items-center justify-center">
                  <Divider className="flex-1" />
                  <Text size="sm" className="px-4 text-text-tertiary">
                    or sign up with email
                  </Text>
                  <Divider className="flex-1" />
                </Box>

                {/* Form Fields */}
                <VStack space="md" className="w-full">
                  {/* First Name Field */}
                  <FormControl>
                    <FormControlLabel>
                      <FormControlLabelText size="sm" className="font-medium text-text-primary">
                        First name
                      </FormControlLabelText>
                    </FormControlLabel>
                    <Input className="mt-1">
                      <InputField type="text" placeholder="First name" />
                    </Input>
                  </FormControl>

                  {/* Last Name Field */}
                  <FormControl>
                    <FormControlLabel>
                      <FormControlLabelText size="sm" className="font-medium text-text-primary">
                        Last name
                      </FormControlLabelText>
                    </FormControlLabel>
                    <Input className="mt-1">
                      <InputField type="text" placeholder="Last name" />
                    </Input>
                  </FormControl>

                  {/* Email Field */}
                  <FormControl>
                    <FormControlLabel>
                      <FormControlLabelText size="sm" className="font-medium text-text-primary">
                        Email
                      </FormControlLabelText>
                    </FormControlLabel>
                    <Input className="mt-1">
                      <InputField type="email" placeholder="Enter your email" />
                    </Input>
                  </FormControl>

                  {/* Password Field */}
                  <FormControl>
                    <FormControlLabel>
                      <FormControlLabelText size="sm" className="font-medium text-text-primary">
                        Password
                      </FormControlLabelText>
                    </FormControlLabel>
                    <div className="relative mt-1">
                      <Input>
                        <InputField
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Create a password"
                          className="pr-10"
                        />
                      </Input>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-primary transition-colors z-10"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>

                  {/* Terms Checkbox */}
                  <Checkbox
                    isChecked={rememberMe}
                    onChange={(checked) => setRememberMe(checked)}
                    label={
                      <Text size="sm" className="text-text-secondary">
                        I agree to the{' '}
                        <Link href="#" className="text-accent hover:underline">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="#" className="text-accent hover:underline">
                          Privacy Policy
                        </Link>
                      </Text>
                    }
                    size="sm"
                  />

                  {/* Updates Checkbox */}
                  <Checkbox
                    isChecked={updates}
                    onChange={(checked) => setUpdates(checked)}
                    label={
                      <Text size="sm" className="text-text-secondary">
                        Send me updates about tennis news and app features
                      </Text>
                    }
                    size="sm"
                  />

                  {/* Sign Up Button */}
                  <Link href="/prototype/journeys/onboarding/welcome" className="w-full">
                    <Button
                      size="lg"
                      variant="solid"
                      action="primary"
                      isFullWidth
                    >
                      Sign up
                    </Button>
                  </Link>

                  {/* Sign In Link */}
                  <Text size="sm" className="text-center text-text-secondary">
                    Already have an account?{' '}
                    <Link href="/prototype/journeys/onboarding/login" className="text-accent hover:underline">
                      Sign in
                    </Link>
                  </Text>
                </VStack>
              </VStack>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
