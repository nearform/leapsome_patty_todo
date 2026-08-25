"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
} from "@/components/prototype-ui";
import type { ColorToken } from "@/lib/types/trip-planner";
import { ColorSwatches } from "../_components/color-swatches";
import { ScreenChrome } from "../_components/screen-chrome";
import { ROUTES, useTripPlanner } from "../_store/trip-planner-context";

export default function CreateTripPage() {
  const router = useRouter();
  const { addTrip } = useTripPlanner();
  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [coverColor, setCoverColor] = useState<ColorToken>("info");

  const canSave = Boolean(
    name.trim() && destination.trim() && startDate && endDate && endDate >= startDate
  );

  const handleSave = () => {
    if (!canSave) return;
    addTrip({
      name: name.trim(),
      destination: destination.trim(),
      startDate,
      endDate,
      coverColor,
    });
    router.push(ROUTES.tripOverview);
  };

  return (
    <Box className="h-full overflow-y-auto bg-bg-base px-5 pb-10 pt-[66px]">
      <ScreenChrome
        backLabel="Trips"
        onBack={() => router.push(ROUTES.tripsHome)}
        title="New trip"
      />

      <FormControl isRequired className="mb-4">
        <FormControlLabel>
          <FormControlLabelText>Trip name</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Portugal 2026"
          />
        </Input>
      </FormControl>

      <FormControl isRequired className="mb-4">
        <FormControlLabel>
          <FormControlLabelText>Destination</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
            placeholder="Lisbon, Portugal"
          />
        </Input>
      </FormControl>

      <div className="mb-[18px] flex gap-3">
        <FormControl isRequired className="flex-1">
          <FormControlLabel>
            <FormControlLabelText>Start</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
            />
          </Input>
        </FormControl>
        <FormControl isRequired className="flex-1">
          <FormControlLabel>
            <FormControlLabelText>End</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              type="date"
              value={endDate}
              min={startDate}
              onChange={(event) => setEndDate(event.target.value)}
            />
          </Input>
        </FormControl>
      </div>

      <FormControl className="mb-6">
        <FormControlLabel>
          <FormControlLabelText>Cover colour</FormControlLabelText>
        </FormControlLabel>
        <ColorSwatches
          value={coverColor}
          onChange={setCoverColor}
          label="Cover colour"
          shape="square"
          showLabel={false}
        />
      </FormControl>

      <Button isFullWidth onClick={handleSave} isDisabled={!canSave}>
        Create trip
      </Button>
    </Box>
  );
}
