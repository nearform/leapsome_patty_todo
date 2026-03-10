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
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <Box className="min-h-screen bg-bg-base flex flex-col">
      {/* Header */}
      <Box className="px-6 py-4 flex items-center justify-center border-b border-border-subtle">
        <Box className="p-2 bg-accent/10 rounded-lg">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-accent"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18" />
            <path d="M9 21V9" />
          </svg>
        </Box>
      </Box>

      {/* Main Content */}
      <Box className="flex-1 flex flex-col justify-center px-6 py-8">
        <VStack space="xl" className="max-w-sm mx-auto w-full">
          {/* Welcome Text */}
          <VStack space="sm" className="text-center">
            <Heading size="2xl">Welcome Back</Heading>
            <Text muted>Sign in to access your account</Text>
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
            <Link href="/prototype/journeys/banking/dashboard" className="w-full">
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
              <Image
                src="/images/Apple_Logo.svg"
                alt="Apple"
                width={20}
                height={20}
                className="dark:invert"
              />
            </Button>
            <Button
              variant="outline"
              action="secondary"
              size="lg"
              className="flex-1"
            >
              <Image
                src="/images/Google_Logo.svg"
                alt="Google"
                width={20}
                height={20}
              />
            </Button>
          </HStack>

          {/* Sign Up Link */}
          <HStack space="xs" className="justify-center">
            <Text muted>Don&apos;t have an account?</Text>
            <Button variant="link" action="primary" size="sm">
              Sign up
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
}
