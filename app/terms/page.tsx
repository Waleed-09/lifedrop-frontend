"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 py-16 px-6">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 sm:p-12 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-8 h-8 text-red-600" />
            <h1 className="text-3xl font-black text-slate-900">Terms of Service</h1>
          </div>
          <p className="text-slate-500 text-xs mb-8">Last updated: July 2026</p>

          <div className="space-y-6 text-slate-600 leading-relaxed text-sm sm:text-base">
            <p>
              By accessing or using LifeDrop, you agree to comply with and be bound by the following terms and conditions.
            </p>

            <h3 className="text-lg font-bold text-slate-900 mt-6">1. Free Community Service</h3>
            <p>
              LifeDrop is a 100% free non-profit platform designed for voluntary blood donation coordination. No monetary transactions or fees are permitted on this platform.
            </p>

            <h3 className="text-lg font-bold text-slate-900 mt-6">2. Accurate Information</h3>
            <p>
              Users must provide accurate information regarding their blood group and contact details. Posting fake emergency requests or spamming donors is strictly prohibited and will result in account suspension.
            </p>

            <h3 className="text-lg font-bold text-slate-900 mt-6">3. Medical Disclaimer</h3>
            <p>
              LifeDrop connects donors with seekers but does not perform medical screening. Standard medical protocols and blood testing must be conducted at accredited hospitals prior to donation.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}