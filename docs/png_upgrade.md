# Prototype Screenshot System — Upgrade Guide

This document covers every change made to implement the prototype screenshot system. Use it to apply the same changes to another instance of this codebase.

---

## Overview of Changes

| Area | Change |
|------|--------|
| Dependencies | Added `puppeteer` (dev) and `jszip` |
| Config | New shared device mode config and React context |
| Scripts | New Puppeteer batch screenshot CLI script |
| API routes | `/api/journeys` and `/api/capture-screens` |
| `/` root page | Global Variables panel below nav cards |
| `/prototype` page | Screenshot thumbnails + fixed height + hover QR + per-screen menu + download + refresh |
| `/whiteboard` page | Consumes shared device mode config |
| Cursor rule | Removed QR overview page pattern from journey-workflow |
| Deleted files | 5 journey-level `page.tsx` QR overview pages |
| Link fixes | Journey buttons now link to first page of journey |
| Storage | `public/screenshots/` folder, max 3 archives per screen |

---

## Step 1 — Install Dependencies

```bash
npm install jszip
npm install --save-dev puppeteer @types/jszip
```

---

## Step 2 — Add npm Scripts

In `package.json`, add to the `scripts` block:

```json
"screenshots": "node scripts/capture-screens.mjs",
"screenshots:desktop": "node scripts/capture-screens.mjs --mode desktop"
```

---

## Step 3 — Create Shared Device Mode Config

**New file:** `src/lib/config/device-mode.ts`

```typescript
import { Smartphone, Tablet, Monitor } from "lucide-react";

export const DEVICE_PRESETS = {
  mobile:  { width: 375,  height: 812,  label: "Mobile",  icon: Smartphone },
  tablet:  { width: 768,  height: 1024, label: "Tablet",  icon: Tablet },
  desktop: { width: 1440, height: 900,  label: "Desktop", icon: Monitor },
} as const;

export type DeviceMode = keyof typeof DEVICE_PRESETS;

/**
 * Change this value to switch the global device mode.
 * Affects: screenshot viewport, prototype card aspect ratio, home page indicator.
 */
export const DEFAULT_DEVICE_MODE: DeviceMode = "mobile";
```

---

## Step 4 — Create Device Mode React Context

**New file:** `src/lib/context/DeviceModeContext.tsx`

```tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { DEFAULT_DEVICE_MODE, type DeviceMode } from "@/lib/config/device-mode";

interface DeviceModeContextValue {
  deviceMode: DeviceMode;
  setDeviceMode: (mode: DeviceMode) => void;
}

const DeviceModeContext = createContext<DeviceModeContextValue>({
  deviceMode: DEFAULT_DEVICE_MODE,
  setDeviceMode: () => {},
});

export function DeviceModeProvider({ children }: { children: ReactNode }) {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>(DEFAULT_DEVICE_MODE);
  return (
    <DeviceModeContext.Provider value={{ deviceMode, setDeviceMode }}>
      {children}
    </DeviceModeContext.Provider>
  );
}

export function useDeviceMode() {
  return useContext(DeviceModeContext);
}
```

---

## Step 5 — Create the Journeys API Route

**New file:** `src/app/api/journeys/route.ts`

```typescript
import { NextResponse } from "next/server";
import { getAllJourneys } from "@/lib/data/journeys-registry";

export async function GET() {
  return NextResponse.json(getAllJourneys());
}
```

This lets the screenshot script fetch the journey list from the running app, staying automatically in sync with the TypeScript registry.

---

## Step 6 — Create the Capture-Screens API Route (dev-only)

**New file:** `src/app/api/capture-screens/route.ts`

