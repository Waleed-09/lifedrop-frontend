import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      message: "Availability and donor profile updated successfully!",
      data: body,
    });
  } catch (err) {
    return NextResponse.json({ message: "Update failed" }, { status: 400 });
  }
}
