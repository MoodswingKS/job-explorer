"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import FunctionCard from "@/components/FunctionCard";
import type { JobFunction } from "@/types/job-function";

const ALL = "All";

type LoadState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; data: JobFunction[] };

export default function FunctionsGrid() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read initial filter values directly from the URL query params
  const search = searchParams.get("search") ?? "";
  const department = searchParams.get("department") ?? ALL;
  const group = searchParams.get("group") ?? ALL;
  const level = searchParams.get("level") ?? ALL;

  const [allFunctions, setAllFunctions] = useState<JobFunction[] | null>(null);
  const [state, setState] = useState<LoadState>({ status: "loading" });

  // Helper to sync filter changes to the URL without full page reloads
  const updateFilters = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value === ALL) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // 1. Fetch full list once to populate dropdown options
  useEffect(() => {
    let cancelled = false;

    fetch("/api/functions")
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
        return res.json();
      })
      .then((data: JobFunction[]) => {
        if (!cancelled) setAllFunctions(data);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  // 2. Refetch filtered data whenever URL searchParams change
  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading" });

    const params = new URLSearchParams();
    if (search.trim()) params.set("search", search.trim());
    if (department !== ALL) params.set("department", department);
    if (group !== ALL) params.set("group", group);
    if (level !== ALL) params.set("level", level);

    const qs = params.toString();

    fetch(`/api/functions${qs ? `?${qs}` : ""}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
        return res.json();
      })
      .then((data: JobFunction[]) => {
        if (!cancelled) setState({ status: "ready", data });
      })
      .catch((err) => {
        if (!cancelled) {
          setState({
            status: "error",
            message: err instanceof Error ? err.message : "Something went wrong",
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [search, department, group, level]);

  const departments = useMemo(() => {
    if (!allFunctions) return [];
    return Array.from(new Set(allFunctions.map((fn) => fn.department))).sort();
  }, [allFunctions]);

  const levels = useMemo(() => {
    if (!allFunctions) return [];
    return Array.from(new Set(allFunctions.map((fn) => fn.level))).sort(
      (a, b) => a - b
    );
  }, [allFunctions]);

  const groups = useMemo(() => {
    if (!allFunctions) return [];
    return Array.from(new Set(allFunctions.map((fn) => fn.group))).sort();
  }, [allFunctions]);

  const hasActiveFilters =
    department !== ALL || level !== ALL || group !== ALL || search.trim() !== "";

  function clearFilters() {
    router.replace(pathname, { scroll: false });
  }

  return (
    <div>
      <div>
        <label htmlFor="jobtitle-search" className="sr-only">
          Search by name
        </label>
        <div className="relative max-w-sm">
          <SearchMark className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sage" />
          <input
            id="jobtitle-search"
            type="text"
            value={search}
            onChange={(e) => updateFilters({ search: e.target.value })}
            placeholder="Type here"
            className="w-full border border-paper-line/40 bg-canopy-light px-9 py-2.5 font-mono text-xs uppercase tracking-widest text-paper placeholder:text-sage/70 focus:border-brass focus:outline-none"
          />
          {search && (
            <button
              type="button"
              onClick={() => updateFilters({ search: "" })}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-sage transition-colors hover:text-paper"
            >
              &times;
            </button>
          )}
        </div>
      </div>
      <br />
      <div className="mb-8 flex flex-wrap items-end gap-4">
        <FilterSelect
          id="filter-department"
          label="Department"
          value={department}
          options={departments}
          onChange={(val) => updateFilters({ department: val })}
        />
        <FilterSelect
          id="filter-group"
          label="Group"
          value={group}
          options={groups}
          onChange={(val) => updateFilters({ group: val })}
        />
        <FilterSelect
          id="filter-level"
          label="Level"
          value={level}
          options={levels.map((lvl) => String(lvl))}
          onChange={(val) => updateFilters({ level: val })}
        />

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="mb-0.5 font-mono text-[10px] uppercase tracking-widest text-sage underline decoration-dotted hover:text-paper"
          >
            Clear filters
          </button>
        )}
      </div>

      {state.status === "loading" && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-48 animate-pulse border border-paper-line/40 bg-paper/10"
              aria-hidden="true"
            />
          ))}
        </div>
      )}

      {state.status === "error" && (
        <div className="border border-dashed border-rust/60 bg-rust/10 p-6 text-sm text-paper">
          <p className="font-mono text-xs uppercase tracking-widest text-rust-light">
            Couldn&apos;t load the index
          </p>
          <p className="mt-2 text-sage">{state.message}</p>
        </div>
      )}

      {state.status === "ready" && state.data.length === 0 && (
        <div className="border border-dashed border-paper-line/60 p-10 text-center text-sage">
          No functions match these filters.
        </div>
      )}

      {state.status === "ready" && state.data.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {state.data.map((fn, index) => (
            <FunctionCard key={fn.id} fn={fn} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterSelect({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block font-mono text-[10px] uppercase tracking-widest text-sage"
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 border border-paper-line/40 bg-canopy-light px-3 py-2 font-mono text-xs uppercase tracking-widest text-paper focus:border-brass focus:outline-none"
      >
        <option value={ALL}>{ALL}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function SearchMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M15.5 15.5L20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}