```typescript
import { NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";

export async function POST() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Only available in development. Run `npm run screenshots` locally." },
      { status: 403 }
    );
  }

  const scriptPath = path.join(process.cwd(), "scripts", "capture-screens.mjs");

  return new Promise<NextResponse>((resolve) => {
    const child = spawn("node", [scriptPath], {
      cwd: process.cwd(),
      stdio: ["ignore", "pipe", "pipe"],
    });

    const lines: string[] = [];
    child.stdout.on("data", (d: Buffer) => lines.push(d.toString()));
    child.stderr.on("data", (d: Buffer) => lines.push(d.toString()));

    child.on("close", (code: number) => {
      const output = lines.join("");
      const capturedMatch = output.match(/(\d+) captured/);
      const failedMatch = output.match(/(\d+) failed/);
      if (code === 0) {
        resolve(NextResponse.json({
          success: true,
          captured: capturedMatch ? parseInt(capturedMatch[1]) : 0,
          failed: failedMatch ? parseInt(failedMatch[1]) : 0,
          output,
        }));
      } else {
        resolve(NextResponse.json({ success: false, error: "Exit code " + code, output }, { status: 500 }));
      }
    });

    child.on("error", (err: Error) =>
      resolve(NextResponse.json({ success: false, error: err.message }, { status: 500 }))
    );
  });
}
```

---

## Step 7 — Create the Screenshot Capture Script

**New file:** `scripts/capture-screens.mjs`

Key behaviours:
- Fetches journey list from `http://localhost:3000/api/journeys` (requires dev server running)
- Navigates at `375 × 812`, strips overflow/height/min-height constraints from the top 3 DOM levels, then measures true `scrollHeight` and resizes the viewport to match
- Converts `position: fixed` elements to `position: relative` (with offsets cleared) to prevent Puppeteer's full-page duplication artefact without creating large whitespace gaps
- Writes `public/screenshots/{journeyId}/{pageId}/latest.png`
- Archives the previous `latest.png` as `{timestamp}.png`, keeping only the 3 most recent archives
- Writes `public/screenshots/manifest.json`

