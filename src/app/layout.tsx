import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/providers/theme-provider";
import "./globals.css";

const inter = localFont({
  src: "../../public/fonts/Inter-VariableFont_opsz,wght.ttf",
  variable: "--font-inter",
  weight: "300 700",
  display: "swap",
});

const bitter = localFont({
  src: "../../public/fonts/Bitter-VariableFont_wght.ttf",
  variable: "--font-bitter",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nearform design system",
  description: "Nearform-branded design system and prototyping workspace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${bitter.variable} antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
