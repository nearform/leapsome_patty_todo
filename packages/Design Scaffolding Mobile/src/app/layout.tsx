import type { Metadata } from "next";
import localFont from "next/font/local";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "./globals.css";

const splineSans = localFont({
  src: "../../public/fonts/SplineSans-VariableFont_wght.ttf",
  variable: "--font-spline-sans",
  weight: "300 700",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ATP/WTA Design System",
  description: "A comprehensive design system built with gluestack-ui",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${splineSans.variable} antialiased`}>
        <GluestackUIProvider>
          {children}
        </GluestackUIProvider>
      </body>
    </html>
  );
}
