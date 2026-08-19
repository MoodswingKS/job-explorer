import { promises as fs } from "fs";
import path from "path";
import type { JobFunction } from "@/types/job-function";

// Server-only: lives outside /public, so it's never fetchable by the browser.
const DATA_PATH = path.join(process.cwd(), "data", "job-functions.json");

export async function loadFunctions(): Promise<JobFunction[]> {
  const raw = await fs.readFile(DATA_PATH, "utf-8");
  return JSON.parse(raw) as JobFunction[];
}

export async function getFunctionById(
  id: string
): Promise<JobFunction | undefined> {
  const functions = await loadFunctions();
  return functions.find((fn) => fn.id === id);
}
