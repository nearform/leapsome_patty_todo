"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  Text,
} from "@/components/prototype-ui";
import type { ColorToken } from "@/lib/types/trip-planner";
import { ColorSwatches } from "../_components/color-swatches";
import { ScreenChrome } from "../_components/screen-chrome";
import { UserAvatar } from "../_components/user-avatar";
import { ROUTES, useTripPlanner } from "../_store/trip-planner-context";

export default function MyProfilePage() {
  const router = useRouter();
  const { currentUser, updateUser } = useTripPlanner();
  const [name, setName] = useState(currentUser?.name ?? "");
  const [color, setColor] = useState<ColorToken>(currentUser?.color ?? "info");

  useEffect(() => {
    if (!currentUser) return;
    setName(currentUser.name);
    setColor(currentUser.color);
  }, [currentUser]);

  const handleSave = () => {
    if (!currentUser || !name.trim()) return;
    updateUser(currentUser.id, { name: name.trim(), color });
    router.back();
  };

  if (!currentUser) {
    return (
      <Box className="h-full overflow-y-auto bg-bg-base px-5 pt-[66px]">
        <Text>Select a profile to edit it.</Text>
      </Box>
    );
  }

  return (
    <Box className="h-full overflow-y-auto bg-bg-base px-5 pb-10 pt-[66px]">
      <ScreenChrome backLabel="Back" onBack={() => router.back()} title="Your profile" />

      <div className="mb-6 flex items-center gap-3.5">
        <UserAvatar user={{ ...currentUser, name, color }} size="xl" />
        <Text weight="semibold" className="text-lg">
          {name || currentUser.name}
        </Text>
      </div>

      <FormControl isRequired className="mb-[18px]">
        <FormControlLabel>
          <FormControlLabelText>Name</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField value={name} onChange={(event) => setName(event.target.value)} />
        </Input>
      </FormControl>

      <FormControl className="mb-6">
        <FormControlLabel>
          <FormControlLabelText>Your colour</FormControlLabelText>
        </FormControlLabel>
        <ColorSwatches
          value={color}
          onChange={setColor}
          label="Profile colour"
          showLabel={false}
        />
      </FormControl>

      <Button isFullWidth className="mb-3" onClick={handleSave} isDisabled={!name.trim()}>
        Save changes
      </Button>
      <Button
        variant="outline"
        action="secondary"
        isFullWidth
        className="mb-3"
        onClick={() => router.push(ROUTES.settings)}
      >
        Settings
      </Button>
      <Button
        variant="outline"
        action="secondary"
        isFullWidth
        onClick={() => router.push(ROUTES.profileSwitcher)}
      >
        Switch profile
      </Button>
    </Box>
  );
}
