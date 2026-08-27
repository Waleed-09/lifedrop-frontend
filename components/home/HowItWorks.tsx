"use client";

import { Search, UserPlus, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    stepNumber: "01",
    icon: UserPlus,
    title: "Register",
    description:
      "Create your LifeDrop account and complete your donor profile in just a few minutes.",
  },
  {
    stepNumber: "02",
    icon: Search,
    title: "Find or Request Blood",
    description:
      "Search for available donors or create an emergency blood request when needed.",
  },
  {
    stepNumber: "03",
    icon: HeartHandshake,
    title: "Donate & Save Lives",
    description:
      "Connect with nearby donors and help save lives through quick and secure coordination.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-sm font-bold uppercase tracking-wider text-red-600 bg-red-100/60 px-4 py-1.5 rounded-full border border-red-200">
            Simple Process
          </span>

          <h2 className="mt-4 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            How LifeDrop Works
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Three simple steps to help save lives in critical emergency situations.
          </p>
        </div>

        {/* Steps Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.2 }}
                className="relative rounded-3xl bg-white p-8 shadow-md border border-gray-100 transition hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between"
              >
                {/* Step Badge */}
                <div className="absolute top-6 right-6 text-3xl font-black text-red-100 select-none">
                  {step.stepNumber}
                </div>

                <div>
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600 shadow-sm border border-red-100">
                    <Icon className="h-8 w-8" />
                  </div>

                  <h3 className="mb-3 text-2xl font-bold text-gray-900">
                    {step.title}
                  </h3>

                  <p className="leading-relaxed text-gray-600">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                    Step {index + 1} of 3
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}