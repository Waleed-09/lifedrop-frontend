import { NextResponse } from "next/server";

let initialRequests = [
  {
    id: 201,
    patient_name: "Tariq Mahmood",
    blood_group: "B+",
    hospital_name: "Ayub Medical Complex",
    hospital: "Ayub Medical Complex",
    city: "Abbottabad",
    contact_number: "03493657462",
    phone: "03493657462",
    units: 2,
    urgency: "critical",
    status: "pending",
    created_at: "2026-08-26",
  },
  {
    id: 202,
    patient_name: "Fatima Khan",
    blood_group: "O-",
    hospital_name: "PIMS Hospital",
    hospital: "PIMS Hospital",
    city: "Islamabad",
    contact_number: "03009876543",
    phone: "03009876543",
    units: 1,
    urgency: "urgent",
    status: "pending",
    created_at: "2026-08-25",
  },
  {
    id: 203,
    patient_name: "Muhammad Rizwan",
    blood_group: "A+",
    hospital_name: "Lady Reading Hospital",
    hospital: "Lady Reading Hospital",
    city: "Peshawar",
    contact_number: "03331122334",
    phone: "03331122334",
    units: 3,
    urgency: "normal",
    status: "fulfilled",
    created_at: "2026-08-24",
  },
];

export async function GET() {
  return NextResponse.json(initialRequests);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newReq = {
      id: Date.now(),
      patient_name: body.patient_name || "Emergency Patient",
      blood_group: body.blood_group || "B+",
      hospital_name: body.hospital_name || body.hospital || "Local Hospital",
      hospital: body.hospital || body.hospital_name || "Local Hospital",
      city: body.city || "Abbottabad",
      contact_number: body.contact_number || body.phone || "03000000000",
      phone: body.phone || body.contact_number || "03000000000",
      units: Number(body.units) || 1,
      urgency: body.urgency || "urgent",
      status: "pending",
      created_at: new Date().toISOString().split("T")[0],
    };

    initialRequests.unshift(newReq);
    return NextResponse.json(newReq, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Failed to post emergency request" }, { status: 400 });
  }
}
