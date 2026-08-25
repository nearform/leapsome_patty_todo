"use client";

import { useState } from "react";
import {
  Button,
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  Icon,
  Input,
  InputField,
  Text,
} from "@/components/prototype-ui";
import { suggestTodoIcon, TODO_ICON_COMPONENTS } from "@/lib/data/trip-planner-icons";
import type { TodoCategory, TodoIconKey } from "@/lib/types/trip-planner";
import { cn } from "@/lib/utils";
import { IconPicker } from "../_components/icon-picker";
import { TripShell } from "../_components/trip-shell";
import { UserAvatar } from "../_components/user-avatar";
import { getUser } from "../_store/helpers";
import { useTripPlanner } from "../_store/trip-planner-context";
import { useRequireTrip } from "../_store/use-require-trip";

const CATEGORIES: Array<{ value: TodoCategory; label: string }> = [
  { value: "packing", label: "Packing" },
  { value: "todo", label: "Before we go" },
];

export default function TodosPage() {
  const trip = useRequireTrip();
  const { state, todos, members, addTodo, toggleTodo } = useTripPlanner();
  const [showAdd, setShowAdd] = useState(false);
  const [iconGridOpen, setIconGridOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState<TodoIconKey>("tag");
  const [iconOverridden, setIconOverridden] = useState(false);
  const [category, setCategory] = useState<TodoCategory>("packing");
  const [assignee, setAssignee] = useState(state.currentUserId);

  if (!trip) {
    return (
      <TripShell activeItem="todos" title="To-dos & packing">
        <Text>Choose a trip from home.</Text>
      </TripShell>
    );
  }

  const doneCount = todos.filter((item) => item.done).length;
  const groups = CATEGORIES.map((group) => ({
    ...group,
    items: todos.filter((item) => item.category === group.value),
  }));

  const onTitleChange = (value: string) => {
    setTitle(value);
    if (!iconOverridden && state.autoIcons) {
      setIcon(suggestTodoIcon(value));
    }
  };

  const openForm = () => {
    setTitle("");
    setIcon("tag");
    setIconOverridden(false);
    setCategory("packing");
    setAssignee(state.currentUserId);
    setIconGridOpen(false);
    setShowAdd(true);
  };

  const save = () => {
    if (!title.trim()) return;
    addTodo({
      title: title.trim(),
      icon,
      category,
      assignedTo: assignee || null,
      done: false,
    });
    setShowAdd(false);
  };

  return (
    <TripShell
      activeItem="todos"
      title="To-dos & packing"
      subtitle={`${doneCount} of ${todos.length} ticked off`}
    >
      {groups.map((group) =>
        group.items.length === 0 ? null : (
          <div key={group.value} className="mb-[22px]">
            <Text size="sm" weight="medium" className="mb-2.5 uppercase tracking-widest text-text-tertiary">
              {group.label}
            </Text>
            <div className="flex flex-col gap-2">
              {group.items.map((item) => {
                const assigneeUser = item.assignedTo ? getUser(state, item.assignedTo) : undefined;
                return (
                  <div
                    key={item.id}
                    className={cn(
                      "flex items-center gap-3 rounded-md border border-border-decorative px-3.5 py-3",
                      item.done && "bg-bg-secondary"
                    )}
                  >
                    <Checkbox
                      isChecked={item.done}
                      onChange={() => toggleTodo(item.id)}
                      aria-label={item.title}
                    >
                      <CheckboxIndicator>
                        <CheckboxIcon />
                      </CheckboxIndicator>
                    </Checkbox>
                    <Icon
                      as={TODO_ICON_COMPONENTS[item.icon] ?? TODO_ICON_COMPONENTS.tag}
                      size="md"
                      className="shrink-0 text-text-primary"
                    />
                    <Text
                      className={cn(
                        "min-w-0 flex-1",
                        item.done && "text-text-tertiary line-through"
                      )}
                    >
                      {item.title}
                    </Text>
                    {assigneeUser ? (
                      <UserAvatar user={assigneeUser} size="xs" />
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        )
      )}

      {showAdd ? (
        <div className="rounded-xl border border-text-primary p-4">
          <div className="mb-3 flex items-center gap-2.5">
            <button
              type="button"
              aria-label="Choose icon"
              onClick={() => setIconGridOpen((open) => !open)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border-decorative bg-bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Icon as={TODO_ICON_COMPONENTS[icon]} size="md" />
            </button>
            <Input className="min-w-0 flex-1">
              <InputField
                value={title}
                onChange={(event) => onTitleChange(event.target.value)}
                placeholder="Sunscreen, passport, book taxi…"
              />
            </Input>
          </div>
          {iconGridOpen ? (
            <div className="mb-3">
              <IconPicker
                value={icon}
                onChange={(next) => {
                  setIcon(next);
                  setIconOverridden(true);
                  setIconGridOpen(false);
                }}
              />
            </div>
          ) : null}
          <div className="mb-3 flex gap-2">
            {CATEGORIES.map((option) => {
              const selected = category === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setCategory(option.value)}
                  className={cn(
                    "flex-1 rounded-full border px-2 py-2 text-sm font-medium",
                    selected
                      ? "border-accent bg-accent text-text-on-accent"
                      : "border-border-decorative bg-bg-elevated text-text-secondary"
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
          <div className="mb-3.5 flex items-center gap-2">
            <Text size="sm" className="text-text-secondary">
              Assign to
            </Text>
            {members.map((member) => (
              <button
                key={member.id}
                type="button"
                title={member.name}
                onClick={() => setAssignee(member.id)}
                className={cn(
                  "rounded-full border-2",
                  assignee === member.id ? "border-text-primary" : "border-transparent"
                )}
              >
                <UserAvatar user={member} size="sm" />
              </button>
            ))}
          </div>
          <div className="flex gap-2.5">
            <Button isFullWidth onClick={save} isDisabled={!title.trim()}>
              Add item
            </Button>
            <Button variant="outline" action="secondary" onClick={() => setShowAdd(false)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Button variant="outline" action="primary" isFullWidth onClick={openForm}>
          Add an item
        </Button>
      )}
    </TripShell>
  );
}
