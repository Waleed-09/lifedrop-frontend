"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BloodCompatibilityMatrix from "@/components/home/BloodCompatibilityMatrix";
import { apiFetch } from "@/lib/api";
import { useToast } from "@/components/ui/Toast";
import { Search, MapPin, Phone, User, AlertCircle, CheckCircle2, Droplet, Sparkles, Filter, Calendar } from "lucide-react";

interface Donor {
  id: number;
  name: string;
  blood_group: string;
  city?: string;
  address?: string;
  phone?: string;
  is_available?: boolean | number;
  last_donation_date?: string;
  is_verified?: boolean;
}

const pakistanCities = [
  "Abbottabad",
  "Islamabad",
  "Rawalpindi",
  "Peshawar",
  "Lahore",
  "Karachi",
  "Buner",
  "Swat",
  "Mansehra",
  "Mardan",
  "Multan",
  "Faisalabad",
  "Quetta",
];

export default function SearchDonorsPage() {
  const toast = useToast();
  const [bloodGroup, setBloodGroup] = useState("B+");
  const [city, setCity] = useState("Abbottabad");
  const [availableOnly, setAvailableOnly] = useState(true);
  const [donors, setDonors] = useState<Donor[]>([]);
  const [showMatrix, setShowMatrix] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setSearched(true);

    try {
      const params = new URLSearchParams({
        blood_group: bloodGroup,
        city: city.trim(),
        lat: "34.1688",
        lng: "73.2215",
        latitude: "34.1688",
        longitude: "73.2215",
      });

      const response = await apiFetch(`/donors/nearby?${params.toString()}`);
      const dataList = Array.isArray(response) 
        ? response 
        : response?.data && Array.isArray(response.data) 
        ? response.data 
        : [];

      setDonors(dataList);
    } catch (err: any) {
      toast.error(err.message || "Could not fetch live donors list.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const filteredDonors = donors.filter((d) => {
    if (availableOnly && d.is_available === false) return false;
    return true;
  });

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-7xl">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3.5 py-1 text-xs font-bold text-red-600 uppercase border border-red-200 mb-3">
              <Droplet className="w-4 h-4 fill-red-600" /> Real-Time Donor Matcher
            </span>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight sm:text-5xl">
              Find Verified <span className="text-red-600">Blood Donors</span>
            </h1>
            <p className="mt-3 text-slate-600 text-base sm:text-lg">
              Search active blood donors in your area and call them directly during emergencies.
            </p>

            <button
              onClick={() => setShowMatrix(!showMatrix)}
              className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 px-4 py-2 rounded-xl border border-red-100 transition"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              {showMatrix ? "Hide Compatibility Calculator" : "Check Compatible Blood Groups"}
            </button>
          </div>

          {/* Optional Interactive Matrix Drawer */}
          {showMatrix && (
            <div className="mb-10 animate-in fade-in duration-300">
              <BloodCompatibilityMatrix />
            </div>
          )}

          {/* Search Card */}
          <div className="mb-10 rounded-3xl bg-white p-6 sm:p-8 shadow-xl border border-slate-200">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-5 items-end">
              
              {/* Blood Group Select */}
              <div className="md:col-span-4">
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Select Required Blood Group
                </label>
                <div className="relative">
                  <Droplet className="w-5 h-5 text-red-600 absolute left-3.5 top-3.5 fill-red-600" />
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 pl-11 p-3.5 text-slate-900 font-black text-lg bg-slate-50 focus:bg-white focus:border-red-600 outline-none transition"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O- (Universal Donor)</option>
                    <option value="AB+">AB+ (Universal Recipient)</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
              </div>

              {/* City Selector */}
              <div className="md:col-span-5">
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
                  City / Location Search
                </label>
                <div className="relative">
                  <MapPin className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    list="city-options"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Abbottabad, Peshawar..."
                    className="w-full rounded-2xl border border-slate-200 pl-11 p-3.5 text-slate-900 font-bold bg-slate-50 focus:bg-white focus:border-red-600 outline-none transition text-base"
                  />
                  <datalist id="city-options">
                    {pakistanCities.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </div>
              </div>

              {/* Search Button */}
              <div className="md:col-span-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-red-600 py-4 font-extrabold text-white hover:bg-red-700 transition shadow-lg shadow-red-200 disabled:bg-red-300 text-base"
                >
                  <Search className="w-5 h-5" />
                  {loading ? "Searching..." : "Find Donors"}
                </button>
              </div>

            </form>

            {/* Quick Filter Bar */}
            <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={availableOnly}
                  onChange={(e) => setAvailableOnly(e.target.checked)}
                  className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
                />
                <span>Show "Ready to Donate" Donors Only</span>
              </label>

              <span className="text-xs text-slate-400 font-medium">
                Found {filteredDonors.length} active donor(s)
              </span>
            </div>
          </div>

          {/* Results Grid */}
          {loading ? (
            <div className="text-center py-20 text-slate-500 font-bold text-lg">
              Searching verified donors in {city}...
            </div>
          ) : searched && filteredDonors.length === 0 ? (
            <div className="rounded-3xl bg-white p-12 text-center shadow-sm border border-slate-200">
              <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-slate-800">No Donors Found for {bloodGroup} in {city}</h3>
              <p className="text-slate-500 text-sm mt-1">
                Try searching for a nearby city or check compatible blood groups above.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDonors.map((donor) => (
                <div 
                  key={donor.id} 
                  className="rounded-3xl bg-white p-6 shadow-md border border-slate-200 flex flex-col justify-between hover:shadow-xl hover:border-red-300 transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-black text-red-600 bg-red-50 px-4 py-1 rounded-2xl border border-red-100">
                        {donor.blood_group}
                      </span>
                      
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Available Now
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-slate-900 mb-2 flex items-center gap-2">
                      <User className="w-5 h-5 text-slate-400" />
                      {donor.name}
                    </h3>

                    <div className="space-y-2 text-sm text-slate-600 mb-6">
                      <p className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                        <span className="font-semibold">{donor.city || donor.address || "Abbottabad, PK"}</span>
                      </p>
                      {donor.last_donation_date && (
                        <p className="flex items-center gap-2 text-xs text-slate-400">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>Last Donated: {donor.last_donation_date}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <a
                    href={`tel:${donor.phone || '03000000000'}`}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-red-600 py-3.5 font-bold text-white hover:bg-red-700 transition shadow-md shadow-red-200 text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    Call {donor.phone || 'Donor'}
                  </a>
                </div>
              ))}
            </div>
          )}

        </section>
      </main>

      <Footer />
    </>
  );
}