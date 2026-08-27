import { NextResponse } from "next/server";

const mockDonors = [
  {
    id: 101,
    name: "Ahmed Khan",
    blood_group: "B+",
    city: "Abbottabad",
    address: "Main Mansehra Road, Abbottabad",
    phone: "03001234567",
    is_available: true,
    is_verified: true,
    last_donation_date: "2026-04-10",
  },
  {
    id: 102,
    name: "Dr. Usman Ali",
    blood_group: "O-",
    city: "Abbottabad",
    address: "Ayub Medical Complex Area",
    phone: "03129876543",
    is_available: true,
    is_verified: true,
    last_donation_date: "2026-03-01",
  },
  {
    id: 103,
    name: "Ayesha Bibi",
    blood_group: "A+",
    city: "Islamabad",
    address: "F-7 Markaz, Islamabad",
    phone: "03335554433",
    is_available: true,
    is_verified: true,
    last_donation_date: "2026-05-20",
  },
  {
    id: 104,
    name: "Hamza Malik",
    blood_group: "AB+",
    city: "Peshawar",
    address: "Hayatabad, Peshawar",
    phone: "03451122334",
    is_available: true,
    is_verified: false,
    last_donation_date: "2026-02-14",
  },
  {
    id: 105,
    name: "Zainab Fatima",
    blood_group: "B-",
    city: "Lahore",
    address: "Gulberg III, Lahore",
    phone: "03219988776",
    is_available: true,
    is_verified: true,
    last_donation_date: "2026-01-05",
  },
  {
    id: 106,
    name: "Bilal Tariq",
    blood_group: "O+",
    city: "Abbottabad",
    address: "Supply Area, Abbottabad",
    phone: "03493657462",
    is_available: true,
    is_verified: true,
    last_donation_date: "2026-05-01",
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const bg = searchParams.get("blood_group");
  const city = searchParams.get("city");

  let filtered = [...mockDonors];

  if (bg) {
    filtered = filtered.filter(
      (d) => d.blood_group.toLowerCase() === bg.toLowerCase()
    );
  }

  if (city && city.trim()) {
    const q = city.trim().toLowerCase();
    filtered = filtered.filter(
      (d) =>
        d.city.toLowerCase().includes(q) ||
        d.address.toLowerCase().includes(q)
    );
  }

  return NextResponse.json(filtered);
}
