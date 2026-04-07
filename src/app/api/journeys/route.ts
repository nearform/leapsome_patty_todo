import { NextResponse } from "next/server";
import { getAllJourneys } from "@/lib/data/journeys-registry";

export async function GET() {
  return NextResponse.json(getAllJourneys());
}
