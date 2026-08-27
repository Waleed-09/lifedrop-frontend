"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, HeartPulse } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-red-50 via-white to-red-100">
      <div className="mx-auto flex min-h-[90vh] max-w-7xl items-center justify-between gap-16 px-6 py-16 lg:flex-row flex-col">

        {/* Left */}

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
          className="max-w-xl"
        >

          <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-5 py-2 font-semibold text-red-600">

            <HeartPulse size={18} />

            Save Lives Today

          </div>

          <h1 className="mt-8 text-6xl font-extrabold leading-tight text-gray-900">

            Donate Blood,

            <span className="block text-red-600">
              Save a Life.
            </span>

          </h1>

          <p className="mt-8 text-lg leading-8 text-gray-600">

            LifeDrop connects blood donors with people in urgent need.

            Join thousands of heroes making a difference every single day.

          </p>

          <div className="mt-10 flex flex-wrap gap-5">

            <Link
              href="/search"
              className="flex items-center gap-2 rounded-full bg-red-600 px-8 py-4 font-semibold text-white shadow-xl transition hover:bg-red-700"
            >
              Find Blood

              <ArrowRight size={18} />

            </Link>

            <Link
              href="/signup"
              className="rounded-full border-2 border-red-600 px-8 py-4 font-semibold text-red-600 transition hover:bg-red-50"
            >
              Become Donor
            </Link>

          </div>

        </motion.div>

        {/* Right */}

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
        >

          <Image
            src="/images/hero.png"
            alt="Blood Donation"
            width={700}
            height={700}
            priority
            className="drop-shadow-2xl"
          />

        </motion.div>

      </div>
    </section>
  );
}