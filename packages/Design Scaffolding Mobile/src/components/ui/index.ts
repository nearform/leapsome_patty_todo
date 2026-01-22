// ============================================
// GLUESTACK-COMPATIBLE UI COMPONENTS
// ATP/WTA Design System - React Native Ready
// ============================================

// ============================================
// New Gluestack Components (from gluestack folder)
// ============================================
export {
  // Icon - Foundation component
  Icon,
  iconVariants,
  type IconProps,
  // Re-exported Lucide icons
  Home,
  Search,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  Plus,
  Minus,
  Check,
  Copy,
  Edit,
  Trash2,
  Download,
  Upload,
  Share,
  Settings,
  MoreHorizontal,
  MoreVertical,
  User,
  Users,
  UserPlus,
  LogIn,
  LogOut,
  Info,
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ImageIcon,
  Camera,
  Video,
  Mail,
  MessageCircle,
  Phone,
  Bell,
  BellOff,
  Calendar,
  Clock,
  Star,
  Heart,
  Bookmark,
  Eye,
  EyeOff,
  Grid,
  List,
  Columns,
  Rows,
  Trophy,
  Medal,
  Target,
  Activity,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Globe,
  Map,
  MapPin,
  Compass,
  Sun,
  Moon,
  Loader2,
  RefreshCw,
  Filter,
  SlidersHorizontal,
  // Image
  Image,
  imageVariants,
  type ImageProps,
  // Pressable
  Pressable,
  type PressableProps,
  // Link
  Link,
  LinkText,
  linkVariants,
  type LinkProps,
  type LinkTextProps,
  // Modal
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  modalContentVariants,
  type ModalProps,
  type ModalBackdropProps,
  type ModalContentProps,
  type ModalHeaderProps,
  type ModalBodyProps,
  type ModalFooterProps,
  type ModalCloseButtonProps,
  // Drawer
  Drawer,
  DrawerBackdrop,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerCloseButton,
  drawerContentVariants,
  type DrawerProps,
  type DrawerBackdropProps,
  type DrawerContentProps,
  type DrawerHeaderProps,
  type DrawerBodyProps,
  type DrawerFooterProps,
  type DrawerCloseButtonProps,
  // Radio
  RadioGroup,
  Radio,
  RadioIndicator,
  RadioIcon,
  RadioLabel,
  radioVariants,
  radioIndicatorVariants,
  radioLabelVariants,
  type RadioGroupProps,
  type RadioProps,
  type RadioIndicatorProps,
  type RadioIconProps,
  type RadioLabelProps,
  // Textarea
  Textarea,
  TextareaInput,
  textareaContainerVariants,
  textareaInputVariants,
  type TextareaProps,
  type TextareaInputProps,
  // Skeleton
  Skeleton,
  SkeletonText,
  skeletonVariants,
  shimmerKeyframes,
  type SkeletonProps,
  type SkeletonTextProps,
} from "./gluestack";

// ============================================
// Layout Components (Gluestack-compatible)
// ============================================
export { Box, type BoxProps } from "./box";
export { Center, type CenterProps } from "./center";
export { Divider, dividerVariants, type DividerProps } from "./divider";
export { HStack, VStack, stackVariants, type StackProps } from "./stack";

// ============================================
// Typography Components (Gluestack-compatible)
// ============================================
export { Heading, headingVariants, type HeadingProps } from "./text-heading";
export { Text, textVariants, type TextProps } from "./text";

// ============================================
// Form Components (Gluestack-compatible)
// ============================================
export { 
  Button, 
  ButtonText,
  ButtonIcon,
  ButtonSpinner,
  ButtonGroup,
  buttonVariants,
  type ButtonProps,
  type ButtonTextProps,
  type ButtonIconProps,
  type ButtonGroupProps,
} from "./button";
export { 
  Input, 
  InputField,
  InputSlot,
  InputIcon,
  inputVariants,
  inputContainerVariants,
  inputFieldVariants,
  type InputProps,
  type InputFieldProps,
  type InputSlotProps,
  type InputIconProps,
} from "./input";
export { 
  Select, 
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectItem,
  SelectOption, 
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  selectVariants,
  type SelectProps,
  type SelectTriggerProps,
  type SelectInputProps,
  type SelectIconProps,
  type SelectItemProps,
  type SelectOptionProps,
  type SelectContentProps,
} from "./select";
export {
  Checkbox,
  CheckboxGroup,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
  checkboxVariants,
  checkboxIndicatorVariants,
  checkboxLabelVariants,
  type CheckboxProps,
  type CheckboxGroupProps,
  type CheckboxIndicatorProps,
  type CheckboxIconProps,
  type CheckboxLabelProps,
} from "./checkbox";
export {
  Switch,
  switchTrackVariants,
  switchThumbVariants,
  type SwitchProps,
} from "./switch";
export {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
  formControlVariants,
  type FormControlProps,
  type FormControlLabelProps,
  type FormControlLabelTextProps,
  type FormControlHelperProps,
  type FormControlHelperTextProps,
  type FormControlErrorProps,
  type FormControlErrorTextProps,
  type FormControlErrorIconProps,
} from "./form-control";

