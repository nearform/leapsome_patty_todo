"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Heading,
  Input,
  InputField,
  Text,
  VStack,
} from "@/components/prototype-ui";
import type { ColorToken } from "@/lib/types/trip-planner";
import { ColorSwatches } from "../_components/color-swatches";
import { UserAvatar } from "../_components/user-avatar";
import { ROUTES, useTripPlanner } from "../_store/trip-planner-context";

export default function ProfileSwitcherPage() {
  const router = useRouter();
  const { state, setCurrentUser, addUser } = useTripPlanner();
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState("");
  const [color, setColor] = useState<ColorToken>("info");

  const selectUser = (id: string) => {
    setCurrentUser(id);
    router.push(ROUTES.tripsHome);
  };

  const handleAdd = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    addUser(trimmed, color);
    setName("");
    setIsAdding(false);
    router.push(ROUTES.tripsHome);
  };

  return (
    <Box className="flex h-full flex-col overflow-y-auto surface-inverse px-6 pb-8 pt-[66px]">
      <Text size="sm" className="uppercase tracking-widest text-text-secondary">
        TripTogether
      </Text>
      <Heading as="h1" size="2xl" className="mt-3.5 text-text-primary">
        Plans are better together.
      </Heading>
      <Text className="mt-1.5 mb-7 text-text-secondary">
        Pick a profile. Everything you assign, pay for and vote on is stored against it.
      </Text>

      <ul className="grid grid-cols-2 gap-3.5">
        {state.users.map((user) => (
          <li key={user.id}>
            <button
              type="button"
              onClick={() => selectUser(user.id)}
              className="flex w-full flex-col items-start gap-3 rounded-xl border border-white/15 bg-white/5 p-[18px] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <UserAvatar user={user} size="lg" />
              <Text weight="semibold" className="text-text-primary">
                {user.name}
              </Text>
            </button>
          </li>
        ))}
      </ul>

      {isAdding ? (
        <VStack space="md" className="mt-5 rounded-xl border border-white/15 p-[18px]">
          <Input>
            <InputField
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
              autoComplete="nickname"
            />
          </Input>
          <ColorSwatches
            value={color}
            onChange={setColor}
            label="Profile color"
            showLabel={false}
          />
          <div className="flex gap-2.5">
            <Button isFullWidth onClick={handleAdd} isDisabled={!name.trim()}>
              Save profile
            </Button>
            <Button variant="outline" action="secondary" onClick={() => setIsAdding(false)}>
              Cancel
            </Button>
          </div>
        </VStack>
      ) : (
        <Button
          variant="outline"
          action="secondary"
          className="mt-5 border-white/25 text-text-primary"
          isFullWidth
          onClick={() => setIsAdding(true)}
        >
          Add a profile
        </Button>
      )}

      <div className="flex-1" />
      <Text size="sm" className="mt-8 text-text-tertiary">
        Prototype, not a product
      </Text>
    </Box>
  );
}
