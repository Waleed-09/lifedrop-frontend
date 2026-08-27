"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Droplets, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { apiFetch } from "@/lib/api";

interface Donor {
  id: number;
  name: string;
  blood: string;
  city: string;
  phone?: string;
  image: string;
}

// Default fallback donors list in case backend returns empty
const defaultDonors: Donor[] = [
  {
    id: 1,
    name: "Ahmed Khan",
    blood: "A+",
    city: "Islamabad",
    image: "https://i.pravatar.cc/300?img=11",
  },
  {
    id: 2,
    name: "Sara Ali",
    blood: "O+",
    city: "Lahore",
    image: "https://i.pravatar.cc/300?img=32",
  },
  {
    id: 3,
    name: "Usman Tariq",
    blood: "B-",
    city: "Karachi",
    image: "https://i.pravatar.cc/300?img=18",
  },
];

export default function FeaturedDonors() {
  const [donors, setDonors] = useState<Donor[]>(defaultDonors);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedDonors() {
      try {
        // Fetch donors using Laravel route: /donors/nearby
        const data = await apiFetch("/donors/nearby");
        if (data && Array.isArray(data) && data.length > 0) {
          const formatted = data.slice(0, 6).map((item: any, idx: number) => ({
            id: item.id || idx,
            name: item.name || "Blood Donor",
            blood: item.blood_group || item.blood || "A+",
            city: item.address || item.city || "Abbottabad, PK",
            phone: item.phone || "",
            image: item.image || `https://i.pravatar.cc/300?img=${(idx % 70) + 1}`,
          }));
          setDonors(formatted);
        }
      } catch (err) {
        console.log("Fallback to initial featured donors list");
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedDonors();
  }, []);

  return (
    <section className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Featured Donors
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Meet some of our generous blood donors registered on LifeDrop.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">
            Loading active donors...
          </div>
        ) : (
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {donors.map((donor, index) => (
              <motion.div
                key={donor.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-3xl bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-72 w-full bg-gray-100">
                    <Image
                      src={donor.image}
                      alt={donor.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                      unoptimized
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">
                        {donor.name}
                      </h3>

                      <span className="rounded-full bg-red-600 px-4 py-1.5 text-white font-bold text-sm shadow">
                        {donor.blood}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600">
                      <p className="flex items-center gap-2">
                        <MapPin size={18} className="text-red-600 shrink-0" />
                        <span>{donor.city}</span>
                      </p>

                      {donor.phone && (
                        <p className="flex items-center gap-2">
                          <Phone size={18} className="text-red-600 shrink-0" />
                          <span>{donor.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href="/request"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700 shadow"
                  >
                    <Droplets size={18} />
                    Request Blood
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}