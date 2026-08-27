"use client";

import { HeartHandshake, Users, Hospital, Droplets } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    icon: HeartHandshake,
    value: "12K+",
    title: "Lives Saved",
    color: "text-red-600",
  },
  {
    icon: Users,
    value: "8K+",
    title: "Active Donors",
    color: "text-blue-600",
  },
  {
    icon: Hospital,
    value: "120+",
    title: "Partner Hospitals",
    color: "text-green-600",
  },
  {
    icon: Droplets,
    value: "5K+",
    title: "Blood Requests",
    color: "text-pink-600",
  },
];

export default function Stats() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Together We Make a Difference
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Every donation can save multiple lives.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="rounded-2xl border bg-white p-8 text-center shadow-md transition hover:-translate-y-2 hover:shadow-xl"
              >
                <Icon className={`mx-auto mb-5 h-12 w-12 ${item.color}`} />

                <h3 className="text-4xl font-bold">{item.value}</h3>

                <p className="mt-3 text-gray-600">{item.title}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}