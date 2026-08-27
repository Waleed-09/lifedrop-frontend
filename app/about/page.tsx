"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { 
  Users, 
  HeartHandshake, 
  Building2, 
  ShieldCheck, 
  Clock, 
  Lock, 
  Award, 
  ArrowRight,
  Droplet,
  Search,
  PhoneCall
} from "lucide-react";

export default function AboutPage() {
  const [stats, setStats] = useState({
    donorsCount: "500+",
    requestsCount: "1,200+",
    hospitalsCount: "45+",
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await apiFetch("/stats");
        if (data) {
          setStats({
            donorsCount: data.donors_count || "500+",
            requestsCount: data.requests_count || "1,200+",
            hospitalsCount: data.hospitals_count || "45+",
          });
        }
      } catch (err) {
        console.log("Using static stats fallback");
      }
    }

    loadStats();
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">
        
        {/* Modern Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-rose-800 py-24 text-white">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-black/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md px-4 py-1.5 text-xs font-bold tracking-wide uppercase text-red-100 border border-white/20 mb-6">
              <Droplet className="w-4 h-4 fill-red-200 text-red-200" /> Saving Lives Through Technology
            </span>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
              Bridging the Gap Between <br className="hidden sm:inline" />
              <span className="text-amber-300">Donors & Emergency Seekers</span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg text-red-100 leading-relaxed font-medium">
              LifeDrop is a real-time blood connection ecosystem designed to eliminate delay in critical medical situations. We connect verified blood donors directly with patients and healthcare centers instantly.
            </p>
          </div>
        </section>

        {/* Dynamic Impact Counters / Floating Stats */}
        <section className="-mt-12 mx-auto max-w-6xl px-6 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 rounded-3xl bg-white p-8 shadow-xl border border-slate-100 text-center">
            
            <div className="flex flex-col items-center p-4 hover:scale-105 transition duration-300">
              <div className="p-3 bg-red-50 rounded-2xl mb-3">
                <Users className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-4xl font-black text-slate-900">{stats.donorsCount}</h3>
              <p className="text-slate-500 font-bold text-sm mt-1">Verified Donors</p>
            </div>

            <div className="flex flex-col items-center p-4 border-y md:border-y-0 md:border-x border-slate-100 hover:scale-105 transition duration-300">
              <div className="p-3 bg-red-50 rounded-2xl mb-3">
                <HeartHandshake className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-4xl font-black text-slate-900">{stats.requestsCount}</h3>
              <p className="text-slate-500 font-bold text-sm mt-1">Lives Impacted</p>
            </div>

            <div className="flex flex-col items-center p-4 hover:scale-105 transition duration-300">
              <div className="p-3 bg-red-50 rounded-2xl mb-3">
                <Building2 className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-4xl font-black text-slate-900">{stats.hospitalsCount}</h3>
              <p className="text-slate-500 font-bold text-sm mt-1">Hospital Networks</p>
            </div>

          </div>
        </section>

        {/* Unique Feature: How LifeDrop Works (1-2-3 Steps) */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">How LifeDrop Solves Emergencies</h2>
            <p className="text-slate-600 mt-2 text-base">Simple 3-step real-time matching workflow</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100 relative hover:shadow-md transition">
              <span className="text-5xl font-black text-red-100 absolute top-6 right-6">01</span>
              <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center font-bold mb-6">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Instant Search</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Filter donors by specific blood group and location (e.g., Abbottabad) with zero latency.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100 relative hover:shadow-md transition">
              <span className="text-5xl font-black text-red-100 absolute top-6 right-6">02</span>
              <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center font-bold mb-6">
                <PhoneCall className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Direct Contact</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Call available donors directly without third-party delay or complex middle-layer steps.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100 relative hover:shadow-md transition">
              <span className="text-5xl font-black text-red-100 absolute top-6 right-6">03</span>
              <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center font-bold mb-6">
                <Droplet className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Life Saved</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Donor arrives at hospital station and completes donation safely to save a patient's life.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Why Choose Us */}
        <section className="bg-white py-20 border-y border-slate-100">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              
              <div>
                <span className="text-red-600 font-bold text-sm tracking-wider uppercase mb-2 block">Our Purpose</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6">
                  Empowering Communities to Act When Time is Critical
                </h2>

                <p className="leading-relaxed text-slate-600 mb-4">
                  Every second counts during a medical emergency. Traditional blood donation channels often involve delayed phone trees and manual coordination. LifeDrop automates location-matching to connect available donors with blood requesters in seconds.
                </p>

                <p className="leading-relaxed text-slate-600 mb-8">
                  Whether you are a voluntary donor looking to contribute or a family member in need, our platform ensures privacy, security, and immediate responsiveness.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50">
                    <Clock className="w-6 h-6 text-red-600" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">24/7 Active</h4>
                      <p className="text-xs text-slate-500">Real-time requests</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50">
                    <Lock className="w-6 h-6 text-red-600" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Privacy Safe</h4>
                      <p className="text-xs text-slate-500">Secure data controls</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Checklist Card */}
              <div className="rounded-3xl bg-slate-900 p-8 sm:p-10 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-red-600/20 rounded-full blur-2xl pointer-events-none" />

                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <ShieldCheck className="w-7 h-7 text-red-500" /> Why Choose LifeDrop?
                </h3>

                <ul className="space-y-4 text-slate-300 text-sm sm:text-base">
                  <li className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-600/30 text-red-400 font-bold text-xs">✓</span>
                    Instant Blood Donor Location Search
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-600/30 text-red-400 font-bold text-xs">✓</span>
                    Verified Donor Profiles & Availability Toggle
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-600/30 text-red-400 font-bold text-xs">✓</span>
                    Public Emergency Blood Requests Stream
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-600/30 text-red-400 font-bold text-xs">✓</span>
                    Hospital & Blood Bank Network Integration
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-600/30 text-red-400 font-bold text-xs">✓</span>
                    100% Free & Community-Driven Platform
                  </li>
                </ul>

                <Link
                  href="/signup"
                  className="mt-8 inline-flex items-center justify-center gap-2 w-full rounded-2xl bg-red-600 py-3.5 font-bold text-white hover:bg-red-700 transition shadow-lg shadow-red-900/40"
                >
                  Join as a Donor Today <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16 mx-auto max-w-7xl px-6">
          <div className="rounded-3xl bg-gradient-to-r from-red-600 to-rose-700 p-10 text-white text-center shadow-xl">
            <h2 className="text-3xl font-extrabold mb-3">Ready to Save Lives or Need Blood?</h2>
            <p className="text-red-100 max-w-2xl mx-auto mb-8 text-sm sm:text-base">
              Join thousands of registered donors across Pakistan or post an immediate emergency requirement.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/signup"
                className="rounded-xl bg-white px-6 py-3 font-bold text-red-600 hover:bg-red-50 transition shadow"
              >
                Become a Donor
              </Link>
              <Link
                href="/request"
                className="rounded-xl bg-red-900/60 backdrop-blur-md px-6 py-3 font-bold text-white border border-white/20 hover:bg-red-900 transition"
              >
                Post Emergency Request
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}