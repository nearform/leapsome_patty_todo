"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  Box,
  Button,
  Heading,
  Switch,
  Text,
} from "@/components/prototype-ui";
import type { CurrencySymbol } from "@/lib/types/trip-planner";
import { useTheme } from "@/providers/theme-provider";
import { cn } from "@/lib/utils";
import { ScreenChrome } from "../_components/screen-chrome";
import { ROUTES, useTripPlanner } from "../_store/trip-planner-context";

const CURRENCIES: CurrencySymbol[] = ["€", "£", "$"];

export default function SettingsPage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { state, setAutoIcons, setCurrency, reset } = useTripPlanner();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleReset = () => {
    reset();
    setConfirmOpen(false);
    router.push(ROUTES.profileSwitcher);
  };

  return (
    <Box className="h-full overflow-y-auto bg-bg-base px-5 pb-10 pt-[66px]">
      <ScreenChrome
        backLabel="Trips"
        onBack={() => router.push(ROUTES.tripsHome)}
        title="Settings"
      />

      <div className="mb-3.5 flex items-center justify-between gap-4 rounded-xl border border-border-decorative p-[18px]">
        <div>
          <Text weight="medium">Dark mode</Text>
          <Text size="sm" className="mt-0.5 text-text-secondary">
            Ivory on charcoal, still TripTogether.
          </Text>
        </div>
        <Switch
          value={theme === "dark"}
          onValueChange={() => toggleTheme()}
          aria-label="Dark mode"
        />
      </div>

      <div className="mb-3.5 flex items-center justify-between gap-4 rounded-xl border border-border-decorative p-[18px]">
        <div>
          <Text weight="medium">Suggest icons as I type</Text>
          <Text size="sm" className="mt-0.5 text-text-secondary">
            Matches to-do titles against a small keyword list.
          </Text>
        </div>
        <Switch
          value={state.autoIcons}
          onValueChange={setAutoIcons}
          aria-label="Suggest icons as I type"
        />
      </div>

      <div className="mb-3.5 rounded-xl border border-border-decorative p-[18px]">
        <Text weight="medium" className="mb-3">
          Currency
        </Text>
        <div className="flex gap-2">
          {CURRENCIES.map((symbol) => {
            const selected = state.currency === symbol;
            return (
              <button
                key={symbol}
                type="button"
                onClick={() => setCurrency(symbol)}
                className={cn(
                  "flex-1 rounded-md border py-2.5 text-sm font-medium",
                  selected
                    ? "border-accent bg-accent text-text-on-accent"
                    : "border-border-decorative bg-bg-elevated text-text-secondary"
                )}
              >
                {symbol}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-[22px] rounded-xl border border-border-decorative p-[18px]">
        <Text weight="medium">Reset demo data</Text>
        <Text size="sm" className="mb-3.5 mt-1 text-text-secondary">
          Puts every trip, list, poll and expense back to the seeded state.
        </Text>
        <Button variant="outline" action="primary" onClick={() => setConfirmOpen(true)}>
          Reset
        </Button>
      </div>

      <Text size="sm" className="text-text-secondary">
        TripTogether MVP demo · v0.1
        <br />
        Data lives in this browser only. No account, no server.
      </Text>

      <AlertDialog isOpen={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading size="lg">Reset demo data?</Heading>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text>This replaces your current demo with the original seeded trips.</Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Box className="flex w-full gap-3">
              <Button
                variant="outline"
                action="secondary"
                isFullWidth
                onClick={() => setConfirmOpen(false)}
              >
                Cancel
              </Button>
              <Button action="negative" isFullWidth onClick={handleReset}>
                Reset
              </Button>
            </Box>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  );
}
