import { NextRequest, NextResponse } from "next/server";
import { loadFunctions } from "@/app/lib/job-functions";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const search = searchParams.get("search")?.trim().toLowerCase() ?? "";
  const title = searchParams.get("title");
  const group = searchParams.get("group");
  const department = searchParams.get("department");
  const levelParam = searchParams.get("level");

  let level: number | null = null;
  if (levelParam !== null) {
    level = Number(levelParam);
    if (Number.isNaN(level)) {
      return NextResponse.json(
        { error: "level moet een getal zijn" },
        { status: 400 }
      );
    }
  }

  let functions;
  try {
    functions = await loadFunctions();
  } catch {
    return NextResponse.json(
      { error: "Kon functiegegevens niet laden" },
      { status: 500 }
    );
  }

  const filtered = functions.filter((fn) => {
    if (search && !fn.title.toLowerCase().includes(search)) return false;
    if (title && fn.title !== title) return false;
    if (group && fn.group !== group) return false;
    if (department && fn.department !== department) return false;
    if (level !== null && fn.level !== level) return false;
    return true;
  });

  return NextResponse.json(filtered);
}
