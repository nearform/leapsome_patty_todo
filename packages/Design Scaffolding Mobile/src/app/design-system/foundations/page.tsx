"use client";

import {
  Box,
  Center,
  Divider,
  HStack,
  VStack,
  Heading,
  Text,
  Button,
  Input,
  InputField,
  InputSlot,
  InputIcon,
  Alert,
  AlertTitle,
  AlertDescription,
  Spinner,
  TennisBallLoader,
  BouncingTennisBallLoader,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarBadge,
  AvatarFlagBadge,
  Icon,
  RadioGroup,
  Radio,
  RadioIndicator,
  RadioLabel,
  Textarea,
  TextareaInput,
  Link,
  LinkText,
  Checkbox,
  Switch,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Drawer,
  DrawerBackdrop,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
} from "@/components/ui";
import { DSHeader as Header } from "@/components/ds-docs";
import { useState } from "react";
import { 
  Mail, 
  ArrowRight, 
  Search, 
  User, 
  Menu, 
  Home as HomeIcon, 
  Calendar, 
  Bell, 
  Play, 
  History, 
  Users, 
  Volume2, 
  MessageCircle, 
  Globe, 
  Clock, 
  EyeOff, 
  Moon, 
  Star,
  Copy,
  Check,
  Heart,
  Settings,
} from "lucide-react";

// Icons data for the Icons bento box
const icons = [
  { name: "search", icon: Search, label: "Search" },
  { name: "user", icon: User, label: "User" },
  { name: "menu", icon: Menu, label: "Hamburger" },
  { name: "home", icon: HomeIcon, label: "Home" },
  { name: "calendar", icon: Calendar, label: "Calendar" },
  { name: "bell", icon: Bell, label: "Alert" },
  { name: "play", icon: Play, label: "Video" },
  { name: "history", icon: History, label: "Recap" },
  { name: "users", icon: Users, label: "Head to Head" },
  { name: "volume-2", icon: Volume2, label: "Audio" },
  { name: "message-circle", icon: MessageCircle, label: "Ask" },
  { name: "globe", icon: Globe, label: "Globe" },
  { name: "clock", icon: Clock, label: "Clock" },
  { name: "eye-off", icon: EyeOff, label: "Hide" },
  { name: "moon", icon: Moon, label: "Dark Mode" },
  { name: "star", icon: Star, label: "Star" },
];

// Country flags data - Top 8 tennis countries
const countryFlags = [
  { code: "it", label: "Italy" },
  { code: "es", label: "Spain" },
  { code: "de", label: "Germany" },
  { code: "us", label: "United States" },
  { code: "gb", label: "Great Britain" },
  { code: "rs", label: "Serbia" },
  { code: "au", label: "Australia" },
  { code: "ru", label: "Russia" },
];

// Copy button component for icons
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1 rounded hover:bg-bg-tertiary text-text-tertiary hover:text-text-primary transition-colors"
      title={copied ? "Copied!" : `Copy ${text}`}
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-success" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
    </button>
  );
}

