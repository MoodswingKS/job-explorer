import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Job Explorer",
  description: "A field guide to every function hiring across the company.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}>
      <body className="min-h-screen bg-grain-overlay font-sans">
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-paper/10">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
              <Link href="/" className="group flex items-center gap-2.5">
                <CompassMark className="h-7 w-7 text-brass transition-transform duration-500 group-hover:rotate-45" />
                <span className="font-display text-lg font-medium tracking-tight text-paper">
                  Job Explorer
                </span>
              </Link>
              <nav className="flex items-center gap-6 font-mono text-xs uppercase tracking-widest text-sage">
                <Link href="/" className="transition-colors hover:text-paper">
                  Home
                </Link>
                <Link href="/functions" className="transition-colors hover:text-paper">
                  Functions
                </Link>
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-paper/10">
            <div className="mx-auto max-w-6xl px-6 py-8 font-mono text-[11px] uppercase tracking-widest text-sage">
              Job Explorer &mdash; a field guide to where the work happens
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

function CompassMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9.25" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M15.5 8.5L13 13L8.5 15.5L11 11L15.5 8.5Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}
