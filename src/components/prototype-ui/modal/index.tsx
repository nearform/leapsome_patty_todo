"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon, X } from "@/components/prototype-ui/icon";

/**
 * Modal - Gluestack-compatible modal/dialog component
 * 
 * Displays content in an overlay dialog.
 * Supports compound component pattern: Modal > ModalBackdrop, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton
 * 
 * @example
 * ```tsx
 * <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
 *   <ModalBackdrop />
 *   <ModalContent>
 *     <ModalHeader>
 *       <Heading>Modal Title</Heading>
 *       <ModalCloseButton />
 *     </ModalHeader>
 *     <ModalBody>
 *       <Text>Modal content goes here</Text>
 *     </ModalBody>
 *     <ModalFooter>
 *       <Button onPress={() => setIsOpen(false)}>Close</Button>
 *     </ModalFooter>
 *   </ModalContent>
 * </Modal>
 * ```
 */

const modalContentVariants = cva(
  "relative bg-bg-elevated rounded-xl border border-border-decorative shadow-none overflow-hidden max-h-[90vh] flex flex-col",
  {
    variants: {
      size: {
        xs: "w-[280px]",
        sm: "w-[320px]",
        md: "w-[420px]",
        lg: "w-[520px]",
        xl: "w-[620px]",
        full: "w-[95vw] h-[95vh]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

/**
 * Modal context for compound components
 */
interface ModalContextValue {
  isOpen: boolean;
  onClose: () => void;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full" | null;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
}

const ModalContext = React.createContext<ModalContextValue | null>(null);

function useModalContext() {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error("Modal components must be used within a Modal");
  }
  return context;
}

export interface ModalProps {
  children: React.ReactNode;
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when modal should close */
  onClose: () => void;
  /** Size of the modal */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
  /** Whether clicking the backdrop closes the modal */
  closeOnOverlayClick?: boolean;
  /** Whether pressing Escape closes the modal */
  closeOnEsc?: boolean;
  /** Initial focus element ref */
  initialFocusRef?: React.RefObject<HTMLElement>;
  /** Final focus element ref */
  finalFocusRef?: React.RefObject<HTMLElement>;
  /** Whether to use portal */
  useRNModal?: boolean;
  /** Accessibility label */
  accessibilityLabel?: string;
}

const Modal = ({
  children,
  isOpen,
  onClose,
  size = "md",
  closeOnOverlayClick = true,
  closeOnEsc = true,
  initialFocusRef,
  finalFocusRef,
  accessibilityLabel,
}: ModalProps) => {
  const previousActiveElement = React.useRef<HTMLElement | null>(null);

  // Handle escape key
  React.useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeOnEsc, onClose]);

  // Focus management
  React.useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      
      // Focus initial element or first focusable
      if (initialFocusRef?.current) {
        initialFocusRef.current.focus();
      }
    } else {
      // Return focus to previous element
      if (finalFocusRef?.current) {
        finalFocusRef.current.focus();
      } else if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }
  }, [isOpen, initialFocusRef, finalFocusRef]);

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ModalContext.Provider value={{ isOpen, onClose, size, closeOnOverlayClick, closeOnEsc }}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={accessibilityLabel}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        {children}
      </div>
    </ModalContext.Provider>
  );
};

Modal.displayName = "Modal";

/**
 * ModalBackdrop - Overlay behind the modal
 */
export interface ModalBackdropProps extends React.HTMLAttributes<HTMLDivElement> {}

const ModalBackdrop = React.forwardRef<HTMLDivElement, ModalBackdropProps>(
  ({ className, onClick, ...props }, ref) => {
    const { onClose, closeOnOverlayClick } = useModalContext();

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (closeOnOverlayClick) {
        onClose();
      }
      onClick?.(e);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "absolute inset-0 bg-black/50 animate-in fade-in-0 duration-200",
          className
        )}
        onClick={handleClick}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

ModalBackdrop.displayName = "ModalBackdrop";

/**
 * ModalContent - Container for modal content
 */
export interface ModalContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof modalContentVariants> {}

const ModalContent = React.forwardRef<HTMLDivElement, ModalContentProps>(
  ({ className, size: propSize, children, ...props }, ref) => {
    const { size: contextSize } = useModalContext();
    const size = propSize ?? contextSize;

    return (
      <div
        ref={ref}
        className={cn(
          modalContentVariants({ size }),
          "animate-in zoom-in-95 fade-in-0 duration-200",
          className
        )}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ModalContent.displayName = "ModalContent";

/**
 * ModalHeader - Header section of the modal
 */
export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-between p-4 border-b border-border-standard",
          className
        )}
        {...props}
      />
    );
  }
);

ModalHeader.displayName = "ModalHeader";

/**
 * ModalBody - Main content section of the modal
 */
export interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

const ModalBody = React.forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex-1 overflow-auto p-4", className)}
        {...props}
      />
    );
  }
);

ModalBody.displayName = "ModalBody";

/**
 * ModalFooter - Footer section of the modal
 */
export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const ModalFooter = React.forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-end gap-2 p-4 border-t border-border-standard",
          className
        )}
        {...props}
      />
    );
  }
);

ModalFooter.displayName = "ModalFooter";

/**
 * ModalCloseButton - Close button for the modal
 */
export interface ModalCloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const ModalCloseButton = React.forwardRef<HTMLButtonElement, ModalCloseButtonProps>(
  ({ className, onClick, ...props }, ref) => {
    const { onClose } = useModalContext();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClose();
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "rounded-sm p-1 text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-accent",
          className
        )}
        onClick={handleClick}
        aria-label="Close modal"
        {...props}
      >
        <Icon as={X} size="md" />
      </button>
    );
  }
);

ModalCloseButton.displayName = "ModalCloseButton";

export {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  modalContentVariants,
};
