import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    donors_count: "8,450+",
    requests_count: "3,120+",
    hospitals_count: "140+",
    lives_saved: "12,000+",
  });
}
