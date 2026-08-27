"use client";

import { ShieldCheck, Heart, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: Heart,
    title: "Save Lives",
    description:
      "A single blood donation can help save up to three lives in emergencies and medical treatments.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description:
      "Every donation follows strict medical standards to ensure the safety of both donors and recipients.",
  },
  {
    icon: Clock,
    title: "Quick Process",
    description:
      "The donation process usually takes less than one hour, but its impact lasts a lifetime.",
  },
  {
    icon: Users,
    title: "Support Your Community",
    description:
      "Become part of a growing network of volunteers making a real difference every day.",
  },
];

export default function WhyDonate() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Why Donate Blood?
          </h2>

          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Your donation can make a life-changing difference. Every drop counts.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-gray-100 bg-gray-50 p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
                  <Icon className="h-7 w-7 text-red-600" />
                </div>

                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  {benefit.title}
                </h3>

                <p className="text-gray-600 leading-7">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}