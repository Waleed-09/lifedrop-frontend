"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 py-16 px-6">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 sm:p-12 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="w-8 h-8 text-red-600" />
            <h1 className="text-3xl font-black text-slate-900">Privacy Policy</h1>
          </div>
          <p className="text-slate-500 text-xs mb-8">Last updated: July 2026</p>

          <div className="space-y-6 text-slate-600 leading-relaxed text-sm sm:text-base">
            <p>
              At LifeDrop, we prioritize the privacy and security of our donors and emergency requesters. This Privacy Policy outlines how your personal data is collected, used, and protected.
            </p>

            <h3 className="text-lg font-bold text-slate-900 mt-6">1. Information We Collect</h3>
            <p>
              We collect minimal information necessary to connect blood donors with medical emergencies, including your name, contact phone number, blood group, and city location.
            </p>

            <h3 className="text-lg font-bold text-slate-900 mt-6">2. How Your Data Is Used</h3>
            <p>
              Your contact details are used exclusively to allow emergency seekers and hospitals to reach out to you when matching blood requirements arise.
            </p>

            <h3 className="text-lg font-bold text-slate-900 mt-6">3. Control & Availability Toggle</h3>
            <p>
              You can toggle your availability ON or OFF at any time from your Donor Dashboard. When OFF, your phone number and location will be hidden from public search results.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}