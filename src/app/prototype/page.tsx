"use client";

import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
} from "@/components/prototype-ui";
import {
  ArrowLeft,
  MousePointerClick,
  SquareCheckBig,
  MoreVertical,
  ExternalLink,
  Image,
  Clock,
  Download,
  RefreshCw,
  ImageOff,
} from "lucide-react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Link from "next/link";
import QRCode from "react-qr-code";
import { getAllJourneys } from "@/lib/data/journeys-registry";
import { useEffect, useState } from "react";
import JSZip from "jszip";

interface ManifestScreen {
  journeyId: string;
  pageId: string;
  name: string;
  path: string;
  latest: string;
  history: string[];
}

interface Manifest {
  generated: string;
  mode: string;
  viewport: { width: number; height: number };
  screens: Record<string, ManifestScreen>;
}

function formatTimestamp(filename: string): string {
  const raw = filename.replace(".png", "");
  const match = raw.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2})-(\d{2})-(\d{2})/);
  if (!match) return raw;
  const [, y, mo, d, h, mi] = match;
  return `${d}/${mo}/${y} ${h}:${mi}`;
}

interface ScreenCardMenuProps {
  imgSrc: string;
  linkHref: string;
  history: string[];
  journeyId: string;
  pageId: string;
}

function ScreenCardMenu({ imgSrc, linkHref, history, journeyId, pageId }: ScreenCardMenuProps) {
  return (
    <Menu as="div" className="relative">
      <MenuButton className="flex items-center justify-center w-7 h-7 text-text-tertiary hover:text-text-primary transition-colors focus-visible:outline-none">
        <MoreVertical className="w-5 h-5" />
      </MenuButton>

      <MenuItems className="absolute right-0 top-8 z-30 w-60 origin-top-right rounded-lg bg-white border border-gray-200 shadow-lg py-1 focus:outline-none transition data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[enter]:ease-out data-[leave]:duration-75 data-[leave]:ease-in">
        <MenuItem>
          <button
            className="flex items-center gap-3 w-full px-4 py-2.5 text-base text-gray-700 hover:bg-gray-50 text-left data-[focus]:bg-gray-50"
            onClick={() => window.open(imgSrc, "_blank")}
          >
            <Image className="w-5 h-5 text-gray-400 flex-shrink-0" />
            Open screenshot
          </button>
        </MenuItem>
        <MenuItem>
          <button
            className="flex items-center gap-3 w-full px-4 py-2.5 text-base text-gray-700 hover:bg-gray-50 text-left data-[focus]:bg-gray-50"
            onClick={() => window.open(linkHref, "_blank")}
          >
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
                <button
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-base text-gray-600 hover:bg-gray-50 hover:text-gray-900 text-left data-[focus]:bg-gray-50"
                  onClick={() => window.open(`/screenshots/${journeyId}/${pageId}/${filename}`, "_blank")}
                >
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

interface ScreenCardProps {
  page: { id: string; name: string; path: string };
  journeyId: string;
  manifest: Manifest | null;
  baseUrl: string;
}

function ScreenCard({ page, journeyId, manifest, baseUrl }: ScreenCardProps) {
  const [hasError, setHasError] = useState(false);
  const key = `${journeyId}/${page.id}`;
  const screenData = manifest?.screens[key];
  const imgSrc = screenData ? `/screenshots/${journeyId}/${page.id}/latest.png` : null;
  const history = screenData?.history ?? [];
  const fullUrl = `${baseUrl}${page.path}`;

  return (
    <div key={page.id}>
      {/* Header: page name + menu */}
      <div className="flex items-center justify-between mb-2 px-0.5">
        <Text size="md" className="font-semibold text-text-primary truncate pr-2">
          {page.name}
        </Text>
        <ScreenCardMenu
          imgSrc={imgSrc ?? fullUrl}
          linkHref={fullUrl}
          history={history}
          journeyId={journeyId}
          pageId={page.id}
        />
      </div>

      <div className="group">
        <div
          className="relative w-full h-[600px] overflow-hidden cursor-pointer bg-bg-primary border border-gray-300 rounded-lg hover:border-accent hover:shadow-lg transition-all"
          onClick={() => imgSrc ? window.open(imgSrc, "_blank") : window.open(fullUrl, "_blank")}
        >
          {/* Screenshot anchored to top */}
          {imgSrc && !hasError ? (
            <img
              src={imgSrc}
              alt={page.name}
              className="absolute inset-x-0 top-0 w-full h-auto opacity-100 group-hover:opacity-0 transition-opacity duration-200"
              onError={() => setHasError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-text-muted">
              <ImageOff className="w-8 h-8" />
              <Text size="xs" className="text-center px-4">No screenshot yet — run <span className="font-mono">npm run screenshots</span></Text>
            </div>
          )}

          {/* QR overlay — covers full card with solid white */}
          <div className="absolute inset-0 flex items-center justify-center p-6 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <QRCode
              value={fullUrl}
              size={160}
              level="M"
              style={{ width: "100%", height: "100%", maxWidth: 160, maxHeight: 160 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PrototypePage() {
  const journeys = getAllJourneys();
  const [baseUrl, setBaseUrl] = useState("https://main.d2bprmygt7j0ws.amplifyapp.com");
  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshStatus, setRefreshStatus] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
  }, []);

  useEffect(() => {
    fetch("/screenshots/manifest.json")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => data && setManifest(data))
      .catch(() => {});
  }, []);

  async function handleDownloadZip() {
    const zip = new JSZip();
    const allScreens = manifest ? Object.values(manifest.screens) : journeys.flatMap((j) =>
      j.pages.map((p) => ({ journeyId: j.id, pageId: p.id, latest: "latest.png" }))
    );

    for (const screen of allScreens) {
      const url = `/screenshots/${screen.journeyId}/${screen.pageId}/latest.png`;
      try {
        const res = await fetch(url);
        if (!res.ok) continue;
        const buf = await res.arrayBuffer();
        zip.file(`${screen.journeyId}-${screen.pageId}.png`, buf);
      } catch {
        // skip missing screenshots
      }
    }

    const blob = await zip.generateAsync({ type: "blob" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "screenshots.zip";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  async function handleRefreshScreenshots() {
    setIsRefreshing(true);
    setRefreshStatus(null);
    try {
      const res = await fetch("/api/capture-screens", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setRefreshStatus(`✓ ${data.captured} captured${data.failed > 0 ? `, ${data.failed} failed` : ""}`);
        // Reload manifest
        const mRes = await fetch("/screenshots/manifest.json");
        if (mRes.ok) setManifest(await mRes.json());
      } else {
        setRefreshStatus(`✗ ${data.error ?? "Failed"}`);
      }
    } catch {
      setRefreshStatus("✗ Could not reach capture API");
    } finally {
      setIsRefreshing(false);
    }
  }

  const [isDev, setIsDev] = useState(false);
  useEffect(() => {
    setIsDev(window.location.hostname === "localhost");
  }, []);

  return (
    <Box className="min-h-screen bg-bg-base transition-colors">
      <Box className="relative overflow-hidden">
        <Box className="absolute inset-0 bg-gradient-to-br from-success/5 via-transparent to-accent/5" />
        <Box className="w-full relative py-6 lg:py-8 px-4 lg:px-8">
          <VStack space="xl" className="w-full">
            {/* Header */}
            <VStack space="md" className="w-full">
              <HStack space="md" className="items-center justify-between w-full">
                <HStack space="md" className="items-center">
                  <Link href="/">
                    <Button
                      variant="solid"
                      action="primary"
                      size="sm"
                      className="rounded-full w-8 h-8 p-0"
                    >
                      <ArrowLeft className="w-4 h-4 text-white" />
                    </Button>
                  </Link>
                  <Heading as="h1" size="5xl" className="text-accent">
                    Prototype
                  </Heading>
                </HStack>
                <HStack space="sm" className="items-center">
                  {/* Download ZIP */}
                  <Button
                    variant="outline"
                    action="primary"
                    size="sm"
                    className="rounded-full w-8 h-8 p-0"
                    onClick={handleDownloadZip}
                  >
                    <Download className="w-4 h-4" />
                  </Button>

                  {/* Refresh Screenshots (dev only) */}
                  {isDev && (
                    <Button
                      variant="outline"
                      action="primary"
                      size="sm"
                      className="rounded-full w-8 h-8 p-0"
                      onClick={handleRefreshScreenshots}
                      disabled={isRefreshing}
                    >
                      <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
                    </Button>
                  )}

                  <Link href="/canvas">
                    <Button
                      variant="outline"
                      action="primary"
                      leftIcon={<MousePointerClick className="w-4 h-4" />}
                      className="rounded-full"
                    >
                      Canvas
                    </Button>
                  </Link>
                  <Link href="/prototype/journeys">
                    <Button
                      variant="outline"
                      action="primary"
                      leftIcon={<SquareCheckBig className="w-4 h-4" />}
                      className="rounded-full"
                    >
                      Status
                    </Button>
                  </Link>
                </HStack>
              </HStack>
              <Box className="w-full h-px bg-border-decorative" />
            </VStack>

            {/* Refresh status message */}
            {refreshStatus && (
              <Text size="sm" className="text-text-secondary">{refreshStatus}</Text>
            )}

            {/* Journeys Grid */}
            <VStack space="2xl" className="w-full mt-8">
              {journeys.map((journey) => (
                <VStack key={journey.id} space="lg" className="w-full">
                  {/* Journey label — plain text, no link */}
                  <Text size="sm" className="font-semibold text-text-secondary uppercase tracking-widest">
                    {journey.title}
                  </Text>

                  {/* Pages Grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 260px))", gap: "1.5rem" }}>
                    {journey.pages.map((page) => (
                      <ScreenCard
                        key={page.id}
                        page={page}
                        journeyId={journey.id}
                        manifest={manifest}
                        baseUrl={baseUrl}
                      />
                    ))}
                  </div>
                </VStack>
              ))}
            </VStack>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
}
