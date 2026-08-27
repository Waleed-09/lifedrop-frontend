"use client";

import { useState } from "react";
import { Droplet, Check, ShieldAlert, Sparkles, HeartHandshake } from "lucide-react";

interface BloodInfo {
  type: string;
  giveTo: string[];
  receiveFrom: string[];
  description: string;
}

const bloodData: Record<string, BloodInfo> = {
  "O-": {
    type: "O-",
    giveTo: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    receiveFrom: ["O-"],
    description: "Universal Donor! O- negative red blood cells can be given to patients of any blood type in emergencies.",
  },
  "O+": {
    type: "O+",
    giveTo: ["O+", "A+", "B+", "AB+"],
    receiveFrom: ["O+", "O-"],
    description: "Most common blood group. High demand in emergency rooms for trauma patients.",
  },
  "A-": {
    type: "A-",
    giveTo: ["A+", "A-", "AB+", "AB-"],
    receiveFrom: ["A-", "O-"],
    description: "A- can receive red blood cells from A- and O- donors.",
  },
  "A+": {
    type: "A+",
    giveTo: ["A+", "AB+"],
    receiveFrom: ["A+", "A-", "O+", "O-"],
    description: "One of the most frequent blood types. A+ can donate to A+ and AB+ recipients.",
  },
  "B-": {
    type: "B-",
    giveTo: ["B+", "B-", "AB+", "AB-"],
    receiveFrom: ["B-", "O-"],
    description: "Rare blood type! Essential for patients with B- or AB- blood types.",
  },
  "B+": {
    type: "B+",
    giveTo: ["B+", "AB+"],
    receiveFrom: ["B+", "B-", "O+", "O-"],
    description: "Very active group in Pakistan. Can receive blood from both B and O groups.",
  },
  "AB-": {
    type: "AB-",
    giveTo: ["AB+", "AB-"],
    receiveFrom: ["AB-", "A-", "B-", "O-"],
    description: "Rarest blood group! Only 1% of population has AB- blood.",
  },
  "AB+": {
    type: "AB+",
    giveTo: ["AB+"],
    receiveFrom: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    description: "Universal Recipient! Patients with AB+ blood can receive red blood cells from any blood group.",
  },
};

const allTypes = ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"];

export default function BloodCompatibilityMatrix() {
  const [selectedType, setSelectedType] = useState<string>("B+");
  const info = bloodData[selectedType];

  return (
    <section className="bg-slate-900 py-20 text-white relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-red-600/20 backdrop-blur-md px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-red-400 border border-red-500/30 mb-4">
            <Sparkles className="w-4 h-4 text-amber-400" /> Interactive Medical Tool
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Blood Compatibility Matrix
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Select your blood group below to instantly check donor-recipient compatibility rules.
          </p>
        </div>

        {/* Blood Group Selector Chips */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {allTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl font-black text-lg transition-all duration-200 transform ${
                selectedType === type
                  ? "bg-red-600 text-white shadow-xl shadow-red-900/50 scale-105 ring-4 ring-red-400/40"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700"
              }`}
            >
              <Droplet className={`w-5 h-5 ${selectedType === type ? "fill-white" : "text-red-500"}`} />
              {type}
            </button>
          ))}
        </div>

        {/* Compatibility Output Card */}
        <div className="rounded-3xl bg-slate-800/90 border border-slate-700/80 p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Col: Summary & Facts */}
            <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-slate-700/80 pb-8 lg:pb-0 lg:pr-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl sm:text-5xl font-black text-red-500 bg-red-950/60 px-5 py-2 rounded-2xl border border-red-800/60">
                  {info.type}
                </span>
                <div>
                  <h3 className="text-xl font-extrabold text-white">Blood Group {info.type}</h3>
                  <p className="text-xs text-red-400 font-bold uppercase tracking-wider">Clinical Specifications</p>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-6 font-medium">
                {info.description}
              </p>

              <div className="rounded-2xl bg-slate-900/80 p-4 border border-slate-700 flex items-center gap-3">
                <ShieldAlert className="w-6 h-6 text-amber-400 shrink-0" />
                <p className="text-xs text-slate-300 leading-snug">
                  Always verify compatibility at hospital laboratories prior to transfusion.
                </p>
              </div>
            </div>

            {/* Right Col: Compatibility Chips */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Can Give To */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-emerald-400" />
                  Can Donate Blood To:
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {allTypes.map((t) => {
                    const canGive = info.giveTo.includes(t);
                    return (
                      <span
                        key={t}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                          canGive
                            ? "bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 shadow-sm"
                            : "bg-slate-900/40 text-slate-600 border border-slate-800 line-through opacity-50"
                        }`}
                      >
                        {canGive && <Check className="w-4 h-4 text-emerald-400" />}
                        {t}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Can Receive From */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                  <Droplet className="w-4 h-4 text-blue-400 fill-blue-400" />
                  Can Receive Blood From:
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {allTypes.map((t) => {
                    const canReceive = info.receiveFrom.includes(t);
                    return (
                      <span
                        key={t}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                          canReceive
                            ? "bg-blue-950/80 text-blue-300 border border-blue-700/60 shadow-sm"
                            : "bg-slate-900/40 text-slate-600 border border-slate-800 line-through opacity-50"
                        }`}
                      >
                        {canReceive && <Check className="w-4 h-4 text-blue-400" />}
                        {t}
                      </span>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
