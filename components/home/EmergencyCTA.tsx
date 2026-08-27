"use client";

import Link from "next/link";
import { AlertCircle, Search, PlusCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function EmergencyCTA() {
  return (
    <section className="bg-red-600 py-16 text-white overflow-hidden relative">
      {/* Background Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-700 via-red-600 to-red-800 opacity-90" />

      <div className="relative mx-auto max-w-7xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center mb-4"
        >
          <span className="flex items-center gap-2 rounded-full bg-red-500/40 px-4 py-1.5 text-sm font-semibold tracking-wide border border-red-400/30">
            <AlertCircle className="w-4 h-4 text-white animate-pulse" />
            24/7 Emergency Blood Support
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-5xl font-extrabold tracking-tight"
        >
          Need Blood Urgently or Want to Save a Life?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mx-auto mt-4 max-w-2xl text-lg text-red-100"
        >
          Connect instantly with verified donors in your nearby location or post an emergency request for immediate community response.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/request"
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 font-bold text-red-600 shadow-lg hover:bg-red-50 transition transform hover:-translate-y-0.5"
          >
            <PlusCircle className="w-5 h-5" />
            Post Emergency Request
          </Link>

          <Link
            href="/search"
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border-2 border-white/80 px-8 py-3.5 font-bold text-white hover:bg-white/10 transition transform hover:-translate-y-0.5"
          >
            <Search className="w-5 h-5" />
            Find Donors Nearby
          </Link>
        </motion.div>
      </div>
    </section>
  );
}