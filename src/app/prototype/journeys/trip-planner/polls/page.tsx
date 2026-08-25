"use client";

import { useState } from "react";
import { Badge, Button, Input, InputField, Text } from "@/components/prototype-ui";
import { cn } from "@/lib/utils";
import { TripShell } from "../_components/trip-shell";
import { UserAvatar } from "../_components/user-avatar";
import { getUser } from "../_store/helpers";
import { useTripPlanner } from "../_store/trip-planner-context";
import { useRequireTrip } from "../_store/use-require-trip";

export default function PollsPage() {
  const trip = useRequireTrip();
  const { state, polls, currentUser, addPoll, vote, togglePollClosed } = useTripPlanner();
  const [showAdd, setShowAdd] = useState(false);
  const [question, setQuestion] = useState("");
  const [opt1, setOpt1] = useState("");
  const [opt2, setOpt2] = useState("");
  const [opt3, setOpt3] = useState("");

  if (!trip) {
    return (
      <TripShell activeItem="polls" title="Decisions">
        <Text>Choose a trip from home.</Text>
      </TripShell>
    );
  }

  const save = () => {
    addPoll(question, [opt1, opt2, opt3]);
    setQuestion("");
    setOpt1("");
    setOpt2("");
    setOpt3("");
    setShowAdd(false);
  };

  const canSave = Boolean(question.trim() && [opt1, opt2, opt3].filter((option) => option.trim()).length >= 2);

  return (
    <TripShell
      activeItem="polls"
      title="Decisions"
      subtitle={`Voting as ${currentUser?.name ?? "you"}. Switch profile to vote as someone else.`}
    >
      <div className="mb-[18px] flex flex-col gap-3.5">
        {polls.map((poll) => {
          const totalVotes = poll.options.reduce((sum, option) => sum + option.votes.length, 0) || 1;

          return (
            <div key={poll.id} className="overflow-hidden rounded-xl border border-border-decorative">
              <div className="flex items-start justify-between gap-3 px-4 pb-3 pt-4">
                <Text weight="medium" className="leading-snug">
                  {poll.question}
                </Text>
                <button
                  type="button"
                  onClick={() => togglePollClosed(poll.id)}
                  className="shrink-0"
                >
                  <Badge action={poll.closed ? "muted" : "success"} size="sm">
                    {poll.closed ? "Closed" : "Open"}
                  </Badge>
                </button>
              </div>
              <div className="flex flex-col gap-2 px-4 pb-4">
                {poll.options.map((option) => {
                  const pct = Math.round((option.votes.length / totalVotes) * 100);
                  const votedHere = currentUser ? option.votes.includes(currentUser.id) : false;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      disabled={poll.closed}
                      onClick={() => vote(poll.id, option.id)}
                      className={cn(
                        "relative block w-full overflow-hidden rounded-md border px-3.5 py-3 text-left",
                        votedHere ? "border-text-primary" : "border-border-decorative",
                        poll.closed && "cursor-default"
                      )}
                    >
                      <span
                        className="absolute inset-y-0 left-0 bg-bg-tertiary"
                        style={{ width: `${pct}%` }}
                        aria-hidden="true"
                      />
                      <span className="relative flex items-center justify-between gap-2.5">
                        <Text>{option.label}</Text>
                        <span className="flex items-center gap-1.5">
                          {option.votes.map((userId) => {
                            const voter = getUser(state, userId);
                            return voter ? <UserAvatar key={userId} user={voter} size="xs" /> : null;
                          })}
                          <Text size="sm" weight="medium" className="text-text-secondary">
                            {option.votes.length}
                          </Text>
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {showAdd ? (
        <div className="rounded-xl border border-text-primary p-4">
          <Input className="mb-2.5">
            <InputField
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="What are we deciding?"
            />
          </Input>
          <Input className="mb-2">
            <InputField
              value={opt1}
              onChange={(event) => setOpt1(event.target.value)}
              placeholder="Option one"
            />
          </Input>
          <Input className="mb-2">
            <InputField
              value={opt2}
              onChange={(event) => setOpt2(event.target.value)}
              placeholder="Option two"
            />
          </Input>
          <Input className="mb-3.5">
            <InputField
              value={opt3}
              onChange={(event) => setOpt3(event.target.value)}
              placeholder="Option three (optional)"
            />
          </Input>
          <div className="flex gap-2.5">
            <Button isFullWidth onClick={save} isDisabled={!canSave}>
              Post poll
            </Button>
            <Button variant="outline" action="secondary" onClick={() => setShowAdd(false)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Button variant="outline" action="primary" isFullWidth onClick={() => setShowAdd(true)}>
          New poll
        </Button>
      )}
    </TripShell>
  );
}