```javascript
#!/usr/bin/env node
import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const DEVICE_PRESETS = {
  mobile:  { width: 375,  height: 812,  label: "Mobile" },
  tablet:  { width: 768,  height: 1024, label: "Tablet" },
  desktop: { width: 1440, height: 900,  label: "Desktop" },
};
const DEFAULT_DEVICE_MODE = "mobile";

const args = process.argv.slice(2);
const modeArg = args[args.indexOf("--mode") + 1];
const mode = (modeArg && DEVICE_PRESETS[modeArg]) ? modeArg : DEFAULT_DEVICE_MODE;
const BASE_URL = args[args.indexOf("--url") + 1] || "http://localhost:3000";
const preset = DEVICE_PRESETS[mode];

function resolvePath(p) { return p.replace(/\[[\w.]+\]/g, "sample"); }
function timestamp() { return new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19); }
function ensureDir(dir) { fs.mkdirSync(dir, { recursive: true }); }

async function run() {
  let journeys;
  try {
    const res = await fetch(`${BASE_URL}/api/journeys`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    journeys = await res.json();
  } catch {
    console.error(`Could not reach ${BASE_URL}/api/journeys — is npm run dev running?`);
    process.exit(1);
  }

  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: preset.width, height: 812, deviceScaleFactor: 2 });

  const screenshotsDir = path.join(ROOT, "public", "screenshots");
  ensureDir(screenshotsDir);

  const ts = timestamp();
  const manifest = {
    generated: new Date().toISOString(),
    mode,
    viewport: { width: preset.width, height: preset.height },
    screens: {},
  };

  let captured = 0, failed = 0;

  for (const journey of journeys) {
    for (const screen of journey.pages) {
      const resolvedPath = resolvePath(screen.path);
      const url = `${BASE_URL}${resolvedPath}`;
      const outDir = path.join(screenshotsDir, journey.id, screen.id);
      ensureDir(outDir);
      const latestFile = path.join(outDir, "latest.png");
      const archiveFile = path.join(outDir, `${ts}.png`);

      process.stdout.write(`   ${journey.id}/${screen.id} … `);
      try {
        await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });

        const contentHeight = await page.evaluate(() => {
          // Strip overflow/height/min-height from the top 3 DOM levels only.
          // Stripping all elements breaks inner components.
          const stripContainer = (el) => {
            el.style.setProperty("overflow", "visible", "important");
            el.style.setProperty("height", "auto", "important");
            el.style.setProperty("max-height", "none", "important");
            el.style.setProperty("min-height", "0", "important");
          };
          stripContainer(document.documentElement);
          stripContainer(document.body);
          document.querySelectorAll("body > div").forEach(stripContainer);
          document.querySelectorAll("body > div > div").forEach(stripContainer);
          document.querySelectorAll("body > div > div > div").forEach(stripContainer);

          // Convert fixed → relative (NOT absolute) so bottom-pinned buttons
          // flow after content rather than sitting at y≈812px and creating gaps.
          document.querySelectorAll("*").forEach((el) => {
            if (window.getComputedStyle(el).position === "fixed") {
              el.style.setProperty("position", "relative", "important");
              el.style.setProperty("top", "auto", "important");
              el.style.setProperty("right", "auto", "important");
              el.style.setProperty("bottom", "auto", "important");
              el.style.setProperty("left", "auto", "important");
            }
          });

          return Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        });

        await page.setViewport({ width: preset.width, height: contentHeight, deviceScaleFactor: 2 });

        // Archive previous latest, then prune to keep only the 3 most recent.
        if (fs.existsSync(latestFile)) {
          fs.copyFileSync(latestFile, archiveFile);
          const archives = fs.readdirSync(outDir)
            .filter((f) => f !== "latest.png" && f.endsWith(".png"))
            .sort();
          const toDelete = archives.slice(0, Math.max(0, archives.length - 3));
          toDelete.forEach((f) => fs.unlinkSync(path.join(outDir, f)));
        }

        await page.screenshot({ path: latestFile, fullPage: true });

        const key = `${journey.id}/${screen.id}`;
        const history = manifest.screens[key]?.history ?? [];
        if (fs.existsSync(archiveFile)) history.push(`${ts}.png`);
        manifest.screens[key] = {
          journeyId: journey.id, pageId: screen.id, name: screen.name,
          path: resolvedPath, latest: "latest.png", history,
        };

        captured++;
        console.log("✓");
      } catch (err) {
        failed++;
        console.log(`✗  (${err.message.split("\n")[0]})`);
      }
    }
  }

  await browser.close();
  fs.writeFileSync(path.join(screenshotsDir, "manifest.json"), JSON.stringify(manifest, null, 2));
  console.log(`\n✅  ${captured} captured${failed > 0 ? `   ❌ ${failed} failed` : ""}`);
  console.log(`\nNext step: git add public/screenshots && git commit -m "chore: refresh screenshots"\n`);
}

run().catch((err) => { console.error(err); process.exit(1); });
```

**Workflow:**
```bash
npm run dev              # terminal 1 — must be running
npm run screenshots      # terminal 2
```

---

## Step 8 — Update the Whiteboard Page

In `src/app/whiteboard/page.tsx`:

