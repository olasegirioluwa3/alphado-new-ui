import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alphado | AI Voice Assistant & 24/7 Instagram Business Automation",
  description:
    "Upload your receiver list, give a short prompt, and Alphado calls every customer as you in any language — summarizes every call, posts on Instagram 24/7, replies to DMs, and grows your audience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${plusJakarta.variable} ${dmSans.variable}`}
    >
      <body className="antialiased selection:bg-sky-500/20 selection:text-sky-700 dark:selection:bg-sky-400/25 dark:selection:text-sky-200">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
