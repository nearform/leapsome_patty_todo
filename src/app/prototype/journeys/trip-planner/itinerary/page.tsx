"use client";

import { useState } from "react";
import {
  Button,
  Input,
  InputField,
  Select,
  SelectItem,
  Text,
} from "@/components/prototype-ui";
import { TripShell } from "../_components/trip-shell";
import { daysInRange, formatShortDay, itineraryDaysForTrip } from "../_store/helpers";
import { useTripPlanner } from "../_store/trip-planner-context";
import { useRequireTrip } from "../_store/use-require-trip";

export default function ItineraryPage() {
  const trip = useRequireTrip();
  const { itinerary, addItineraryItem, deleteItineraryItem } = useTripPlanner();
  const [showAdd, setShowAdd] = useState(false);
  const [day, setDay] = useState("");
  const [time, setTime] = useState("10:00");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");

  if (!trip) {
    return (
      <TripShell activeItem="itinerary" title="Itinerary">
        <Text>Choose a trip from home.</Text>
      </TripShell>
    );
  }

  const dayList = daysInRange(trip.startDate, trip.endDate);
  const groups = itineraryDaysForTrip(trip.startDate, trip.endDate, itinerary);

  const openForm = () => {
    setDay(dayList[0] ?? trip.startDate);
    setTime("10:00");
    setTitle("");
    setNotes("");
    setShowAdd(true);
  };

  const save = () => {
    if (!title.trim() || !day) return;
    addItineraryItem({ day, time: time || "10:00", title: title.trim(), notes: notes.trim() });
    setShowAdd(false);
  };

  return (
    <TripShell activeItem="itinerary" title="Itinerary">
      {groups.map((group, index) => (
        <div key={group.iso} className={index === groups.length - 1 ? "mb-5" : "mb-[22px]"}>
          <div className="mb-2.5 flex items-baseline gap-2">
            <Text weight="medium" size="sm">
              {group.label}
            </Text>
            <Text size="sm" className="text-text-tertiary">
              {group.sub}
            </Text>
          </div>
          <div className="flex flex-col gap-2.5 border-l-2 border-border-decorative pl-3.5">
            {group.items.length === 0 ? (
              <Text size="sm" className="py-2 text-text-tertiary">
                Nothing planned yet.
              </Text>
            ) : (
              group.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 rounded-md border border-border-decorative px-3.5 py-3"
                >
                  <Text size="sm" weight="medium" className="min-w-[44px]">
                    {item.time}
                  </Text>
                  <span className="min-w-0 flex-1">
                    <Text className="block">{item.title}</Text>
                    {item.notes ? (
                      <Text size="sm" className="mt-0.5 block text-text-secondary">
                        {item.notes}
                      </Text>
                    ) : null}
                  </span>
                  <button
                    type="button"
                    aria-label={`Delete ${item.title}`}
                    onClick={() => deleteItineraryItem(item.id)}
                    className="px-0.5 text-[15px] text-text-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      ))}

      {showAdd ? (
        <div className="rounded-xl border border-text-primary p-4">
          <div className="mb-2.5 flex gap-2.5">
            <div className="min-w-0 flex-1">
              <Select selectedValue={day} onValueChange={setDay}>
              {dayList.map((iso, index) => (
                <SelectItem
                  key={iso}
                  value={iso}
                  label={`Day ${index + 1} · ${formatShortDay(iso)}`}
                />
              ))}
            </Select>
            </div>
            <Input className="w-[88px]">
              <InputField
                value={time}
                onChange={(event) => setTime(event.target.value)}
                placeholder="14:00"
              />
            </Input>
          </div>
          <Input className="mb-2.5">
            <InputField
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="What's happening?"
            />
          </Input>
          <Input className="mb-3.5">
            <InputField
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Notes (optional)"
            />
          </Input>
          <div className="flex gap-2.5">
            <Button isFullWidth onClick={save} isDisabled={!title.trim()}>
              Add stop
            </Button>
            <Button variant="outline" action="secondary" onClick={() => setShowAdd(false)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Button variant="outline" action="primary" isFullWidth onClick={openForm}>
          Add a stop
        </Button>
      )}
    </TripShell>
  );
}
