"use client";

import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Card,
  CardContent,
  Avatar,
  AvatarFallback,
  Divider,
  Badge,
  AppHeader,
  AppFooter,
} from "@/components/prototype-ui";
import {
  Send,
  CreditCard,
  PiggyBank,
  ArrowUpRight,
  ArrowDownLeft,
  MoreHorizontal,
  Eye,
  EyeOff,
  Home,
  Search,
  Clock,
} from "lucide-react";
import { useState } from "react";
import bankingData from "@/lib/data/banking.json";

export default function DashboardPage() {
  const [showBalance, setShowBalance] = useState(true);
  const { account, transactions, quickActions } = bankingData;

  const getTransactionIcon = (type: string) => {
    return type === "credit" ? (
      <ArrowDownLeft className="w-4 h-4 text-success" />
    ) : (
      <ArrowUpRight className="w-4 h-4 text-error" />
    );
  };

  // Custom header content with user greeting
  const headerLeftContent = (
    <HStack space="md" className="items-center">
      <Avatar size="sm">
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <VStack space="none">
        <Text size="sm" muted>
          Good morning,
        </Text>
        <Text weight="semibold">{account.userName}</Text>
      </VStack>
    </HStack>
  );

  // Footer navigation items
  const footerItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "search", label: "Search", icon: Search },
    { id: "cards", label: "Cards", icon: CreditCard },
    { id: "history", label: "History", icon: Clock },
    { id: "more", label: "More", icon: MoreHorizontal },
  ];

  return (
    <Box className="min-h-screen bg-bg-base">
      {/* Sticky Header */}
      <AppHeader
        variant="logo"
        leftContent={headerLeftContent}
        showNotifications
        showAccount={false}
        showSearch={false}
        className="sticky top-0 z-50"
      />

      {/* Main Content */}
      <Box className="px-6 py-6">
        <VStack space="xl">
          {/* Balance Card */}
          <Card variant="filled" className="bg-accent text-white overflow-hidden">
            <CardContent className="p-6">
              <VStack space="md">
                <HStack className="justify-between items-start">
                  <VStack space="xs">
                    <Text size="sm" className="text-white/70">
                      Total Balance
                    </Text>
                    <HStack space="sm" className="items-center">
                      <Heading size="3xl" className="text-white">
                        {showBalance
                          ? `$${account.balance.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                            })}`
                          : "••••••"}
                      </Heading>
                      <button
                        onClick={() => setShowBalance(!showBalance)}
                        className="text-white/70 hover:text-white"
                      >
                        {showBalance ? (
                          <Eye className="w-5 h-5" />
                        ) : (
                          <EyeOff className="w-5 h-5" />
                        )}
                      </button>
                    </HStack>
                  </VStack>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </HStack>
                <HStack space="sm" className="items-center">
                  <Text size="sm" className="text-white/70">
                    {account.accountType}
                  </Text>
                  <Text size="sm" className="text-white/70">
                    •••• {account.accountNumber.slice(-4)}
                  </Text>
                </HStack>
              </VStack>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <VStack space="md">
            <Text weight="semibold">Quick Actions</Text>
            <HStack space="md" className="justify-between">
              {quickActions.map((action) => (
                <VStack
                  key={action.id}
                  space="sm"
                  className="items-center flex-1"
                >
                  <Button
                    variant="outline"
                    action="secondary"
                    className="w-14 h-14 rounded-full p-0"
                  >
                    {action.icon === "send" && <Send className="w-5 h-5" />}
                    {action.icon === "card" && (
                      <CreditCard className="w-5 h-5" />
                    )}
                    {action.icon === "piggy" && (
                      <PiggyBank className="w-5 h-5" />
                    )}
                  </Button>
                  <Text size="xs" muted>
                    {action.label}
                  </Text>
                </VStack>
              ))}
            </HStack>
          </VStack>

          {/* Recent Transactions */}
          <VStack space="md">
            <HStack className="justify-between items-center">
              <Text weight="semibold">Recent Transactions</Text>
              <Button variant="link" action="primary" size="sm">
                See all
              </Button>
            </HStack>
            <Card variant="outline">
              <CardContent className="p-0">
                {transactions.map((transaction, index) => (
                  <Box key={transaction.id}>
                    <HStack className="p-4 justify-between items-center">
                      <HStack space="md" className="items-center">
                        <Box
                          className={`p-2 rounded-full ${
                            transaction.type === "credit"
                              ? "bg-success/10"
                              : "bg-error/10"
                          }`}
                        >
                          {getTransactionIcon(transaction.type)}
                        </Box>
                        <VStack space="none">
                          <Text weight="medium">{transaction.description}</Text>
                          <Text size="sm" muted>
                            {transaction.date}
                          </Text>
                        </VStack>
                      </HStack>
                      <VStack space="none" className="items-end">
                        <Text
                          weight="semibold"
                          className={
                            transaction.type === "credit"
                              ? "text-success"
                              : "text-text-primary"
                          }
                        >
                          {transaction.type === "credit" ? "+" : "-"}$
                          {Math.abs(transaction.amount).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                          })}
                        </Text>
                        <Badge
                          size="sm"
                          action={
                            transaction.status === "completed"
                              ? "success"
                              : "warning"
                          }
                        >
                          {transaction.status}
                        </Badge>
                      </VStack>
                    </HStack>
                    {index < transactions.length - 1 && <Divider />}
                  </Box>
                ))}
              </CardContent>
            </Card>
          </VStack>
        </VStack>
      </Box>

      {/* Sticky Footer */}
      <AppFooter
        items={footerItems}
        activeItem="home"
        position="fixed"
      />

      {/* Spacer for fixed footer */}
      <Box className="h-20" />
    </Box>
  );
}
