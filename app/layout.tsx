import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

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
    <html lang="en">
      <body className="min-h-screen bg-grain-overlay font-sans">
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-paper/10">
            <div className="mx-auto flex max-w-6xl center justify-between px-6 py-5">
              <Link href="/" className="group flex items-center gap-2.5">
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
              Job Explorer: Where you find what works for you
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
};