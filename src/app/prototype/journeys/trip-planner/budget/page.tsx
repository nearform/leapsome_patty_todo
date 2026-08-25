"use client";

import { useState } from "react";
import { Button, Input, InputField, Text } from "@/components/prototype-ui";
import { cn } from "@/lib/utils";
import { TripShell } from "../_components/trip-shell";
import { UserAvatar } from "../_components/user-avatar";
import { formatCurrency, getUser } from "../_store/helpers";
import { useTripPlanner } from "../_store/trip-planner-context";
import { useRequireTrip } from "../_store/use-require-trip";

export default function BudgetPage() {
  const trip = useRequireTrip();
  const { state, members, expenses, balances, currentUser, addExpense, toggleSettled } =
    useTripPlanner();
  const [showAdd, setShowAdd] = useState(false);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState(currentUser?.id ?? members[0]?.id ?? "");

  if (!trip) {
    return (
      <TripShell activeItem="budget" title="Budget">
        <Text>Choose a trip from home.</Text>
      </TripShell>
    );
  }

  const money = (value: number) => formatCurrency(value, state.currency);
  const totalSpend = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const save = () => {
    const parsed = Number.parseFloat(amount);
    if (!description.trim() || Number.isNaN(parsed) || parsed <= 0 || !paidBy) return;
    addExpense({
      description: description.trim(),
      amount: parsed,
      paidBy,
      splitBetween: members.map((member) => member.id),
    });
    setDescription("");
    setAmount("");
    setShowAdd(false);
  };

  const balanceText = (name: string, amountValue: number, settled: boolean) => {
    if (settled) return "Settled up";
    if (amountValue >= 0.01) return `${name} is owed ${money(amountValue)}`;
    if (amountValue <= -0.01) return `${name} owes ${money(-amountValue)}`;
    return `${name} is square`;
  };

  return (
    <TripShell activeItem="budget" title="Budget">
      <div className="surface-inverse mb-[22px] rounded-xl p-5 text-text-primary">
        <Text size="sm" className="text-text-secondary">
          Trip spend so far
        </Text>
        <p className="mt-1 font-display text-[32px] leading-none">{money(totalSpend)}</p>
        <div className="my-4 h-px bg-white/15" />
        <div className="flex flex-col gap-2.5">
          {balances.map((balance) => (
            <div key={balance.user.id} className="flex items-center gap-2.5">
              <UserAvatar user={balance.user} size="xs" />
              <Text className="min-w-0 flex-1 text-text-primary">
                {balanceText(balance.user.name, balance.amount, balance.settled)}
              </Text>
              <button
                type="button"
                onClick={() => toggleSettled(balance.user.id)}
                className={cn(
                  "rounded-full border px-2.5 py-1 text-[11px] font-medium",
                  balance.settled
                    ? "border-decorative-accent bg-decorative-accent text-tt-ivory"
                    : "border-white/30 bg-transparent text-text-primary"
                )}
              >
                {balance.settled ? "Settled" : "Mark settled"}
              </button>
            </div>
          ))}
        </div>
      </div>

      <Text size="sm" weight="medium" className="mb-2.5 uppercase tracking-widest text-text-tertiary">
        Expenses
      </Text>
      <div className="mb-[18px] flex flex-col gap-2">
        {expenses.map((expense) => {
          const payer = getUser(state, expense.paidBy);
          return (
            <div
              key={expense.id}
              className="flex items-center gap-3 rounded-md border border-border-decorative px-3.5 py-3"
            >
              {payer ? <UserAvatar user={payer} size="xs" /> : null}
              <span className="min-w-0 flex-1">
                <Text className="block">{expense.description}</Text>
                <Text size="sm" className="mt-0.5 block text-text-secondary">
                  {payer?.name} paid · split {expense.splitBetween.length} ways
                </Text>
              </span>
              <Text weight="medium">{money(expense.amount)}</Text>
            </div>
          );
        })}
      </div>

      {showAdd ? (
        <div className="rounded-xl border border-text-primary p-4">
          <div className="mb-3 flex gap-2.5">
            <Input className="min-w-0 flex-1">
              <InputField
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="What was it for?"
              />
            </Input>
            <Input className="w-[88px]">
              <InputField
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                inputMode="decimal"
                placeholder="0.00"
              />
            </Input>
          </div>
          <div className="mb-3.5 flex items-center gap-2">
            <Text size="sm" className="text-text-secondary">
              Paid by
            </Text>
            {members.map((member) => (
              <button
                key={member.id}
                type="button"
                title={member.name}
                onClick={() => setPaidBy(member.id)}
                className={cn(
                  "rounded-full border-2",
                  paidBy === member.id ? "border-text-primary" : "border-transparent"
                )}
              >
                <UserAvatar user={member} size="sm" />
              </button>
            ))}
            <span className="flex-1" />
            <Text size="sm" className="text-text-tertiary">
              Split evenly
            </Text>
          </div>
          <div className="flex gap-2.5">
            <Button
              isFullWidth
              onClick={save}
              isDisabled={!description.trim() || !(Number.parseFloat(amount) > 0)}
            >
              Add expense
            </Button>
            <Button variant="outline" action="secondary" onClick={() => setShowAdd(false)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Button variant="outline" action="primary" isFullWidth onClick={() => {
          setPaidBy(currentUser?.id ?? members[0]?.id ?? "");
          setShowAdd(true);
        }}>
          Add an expense
        </Button>
      )}
    </TripShell>
  );
}
