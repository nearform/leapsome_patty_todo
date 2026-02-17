"use client";

import {
  Box,
  Divider,
  HStack,
  VStack,
  Heading,
  Text,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Tabs,
  type Tab,
  // Gluestack components
  Pressable,
  Progress,
  ProgressFilledTrack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  AppHeader,
  AppFooter,
  ScrollView,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Badge,
  // New Gluestack-compatible components
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetLabel,
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogCloseButton,
  MenuComponent,
  MenuTrigger,
  MenuContent,
  MenuItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
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
} from "@/components/prototype-ui";
import { DSHeader as Header } from "@/components/designsystem-ui";
import { useState } from "react";
import { ArrowRight, MoreVertical, Edit, Copy, Trash2, Share } from "lucide-react";

// Demo tabs data
const demoTabs: Tab[] = [
  { id: "account", label: "My Account" },
  { id: "company", label: "Company" },
  { id: "team", label: "Team Members" },
  { id: "billing", label: "Billing" },
  { id: "notifications", label: "Notifications" },
  { id: "integrations", label: "Integrations" },
  { id: "security", label: "Security" },
];

export default function ComponentsPage() {
  const [activeTab, setActiveTab] = useState("team");
  const [activePillTab, setActivePillTab] = useState("account");
  const [activeFooterItem, setActiveFooterItem] = useState("home");
  const [actionsheetOpen, setActionsheetOpen] = useState(false);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);

  return (
    <Box className="min-h-screen bg-bg-base transition-colors">
      {/* Header */}
      <Header />

      {/* Components Showcase - Bento Box Layout */}
      <Box className="w-full mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Navigation & Layout - Large feature card: 2 cols, 2 rows */}
          <div className="relative md:col-span-2 lg:col-span-2 lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-bg-elevated lg:rounded-l-[2rem]" />
            <Card variant="ghost" size="lg" className="relative h-full rounded-lg lg:rounded-l-[calc(2rem+1px)] overflow-hidden">
              <CardHeader>
                <CardTitle>Navigation & Layout</CardTitle>
                <CardDescription>Tabs, headers, and footers for organizing content</CardDescription>
              </CardHeader>
              <CardContent>
                <VStack space="xl">
                  {/* Tabs */}
                  <Box>
                    <Text weight="semibold" className="mb-3">Tabs</Text>
                    <Text size="sm" muted className="mb-4">
                      Scrollable tab navigation with animated underline indicator and keyboard navigation.
                    </Text>
                    <VStack space="lg">
                      <Box>
                        <Text size="sm" weight="medium" className="mb-2 text-text-secondary">Underline Variant</Text>
                        <Box className="rounded-md overflow-hidden bg-bg-base">
                          <Tabs
                            tabs={demoTabs}
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                          />
                          <Box className="p-4">
                            <Text size="sm" muted>Active tab: <span className="text-accent font-medium">{activeTab}</span></Text>
                          </Box>
                        </Box>
                      </Box>
                      <Box>
                        <Text size="sm" weight="medium" className="mb-2 text-text-secondary">Pill Variant</Text>
                        <Box className="rounded-md p-4 bg-bg-base">
                          <Tabs
                            tabs={demoTabs.slice(0, 4)}
                            activeTab={activePillTab}
                            onTabChange={setActivePillTab}
                            variant="pill"
                            align="stretch"
                          />
                        </Box>
                      </Box>
                      <Box>
                        <Text size="sm" weight="medium" className="mb-2 text-text-secondary">Horizontal ScrollView</Text>
                        <ScrollView
                          horizontal
                          className="rounded-full bg-bg-base px-2 py-2 flex gap-2"
                        >
                          {["All", "Upcoming", "Completed", "Flagged", "Archived"].map((filter) => (
                            <Button
                              key={filter}
                              variant={filter === "All" ? "solid" : "outline"}
                              size="sm"
                              action="secondary"
                              className="whitespace-nowrap"
                            >
                              {filter}
                            </Button>
                          ))}
                        </ScrollView>
                      </Box>
                    </VStack>
                  </Box>

                  <Divider />

                  {/* App Header */}
                  <Box>
                    <Text weight="semibold" className="mb-3">
                      App Header
                    </Text>
                    <Text size="sm" muted className="mb-3">
                      Top app bar for primary navigation and actions.
                    </Text>
                    <VStack space="sm" className="w-full">
                      {/* Logo variant */}
                      <AppHeader variant="logo" />
                      {/* Title / back variant */}
                      <AppHeader
                        variant="title"
                        title="Match Centre"
                        showSearch
                        showNotifications
                        showAccount
                      />
                    </VStack>
                  </Box>

                  {/* App Footer */}
                  <Box>
                    <Text weight="semibold" className="mb-3">
                      App Footer
                    </Text>
                    <Text size="sm" muted className="mb-3">
                      Bottom navigation bar for core app sections.
                    </Text>
                    <Box className="w-full">
                      <AppFooter
                        position="static"
                        activeItem={activeFooterItem}
                        onItemClick={(item) => setActiveFooterItem(item.id)}
                      />
                    </Box>
                  </Box>
                </VStack>
              </CardContent>
            </Card>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 dark:ring-white/10 lg:rounded-l-[2rem]" />
          </div>

          {/* Miscellaneous - Tall card: 1 col, 2 rows */}
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-bg-elevated lg:rounded-tr-[2rem]" />
            <Card variant="ghost" size="lg" className="relative h-full rounded-lg lg:rounded-tr-[calc(2rem+1px)] overflow-hidden">
              <CardHeader>
                <CardTitle>Miscellaneous</CardTitle>
                <CardDescription>Interactive elements, overlays, and utility components</CardDescription>
              </CardHeader>
              <CardContent>
                <VStack space="2xl">
                  {/* Pressable Component */}
                  <Box>
                    <Text weight="semibold" className="mb-3">Pressable</Text>
                    <Text size="sm" muted className="mb-4">
                      Touch-friendly wrapper with feedback states.
                    </Text>
                    <Box className="rounded-md p-6 bg-bg-base">
                      <HStack space="md">
                        <Pressable 
                          onPress={() => alert("Pressed!")}
                          className="p-4 bg-bg-tertiary rounded-md hover:bg-bg-secondary active:scale-95 transition-all"
                        >
                          <Text>Press me</Text>
                        </Pressable>
                        <Pressable 
                          onPress={() => {}}
                          isDisabled
                          className="p-4 bg-bg-tertiary rounded-md"
                        >
                          <Text>Disabled</Text>
                        </Pressable>
                      </HStack>
                    </Box>
                  </Box>

                  <Divider />

                  {/* Overlays */}
                  <Box>
                    <Text weight="semibold" className="mb-3">Overlays</Text>
                    <Text size="sm" muted className="mb-4">
                      Interactive overlay patterns for presenting content above the main UI.
                    </Text>
                    <VStack space="md">
                      {/* Modal Trigger */}
                      <HStack space="md" className="items-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowModal(true)}
                          className="shrink-0"
                        >
                          Modal
                        </Button>
                        <Text size="sm" muted>Centered dialog for focused tasks and confirmations.</Text>
                      </HStack>

                      {/* Drawer Trigger */}
                      <HStack space="md" className="items-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowDrawer(true)}
                          className="shrink-0"
                        >
                          Drawer
                        </Button>
                        <Text size="sm" muted>Slide-in panel for navigation or supplementary content.</Text>
                      </HStack>

                      {/* Actionsheet Trigger */}
                      <HStack space="md" className="items-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setActionsheetOpen(true)}
                          className="shrink-0"
                        >
                          Action Sheet
                        </Button>
                        <Text size="sm" muted>Bottom sheet with contextual actions.</Text>
                      </HStack>

                      {/* AlertDialog Trigger */}
                      <HStack space="md" className="items-center">
                        <Button
                          variant="outline"
                          size="sm"
                          action="negative"
                          onClick={() => setAlertDialogOpen(true)}
                          className="shrink-0"
                        >
                          Alert Dialog
                        </Button>
                        <Text size="sm" muted>Blocking confirmation for destructive actions.</Text>
                      </HStack>

                      {/* Menu */}
                      <HStack space="md" className="items-center">
                        <MenuComponent>
                          <MenuTrigger>
                            <Button variant="outline" size="sm" className="gap-1 shrink-0">
                              <MoreVertical className="w-3.5 h-3.5" />
                              Menu
                            </Button>
                          </MenuTrigger>
                          <MenuContent>
                            <MenuItem icon={<Edit className="w-3.5 h-3.5" />}>Edit</MenuItem>
                            <MenuItem icon={<Copy className="w-3.5 h-3.5" />}>Duplicate</MenuItem>
                            <MenuItem icon={<Share className="w-3.5 h-3.5" />}>Share</MenuItem>
                            <MenuItem icon={<Trash2 className="w-3.5 h-3.5" />} isDestructive>Delete</MenuItem>
                          </MenuContent>
                        </MenuComponent>
                        <Text size="sm" muted>Dropdown list of actions triggered from a button.</Text>
                      </HStack>

                      {/* Popover */}
                      <HStack space="md" className="items-center">
                        <Popover placement="bottom">
                          <PopoverTrigger>
                            <Button variant="outline" size="sm" className="shrink-0">Popover</Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <PopoverCloseButton />
                            <Text weight="semibold" size="sm" className="mb-1">Quick Info</Text>
                            <Text size="sm" muted>
                              Popovers display rich content in a floating panel, ideal for tooltips with interactive elements.
                            </Text>
                          </PopoverContent>
                        </Popover>
                        <Text size="sm" muted>Floating panel with rich content on click.</Text>
                      </HStack>
                    </VStack>
                  </Box>
                </VStack>

                {/* Actionsheet Portal */}
                <Actionsheet isOpen={actionsheetOpen} onClose={() => setActionsheetOpen(false)}>
                  <ActionsheetBackdrop />
                  <ActionsheetContent>
                    <ActionsheetLabel>Account Actions</ActionsheetLabel>
                    <ActionsheetItem onPress={() => {}}>View Details</ActionsheetItem>
                    <ActionsheetItem onPress={() => {}}>Edit Profile</ActionsheetItem>
                    <ActionsheetItem onPress={() => {}}>Share</ActionsheetItem>
                    <ActionsheetItem onPress={() => {}} isDestructive>Delete Account</ActionsheetItem>
                  </ActionsheetContent>
                </Actionsheet>

                {/* AlertDialog Portal */}
                <AlertDialog isOpen={alertDialogOpen} onClose={() => setAlertDialogOpen(false)}>
                  <AlertDialogBackdrop />
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <Heading size="lg">Delete item?</Heading>
                      <AlertDialogCloseButton />
                    </AlertDialogHeader>
                    <AlertDialogBody>
                      <Text size="sm" muted>This action cannot be undone. All associated data will be permanently removed.</Text>
                    </AlertDialogBody>
                    <AlertDialogFooter>
                      <Button variant="outline" size="sm" onClick={() => setAlertDialogOpen(false)}>Cancel</Button>
                      <Button action="negative" size="sm" onClick={() => setAlertDialogOpen(false)}>Delete</Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                {/* Modal Portal */}
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

                {/* Drawer Portal */}
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
              </CardContent>
            </Card>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 dark:ring-white/10 lg:rounded-tr-[2rem]" />
          </div>

          {/* Progress & Sliders - Standard card */}
          <div className="relative md:col-span-2">
            <div className="absolute inset-px rounded-lg bg-bg-elevated" />
            <Card variant="ghost" size="lg" className="relative h-full rounded-lg overflow-hidden">
              <CardHeader>
                <CardTitle>Progress & Sliders</CardTitle>
                <CardDescription>Progress indicators and range input controls</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Progress Component */}
                  <Box>
                    <Text weight="semibold" className="mb-3">Progress</Text>
                    <Text size="sm" muted className="mb-4">
                      Percentage-based and stepped progress indicators.
                    </Text>
                    <Box className="rounded-md p-6 bg-bg-base">
                      <VStack space="md">
                        <Box>
                          <HStack className="justify-between mb-2">
                            <Text size="xs" weight="medium">Upload</Text>
                            <Text size="xs" muted>60%</Text>
                          </HStack>
                          <Progress value={60} size="md">
                            <ProgressFilledTrack />
                          </Progress>
                        </Box>
                        <Box>
                          <HStack className="justify-between mb-2">
                            <Text size="xs" weight="medium">Savings Goal</Text>
                            <Text size="xs" muted>30%</Text>
                          </HStack>
                          <Progress value={30} size="lg">
                            <ProgressFilledTrack colorScheme="success" />
                          </Progress>
                        </Box>
                        <Box>
                          <Text size="xs" weight="medium" className="mb-2">Stepped (3 of 5)</Text>
                          <Progress totalSteps={5} currentStep={3} size="md" />
                        </Box>
                      </VStack>
                    </Box>
                  </Box>

                  {/* Slider Component */}
                  <Box>
                    <Text weight="semibold" className="mb-3">Slider</Text>
                    <Text size="sm" muted className="mb-4">
                      Range input with keyboard and pointer support.
                    </Text>
                    <Box className="rounded-md p-6 bg-bg-base">
                      <VStack space="md">
                        <Box>
                          <HStack className="justify-between mb-2">
                            <Text size="xs" weight="medium">Brightness</Text>
                            <Text size="xs" muted>{sliderValue}%</Text>
                          </HStack>
                          <Slider value={sliderValue} onChange={setSliderValue} min={0} max={100}>
                            <SliderTrack>
                              <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb />
                          </Slider>
                        </Box>
                        <Box>
                          <Text size="xs" weight="medium" className="mb-2">Disabled</Text>
                          <Slider defaultValue={60} min={0} max={100} isDisabled>
                            <SliderTrack>
                              <SliderFilledTrack colorScheme="success" />
                            </SliderTrack>
                            <SliderThumb />
                          </Slider>
                        </Box>
                      </VStack>
                    </Box>
                  </Box>
                </div>
              </CardContent>
            </Card>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 dark:ring-white/10" />
          </div>

          {/* Table - Full width card: 3 cols */}
          <div className="relative md:col-span-2 lg:col-span-3">
            <div className="absolute inset-px rounded-lg bg-bg-elevated" />
            <Card variant="ghost" size="lg" className="relative h-full rounded-lg overflow-hidden">
              <CardHeader>
                <CardTitle>Table</CardTitle>
                <CardDescription>Tabular data display with headers, footers, captions, striping, and inline components</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Example 1: Basic Table with Caption */}
                  <Box>
                    <Text weight="semibold" className="mb-3">Basic Table with Caption</Text>
                    <Text size="sm" muted className="mb-4">
                      Standard table with header, body, footer, and a caption describing the data.
                    </Text>
                    <Table>
                      <Thead>
                        <Tr>
                          <Th>Date</Th>
                          <Th>Description</Th>
                          <Th className="text-right">Amount</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        <Tr>
                          <Td>12 Feb 2026</Td>
                          <Td>Contactless payment</Td>
                          <Td className="text-right text-error">- $18.20</Td>
                        </Tr>
                        <Tr>
                          <Td>11 Feb 2026</Td>
                          <Td>Salary deposit</Td>
                          <Td className="text-right text-success">+ $3,200.00</Td>
                        </Tr>
                        <Tr>
                          <Td>09 Feb 2026</Td>
                          <Td>Netflix subscription</Td>
                          <Td className="text-right text-error">- $12.99</Td>
                        </Tr>
                        <Tr>
                          <Td>06 Feb 2026</Td>
                          <Td>Freelance invoice</Td>
                          <Td className="text-right text-success">+ $840.00</Td>
                        </Tr>
                      </Tbody>
                      <Tfoot>
                        <Tr>
                          <Th colSpan={2}>Net balance</Th>
                          <Td className="text-right font-semibold">+ $4,008.81</Td>
                        </Tr>
                      </Tfoot>
                    </Table>
                  </Box>

                  {/* Example 2: Striped Table */}
                  <Box>
                    <Text weight="semibold" className="mb-3">Striped Table</Text>
                    <Text size="sm" muted className="mb-4">
                      Alternating row backgrounds make dense data easier to scan.
                    </Text>
                    <Table>
                      <Thead>
                        <Tr>
                          <Th>Player</Th>
                          <Th className="text-center">Rank</Th>
                          <Th className="text-right">Points</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {[
                          { player: "J. Sinner", rank: 1, pts: "11,830" },
                          { player: "A. Zverev", rank: 2, pts: "10,475" },
                          { player: "C. Alcaraz", rank: 3, pts: "9,850" },
                          { player: "N. Djokovic", rank: 4, pts: "7,150" },
                          { player: "D. Medvedev", rank: 5, pts: "6,920" },
                        ].map((row, i) => (
                          <Tr key={row.player} className={i % 2 === 1 ? "bg-bg-tertiary" : ""}>
                            <Td className="font-medium">{row.player}</Td>
                            <Td className="text-center">{row.rank}</Td>
                            <Td className="text-right tabular-nums">{row.pts}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </Box>

                  {/* Example 3: Table with Badges */}
                  <Box className="lg:col-span-2">
                    <Text weight="semibold" className="mb-3">Table with Inline Components</Text>
                    <Text size="sm" muted className="mb-4">
                      Compose tables with badges, buttons, and other components for richer data views.
                    </Text>
                    <Table>
                      <Thead>
                        <Tr>
                          <Th>Invoice</Th>
                          <Th>Client</Th>
                          <Th>Status</Th>
                          <Th className="text-right">Amount</Th>
                          <Th className="text-right">Action</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        <Tr>
                          <Td className="font-medium">INV-001</Td>
                          <Td>Acme Corp</Td>
                          <Td><Badge action="success" size="sm">Paid</Badge></Td>
                          <Td className="text-right tabular-nums">$2,500.00</Td>
                          <Td className="text-right">
                            <Button variant="link" size="sm">View</Button>
                          </Td>
                        </Tr>
                        <Tr>
                          <Td className="font-medium">INV-002</Td>
                          <Td>Globex Inc</Td>
                          <Td><Badge action="warning" size="sm">Pending</Badge></Td>
                          <Td className="text-right tabular-nums">$1,800.00</Td>
                          <Td className="text-right">
                            <Button variant="link" size="sm">View</Button>
                          </Td>
                        </Tr>
                        <Tr>
                          <Td className="font-medium">INV-003</Td>
                          <Td>Initech LLC</Td>
                          <Td><Badge action="error" size="sm">Overdue</Badge></Td>
                          <Td className="text-right tabular-nums">$950.00</Td>
                          <Td className="text-right">
                            <Button variant="link" size="sm">View</Button>
                          </Td>
                        </Tr>
                        <Tr>
                          <Td className="font-medium">INV-004</Td>
                          <Td>Stark Industries</Td>
                          <Td><Badge action="info" size="sm">Draft</Badge></Td>
                          <Td className="text-right tabular-nums">$4,200.00</Td>
                          <Td className="text-right">
                            <Button variant="link" size="sm">Edit</Button>
                          </Td>
                        </Tr>
                      </Tbody>
                      <Tfoot>
                        <Tr>
                          <Th colSpan={3}>Total</Th>
                          <Td className="text-right font-semibold tabular-nums">$9,450.00</Td>
                          <Td />
                        </Tr>
                      </Tfoot>
                    </Table>
                  </Box>
                </div>
              </CardContent>
            </Card>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 dark:ring-white/10" />
          </div>

        </div>
      </Box>
    </Box>
  );
}