export default function FoundationsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState("option1");
  const [isChecked, setIsChecked] = useState(false);
  const [isSwitched, setIsSwitched] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);

  const handleLoadingDemo = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <Box className="min-h-screen bg-bg-base transition-colors">
      {/* Header */}
      <Header />

      {/* Content Grid - Bento Box Layout */}
      <Box className="max-w-[1800px] mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Color Palette - Large feature card: 2 cols, 2 rows on desktop */}
          <div className="relative md:col-span-2 lg:col-span-2 lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-bg-elevated lg:rounded-l-[2rem]" />
            <Card variant="ghost" size="lg" className="relative h-full rounded-lg lg:rounded-l-[calc(2rem+1px)] overflow-hidden">
            <CardHeader>
              <CardTitle>Color Palette</CardTitle>
              <CardDescription>Semantic color tokens that adapt to light/dark mode</CardDescription>
            </CardHeader>
            <CardContent>
              <VStack space="xl">
                {/* Neutral Scale */}
                <Box>
                  <Text weight="semibold" className="mb-1">Neutral Scale</Text>
                  <Text size="xs" muted className="mb-3">Raw grey tones from neutral-0 to neutral-950</Text>
                  <div className="flex h-16 rounded-lg overflow-hidden border border-border-decorative">
                    {[
                      { name: "0", color: "#FFFFFF" },
                      { name: "50", color: "#FAFAFA" },
                      { name: "100", color: "#F5F5F5" },
                      { name: "200", color: "#EEEEEE" },
                      { name: "300", color: "#E0E0E0" },
                      { name: "400", color: "#9CA3AF" },
                      { name: "500", color: "#6B7280" },
                      { name: "600", color: "#4B5563" },
                      { name: "700", color: "#374151" },
                      { name: "800", color: "#1F2937" },
                      { name: "900", color: "#111827" },
                      { name: "950", color: "#0B0F19" },
                    ].map(({ name, color }) => (
                      <div 
                        key={name}
                        className="flex-1 flex items-end justify-center pb-1"
                        style={{ backgroundColor: color }}
                      >
                        <Text size="xs" className={parseInt(name) >= 500 ? "text-white" : "text-neutral-700"}>{name}</Text>
                      </div>
                    ))}
                  </div>
                </Box>

                {/* Background Colors */}
                <Box>
                  <Text weight="semibold" className="mb-1">Background Colors</Text>
                  <Text size="xs" muted className="mb-3">Semantic background tokens</Text>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { name: "Base", class: "bg-bg-base" },
                      { name: "Elevated", class: "bg-bg-elevated" },
                      { name: "Secondary", class: "bg-bg-secondary" },
                      { name: "Tertiary", class: "bg-bg-tertiary" },
                    ].map(({ name, class: className }) => (
                      <VStack key={name} space="xs" className="items-center">
                        <div className={`w-16 h-16 rounded-lg border border-border-standard ${className}`} />
                        <Text size="xs" weight="medium">{name}</Text>
                      </VStack>
                    ))}
                  </div>
                </Box>

                {/* Text Colors */}
                <Box>
                  <Text weight="semibold" className="mb-1">Text Colors</Text>
                  <Text size="xs" muted className="mb-3">Semantic text tokens</Text>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { name: "Primary", class: "text-text-primary" },
                      { name: "Body", class: "text-text-body" },
                      { name: "Secondary", class: "text-text-secondary" },
                      { name: "Tertiary", class: "text-text-tertiary" },
                      { name: "Disabled", class: "text-text-disabled" },
                    ].map(({ name, class: className }) => (
                      <VStack key={name} space="xs" className="items-center">
                        <div className="w-16 h-16 rounded-lg border border-border-decorative flex items-center justify-center bg-bg-elevated">
                          <span className={`text-xl font-semibold ${className}`}>Aa</span>
                        </div>
                        <Text size="xs" weight="medium">{name}</Text>
                      </VStack>
                    ))}
                  </div>
                </Box>

                {/* Border Colors */}
                <Box>
                  <Text weight="semibold" className="mb-1">Border Colors</Text>
                  <Text size="xs" muted className="mb-3">Semantic border tokens</Text>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { name: "Standard", class: "border-border-standard" },
                      { name: "Subtle", class: "border-border-subtle" },
                    ].map(({ name, class: className }) => (
                      <VStack key={name} space="xs" className="items-center">
                        <div className={`w-16 h-16 rounded-lg border-2 ${className} bg-bg-elevated`} />
                        <Text size="xs" weight="medium">{name}</Text>
                      </VStack>
                    ))}
                  </div>
                </Box>

                {/* Accent Colors */}
                <Box>
                  <Text weight="semibold" className="mb-1">Accent Colors (Dusk)</Text>
                  <Text size="xs" muted className="mb-3">Primary brand accent colors</Text>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { name: "Primary", class: "bg-accent" },
                      { name: "Light", class: "bg-accent-light" },
                      { name: "Dark", class: "bg-accent-dark" },
                      { name: "Hover", class: "bg-accent-hover" },
                    ].map(({ name, class: className }) => (
                      <VStack key={name} space="xs" className="items-center">
                        <div className={`w-16 h-16 rounded-lg ${className}`} />
                        <Text size="xs" weight="medium">{name}</Text>
                      </VStack>
                    ))}
                  </div>
                </Box>

                {/* Status Colors */}
                <Box>
                  <Text weight="semibold" className="mb-1">Status Colors</Text>
                  <Text size="xs" muted className="mb-3">Semantic status feedback colors</Text>
                  <div className="flex flex-wrap gap-6">
                    {/* Success */}
                    <VStack space="xs">
                      <Text size="xs" weight="medium" className="text-success">Success</Text>
                      <div className="flex gap-1">
                        <VStack space="xs" className="items-center">
                          <div className="w-12 h-10 rounded-sm bg-success-bg border border-border-decorative" />
                          <Text size="xs" muted>BG</Text>
                        </VStack>
                        <VStack space="xs" className="items-center">
                          <div className="w-12 h-10 rounded-sm bg-success-light" />
                          <Text size="xs" muted>Light</Text>
                        </VStack>
                        <VStack space="xs" className="items-center">
                          <div className="w-12 h-10 rounded-sm bg-success" />
                          <Text size="xs" muted>Primary</Text>
                        </VStack>
                        <VStack space="xs" className="items-center">
                          <div className="w-12 h-10 rounded-sm bg-success-dark" />
                          <Text size="xs" muted>Dark</Text>
                        </VStack>
                      </div>
                    </VStack>

                    {/* Info */}
                    <VStack space="xs">
                      <Text size="xs" weight="medium" className="text-info">Info</Text>
                      <div className="flex gap-1">
                        <VStack space="xs" className="items-center">
                          <div className="w-12 h-10 rounded-sm bg-info-bg border border-border-decorative" />
                          <Text size="xs" muted>BG</Text>
                        </VStack>
                        <VStack space="xs" className="items-center">
                          <div className="w-12 h-10 rounded-sm bg-info-light" />
                          <Text size="xs" muted>Light</Text>
                        </VStack>
                        <VStack space="xs" className="items-center">
                          <div className="w-12 h-10 rounded-sm bg-info" />
                          <Text size="xs" muted>Primary</Text>
                        </VStack>
                        <VStack space="xs" className="items-center">
                          <div className="w-12 h-10 rounded-sm bg-info-dark" />
                          <Text size="xs" muted>Dark</Text>
                        </VStack>
                      </div>
                    </VStack>

                    {/* Warning */}
                    <VStack space="xs">
                      <Text size="xs" weight="medium" className="text-warning">Warning</Text>
                      <div className="flex gap-1">
                        <VStack space="xs" className="items-center">
                          <div className="w-12 h-10 rounded-sm bg-warning-bg border border-border-decorative" />
                          <Text size="xs" muted>BG</Text>
                        </VStack>
                        <VStack space="xs" className="items-center">
                          <div className="w-12 h-10 rounded-sm bg-warning-light" />
                          <Text size="xs" muted>Light</Text>
                        </VStack>
                        <VStack space="xs" className="items-center">
                          <div className="w-12 h-10 rounded-sm bg-warning" />
                          <Text size="xs" muted>Primary</Text>
                        </VStack>
                        <VStack space="xs" className="items-center">
                          <div className="w-12 h-10 rounded-sm bg-warning-dark" />
                          <Text size="xs" muted>Dark</Text>
                        </VStack>
                      </div>
                    </VStack>

                    {/* Error */}
                    <VStack space="xs">
                      <Text size="xs" weight="medium" className="text-error">Error</Text>
                      <div className="flex gap-1">
                        <VStack space="xs" className="items-center">
                          <div className="w-12 h-10 rounded-sm bg-error-bg border border-border-decorative" />
                          <Text size="xs" muted>BG</Text>
                        </VStack>
                        <VStack space="xs" className="items-center">
                          <div className="w-12 h-10 rounded-sm bg-error-light" />
                          <Text size="xs" muted>Light</Text>
                        </VStack>
                        <VStack space="xs" className="items-center">
                          <div className="w-12 h-10 rounded-sm bg-error" />
                          <Text size="xs" muted>Primary</Text>
                        </VStack>
                        <VStack space="xs" className="items-center">
                          <div className="w-12 h-10 rounded-sm bg-error-dark" />
                          <Text size="xs" muted>Dark</Text>
                        </VStack>
                      </div>
                    </VStack>
                  </div>
                </Box>
              </VStack>
            </CardContent>
          </Card>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 dark:ring-white/10 lg:rounded-l-[2rem]" />
          </div>

          {/* Typography - Tall card: 1 col, 2 rows on desktop */}
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-bg-elevated lg:rounded-tr-[2rem]" />
            <Card variant="ghost" size="lg" className="relative h-full rounded-lg lg:rounded-tr-[calc(2rem+1px)] overflow-hidden">
            <CardHeader>
              <CardTitle>Typography</CardTitle>
              <CardDescription>Font scales from Figma design tokens - Spline Sans</CardDescription>
            </CardHeader>
            <CardContent>
              <VStack space="xl">
                {/* Font Size Scale */}
                <Box>
                  <Text weight="semibold" className="mb-4">Font Size Scale</Text>
                  <VStack space="md">
                    {[
                      { name: "6xl", size: "36px", style: { fontSize: "36px", lineHeight: "1.1" } },
                      { name: "5xl", size: "32px", style: { fontSize: "32px", lineHeight: "1.1" } },
                      { name: "4xl", size: "28px", style: { fontSize: "28px", lineHeight: "1.2" } },
                      { name: "3xl", size: "24px", style: { fontSize: "24px", lineHeight: "1.2" } },
                      { name: "2xl", size: "20px", style: { fontSize: "20px", lineHeight: "1.3" } },
                      { name: "xl", size: "18px", style: { fontSize: "18px", lineHeight: "1.4" } },
                      { name: "base", size: "16px", style: { fontSize: "16px", lineHeight: "1.5" } },
                      { name: "md", size: "14px", style: { fontSize: "14px", lineHeight: "1.5" } },
                      { name: "sm", size: "12px", style: { fontSize: "12px", lineHeight: "1.5" } },
                      { name: "xs", size: "10px", style: { fontSize: "10px", lineHeight: "1.5" } },
                    ].map(({ name, size, style }) => (
                      <HStack key={name} space="md" className="items-baseline">
                        <Text size="sm" className="w-10 shrink-0 text-accent">{name}</Text>
                        <Text size="sm" muted className="w-12 shrink-0">{size}</Text>
                        <span style={style} className="text-text-primary font-semibold">Design System</span>
                      </HStack>
                    ))}
                  </VStack>
                </Box>

                <Divider />

                {/* Font Weights */}
                <Box>
                  <Text weight="semibold" className="mb-4">Font Weights</Text>
                  <VStack space="md">
                    {[
                      { name: "Regular", weight: "350", class: "font-normal" },
                      { name: "Medium", weight: "500", class: "font-medium" },
                      { name: "Semibold", weight: "600", class: "font-semibold" },
                      { name: "Bold", weight: "700", class: "font-bold" },
                    ].map(({ name, weight, class: className }) => (
                      <HStack key={name} space="md" className="items-baseline">
                        <Text size="sm" muted className="w-24 shrink-0">{name} {weight}</Text>
                        <span className={`text-lg ${className} text-text-primary`}>The quick brown fox jumps over the lazy dog</span>
                      </HStack>
                    ))}
                  </VStack>
                </Box>

                <Divider />

                {/* Letter Spacing */}
                <Box>
                  <Text weight="semibold" className="mb-4">Letter Spacing</Text>
                  <VStack space="md">
                    {[
                      { name: "Tight", value: "-0.5", style: { letterSpacing: "-0.5px" } },
                      { name: "Normal", value: "0", style: { letterSpacing: "0px" } },
                      { name: "Loose", value: "0.5", style: { letterSpacing: "0.5px" } },
                      { name: "Loose", value: "1", style: { letterSpacing: "1px" } },
                    ].map(({ name, value, style }, index) => (
                      <HStack key={index} space="md" className="items-baseline">
                        <Text size="sm" muted className="w-20 shrink-0">{name} {value}</Text>
                        <span style={style} className="text-lg text-text-primary uppercase tracking-wide">Typography Spacing</span>
                      </HStack>
                    ))}
                  </VStack>
                </Box>
              </VStack>
            </CardContent>
          </Card>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 dark:ring-white/10 lg:rounded-tr-[2rem]" />
          </div>

          {/* Icons & Assets - Wide card: 3 cols on desktop */}
          <div className="relative md:col-span-2 lg:col-span-3">
            <div className="absolute inset-px rounded-lg bg-bg-elevated" />
            <Card variant="ghost" size="lg" className="relative h-full rounded-lg overflow-hidden">
            <CardHeader>
              <CardTitle>Icons & Assets</CardTitle>
              <CardDescription>Lucide icons and country flags used throughout the app</CardDescription>
            </CardHeader>
            <CardContent>
              <VStack space="lg">
                {/* Lucide Icons */}
                <Box>
                  <Text weight="semibold" className="mb-3">Lucide Icons (24px, stroke-width 1.25)</Text>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                    {icons.map(({ name, icon: Icon, label }) => (
                      <div key={name} className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-bg-secondary transition-colors">
                        <Icon className="w-6 h-6" strokeWidth={1.25} />
                        <Text size="xs" className="text-text-tertiary text-center">{label}</Text>
                        <HStack space="xs" className="items-center">
                          <code className="text-xs text-text-tertiary font-mono">{name}</code>
                          <CopyButton text={name} />
                        </HStack>
                      </div>
                    ))}
                  </div>
                </Box>

                {/* Country Flags */}
                <Box>
                  <HStack className="mb-3 items-center justify-between">
                    <Text weight="semibold">Country Flags (24px)</Text>
                    <a 
                      href="https://github.com/HatScripts/circle-flags" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-accent hover:text-accent-hover transition-colors"
                    >
                      circle-flags →
                    </a>
                  </HStack>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                    {countryFlags.map(({ code, label }) => (
                      <div key={code} className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-bg-secondary transition-colors">
                        <img 
                          src={`https://hatscripts.github.io/circle-flags/flags/${code}.svg`}
                          alt={`${label} flag`}
                          className="w-6 h-6"
                        />
                        <Text size="xs" className="text-text-tertiary text-center">{label}</Text>
                        <HStack space="xs" className="items-center">
                          <code className="text-xs text-text-tertiary font-mono">{code}</code>
                          <CopyButton text={code} />
                        </HStack>
                      </div>
                    ))}
                  </div>
                </Box>

                {/* Icon Component */}
                <Box>
                  <Text weight="semibold" className="mb-3">Icon Component (with size prop)</Text>
                  <HStack space="lg" className="flex-wrap items-end">
                    <VStack space="xs" className="items-center">
                      <Icon as={Search} size="2xs" />
                      <Text size="xs" muted>2xs</Text>
                    </VStack>
                    <VStack space="xs" className="items-center">
                      <Icon as={Search} size="xs" />
                      <Text size="xs" muted>xs</Text>
                    </VStack>
                    <VStack space="xs" className="items-center">
                      <Icon as={Search} size="sm" />
                      <Text size="xs" muted>sm</Text>
                    </VStack>
                    <VStack space="xs" className="items-center">
                      <Icon as={Search} size="md" />
                      <Text size="xs" muted>md</Text>
                    </VStack>
                    <VStack space="xs" className="items-center">
                      <Icon as={Search} size="lg" />
                      <Text size="xs" muted>lg</Text>
                    </VStack>
                    <VStack space="xs" className="items-center">
                      <Icon as={Search} size="xl" />
                      <Text size="xs" muted>xl</Text>
                    </VStack>
                    <VStack space="xs" className="items-center">
                      <Icon as={Search} size="2xl" />
                      <Text size="xs" muted>2xl</Text>
                    </VStack>
                  </HStack>
                </Box>
              </VStack>
            </CardContent>
          </Card>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 dark:ring-white/10" />
          </div>

          {/* Form Components - Wide card: 2 cols on desktop */}
          <div className="relative md:col-span-2 lg:col-span-2">
            <div className="absolute inset-px rounded-lg bg-bg-elevated" />
            <Card variant="ghost" size="lg" className="relative h-full rounded-lg overflow-hidden">
            <CardHeader>
              <CardTitle>Form Components</CardTitle>
              <CardDescription>Input fields, controls, and form elements with various styles and states</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Input Variants */}
                <Box>
                  <Text weight="semibold" className="mb-3">Input Variants</Text>
                  <VStack space="sm">
                    <Input variant="outline">
                      <InputField placeholder="Outline input (default)" />
                    </Input>
                    <Input variant="rounded">
                      <InputField placeholder="Rounded input" />
                    </Input>
                  </VStack>
                </Box>

                {/* Input Sizes */}
                <Box>
                  <Text weight="semibold" className="mb-3">Input Sizes</Text>
                  <VStack space="sm">
                    <Input size="sm">
                      <InputField placeholder="Small input" />
                    </Input>
                    <Input size="md">
                      <InputField placeholder="Medium input (default)" />
                    </Input>
                    <Input size="lg">
                      <InputField placeholder="Large input" />
                    </Input>
                    <Input size="xl">
                      <InputField placeholder="Extra large input" />
                    </Input>
                  </VStack>
                </Box>

                {/* Input States */}
                <Box>
                  <Text weight="semibold" className="mb-3">Input States</Text>
                  <VStack space="sm">
                    <Input>
                      <InputField placeholder="Normal state" />
                    </Input>
                    <Input isInvalid>
                      <InputField placeholder="Invalid state" />
                    </Input>
                    <Input>
                      <InputField placeholder="Read only state" defaultValue="Read only state" readOnly />
                    </Input>
                    <Input isDisabled>
                      <InputField placeholder="Disabled state" />
                    </Input>
                  </VStack>
                </Box>

                {/* Input with Icon */}
                <Box>
                  <Text weight="semibold" className="mb-3">Input with Icon</Text>
                  <Input variant="outline" size="md">
                    <InputSlot className="pl-3">
                      <InputIcon as={Search} />
                    </InputSlot>
                    <InputField placeholder="Search..." />
                  </Input>
                </Box>

                {/* Radio Component */}
                <Box>
                  <Text weight="semibold" className="mb-3">Radio Component</Text>
                  <RadioGroup value={selectedRadio} onChange={setSelectedRadio}>
                    <Radio value="option1">
                      <RadioIndicator />
                      <RadioLabel>Option 1</RadioLabel>
                    </Radio>
                    <Radio value="option2">
                      <RadioIndicator />
                      <RadioLabel>Option 2</RadioLabel>
                    </Radio>
                    <Radio value="option3">
                      <RadioIndicator />
                      <RadioLabel>Option 3</RadioLabel>
                    </Radio>
                  </RadioGroup>
                  <Text size="sm" muted className="mt-2">Selected: {selectedRadio}</Text>
                </Box>

                {/* Textarea Component */}
                <Box>
                  <Text weight="semibold" className="mb-3">Textarea Component</Text>
                  <VStack space="sm">
                    <Textarea size="md">
                      <TextareaInput placeholder="Enter your message..." />
                    </Textarea>
                    <Textarea size="md" isInvalid>
                      <TextareaInput placeholder="Invalid textarea..." />
                    </Textarea>
                  </VStack>
                </Box>

                {/* Checkbox */}
                <Box>
                  <Text weight="semibold" className="mb-3">Checkbox</Text>
                  <Checkbox 
                    isChecked={isChecked} 
                    onChange={setIsChecked}
                    label="Accept terms and conditions"
                  />
                </Box>

                {/* Switch */}
                <Box>
                  <Text weight="semibold" className="mb-3">Switch</Text>
                  <Switch 
                    value={isSwitched} 
                    onValueChange={setIsSwitched}
                    label="Enable notifications"
                  />
                </Box>

                {/* Link Component */}
                <Box>
                  <Text weight="semibold" className="mb-3">Link Component</Text>
                  <VStack space="sm">
                    <Link href="/design-system">
                      <LinkText>Internal Link</LinkText>
                    </Link>
                    <Link href="https://gluestack.io" isExternal>
                      <LinkText>External Link</LinkText>
                      <Icon as={ArrowRight} size="sm" />
                    </Link>
                    <Link href="/about" isUnderlined>
                      <LinkText>Underlined Link</LinkText>
                    </Link>
                  </VStack>
                </Box>
              </div>
            </CardContent>
          </Card>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 dark:ring-white/10" />
          </div>

          {/* Buttons - Tall card: 1 col, 2 rows on desktop */}
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-bg-elevated" />
            <Card variant="ghost" size="lg" className="relative h-full rounded-lg overflow-hidden">
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
              <CardDescription>Button variants, actions, and sizes for different use cases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Button Variants - Solid */}
                <Box>
                  <Text weight="semibold" className="mb-3">Solid Buttons</Text>
                  <VStack space="sm">
                    <Button variant="solid" action="primary">Primary</Button>
                    <Button variant="solid" action="secondary">Secondary</Button>
                    <Button variant="solid" action="positive">Positive</Button>
                    <Button variant="solid" action="negative">Negative</Button>
                  </VStack>
                </Box>

                {/* Button Variants - Outline */}
                <Box>
                  <Text weight="semibold" className="mb-3">Outline Buttons</Text>
                  <VStack space="sm">
                    <Button variant="outline" action="primary">Primary</Button>
                    <Button variant="outline" action="secondary">Secondary</Button>
                    <Button variant="outline" action="positive">Positive</Button>
                    <Button variant="outline" action="negative">Negative</Button>
                  </VStack>
                </Box>

                {/* Button Variants - Link */}
                <Box>
                  <Text weight="semibold" className="mb-3">Link Buttons</Text>
                  <VStack space="sm">
                    <Button variant="link" action="primary">Primary Link</Button>
                    <Button variant="link" action="secondary">Secondary Link</Button>
                  </VStack>
                </Box>

                {/* Button Sizes */}
                <Box>
                  <Text weight="semibold" className="mb-3">Button Sizes</Text>
                  <VStack space="sm" className="items-start">
                    <Button size="xs">Extra Small</Button>
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                    <Button size="xl">Extra Large</Button>
                  </VStack>
                </Box>

                {/* Button with Icons */}
                <Box>
                  <Text weight="semibold" className="mb-3">Buttons with Icons</Text>
                  <VStack space="sm">
                    <Button leftIcon={Mail}>Left Icon</Button>
                    <Button rightIcon={ArrowRight}>Right Icon</Button>
                    <Button leftIcon={Search} rightIcon={ArrowRight}>Both Icons</Button>
                  </VStack>
                </Box>

                {/* Button States */}
                <Box>
                  <Text weight="semibold" className="mb-3">Button States</Text>
                  <VStack space="sm">
                    <Button>Normal</Button>
                    <Button isLoading={isLoading} onClick={handleLoadingDemo}>
                      {isLoading ? "Loading..." : "Click to Load"}
                    </Button>
                    <Button isDisabled>Disabled</Button>
                  </VStack>
                </Box>
              </div>
            </CardContent>
          </Card>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 dark:ring-white/10" />
          </div>

          {/* Alerts - Standard card */}
          <div className="relative lg:col-span-1">
            <div className="absolute inset-px rounded-lg bg-bg-elevated" />
            <Card variant="ghost" size="lg" className="relative h-full rounded-lg overflow-hidden">
            <CardHeader>
              <CardTitle>Alerts</CardTitle>
              <CardDescription>Feedback messages for various states</CardDescription>
            </CardHeader>
            <CardContent>
              <VStack space="md">
                <Alert action="info">
                  <AlertTitle>Information</AlertTitle>
                  <AlertDescription>
                    This is an informational alert for general notices.
                  </AlertDescription>
                </Alert>
                <Alert action="success">
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>
                    Your changes have been saved successfully.
                  </AlertDescription>
                </Alert>
                <Alert action="warning">
                  <AlertTitle>Warning</AlertTitle>
                  <AlertDescription>
                    Please review your input before proceeding.
                  </AlertDescription>
                </Alert>
                <Alert action="error">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    Something went wrong. Please try again.
                  </AlertDescription>
                </Alert>
              </VStack>
            </CardContent>
          </Card>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 dark:ring-white/10" />
          </div>

          {/* Loading States - Standard card */}
          <div className="relative lg:col-span-1">
            <div className="absolute inset-px rounded-lg bg-bg-elevated" />
            <Card variant="ghost" size="lg" className="relative h-full rounded-lg overflow-hidden">
            <CardHeader>
              <CardTitle>Loading States</CardTitle>
              <CardDescription>Spinners and loading indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <VStack space="lg">
                <Box>
                  <Text weight="semibold" className="mb-3">Spinner Sizes & Tennis Ball Loaders</Text>
                  <HStack space="lg" className="items-end flex-wrap">
                    <VStack space="xs" className="items-center">
                      <Spinner size="sm" />
                      <Text size="xs" muted>sm</Text>
                    </VStack>
                    <VStack space="xs" className="items-center">
                      <Spinner size="md" />
                      <Text size="xs" muted>md</Text>
                    </VStack>
                    <VStack space="xs" className="items-center">
                      <Spinner size="lg" />
                      <Text size="xs" muted>lg</Text>
                    </VStack>
                    <VStack space="xs" className="items-center">
                      <Spinner size="xl" />
                      <Text size="xs" muted>xl</Text>
                    </VStack>
                    <Box className="w-px h-8 bg-border-subtle mx-2" />
                    <VStack space="xs" className="items-center">
                      <TennisBallLoader size="md" />
                      <Text size="xs" muted className="mt-5">Spinning</Text>
                    </VStack>
                    <VStack space="xs" className="items-center">
                      <BouncingTennisBallLoader size="md" />
                      <Text size="xs" muted className="mt-5">Bouncing</Text>
                    </VStack>
                  </HStack>
                </Box>

                <Box>
                  <Text weight="semibold" className="mb-3">Button Loading State</Text>
                  <Button 
                    isLoading={isLoading} 
                    onClick={handleLoadingDemo}
                  >
                    {isLoading ? "Loading..." : "Click to Demo"}
                  </Button>
                </Box>
              </VStack>
            </CardContent>
          </Card>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 dark:ring-white/10" />
          </div>

          {/* Badges - Standard card */}
          <div className="relative lg:col-span-1">
            <div className="absolute inset-px rounded-lg bg-bg-elevated" />
            <Card variant="ghost" size="lg" className="relative h-full rounded-lg overflow-hidden">
            <CardHeader>
              <CardTitle>Badges</CardTitle>
              <CardDescription>Labels and status indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <VStack space="lg">
                <Box>
                  <Text weight="semibold" className="mb-3">Badge Actions</Text>
                  <HStack space="sm" className="flex-wrap">
                    <Badge action="info">Info</Badge>
                    <Badge action="success">Success</Badge>
                    <Badge action="warning">Warning</Badge>
                    <Badge action="error">Error</Badge>
                    <Badge action="muted">Muted</Badge>
                  </HStack>
                </Box>

                <Box>
                  <Text weight="semibold" className="mb-3">Badge Sizes</Text>
                  <HStack space="sm" className="items-center flex-wrap">
                    <Badge size="sm">Small</Badge>
                    <Badge size="md">Medium</Badge>
                    <Badge size="lg">Large</Badge>
                  </HStack>
                </Box>
              </VStack>
            </CardContent>
          </Card>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 dark:ring-white/10" />
          </div>

          {/* Overlays & Modals - Standard card: 1 col */}
          <div className="relative lg:col-span-1">
            <div className="absolute inset-px rounded-lg bg-bg-elevated" />
            <Card variant="ghost" size="lg" className="relative h-full rounded-lg overflow-hidden">
              <CardHeader>
                <CardTitle>Overlays & Modals</CardTitle>
                <CardDescription>Dialog and drawer components</CardDescription>
              </CardHeader>
              <CardContent>
                <VStack space="xl">
                  {/* Modal Component */}
                  <Box>
                    <Text weight="semibold" className="mb-3">Modal</Text>
                    <Text size="sm" muted className="mb-4">
                      Overlay dialog with backdrop, header, body, and footer sections.
                    </Text>
                    <Box className="rounded-lg p-6 bg-bg-base">
                      <Button onClick={() => setShowModal(true)}>Open Modal</Button>
                    </Box>
                  </Box>

                  {/* Modal */}
                  <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="md">
                    <ModalBackdrop />
                    <ModalContent>
                      <ModalHeader>
                        <Heading size="lg">Modal Title</Heading>
                        <ModalCloseButton />
                      </ModalHeader>
                      <ModalBody>
                        <Text>This is the modal content. You can put any content here including forms, text, or other components.</Text>
                      </ModalBody>
                      <ModalFooter>
                        <Button variant="outline" action="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                        <Button onClick={() => setShowModal(false)}>Confirm</Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>

                  <Divider />

                  {/* Drawer Component */}
                  <Box>
                    <Text weight="semibold" className="mb-3">Drawer</Text>
                    <Text size="sm" muted className="mb-4">
                      Side panel that slides in from the edge of the screen.
                    </Text>
                    <Box className="rounded-lg p-6 bg-bg-base">
                      <Button onClick={() => setShowDrawer(true)}>Open Drawer</Button>
                    </Box>
                  </Box>

                  {/* Drawer */}
                  <Drawer isOpen={showDrawer} onClose={() => setShowDrawer(false)} anchor="left">
                    <DrawerBackdrop />
                    <DrawerContent>
                      <DrawerHeader>
                        <Heading size="lg">Menu</Heading>
                        <DrawerCloseButton />
                      </DrawerHeader>
                      <DrawerBody>
                        <VStack space="md">
                          <Button variant="link" action="secondary" className="justify-start">Home</Button>
                          <Button variant="link" action="secondary" className="justify-start">Profile</Button>
                          <Button variant="link" action="secondary" className="justify-start">Settings</Button>
                          <Button variant="link" action="secondary" className="justify-start">Help</Button>
                        </VStack>
                      </DrawerBody>
                    </DrawerContent>
                  </Drawer>
                </VStack>
              </CardContent>
            </Card>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 dark:ring-white/10" />
          </div>

          {/* Avatars - Wide card: 2 cols on desktop */}
          <div className="relative md:col-span-2 lg:col-span-2">
            <div className="absolute inset-px rounded-lg bg-bg-elevated" />
            <Card variant="ghost" size="lg" className="relative h-full rounded-lg overflow-hidden">
            <CardHeader>
              <CardTitle>Avatars</CardTitle>
              <CardDescription>User profile images and groups</CardDescription>
            </CardHeader>
            <CardContent>
              <VStack space="lg">
                <Box>
                  <Text weight="semibold" className="mb-3">Avatar Sizes</Text>
                  <HStack space="md" className="items-end">
                    <Avatar size="xs">
                      <AvatarFallback>XS</AvatarFallback>
                    </Avatar>
                    <Avatar size="sm">
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <Avatar size="md">
                      <AvatarFallback>MD</AvatarFallback>
                    </Avatar>
                    <Avatar size="lg">
                      <AvatarFallback>LG</AvatarFallback>
                    </Avatar>
                    <Avatar size="xl">
                      <AvatarFallback>XL</AvatarFallback>
                    </Avatar>
                    <Avatar size="2xl">
                      <AvatarFallback>2XL</AvatarFallback>
                    </Avatar>
                  </HStack>
                </Box>

                <Box>
                  <Text weight="semibold" className="mb-3">Avatar with Status Badge</Text>
                  <HStack space="md" className="items-end">
                    <VStack space="xs" className="items-center">
                      <Avatar size="sm">
                        <AvatarFallback>JS</AvatarFallback>
                        <AvatarBadge status="online" />
                      </Avatar>
                      <Text size="xs" className="text-text-tertiary">Online</Text>
                    </VStack>
                    <VStack space="xs" className="items-center">
                      <Avatar size="md">
                        <AvatarFallback>CA</AvatarFallback>
                        <AvatarBadge status="away" />
                      </Avatar>
                      <Text size="xs" className="text-text-tertiary">Away</Text>
                    </VStack>
                    <VStack space="xs" className="items-center">
                      <Avatar size="lg">
                        <AvatarFallback>ND</AvatarFallback>
                        <AvatarBadge status="busy" />
                      </Avatar>
                      <Text size="xs" className="text-text-tertiary">Busy</Text>
                    </VStack>
                    <VStack space="xs" className="items-center">
                      <Avatar size="xl">
                        <AvatarFallback>AS</AvatarFallback>
                        <AvatarBadge status="offline" />
                      </Avatar>
                      <Text size="xs" className="text-text-tertiary">Offline</Text>
                    </VStack>
                  </HStack>
                </Box>

                <Box>
                  <Text weight="semibold" className="mb-3">Avatar with Country Flag</Text>
                  <HStack space="md" className="items-end">
                    <VStack space="xs" className="items-center">
                      <Avatar size="sm">
                        <AvatarFallback>JS</AvatarFallback>
                        <AvatarFlagBadge countryCode="it" />
                      </Avatar>
                      <Text size="xs" className="text-text-tertiary">sm</Text>
                    </VStack>
                    <VStack space="xs" className="items-center">
                      <Avatar size="md">
                        <AvatarFallback>CA</AvatarFallback>
                        <AvatarFlagBadge countryCode="es" />
                      </Avatar>
                      <Text size="xs" className="text-text-tertiary">md</Text>
                    </VStack>
                    <VStack space="xs" className="items-center">
                      <Avatar size="lg">
                        <AvatarFallback>ND</AvatarFallback>
                        <AvatarFlagBadge countryCode="rs" />
                      </Avatar>
                      <Text size="xs" className="text-text-tertiary">lg</Text>
                    </VStack>
                    <VStack space="xs" className="items-center">
                      <Avatar size="xl">
                        <AvatarFallback>AS</AvatarFallback>
                        <AvatarFlagBadge countryCode="us" />
                      </Avatar>
                      <Text size="xs" className="text-text-tertiary">xl</Text>
                    </VStack>
                    <VStack space="xs" className="items-center">
                      <Avatar size="2xl">
                        <AvatarFallback>IG</AvatarFallback>
                        <AvatarFlagBadge countryCode="pl" />
                      </Avatar>
                      <Text size="xs" className="text-text-tertiary">2xl</Text>
                    </VStack>
                  </HStack>
                </Box>

                <Box>
                  <Text weight="semibold" className="mb-3">Avatar Group</Text>
                  <AvatarGroup max={4}>
                    <Avatar size="md">
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <Avatar size="md">
                      <AvatarFallback>CA</AvatarFallback>
                    </Avatar>
                    <Avatar size="md">
                      <AvatarFallback>ND</AvatarFallback>
                    </Avatar>
                    <Avatar size="md">
                      <AvatarFallback>AS</AvatarFallback>
                    </Avatar>
                    <Avatar size="md">
                      <AvatarFallback>IG</AvatarFallback>
                    </Avatar>
                  </AvatarGroup>
                </Box>
              </VStack>
            </CardContent>
          </Card>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 dark:ring-white/10" />
          </div>

          {/* Cards - 1 col on desktop */}
          <div className="relative lg:col-span-1 lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-bg-elevated lg:rounded-bl-[2rem]" />
            <Card variant="ghost" size="lg" className="relative h-full rounded-lg lg:rounded-bl-[calc(2rem+1px)] overflow-hidden">
            <CardHeader>
              <CardTitle>Cards</CardTitle>
              <CardDescription>Card variants for content containers</CardDescription>
            </CardHeader>
            <CardContent>
              <VStack space="md">
                <Card variant="elevated" size="md">
                  <CardHeader>
                    <CardTitle className="text-base">Elevated</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Text size="sm" muted>Card with shadow elevation</Text>
                  </CardContent>
                </Card>

                <Card variant="outline" size="md">
                  <CardHeader>
                    <CardTitle className="text-base">Outline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Text size="sm" muted>Card with border outline</Text>
                  </CardContent>
                </Card>

                <Card variant="ghost" size="md">
                  <CardHeader>
                    <CardTitle className="text-base">Ghost</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Text size="sm" muted>Transparent background</Text>
                  </CardContent>
                </Card>

                <Card variant="filled" size="md">
                  <CardHeader>
                    <CardTitle className="text-base">Filled</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Text size="sm" muted>Filled background color</Text>
                  </CardContent>
                </Card>
              </VStack>
            </CardContent>
          </Card>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 dark:ring-white/10 lg:rounded-bl-[2rem]" />
          </div>

          {/* Spacing & Radius - Wide card: 2 cols on desktop */}
          <div className="relative md:col-span-2 lg:col-span-2 lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-bg-elevated lg:rounded-br-[2rem]" />
            <Card variant="ghost" size="lg" className="relative h-full rounded-lg lg:rounded-br-[calc(2rem+1px)] overflow-hidden">
            <CardHeader>
              <CardTitle>Spacing & Radius</CardTitle>
              <CardDescription>Design tokens for consistent spacing and border radius</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Spacing Scale */}
                <VStack space="md" className="items-start">
                  <Text weight="semibold" size="lg">Spacing Scale</Text>
                  <Text size="sm" muted className="mb-2">4px base unit system</Text>
                  <VStack space="sm" className="w-full">
                    {[
                      { name: "1", value: "4px", width: 4 },
                      { name: "2", value: "8px", width: 8 },
                      { name: "3", value: "12px", width: 12 },
                      { name: "4", value: "16px", width: 16 },
                      { name: "5", value: "20px", width: 20 },
                      { name: "6", value: "24px", width: 24 },
                      { name: "7", value: "28px", width: 28 },
                      { name: "8", value: "32px", width: 32 },
                      { name: "10", value: "40px", width: 40 },
                      { name: "12", value: "48px", width: 48 },
                      { name: "16", value: "64px", width: 64 },
                      { name: "20", value: "80px", width: 80 },
                      { name: "24", value: "96px", width: 96 },
                    ].map(({ name, value, width }) => (
                      <HStack key={name} space="md" className="items-center w-full">
                        <Text size="sm" muted className="w-16 shrink-0">space-{name}</Text>
                        <Text size="sm" className="w-12 shrink-0 text-text-secondary">{value}</Text>
                        <div 
                          className="bg-accent h-5 rounded-full" 
                          style={{ width: `${width}px` }}
                        />
                      </HStack>
                    ))}
                  </VStack>
                </VStack>

                {/* Border Radius */}
                <VStack space="md" className="items-start">
                  <Text weight="semibold" size="lg">Border Radius</Text>
                  <Text size="sm" muted className="mb-2">Consistent corner rounding</Text>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
                    {[
                      { name: "none", value: "0px", radius: "rounded-none" },
                      { name: "xs", value: "2px", radius: "rounded-xs" },
                      { name: "sm", value: "4px", radius: "rounded-sm" },
                      { name: "md", value: "6px", radius: "rounded-md" },
                      { name: "lg", value: "8px", radius: "rounded-lg" },
                      { name: "xl", value: "12px", radius: "rounded-xl" },
                      { name: "2xl", value: "16px", radius: "rounded-2xl" },
                      { name: "3xl", value: "24px", radius: "rounded-3xl" },
                      { name: "full", value: "9999px", radius: "rounded-full" },
                    ].map(({ name, value, radius }) => (
                      <VStack key={name} space="xs" className="items-center">
                        <div 
                          className={`w-16 h-16 bg-accent ${radius}`}
                        />
                        <Text size="xs" weight="medium">{name}</Text>
                        <Text size="xs" muted>{value}</Text>
                      </VStack>
                    ))}
                  </div>
                </VStack>
              </div>
            </CardContent>
          </Card>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 dark:ring-white/10 lg:rounded-br-[2rem]" />
          </div>


        </div>
      </Box>
    </Box>
  );
}
