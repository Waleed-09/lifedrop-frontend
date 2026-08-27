import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      message: "Your message has been received! Our team will contact you shortly.",
      data: body,
    });
  } catch (err) {
    return NextResponse.json({ message: "Failed to send message" }, { status: 400 });
  }
}
