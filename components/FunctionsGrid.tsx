"use client";

import { useEffect, useMemo, useState } from "react";
import FunctionCard from "@/components/FunctionCard";
import type { JobFunction } from "@/types/job-function";

const ALL = "All";

type LoadState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; data: JobFunction[] };

export default function FunctionsGrid() {
  // Unfiltered list, fetched once — used only to build the option lists
  // for the department/group/level selects.
  const [allFunctions, setAllFunctions] = useState<JobFunction[] | null>(
    null
  );

  const [department, setDepartment] = useState(ALL);
  const [level, setLevel] = useState(ALL);
  const [group, setGroup] = useState(ALL);

  const [state, setState] = useState<LoadState>({ status: "loading" });

  // Load the full list once, purely to populate the filter dropdowns.
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
      .catch(() => {
        // Non-fatal: the filtered fetch below still handles its own errors.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Refetch the (server-filtered) list whenever a filter changes.
  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading" });

    const params = new URLSearchParams();
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
  }, [department, group, level]);

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
    department !== ALL || level !== ALL || group !== ALL;

  function clearFilters() {
    setDepartment(ALL);
    setLevel(ALL);
    setGroup(ALL);
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end gap-4">
        <FilterSelect
          id="filter-department"
          label="Department"
          value={department}
          options={departments}
          onChange={setDepartment}
        />
        <FilterSelect
          id="filter-group"
          label="Group"
          value={group}
          options={groups}
          onChange={setGroup}
        />
        <FilterSelect
          id="filter-level"
          label="Level"
          value={level}
          options={levels.map((lvl) => String(lvl))}
          onChange={setLevel}
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