// ============================================
// Feedback Components (Gluestack-compatible)
// ============================================
export { 
  Alert, 
  AlertIcon,
  AlertText,
  AlertTitle, 
  AlertDescription, 
  alertVariants,
  type AlertProps,
  type AlertIconProps,
  type AlertTextProps,
} from "./alert";
export { 
  Progress, 
  ProgressFilledTrack,
  progressVariants, 
  progressFilledTrackVariants,
  progressSegmentVariants,
  progressSteppedVariants,
  type ProgressProps,
  type ProgressFilledTrackProps,
} from "./progress";
export { Spinner, spinnerVariants, type SpinnerProps } from "./spinner";
export {
  TennisBallLoader,
  tennisBallLoaderVariants,
  BouncingTennisBallLoader,
  bouncingTennisBallLoaderVariants,
} from "./tennis-ball-loader";

// ============================================
// Data Display Components (Gluestack-compatible)
// ============================================
export { 
  Badge, 
  BadgeText,
  BadgeIcon,
  badgeVariants,
  type BadgeProps,
  type BadgeTextProps,
  type BadgeIconProps,
} from "./badge";
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  cardVariants,
} from "./card";
export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarFallbackText,
  AvatarGroup,
  AvatarBadge,
  AvatarFlagBadge,
  avatarVariants,
  avatarBadgeVariants,
  avatarFlagBadgeVariants,
  type AvatarProps,
  type AvatarImageProps,
  type AvatarFallbackProps,
  type AvatarFallbackTextProps,
  type AvatarGroupProps,
  type AvatarBadgeProps,
  type AvatarFlagBadgeProps,
} from "./avatar";
export {
  PlayerListItem,
  type PlayerListItemProps,
} from "./player-list-item";
export {
  TournamentListItem,
  type TournamentListItemProps,
} from "./tournament-list-item";
export {
  CircleNavigation,
  CircleNavigationLiveBadge,
  circleNavigationVariants,
  type CircleNavigationItem,
  type CircleNavigationProps,
  type CircleNavigationLiveBadgeProps,
} from "./circle-navigation";
export {
  HeadToHead,
  headToHeadVariants,
  TennisBallIcon,
  type HeadToHeadProps,
  type PlayerData,
  type SurfaceStats,
  type LastMatch,
  type ExpandedSurfaceStats,
  type AIAnalysis,
  type AIFollowUp,
} from "./head-to-head";
export {
  RankingsModule,
  rankingsModuleVariants,
  type RankedPlayer,
  type RankingsModuleProps,
  type RankingCategory,
  type TopMover,
  type AISummary,
} from "./rankings-module";

// ============================================
// Navigation Components
// ============================================
export { AppHeader } from "./app-header";
export { AppFooter, type AppFooterItem, type AppFooterProps } from "./app-footer";

// ============================================
// Banner Components
// ============================================
export { RolexClockBanner, rolexClockBannerVariants } from "./rolex-clock-banner";

// ============================================
// Carousel Components
// ============================================
export {
  CarouselNews,
  CarouselIndicator,
  carouselNewsVariants,
  carouselIndicatorContainerVariants,
  carouselIndicatorDotVariants,
  type CarouselNewsItem,
  type CarouselNewsProps,
} from "./carousel-news";

// ============================================
// Stories Components
// ============================================
export {
  StoriesViewer,
  type StoryData,
  type StoriesViewerProps,
} from "./stories";

// InstaStories Components (react-instastories library)
export {
  InstaStoriesSection,
  type InstaStoryData,
  type InstaStoriesProps,
} from "./insta-stories";

// ============================================
// Tab Components
// ============================================
export {
  Tabs,
  tabsVariants,
  tabsListVariants,
  tabVariants,
  type Tab,
  type TabsProps,
} from "./tabs";

// ============================================
// Tooltip Components (Gluestack-compatible)
// ============================================
export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipText,
  tooltipVariants,
  arrowVariants,
} from "./tooltip";

// ============================================
// Provider & Hooks
// ============================================
export { GluestackUIProvider, useTheme } from "./gluestack-ui-provider";
