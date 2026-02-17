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
  Checkbox,
  Divider,
} from "@/components/prototype-ui";
import { Mail, Lock, Eye, EyeOff, UserPlus } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function OnboardingLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <Box className="min-h-screen bg-bg-base flex flex-col">
      {/* Header */}
      <Box className="px-6 py-4 flex items-center justify-center border-b border-border-subtle">
        <Box className="p-2 bg-accent/10 rounded-lg">
          <UserPlus className="w-8 h-8 text-accent" />
        </Box>
      </Box>

      {/* Main Content */}
      <Box className="flex-1 flex flex-col justify-center px-6 py-8">
        <VStack space="xl" className="max-w-sm mx-auto w-full">
          {/* Welcome Text */}
          <VStack space="sm" className="text-center">
            <Heading size="2xl">Welcome</Heading>
            <Text muted>Sign in or create an account to get started</Text>
          </VStack>

          {/* Form */}
          <VStack space="md" className="w-full">
            {/* Email */}
            <Input size="lg" variant="outline">
              <InputSlot className="pl-3">
                <InputIcon as={Mail} />
              </InputSlot>
              <InputField placeholder="Email address" type="email" />
            </Input>

            {/* Password */}
            <Input size="lg" variant="outline">
              <InputSlot className="pl-3">
                <InputIcon as={Lock} />
              </InputSlot>
              <InputField
                placeholder="Password"
                type={showPassword ? "text" : "password"}
              />
              <InputSlot className="pr-3">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-text-tertiary hover:text-text-primary"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </InputSlot>
            </Input>

            {/* Remember Me & Forgot Password */}
            <HStack className="justify-between items-center">
              <Checkbox
                isChecked={rememberMe}
                onChange={setRememberMe}
                label="Remember me"
              />
              <Button variant="link" action="primary" size="sm">
                Forgot password?
              </Button>
            </HStack>

            {/* Sign In Button */}
            <Link href="/prototype/journeys/onboarding/questions" className="w-full">
              <Button size="lg" className="w-full">
                Sign In
              </Button>
            </Link>
          </VStack>

          {/* Divider */}
          <HStack className="items-center w-full">
            <Divider className="flex-1" />
            <Text size="sm" muted className="px-4">
              or continue with
            </Text>
            <Divider className="flex-1" />
          </HStack>

          {/* Social Login */}
          <HStack space="md" className="w-full">
            <Button
              variant="outline"
              action="secondary"
              size="lg"
              className="flex-1"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
            </Button>
            <Button
              variant="outline"
              action="secondary"
              size="lg"
              className="flex-1"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            </Button>
          </HStack>

          {/* Sign Up Link */}
          <HStack space="xs" className="justify-center">
            <Text muted>Don&apos;t have an account?</Text>
            <Link href="/prototype/journeys/onboarding/questions">
              <Button variant="link" action="primary" size="sm">
                Sign up
              </Button>
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
}
