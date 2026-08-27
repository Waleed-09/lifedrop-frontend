import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, blood_group, address, city, role } = body;

    if (!name || !email) {
      return NextResponse.json(
        { message: "Name and email are required." },
        { status: 422 }
      );
    }

    const user = {
      id: Date.now(),
      name,
      email,
      phone: phone || "03000000000",
      blood_group: blood_group || "A+",
      address: address || city || "Abbottabad",
      city: city || address || "Abbottabad",
      role: role || "donor",
      is_available: true,
    };

    return NextResponse.json({
      token: `lifedrop_token_${Date.now()}`,
      user,
      message: "Account created successfully!",
    });
  } catch (err: any) {
    return NextResponse.json({ message: "Registration failed" }, { status: 400 });
  }
}
