import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 }
      );
    }

    // Mock successful authentication for frontend standalone preview
    const role = email.toLowerCase().includes("admin") ? "admin" : "donor";
    const user = {
      id: 1,
      name: email.split("@")[0].replace(".", " ").toUpperCase(),
      email,
      phone: "03493657462",
      blood_group: "B+",
      city: "Abbottabad",
      role,
      is_available: true,
    };

    return NextResponse.json({
      token: "lifedrop_mock_jwt_bearer_token_123456",
      user,
      message: "Login successful",
    });
  } catch (err: any) {
    return NextResponse.json({ message: "Invalid request payload" }, { status: 400 });
  }
}
