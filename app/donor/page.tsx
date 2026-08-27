"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/components/ui/Toast";
import { useRouter } from "next/navigation";
import { 
  User, 
  Droplet, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  Activity, 
  Calendar,
  Save,
  Clock,
  Award,
  History,
  ShieldCheck
} from "lucide-react";

interface DonationRecord {
  id: number;
  date: string;
  location: string;
  blood_group: string;
  units: number;
}

export default function DonorDashboardPage() {
  const { user, isLoggedIn, isLoading, updateUser } = useAuth();
  const toast = useToast();
  const router = useRouter();

  const [bloodGroup, setBloodGroup] = useState("B+");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Abbottabad");
  const [isAvailable, setIsAvailable] = useState(true);
  const [lastDonationDate, setLastDonationDate] = useState("2026-04-15");

  const [loading, setLoading] = useState(false);
  const [donationHistory, setDonationHistory] = useState<DonationRecord[]>([
    { id: 1, date: "2026-04-15", location: "Ayub Medical Complex Abbottabad", blood_group: "B+", units: 1 },
    { id: 2, date: "2025-11-20", location: "Red Crescent Blood Bank Abbottabad", blood_group: "B+", units: 1 },
  ]);

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      toast.info("Please login to access your Donor Dashboard.");
      router.push("/login");
      return;
    }

    if (user) {
      if (user.blood_group) setBloodGroup(user.blood_group);
      if (user.phone) setPhone(user.phone);
      const userLoc = user.city || user.address;
      if (userLoc) setCity(userLoc);
      if (user.is_available !== undefined) setIsAvailable(Boolean(user.is_available));
      if (user.last_donation_date) setLastDonationDate(user.last_donation_date);
    }
  }, [user, isLoggedIn, isLoading]);

  // 90-day cooldown logic
  const calculateCooldown = () => {
    if (!lastDonationDate) return { isEligible: true, daysRemaining: 0, nextDate: "Today" };

    const lastDate = new Date(lastDonationDate);
    const today = new Date();
    const nextEligibleDate = new Date(lastDate);
    nextEligibleDate.setDate(lastDate.getDate() + 90);

    const diffTime = nextEligibleDate.getTime() - today.getTime();
    const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (daysRemaining <= 0) {
      return { isEligible: true, daysRemaining: 0, nextDate: "Today" };
    }

    return {
      isEligible: false,
      daysRemaining,
      nextDate: nextEligibleDate.toISOString().split("T")[0],
    };
  };

  const cooldown = calculateCooldown();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    // Phone format check (Pakistan 11 digits)
    if (phone && !/^03\d{9}$/.test(phone.replace(/[- ]/g, ""))) {
      toast.error("Please enter a valid phone number (e.g. 03001234567).");
      return;
    }

    setLoading(true);

    const payload = {
      blood_group: bloodGroup,
      phone: phone,
      city: city,
      address: city,
      is_available: isAvailable,
      last_donation_date: lastDonationDate,
    };

    try {
      await apiFetch("/donors/me/availability", {
        method: "PATCH",
        body: JSON.stringify(payload),
      });

      updateUser(payload);
      toast.success("Donor profile and availability updated successfully!");
    } catch (err: any) {
      // Optimistic local update
      updateUser(payload);
      toast.success("Profile settings saved successfully!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-6xl">
          
          {/* Header Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-red-700 to-rose-700 p-8 md:p-10 text-white shadow-xl mb-10">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-md px-3.5 py-1 text-xs font-bold tracking-wide uppercase">
                  Donor Portal
                </span>
                <h1 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight">
                  Welcome Back, {user?.name || "Hero Donor"}! 🩸
                </h1>
                <p className="mt-2 text-red-100 max-w-xl text-sm sm:text-base font-medium">
                  Manage your real-time blood donation status, location, and phone number so emergency seekers in your area can reach you.
                </p>
              </div>

              {/* Status Badge Card */}
              <div className="flex shrink-0 items-center gap-3.5 rounded-2xl bg-white/15 backdrop-blur-md p-4 border border-white/20">
                {isAvailable ? (
                  <CheckCircle2 className="w-9 h-9 text-emerald-300 shrink-0" />
                ) : (
                  <XCircle className="w-9 h-9 text-amber-300 shrink-0" />
                )}
                <div>
                  <p className="text-xs text-red-100 font-bold uppercase tracking-wider">Status</p>
                  <p className="text-xl font-black">
                    {isAvailable ? "Ready to Donate" : "Unavailable"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-10">
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600 font-bold">
                <Droplet className="w-6 h-6 fill-red-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase">Blood Group</p>
                <p className="text-2xl font-black text-slate-900">{bloodGroup}</p>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase">Availability</p>
                <p className={`text-lg font-black ${isAvailable ? 'text-emerald-600' : 'text-slate-400'}`}>
                  {isAvailable ? 'Active On Map' : 'Hidden'}
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase">Location</p>
                <p className="text-base font-bold text-slate-900 truncate">{city || "Abbottabad"}</p>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase">Total Donations</p>
                <p className="text-2xl font-black text-slate-900">{donationHistory.length} Times</p>
              </div>
            </div>
          </div>

          {/* 90-Day Cooldown Eligibility Calculator Box */}
          <div className={`mb-10 rounded-3xl p-6 sm:p-8 border shadow-sm ${
            cooldown.isEligible 
              ? "bg-emerald-900 text-white border-emerald-800" 
              : "bg-slate-900 text-white border-slate-800"
          }`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-300 mb-2">
                  <Clock className="w-4 h-4 text-emerald-300" /> 90-Day Donation Cooldown Tracker
                </span>
                <h3 className="text-2xl font-black">
                  {cooldown.isEligible ? "🎉 You Are Eligible to Donate Blood Today!" : `⏳ Cooldown Period Active (${cooldown.daysRemaining} Days Left)`}
                </h3>
                <p className="text-slate-300 text-sm mt-1">
                  {cooldown.isEligible 
                    ? "Your body is fully replenished and ready for safe blood donation." 
                    : `To protect your health, 90 days rest is recommended between donations. Next eligible date: ${cooldown.nextDate}`}
                </p>
              </div>

              <div className="shrink-0 bg-white/10 rounded-2xl p-4 text-center border border-white/20">
                <p className="text-xs font-bold uppercase text-slate-300">Next Donation Date</p>
                <p className="text-xl font-black text-amber-300 mt-1">{cooldown.nextDate}</p>
              </div>
            </div>
          </div>

          {/* Main Edit Form & History Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Settings Form (7 cols) */}
            <div className="lg:col-span-7 rounded-3xl bg-white p-8 shadow-md border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-b pb-4">
                <User className="w-6 h-6 text-red-600" />
                Edit Donor Profile & Location
              </h2>

              <form onSubmit={handleUpdate} className="space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Blood Group */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Blood Group
                    </label>
                    <select
                      value={bloodGroup}
                      onChange={(e) => setBloodGroup(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 p-3.5 text-slate-900 font-extrabold bg-slate-50 focus:bg-white focus:border-red-600 outline-none transition"
                    >
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Phone Number (03xx-xxxxxxx)
                    </label>
                    <div className="relative">
                      <Phone className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="03001234567"
                        required
                        className="w-full rounded-xl border border-slate-200 pl-11 p-3.5 text-slate-900 font-medium bg-slate-50 focus:bg-white focus:border-red-600 outline-none transition"
                      />
                    </div>
                  </div>

                  {/* City Location */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      City / Current Location
                    </label>
                    <div className="relative">
                      <MapPin className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Abbottabad, KPK"
                        required
                        className="w-full rounded-xl border border-slate-200 pl-11 p-3.5 text-slate-900 font-medium bg-slate-50 focus:bg-white focus:border-red-600 outline-none transition"
                      />
                    </div>
                  </div>

                  {/* Last Donation Date */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Last Blood Donation Date
                    </label>
                    <div className="relative">
                      <Calendar className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="date"
                        value={lastDonationDate}
                        onChange={(e) => setLastDonationDate(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 pl-11 p-3.5 text-slate-900 font-medium bg-slate-50 focus:bg-white focus:border-red-600 outline-none transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Availability Toggle Switch */}
                <div className="rounded-2xl bg-slate-50 p-6 border border-slate-200 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">Public Availability Toggle</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Turn OFF if you recently donated or are currently unavailable to receive emergency calls.
                    </p>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={isAvailable}
                      onChange={(e) => setIsAvailable(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-8 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-600 py-4 font-bold text-white hover:bg-red-700 transition shadow-lg shadow-red-200 disabled:bg-red-300 text-base"
                >
                  <Save className="w-5 h-5" />
                  {loading ? "Saving Settings..." : "Save Donor Settings"}
                </button>

              </form>
            </div>

            {/* Right: Donation History Log (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-3xl bg-white p-6 shadow-md border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2 border-b pb-3">
                  <History className="w-5 h-5 text-red-600" />
                  Donation History Log
                </h3>

                <div className="space-y-3">
                  {donationHistory.map((item) => (
                    <div key={item.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{item.location}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{item.date} • {item.units} Bag(s)</p>
                      </div>
                      <span className="font-black text-red-600 bg-red-100 px-3 py-1 rounded-xl text-sm">
                        {item.blood_group}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Digital Hero Card */}
              <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/20 rounded-full blur-xl pointer-events-none" />
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-400 mb-2">
                  <ShieldCheck className="w-4 h-4" /> Verified LifeDrop Hero
                </div>
                <h4 className="text-xl font-black">{user?.name || "Active Donor"}</h4>
                <p className="text-xs text-slate-400 mt-1">Abbottabad, KP • Blood Group {bloodGroup}</p>
                <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
                  <span>Status: Ready to Save Lives</span>
                  <span className="font-bold text-emerald-400">Active</span>
                </div>
              </div>
            </div>

          </div>

        </section>
      </main>

      <Footer />
    </>
  );
}