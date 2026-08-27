import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json({ message: "Unauthenticated." }, { status: 401 });
  }

  return NextResponse.json({
    id: 1,
    name: "Muhammad Waleed",
    email: "waleed@lifedrop.pk",
    phone: "03493657462",
    blood_group: "B+",
    city: "Abbottabad",
    role: "admin",
    is_available: true,
    last_donation_date: "2026-05-15",
  });
}
