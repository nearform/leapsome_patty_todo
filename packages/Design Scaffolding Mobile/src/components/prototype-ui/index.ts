// ============================================
// GLUESTACK-COMPATIBLE UI COMPONENTS
// Design System - React Native Ready
// ============================================

// ============================================
// Icon Component & Lucide Icons
// ============================================
export {
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
  LayoutGridIcon,
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
} from "./icon";

// ============================================
// Image Component
// ============================================
export {
  Image,
  imageVariants,
  type ImageProps,
} from "./image";

// ============================================
// Pressable Component
// ============================================
export {
  Pressable,
  type PressableProps,
} from "./pressable";

// ============================================
// Link Component
// ============================================
export {
  Link,
  LinkText,
  linkVariants,
  type LinkProps,
  type LinkTextProps,
} from "./link";

// ============================================
// Modal Component
// ============================================
export {
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
} from "./modal";

// ============================================
// Drawer Component
// ============================================
export {
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
} from "./drawer";

// ============================================
// Radio Component
// ============================================
export {
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
} from "./radio";

// ============================================
// Textarea Component
// ============================================
export {
  Textarea,
  TextareaInput,
  textareaContainerVariants,
  textareaInputVariants,
  type TextareaProps,
  type TextareaInputProps,
} from "./textarea";

// ============================================
// Skeleton Component
// ============================================
export {
  Skeleton,
  SkeletonText,
  skeletonVariants,
  shimmerKeyframes,
  type SkeletonProps,
  type SkeletonTextProps,
} from "./skeleton";

// ============================================
// Layout Components (Gluestack-compatible)
// ============================================
export { Box, type BoxProps } from "./box";
export { Center, type CenterProps } from "./center";
export { Divider, dividerVariants, type DividerProps } from "./divider";
export { HStack, VStack, stackVariants, type StackProps } from "./stack";
export { Grid, gridVariants, type GridProps } from "./grid";
export { ScrollView, type ScrollViewProps } from "./scroll-view";

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
  avatarVariants,
  avatarBadgeVariants,
  type AvatarProps,
  type AvatarImageProps,
  type AvatarFallbackProps,
  type AvatarFallbackTextProps,
  type AvatarGroupProps,
  type AvatarBadgeProps,
} from "./avatar";
export {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  type TableProps,
  type TableHeaderProps,
  type TableBodyProps,
  type TableFooterProps,
  type TableRowProps,
  type TableHeaderCellProps,
  type TableCellProps,
  type TableCaptionProps,
} from "./table";

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
// Disclosure Components (Gluestack-compatible)
// ============================================
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  accordionVariants,
  type AccordionProps,
  type AccordionItemProps,
  type AccordionTriggerProps,
  type AccordionContentProps,
} from "./accordion";

// ============================================
// Overlay Components (Gluestack-compatible)
// ============================================
export {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetLabel,
  type ActionsheetProps,
  type ActionsheetBackdropProps,
  type ActionsheetContentProps,
  type ActionsheetItemProps,
  type ActionsheetLabelProps,
} from "./actionsheet";
export {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogCloseButton,
  alertDialogContentVariants,
  type AlertDialogProps,
  type AlertDialogBackdropProps,
  type AlertDialogContentProps,
  type AlertDialogHeaderProps,
  type AlertDialogBodyProps,
  type AlertDialogFooterProps,
  type AlertDialogCloseButtonProps,
} from "./alert-dialog";
export {
  Menu as MenuComponent,
  MenuTrigger,
  MenuContent,
  MenuItem,
  type MenuProps as MenuComponentProps,
  type MenuTriggerProps,
  type MenuContentProps,
  type MenuItemProps,
} from "./menu";
export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  type PopoverProps,
  type PopoverTriggerProps,
  type PopoverContentProps,
  type PopoverArrowProps,
  type PopoverCloseButtonProps,
} from "./popover";

// ============================================
// Slider Component (Gluestack-compatible)
// ============================================
export {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  sliderTrackVariants,
  sliderThumbVariants,
  type SliderProps,
  type SliderTrackProps,
  type SliderFilledTrackProps,
  type SliderThumbProps,
} from "./slider";

// ============================================
// Toast Components (Gluestack-compatible)
// ============================================
export {
  ToastProvider,
  useToast,
  Toast,
  ToastTitle,
  ToastDescription,
  toastVariants,
  type ToastProviderProps,
  type ToastProps,
  type ToastTitleProps,
  type ToastDescriptionProps,
} from "./toast";

// ============================================
// Navigation Components
// ============================================
export { AppHeader, appHeaderVariants, type AppHeaderProps } from "./app-header";
export { 
  AppFooter, 
  appFooterVariants, 
  defaultItems as appFooterDefaultItems,
  type AppFooterItem, 
  type AppFooterProps 
} from "./app-footer";
export { Fab, fabVariants, fabPositionVariants, type FabProps } from "./fab";

// ============================================
// Utility / Infrastructure Components
// ============================================
export { Portal, type PortalProps } from "./portal";

// ============================================
// Provider & Hooks (re-exported from providers)
// ============================================
export { ThemeProvider, GluestackUIProvider, useTheme } from "@/providers/theme-provider";
