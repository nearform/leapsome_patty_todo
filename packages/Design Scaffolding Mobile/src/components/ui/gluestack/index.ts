// Gluestack-compatible UI components
// These components wrap gluestack-ui patterns while preserving the ATP/WTA design system

// ============================================
// Icon - Foundation component (dependency for many others)
// ============================================
export {
  Icon,
  iconVariants,
  type IconProps,
  // Re-exported Lucide icons for convenience
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
} from "./icon";

// ============================================
// Image - Cross-platform image component
// ============================================
export { Image, imageVariants, type ImageProps } from "./image";

// ============================================
// Pressable - Touch-friendly wrapper
// ============================================
export { Pressable, type PressableProps } from "./pressable";

// ============================================
// Link - Navigation component
// ============================================
export { Link, LinkText, linkVariants, type LinkProps, type LinkTextProps } from "./link";

// ============================================
// Modal - Overlay dialogs
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
// Drawer - Side panel navigation
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
// Radio - Single-select option groups
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
// Textarea - Multi-line text input
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
// Skeleton - Loading state placeholders
// ============================================
export {
  Skeleton,
  SkeletonText,
  skeletonVariants,
  shimmerKeyframes,
  type SkeletonProps,
  type SkeletonTextProps,
} from "./skeleton";
