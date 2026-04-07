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
