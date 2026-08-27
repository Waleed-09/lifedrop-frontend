import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    return NextResponse.json({
      message: `Request #${id} status updated successfully`,
      id,
      ...body,
    });
  } catch (err) {
    return NextResponse.json({ message: "Update request failed" }, { status: 400 });
  }
}
