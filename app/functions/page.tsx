import type { Metadata } from "next";
import FunctionsGrid from "@/components/FunctionsGrid";

export const metadata: Metadata = {
  title: "Functions — Job Explorer",
  description: "Every job function, cataloged with headcount and status.",
};

export default function FunctionsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <div className="mb-10 max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass">
          Field Index
        </p>
        <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-paper md:text-5xl">
          Job functions
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-sage md:text-base">
          Eight territories, cataloged from the field. Each card is pulled
          live from the function index &mdash; open roles, team count, and
          how remote-friendly it runs.
        </p>
      </div>

      <FunctionsGrid />
    </div>
  );
}
