"use client";

import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { X, Copy, Check } from "lucide-react";
import { Box, HStack, Text, VStack } from "@/components/prototype-ui";

interface DSTokensDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function DSTokensDrawer({ open, onClose }: DSTokensDrawerProps) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/20 dark:bg-black/40 transition-opacity duration-300 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-3xl transform transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="relative flex h-full flex-col overflow-y-auto bg-bg-elevated shadow-xl">
                {/* Header */}
                <div className="sticky top-0 z-10 bg-bg-elevated border-b border-border-standard px-6 py-4">
                  <div className="flex items-center justify-between">
                    <DialogTitle className="text-lg font-semibold text-text-primary">
                      Design Tokens
                    </DialogTitle>
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-sm p-2 text-text-tertiary hover:text-text-primary hover:bg-bg-secondary transition-colors"
                    >
                      <span className="sr-only">Close panel</span>
                      <X className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                  <p className="mt-1 text-sm text-text-tertiary">
                    Semantic tokens map to primitive values for consistent design implementation
                  </p>
                </div>

                {/* Content */}
                <div className="flex-1 px-6 py-6">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border-standard">
                        <th className="text-left py-3 px-3 font-semibold text-text-primary text-sm">Token</th>
                        <th className="text-left py-3 px-3 font-semibold text-text-primary text-sm">Variable</th>
                        <th className="text-left py-3 px-3 font-semibold text-text-primary text-sm">Light</th>
                        <th className="text-left py-3 px-3 font-semibold text-text-primary text-sm">Dark</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Brand/Accent Colors */}
                      <tr className="bg-bg-secondary">
                        <td colSpan={4} className="py-2 px-3 font-semibold text-text-primary text-xs">Brand / Accent Colors</td>
                      </tr>
                      <TokenRow label="Accent Primary" variable="--accent-primary" lightValue="#3833B4" darkValue="#7367E7" />
                      <TokenRow label="Accent Light" variable="--accent-light" lightValue="#5041E1" darkValue="#968DED" />
                      <TokenRow label="Accent Dark" variable="--accent-dark" lightValue="#2A2687" darkValue="#5041E1" />
                      <TokenRow label="Accent Hover" variable="--accent-hover" lightValue="#2A2687" darkValue="#968DED" />

                      {/* Background Colors */}
                      <tr className="bg-bg-secondary">
                        <td colSpan={4} className="py-2 px-3 font-semibold text-text-primary text-xs">Background Colors</td>
                      </tr>
                      <TokenRow label="Background Base" variable="--background-base" lightValue="#FAFAFA" darkValue="#0B0F19" />
                      <TokenRow label="Background Elevated" variable="--background-elevated" lightValue="#FFFFFF" darkValue="#111827" />
                      <TokenRow label="Background Secondary" variable="--background-secondary" lightValue="#F5F5F5" darkValue="#1F2937" />
                      <TokenRow label="Background Tertiary" variable="--background-tertiary" lightValue="#EEEEEE" darkValue="#374151" />

                      {/* Neutral Scale */}
                      <tr className="bg-bg-secondary">
                        <td colSpan={4} className="py-2 px-3 font-semibold text-text-primary text-xs">Neutral Scale</td>
                      </tr>
                      <TokenRow label="Neutral 0" variable="--neutral-0" lightValue="#FFFFFF" />
                      <TokenRow label="Neutral 50" variable="--neutral-50" lightValue="#FAFAFA" />
                      <TokenRow label="Neutral 100" variable="--neutral-100" lightValue="#F5F5F5" />
                      <TokenRow label="Neutral 200" variable="--neutral-200" lightValue="#EEEEEE" />
                      <TokenRow label="Neutral 300" variable="--neutral-300" lightValue="#E0E0E0" />
                      <TokenRow label="Neutral 400" variable="--neutral-400" lightValue="#9CA3AF" />
                      <TokenRow label="Neutral 500" variable="--neutral-500" lightValue="#6B7280" />
                      <TokenRow label="Neutral 600" variable="--neutral-600" lightValue="#4B5563" />
                      <TokenRow label="Neutral 700" variable="--neutral-700" lightValue="#374151" />
                      <TokenRow label="Neutral 800" variable="--neutral-800" lightValue="#1F2937" />
                      <TokenRow label="Neutral 900" variable="--neutral-900" lightValue="#111827" />
                      <TokenRow label="Neutral 950" variable="--neutral-950" lightValue="#0B0F19" />

                      {/* Semantic/Status Colors */}
                      <tr className="bg-bg-secondary">
                        <td colSpan={4} className="py-2 px-3 font-semibold text-text-primary text-xs">Semantic Colors</td>
                      </tr>
                      <TokenRow label="Success" variable="--success-primary" lightValue="#059669" darkValue="#34D399" />
                      <TokenRow label="Success Light" variable="--success-light" lightValue="#34D399" darkValue="#6EE7B7" />
                      <TokenRow label="Success Dark" variable="--success-dark" lightValue="#047857" darkValue="#10B981" />
                      <TokenRow label="Success Background" variable="--success-background" lightValue="#ECFDF5" darkValue="#064E3B" />
                      <TokenRow label="Info" variable="--info-primary" lightValue="#3B82F6" darkValue="#60A5FA" />
                      <TokenRow label="Info Light" variable="--info-light" lightValue="#60A5FA" darkValue="#93C5FD" />
                      <TokenRow label="Info Dark" variable="--info-dark" lightValue="#2563EB" darkValue="#3B82F6" />
                      <TokenRow label="Info Background" variable="--info-background" lightValue="#EFF6FF" darkValue="#1E3A8A" />
                      <TokenRow label="Warning" variable="--warning-primary" lightValue="#F59E0B" darkValue="#FBBF24" />
                      <TokenRow label="Warning Light" variable="--warning-light" lightValue="#FBBF24" darkValue="#FCD34D" />
                      <TokenRow label="Warning Dark" variable="--warning-dark" lightValue="#D97706" darkValue="#F59E0B" />
                      <TokenRow label="Warning Background" variable="--warning-background" lightValue="#FFFBEB" darkValue="#78350F" />
                      <TokenRow label="Error" variable="--error-primary" lightValue="#EF4444" darkValue="#F87171" />
                      <TokenRow label="Error Light" variable="--error-light" lightValue="#F87171" darkValue="#FCA5A5" />
                      <TokenRow label="Error Dark" variable="--error-dark" lightValue="#DC2626" darkValue="#EF4444" />
                      <TokenRow label="Error Background" variable="--error-background" lightValue="#FEF2F2" darkValue="#7F1D1D" />

                      {/* Text Colors */}
                      <tr className="bg-bg-secondary">
                        <td colSpan={4} className="py-2 px-3 font-semibold text-text-primary text-xs">Text Colors</td>
                      </tr>
                      <TokenRow label="Text Primary" variable="--text-primary" lightValue="#111827" darkValue="#FAFAFA" />
                      <TokenRow label="Text Body" variable="--text-body" lightValue="#374151" darkValue="#EEEEEE" />
                      <TokenRow label="Text Secondary" variable="--text-secondary" lightValue="#4B5563" darkValue="#E0E0E0" />
                      <TokenRow label="Text Tertiary" variable="--text-tertiary" lightValue="#9CA3AF" darkValue="#6B7280" />
                      <TokenRow label="Text Disabled" variable="--text-disabled" lightValue="#E0E0E0" darkValue="#4B5563" />

                      {/* Border Colors */}
                      <tr className="bg-bg-secondary">
                        <td colSpan={4} className="py-2 px-3 font-semibold text-text-primary text-xs">Border Colors</td>
                      </tr>
                      <TokenRow label="Border Standard" variable="--border-standard" lightValue="#EEEEEE" darkValue="#374151" />
                      <TokenRow label="Border Subtle" variable="--border-subtle" lightValue="#F5F5F5" darkValue="#1F2937" />
                      <TokenRow label="Ring/Focus" variable="--ring-color" lightValue="#3833B4" darkValue="#7367E7" />

                      {/* Typography - Font Sizes */}
                      <tr className="bg-bg-secondary">
                        <td colSpan={4} className="py-2 px-3 font-semibold text-text-primary text-xs">Typography - Font Sizes</td>
                      </tr>
                      <TokenRowText label="Font Size 2 (xs)" variable="--font-size-2" value="10px" />
                      <TokenRowText label="Font Size 4 (sm)" variable="--font-size-4" value="12px" />
                      <TokenRowText label="Font Size 5 (md)" variable="--font-size-5" value="14px" />
                      <TokenRowText label="Font Size 6 (base)" variable="--font-size-6" value="16px" />
                      <TokenRowText label="Font Size 7 (xl)" variable="--font-size-7" value="18px" />
                      <TokenRowText label="Font Size 8 (2xl)" variable="--font-size-8" value="20px" />
                      <TokenRowText label="Font Size 9 (3xl)" variable="--font-size-9" value="24px" />
                      <TokenRowText label="Font Size 10 (4xl)" variable="--font-size-10" value="28px" />
                      <TokenRowText label="Font Size 11 (5xl)" variable="--font-size-11" value="32px" />
                      <TokenRowText label="Font Size 12 (6xl)" variable="--font-size-12" value="36px" />

                      {/* Font Weights */}
                      <tr className="bg-bg-secondary">
                        <td colSpan={4} className="py-2 px-3 font-semibold text-text-primary text-xs">Typography - Font Weights</td>
                      </tr>
                      <TokenRowText label="Regular" variable="--font-weight-regular" value="400" />
                      <TokenRowText label="Medium" variable="--font-weight-medium" value="500" />
                      <TokenRowText label="Semibold" variable="--font-weight-semibold" value="600" />
                      <TokenRowText label="Bold" variable="--font-weight-bold" value="700" />

                      {/* Spacing */}
                      <tr className="bg-bg-secondary">
                        <td colSpan={4} className="py-2 px-3 font-semibold text-text-primary text-xs">Spacing (4px base unit)</td>
                      </tr>
                      <TokenRowText label="Space 1" variable="--space-1" value="4px" />
                      <TokenRowText label="Space 2" variable="--space-2" value="8px" />
                      <TokenRowText label="Space 3" variable="--space-3" value="12px" />
                      <TokenRowText label="Space 4" variable="--space-4" value="16px" />
                      <TokenRowText label="Space 6" variable="--space-6" value="24px" />
                      <TokenRowText label="Space 8" variable="--space-8" value="32px" />
                      <TokenRowText label="Space 12" variable="--space-12" value="48px" />
                      <TokenRowText label="Space 16" variable="--space-16" value="64px" />
                      <TokenRowText label="Space 24" variable="--space-24" value="96px" />

                      {/* Border Radius */}
                      <tr className="bg-bg-secondary">
                        <td colSpan={4} className="py-2 px-3 font-semibold text-text-primary text-xs">Border Radius</td>
                      </tr>
                      <TokenRowText label="Radius SM" variable="--radius-sm" value="6px" />
                      <TokenRowText label="Radius MD" variable="--radius-md" value="8px" />
                      <TokenRowText label="Radius LG" variable="--radius-lg" value="10px" />
                      <TokenRowText label="Radius XL" variable="--radius-xl" value="12px" />
                      <TokenRowText label="Radius 2XL" variable="--radius-2xl" value="16px" />
                      <TokenRowText label="Radius Full" variable="--radius-full" value="9999px" />
                    </tbody>
                  </table>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

