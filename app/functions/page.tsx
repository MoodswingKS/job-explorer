import type { Metadata } from "next";
import FunctionsGrid from "@/components/FunctionsGrid";

export const metadata: Metadata = {
  title: "Job Explorer: Functions and Details",
  description: "A collection of all jobs to be found, to search and filter through",
};

export default function FunctionsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <div className="mb-10 max-w-2xl">
        <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-paper md:text-5xl">
          Job functions
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-sage md:text-base">
          Search and filter until you find what you are looking for.
        </p>
      </div>
      <FunctionsGrid />
    </div>
  );
}
