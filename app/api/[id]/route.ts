import { NextRequest, NextResponse } from "next/server";
import { getFunctionById } from "@/app/lib/job-functions";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const fn = await getFunctionById(params.id);

  if (!fn) {
    return NextResponse.json(
      { error: `Geen functie gevonden met id "${params.id}"` },
      { status: 404 }
    );
  }

  return NextResponse.json(fn);
}
