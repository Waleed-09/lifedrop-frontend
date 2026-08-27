"use client";

import { Search, HeartHandshake, ShieldCheck, Clock, Zap, Users } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Search,
    title: "Instant Donor Search",
    description: "Locate active blood donors in your exact area within seconds using location filters.",
  },
  {
    icon: Zap,
    title: "Real-Time Requests",
    description: "Post emergency blood requirements instantly to notify matching donors in your vicinity.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Community",
    description: "Connect directly with verified and genuine donors committed to saving lives.",
  },
  {
    icon: HeartHandshake,
    title: "Direct Communication",
    description: "Call or message donors directly without any middleman delay during critical emergencies.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Emergency support and blood request access round the clock, anytime, anywhere.",
  },
  {
    icon: Users,
    title: "Life-Saving Network",
    description: "Join a growing community dedicated to making blood donation accessible for everyone.",
  },
];

export default function Features() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-sm font-bold uppercase tracking-wider text-red-600 bg-red-50 px-4 py-1.5 rounded-full border border-red-100">
            Why Choose LifeDrop
          </span>

          <h2 className="mt-4 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            Everything You Need to Save Lives
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            LifeDrop connects patients in urgent need with voluntary blood donors in real-time.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-gray-100 bg-gray-50/50 p-8 shadow-sm transition hover:bg-white hover:shadow-xl hover:border-red-100"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 text-white shadow-md mb-6">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}