// Helper component for color token rows
function TokenRow({
  label,
  variable,
  lightValue,
  darkValue,
}: {
  label: string;
  variable: string;
  lightValue: string;
  darkValue?: string;
}) {
  return (
    <tr className="border-b border-border-subtle hover:bg-bg-secondary/50 transition-colors">
      <td className="py-2 px-3 text-text-body text-sm">{label}</td>
      <td className="py-2 px-3">
        <HStack space="xs" className="items-center">
          <CopyButton text={variable} />
          <code className="text-xs bg-bg-secondary px-1.5 py-0.5 rounded text-accent font-mono">{variable}</code>
        </HStack>
      </td>
      <td className="py-2 px-3">
        <HStack space="sm" className="items-center">
          <Box
            className="w-5 h-5 rounded border border-border-standard flex-shrink-0"
            style={{ backgroundColor: lightValue }}
          />
          <Text size="sm" className="font-mono">{lightValue}</Text>
        </HStack>
      </td>
      <td className="py-2 px-3">
        {darkValue ? (
          <HStack space="sm" className="items-center">
            <Box
              className="w-5 h-5 rounded border border-border-standard flex-shrink-0"
              style={{ backgroundColor: darkValue }}
            />
            <Text size="sm" className="font-mono">{darkValue}</Text>
          </HStack>
        ) : (
          <Text size="sm" className="text-text-tertiary">—</Text>
        )}
      </td>
    </tr>
  );
}

// Helper component for non-color token rows
function TokenRowText({
  label,
  variable,
  value,
}: {
  label: string;
  variable: string;
  value: string;
}) {
  return (
    <tr className="border-b border-border-subtle hover:bg-bg-secondary/50 transition-colors">
      <td className="py-2 px-3 text-text-body text-sm">{label}</td>
      <td className="py-2 px-3">
        <HStack space="xs" className="items-center">
          <CopyButton text={variable} />
          <code className="text-xs bg-bg-secondary px-1.5 py-0.5 rounded text-accent font-mono">{variable}</code>
        </HStack>
      </td>
      <td colSpan={2} className="py-2 px-3">
        <Text size="sm" className="font-mono">{value}</Text>
      </td>
    </tr>
  );
}

// Copy button component
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

DSTokensDrawer.displayName = "DSTokensDrawer";
