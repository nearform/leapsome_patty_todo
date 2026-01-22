---
description: "Apply when starting, restarting, or managing the development server. When to restart (config changes, dependencies), restart procedure (kill process → wait 2s → start), port management (default 3000), and process cleanup for Next.js."
alwaysApply: false
---

# Server Management Rules

## When to Restart Server

Restart the dev server after:

- Config file changes (`next.config.ts`, `tailwind.config.ts`, `tsconfig.json`)
- Middleware updates
- New dependencies installed
- Environment variable changes
- Global CSS changes that aren't hot-reloading

## Restart Procedure

### Step 1: Kill Existing Process

```bash
# Option A: Kill by process name
pkill -f "next dev"

# Option B: Kill by port
lsof -ti:3000 | xargs kill
```

### Step 2: Wait

Wait 2 seconds after killing processes before starting new server.

### Step 3: Start Server

```bash
npm run dev
```

## Port Management

- Default port: `3000`
- If port is in use, kill existing process first
- Check running processes: `lsof -i:3000`

## Pre-Start Check

Before starting a dev server:

1. Check if one is already running
2. If running and changes don't require restart, skip
3. If restart needed, follow the restart procedure

## Common Issues

### Port Already in Use

```bash
# Find what's using the port
lsof -i:3000

# Kill it
lsof -ti:3000 | xargs kill

# Then start server
npm run dev
```

### Server Not Hot Reloading

Try restarting:

```bash
pkill -f "next dev" && sleep 2 && npm run dev
```

### Build Errors After Config Change

Always restart server after config changes:

```bash
pkill -f "next dev"
npm run dev
```

## Background Processes

For long-running servers during development:

```bash
# Start in background (if needed)
npm run dev &

# Check if running
ps aux | grep "next dev"
```