1. Remove the local `DEVICE_PRESETS` and `DeviceMode` definitions (lines ~51–57)
2. Remove `Smartphone` and `Tablet` from the lucide-react import (they're now bundled inside the shared config)
3. Add the shared import:

```typescript
import { DEVICE_PRESETS, DEFAULT_DEVICE_MODE, type DeviceMode } from "@/lib/config/device-mode";
```

4. Change the `deviceMode` useState default:

```typescript
// Before
const [deviceMode, setDeviceMode] = useState<DeviceMode>("mobile");

// After
const [deviceMode, setDeviceMode] = useState<DeviceMode>(DEFAULT_DEVICE_MODE);
```

---

## Step 9 — Update the Root Page (`/`)

In `src/app/page.tsx`:

1. Add to imports:

```typescript
import { Smartphone, Monitor } from "lucide-react";
import { DEFAULT_DEVICE_MODE, DEVICE_PRESETS } from "@/lib/config/device-mode";
```

2. Add a Global Variables panel after the navigation cards grid:

```tsx
{/* Global Variables Panel */}
<Box className="w-full mt-4 border border-border-decorative rounded-xl p-6">
  <VStack space="md">
    <HStack space="sm" className="items-center">
      <Text size="xs" className="text-text-secondary uppercase tracking-widest font-bold">
        Global Variables
      </Text>
    </HStack>
    <Box className="w-full h-px bg-border-decorative" />

    <HStack className="items-center justify-between">
      <HStack space="md" className="items-center">
        <Text size="sm" className="text-text-primary font-mono font-semibold">DEVICE_MODE</Text>
        <Text size="xs" className="text-text-secondary">
          — set in <span className="font-mono">src/lib/config/device-mode.ts</span>
        </Text>
      </HStack>

      {/* Read-only pill toggle */}
      <HStack className="items-center bg-bg-secondary rounded-full p-1 border border-border-decorative">
        {(["mobile", "desktop"] as const).map((mode) => {
          const isActive = DEFAULT_DEVICE_MODE === mode;
          const Icon = mode === "mobile" ? Smartphone : Monitor;
          return (
            <HStack key={mode} space="xs" className={cn(
              "items-center px-3 py-1.5 rounded-full transition-colors",
              isActive ? "bg-accent text-white" : "text-text-secondary"
            )}>
              <Icon className="w-3.5 h-3.5" />
              <Text size="xs" className={cn("font-medium capitalize",
                isActive ? "text-white" : "text-text-secondary")}>
                {DEVICE_PRESETS[mode].label}
              </Text>
            </HStack>
          );
        })}
      </HStack>
    </HStack>
  </VStack>
</Box>
```

---

## Step 10 — Update the Prototype Page (`/prototype`)

The prototype page is the most complex update. Key features of the final state:

- **Full-width layout** — container uses `w-full`, no `max-w-*` constraint
- **Responsive grid** — `repeat(auto-fill, minmax(220px, 260px))`
- **Journey labels** — plain text, no link/arrow
- **Per-card header row** — page name (left) + `⋮` context menu (right), above the image
- **Fixed 600px card height** — all cards uniform height; image anchored to top with overflow hidden
- **Click opens full screenshot** — clicking the card opens `latest.png` in a new tab (not the live page)
- **Hover QR** — full-card white overlay (`inset-0 bg-white`) with QR code, fades in on hover
- **Context menu** — 3 items: Open screenshot, Open live page, History (up to 3 versions)
- **Download ZIP** — circular button, fetches manifest, bundles all `latest.png` as `{journeyId}-{pageId}.png` flat structure
- **Refresh Screenshots** — dev-only button, calls `/api/capture-screens`

Key imports:

```typescript
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { MoreVertical, ExternalLink, Image, Clock, Download, RefreshCw, ImageOff } from "lucide-react";
import JSZip from "jszip";
```

**Card structure:**

```tsx
<div key={page.id}>
  {/* Header: page name + menu */}
  <div className="flex items-center justify-between mb-2 px-0.5">
    <Text size="md" className="font-semibold text-text-primary truncate pr-2">
      {page.name}
    </Text>
    <ScreenCardMenu imgSrc={imgSrc} linkHref={linkHref}
      history={history} journeyId={journey.id} pageId={page.id} />
  </div>

  <div className="group">
    <div
      className="relative w-full h-[600px] overflow-hidden cursor-pointer
                 bg-bg-primary border border-gray-300 rounded-lg
                 hover:border-accent hover:shadow-lg transition-all"
      onClick={() => window.open(imgSrc, "_blank")}
    >
      {/* Screenshot anchored to top */}
      <img src={imgSrc} alt={page.name}
        className="absolute inset-x-0 top-0 w-full h-auto
                   opacity-100 group-hover:opacity-0 transition-opacity duration-200"
        onError={() => setHasError(true)} />

      {/* QR overlay — covers full card with solid white */}
      <div className="absolute inset-0 flex items-center justify-start p-6
                      bg-white opacity-0 group-hover:opacity-100
                      transition-opacity duration-200 pointer-events-none">
        <QRCode value={fullUrl} size={160} level="M"
          style={{ width: "100%", height: "100%", maxWidth: 160, maxHeight: 160 }} />
      </div>
    </div>
  </div>
</div>
```

**Manifest loaded on mount:**

```tsx
const [manifest, setManifest] = useState<Manifest | null>(null);

useEffect(() => {
  fetch("/screenshots/manifest.json")
    .then((r) => r.ok ? r.json() : null)
    .then((data) => data && setManifest(data))
    .catch(() => {});
}, []);
```

**Context menu component:**

```tsx
function ScreenCardMenu({ imgSrc, linkHref, history, journeyId, pageId }) {
  return (
    <Menu as="div" className="relative">
      <MenuButton className="flex items-center justify-center w-7 h-7
                             text-text-tertiary hover:text-text-primary
                             transition-colors focus-visible:outline-none">
        <MoreVertical className="w-5 h-5" />
      </MenuButton>

      <MenuItems className="absolute right-0 top-8 z-30 w-60 origin-top-right
                            rounded-lg bg-white border border-gray-200 shadow-lg py-1
                            focus:outline-none transition
                            data-[closed]:scale-95 data-[closed]:opacity-0
                            data-[enter]:duration-100 data-[enter]:ease-out
                            data-[leave]:duration-75 data-[leave]:ease-in">
        <MenuItem>
          <button className="flex items-center gap-3 w-full px-4 py-2.5 text-base
                             text-gray-700 hover:bg-gray-50 text-left data-[focus]:bg-gray-50"
            onClick={() => window.open(imgSrc, "_blank")}>
            <Image className="w-5 h-5 text-gray-400 flex-shrink-0" />
            Open screenshot
          </button>
        </MenuItem>
        <MenuItem>
          <button className="flex items-center gap-3 w-full px-4 py-2.5 text-base
                             text-gray-700 hover:bg-gray-50 text-left data-[focus]:bg-gray-50"
            onClick={() => window.open(linkHref, "_blank")}>
            <ExternalLink className="w-5 h-5 text-gray-400 flex-shrink-0" />
            Open live page
          </button>
        </MenuItem>

        {history.length > 0 && (
          <>
            <div className="my-1 h-px bg-border-decorative mx-3" />
            <p className="px-4 py-1.5 text-xs text-gray-400 font-medium uppercase tracking-wider">
              History
            </p>
            {[...history].reverse().map((filename) => (
              <MenuItem key={filename}>
                <button className="flex items-center gap-3 w-full px-4 py-2.5 text-base
                                   text-gray-600 hover:bg-gray-50 hover:text-gray-900
                                   text-left data-[focus]:bg-gray-50"
                  onClick={() => window.open(`/screenshots/${journeyId}/${pageId}/${filename}`, "_blank")}>
                  <Clock className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  {formatTimestamp(filename)}
                </button>
              </MenuItem>
            ))}
          </>
        )}
      </MenuItems>
    </Menu>
  );
}
```

**Timestamp formatter:**

```ts
function formatTimestamp(filename: string): string {
  const raw = filename.replace(".png", "");
  const match = raw.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2})-(\d{2})-(\d{2})/);
  if (!match) return raw;
  const [, y, mo, d, h, mi] = match;
  return `${d}/${mo}/${y} ${h}:${mi}`;
}
```

**Download ZIP (flat filenames):**

```ts
zip.file(`${screen.journeyId}-${screen.pageId}.png`, buf);
// Result: onboarding-login.png, players-players-profile.png, etc.
```

---

## Step 11 — Delete Journey-Level QR Overview Pages

These files should be deleted — the `/prototype` page now handles all overviews:

```
src/app/prototype/journeys/onboarding/page.tsx
src/app/prototype/journeys/homepage-content/page.tsx
src/app/prototype/journeys/matches/page.tsx
src/app/prototype/journeys/players-user-test/page.tsx
src/app/prototype/journeys/tournaments/page.tsx
```

> Do NOT delete `src/app/prototype/journeys/page.tsx` (the Status page) or journey pages that are actual prototype screens (e.g. `players/page.tsx`, `rankings/page.tsx`).

---

## Step 12 — Fix Broken Links

After deleting the overview pages, update any links that pointed to `/prototype/journeys/${journey.id}`.

**`src/app/prototype/page.tsx`** — journey label:

```tsx
// Before — linked to deleted overview page
<Link href={`/prototype/journeys/${journey.id}`}>

// After — plain text label, no link
<Text size="sm" className="font-semibold text-text-secondary uppercase tracking-widest">
  {journey.title}
</Text>
```

**`src/app/prototype/journeys/page.tsx`** — status page journey cards:

```tsx
// Before
<Link key={journey.id} href={`/prototype/journeys/${journey.id}`}>

// After
<Link key={journey.id} href={journey.pages[0]?.path ?? "/prototype"}>
```

---

## Step 13 — Update the Cursor Rule

In `.cursor/rules/journey-workflow.mdc`:

1. Remove `page.tsx` from the journey folder structure diagram
2. Remove step 3 ("Create `page.tsx` journey overview") from Creating a Journey
3. Delete the entire "Journey Overview Page Structure" template block (~100 lines of QR code template)
4. Replace "Individual Journey" section in Overview Pages with a note that `/prototype` handles all overviews
5. Add an explicit warning: do NOT create a `page.tsx` at the journey folder root
6. Add `npm run screenshots` to the designer workflow

---

## Screenshot Storage Architecture

```
public/
  screenshots/
    {journey-id}/
      {page-id}/
        latest.png          <- always the current screenshot
        {timestamp}.png     <- up to 3 archived previous versions
    manifest.json           <- full index of all screens + version history
```

The `manifest.json` schema:

```json
{
  "generated": "2026-04-07T13:26:02Z",
  "mode": "mobile",
  "viewport": { "width": 375, "height": 812 },
  "screens": {
    "onboarding/login": {
      "journeyId": "onboarding",
      "pageId": "login",
      "name": "Login",
      "path": "/prototype/journeys/onboarding/login",
      "latest": "latest.png",
      "history": ["2026-04-07T13-20-12.png"]
    }
  }
}
```

---

## Known Puppeteer Considerations

| Issue | Cause | Fix |
|-------|-------|-----|
| All screenshots same height | Setting viewport to 10,000px made `h-screen` divs 10,000px tall | Navigate at 812px, measure `scrollHeight` after stripping constraints, resize viewport to match |
| Content appears twice | `position: fixed` elements duplicated by Puppeteer's full-page capture | Convert `fixed` to `relative` with offsets cleared — flows naturally without gaps |
| Content clipped at 812px | `overflow: hidden` + `h-screen` on phone-frame wrappers | Strip overflow/height/min-height from top 3 DOM levels |
| Large whitespace below content | `min-h-screen flex-col` held container tall after height stripping | Strip `min-height` from top 3 DOM levels only — not all elements (breaks inner components) |
| Empty gap below content | `fixed` → `absolute` placed bottom buttons at y≈812px | Use `position: relative` instead of `absolute` |

---

## Future: History View

The manifest is structured to support a future `/prototype/history` route that shows a timeline of screenshots per screen. Each `history` array entry is a timestamped archive file sitting alongside `latest.png` in the same folder.
