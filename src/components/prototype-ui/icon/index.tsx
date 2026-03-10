"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { LucideIcon, LucideProps } from "lucide-react";

/**
 * Icon component - Gluestack-compatible wrapper for Lucide icons
 * 
 * This provides a standardized icon component that:
 * 1. Works with Lucide React icons (which you already use)
 * 2. Has consistent sizing via the `size` prop
 * 3. Supports className for custom styling
 * 4. Will translate to React Native's Icon component in Phase 2
 * 
 * @example
 * ```tsx
 * import { Icon } from "@/components/prototype-ui/icon";
 * import { Search, User, Home } from "lucide-react";
 * 
 * // Basic usage
 * <Icon as={Search} />
 * 
 * // With size
 * <Icon as={User} size="lg" />
 * 
 * // With custom styling
 * <Icon as={Home} size="md" className="text-accent" />
 * ```
 */

const iconVariants = cva("shrink-0 fill-none", {
  variants: {
    size: {
      "2xs": "h-3 w-3",
      xs: "h-3.5 w-3.5",
      sm: "h-4 w-4",
      md: "h-[18px] w-[18px]",
      lg: "h-5 w-5",
      xl: "h-6 w-6",
      "2xl": "h-8 w-8",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface IconProps
  extends Omit<LucideProps, "size">,
    VariantProps<typeof iconVariants> {
  /** The Lucide icon component to render */
  as: LucideIcon;
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ as: IconComponent, size, className, ...props }, ref) => {
    return (
      <IconComponent
        ref={ref}
        className={cn(iconVariants({ size }), className)}
        {...props}
      />
    );
  }
);

Icon.displayName = "Icon";

// Re-export common icons for convenience
// These can be imported directly from this file
export {
  // Navigation
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
  // Actions
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
  // User
  User,
  Users,
  UserPlus,
  LogIn,
  LogOut,
  // Status
  Info,
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  // Media
  Play,
  Pause,
  Volume2,
  VolumeX,
  Image as ImageIcon,
  Camera,
  Video,
  // Communication
  Mail,
  MessageCircle,
  Phone,
  Bell,
  BellOff,
  // Data
  Calendar,
  Clock,
  Star,
  Heart,
  Bookmark,
  Eye,
  EyeOff,
  // Layout
  Grid as LayoutGridIcon,
  List,
  Columns,
  Rows,
  // Achievement & Analytics
  Trophy,
  Medal,
  Target,
  Activity,
  BarChart3,
  TrendingUp,
  TrendingDown,
  // Misc
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
} from "lucide-react";

export { Icon, iconVariants };
