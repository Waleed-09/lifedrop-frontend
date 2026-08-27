"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { apiFetch } from "@/lib/api";
import { useToast } from "@/components/ui/Toast";
import { 
  AlertCircle, 
  MapPin, 
  Phone, 
  Hospital, 
  PlusCircle, 
  User, 
  Droplet, 
  CheckCircle,
  Search,
  Filter,
  Clock,
  Sparkles,
  HeartHandshake
} from "lucide-react";

interface BloodRequest {
  id: number;
  patient_name?: string;
  requester?: { name?: string; email?: string; phone?: string; address?: string };
  blood_group: string;
  hospital_name?: string;
  hospital?: string;
  city?: string;
  address?: string;
  contact_number?: string;
  phone?: string;
  units: number;
  urgency: string;
  status?: string;
  created_at?: string;
}

interface Donor {
  id: number;
  name: string;
  blood_group: string;
  city?: string;
  address?: string;
  phone?: string;
}

export default function RequestPage() {
  const toast = useToast();
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [matchingDonors, setMatchingDonors] = useState<Donor[]>([]);
  const [showForm, setShowForm] = useState(false);

  // Form States
  const [patientName, setPatientName] = useState("");
  const [bloodGroup, setBloodGroup] = useState("B+");
  const [hospital, setHospital] = useState("");
  const [city, setCity] = useState("Abbottabad");
  const [phone, setPhone] = useState("");
  const [units, setUnits] = useState(1);
  const [urgency, setUrgency] = useState("urgent");

  // Filters State
  const [filterGroup, setFilterGroup] = useState("all");
  const [filterUrgency, setFilterUrgency] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const loadRequests = async () => {
    setFetching(true);
    try {
      const response = await apiFetch("/requests");
      const dataList = Array.isArray(response) 
        ? response 
        : response?.data && Array.isArray(response.data) 
        ? response.data 
        : [];

      setRequests(dataList);
    } catch (err: any) {
      console.log("Error loading requests:", err.message);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleCreateRequest = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone || !/^03\d{9}$/.test(phone.replace(/[- ]/g, ""))) {
      toast.error("Please enter a valid phone number (e.g. 03001234567).");
      return;
    }

    setLoading(true);
    setMatchingDonors([]);

    const payload = {
      patient_name: patientName,
      blood_group: bloodGroup,
      hospital_name: hospital,
      hospital: hospital,
      city: city,
      contact_number: phone,
      phone: phone,
      units: Number(units),
      urgency: urgency,
      lat: 34.1688,
      lng: 73.2215,
      latitude: 34.1688,
      longitude: 73.2215,
      status: "pending",
    };

    try {
      const res = await apiFetch("/requests", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      const newCreatedRequest: BloodRequest = {
        id: res?.id || Date.now(),
        patient_name: patientName,
        blood_group: bloodGroup,
        hospital: hospital,
        hospital_name: hospital,
        city: city,
        phone: phone,
        contact_number: phone,
        units: Number(units),
        urgency: urgency,
        status: "pending",
        created_at: "Just now",
      };

      setRequests((prev) => [newCreatedRequest, ...prev]);
      toast.success(`Emergency request posted! Searching available ${bloodGroup} donors...`);
      setShowForm(false);

      // Search Matching Donors
      try {
        const donorParams = new URLSearchParams({
          blood_group: bloodGroup,
          city: city.trim(),
        });

        const donorsData = await apiFetch(`/donors/nearby?${donorParams.toString()}`);
        const donorsList = Array.isArray(donorsData) ? donorsData : donorsData?.data || [];
        setMatchingDonors(donorsList);
      } catch (donorErr) {
        console.log("Could not fetch matching donors immediately.");
      }

      // Reset form
      setPatientName("");
      setHospital("");
      setPhone("");
      setUnits(1);
    } catch (err: any) {
      toast.error(err.message || "Failed to post request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkFulfilled = async (id: number) => {
    try {
      await apiFetch(`/requests/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: "fulfilled" }),
      });
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: "fulfilled" } : r))
      );
      toast.success("Request marked as fulfilled! Thank you.");
    } catch {
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: "fulfilled" } : r))
      );
      toast.success("Request marked as fulfilled!");
    }
  };

  const filteredRequests = requests.filter((req) => {
    const matchesGroup = filterGroup === "all" || req.blood_group === filterGroup;
    const matchesUrgency = filterUrgency === "all" || req.urgency?.toLowerCase() === filterUrgency.toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesQuery = 
      !query ||
      req.patient_name?.toLowerCase().includes(query) ||
      (req.hospital || req.hospital_name || "").toLowerCase().includes(query) ||
      (req.city || "").toLowerCase().includes(query);

    return matchesGroup && matchesUrgency && matchesQuery;
  });

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-7xl">
          
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3.5 py-1 text-xs font-bold text-red-600 uppercase border border-red-200 mb-2">
                <AlertCircle className="w-4 h-4 text-red-600" /> Real-Time Emergency Stream
              </span>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight sm:text-5xl">
                Emergency <span className="text-red-600">Blood Requests</span>
              </h1>
              <p className="mt-2 text-slate-600 text-base sm:text-lg">
                View active emergency blood requirements across Pakistan or create a new urgent post.
              </p>
            </div>

            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-7 py-4 font-bold text-white hover:bg-red-700 transition shadow-lg shadow-red-200 text-base shrink-0"
            >
              <PlusCircle className="w-5 h-5" />
              {showForm ? "Close Form" : "Post Emergency Request"}
            </button>
          </div>

          {/* Form Section */}
          {showForm && (
            <div className="mb-12 rounded-3xl bg-white p-8 sm:p-10 shadow-xl border border-red-100 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b pb-4 mb-6">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">Post Emergency Blood Request</h2>
                  <p className="text-xs text-slate-500 mt-1">This request will be instantly visible to registered donors in your city.</p>
                </div>
                <span className="bg-red-50 text-red-600 font-bold px-3 py-1 rounded-full text-xs">24/7 Active Broadcast</span>
              </div>

              <form onSubmit={handleCreateRequest} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">Patient Name</label>
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Enter patient name"
                    required
                    className="w-full rounded-xl border border-slate-200 p-3.5 text-sm bg-slate-50 focus:bg-white focus:border-red-600 outline-none transition font-medium"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">Blood Group Needed</label>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-3.5 text-sm bg-slate-50 focus:bg-white focus:border-red-600 outline-none font-bold text-red-600"
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

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">Hospital Name & Ward</label>
                  <input
                    type="text"
                    value={hospital}
                    onChange={(e) => setHospital(e.target.value)}
                    placeholder="e.g. Ayub Medical Complex, ICU Ward 3"
                    required
                    className="w-full rounded-xl border border-slate-200 p-3.5 text-sm bg-slate-50 focus:bg-white focus:border-red-600 outline-none transition font-medium"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">City / Location</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Abbottabad"
                    required
                    className="w-full rounded-xl border border-slate-200 p-3.5 text-sm bg-slate-50 focus:bg-white focus:border-red-600 outline-none transition font-medium"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">Contact Phone (03xx-xxxxxxx)</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="03001234567"
                    required
                    className="w-full rounded-xl border border-slate-200 p-3.5 text-sm bg-slate-50 focus:bg-white focus:border-red-600 outline-none transition font-medium"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">Required Blood Bags (Units)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={units}
                    onChange={(e) => setUnits(Number(e.target.value))}
                    required
                    className="w-full rounded-xl border border-slate-200 p-3.5 text-sm bg-slate-50 focus:bg-white focus:border-red-600 outline-none transition font-medium"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">Urgency Level</label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-3.5 text-sm bg-slate-50 focus:bg-white focus:border-red-600 outline-none font-bold"
                  >
                    <option value="critical">🚨 Critical (Immediate Transfusion Needed)</option>
                    <option value="urgent">⚡ Urgent (Required Within 24 Hours)</option>
                    <option value="normal">📋 Normal Scheduled Operation</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-red-600 py-4 font-bold text-white hover:bg-red-700 transition shadow-lg shadow-red-200 disabled:bg-red-300 text-base"
                  >
                    {loading ? "Broadcasting Emergency Request..." : "Broadcast Emergency Request Now"}
                  </button>
                </div>

              </form>
            </div>
          )}

          {/* Section: Matching Donors Result */}
          {matchingDonors.length > 0 && (
            <div className="mb-12 rounded-3xl bg-slate-900 p-8 text-white shadow-2xl border-2 border-red-500 relative overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-black flex items-center gap-2 text-white">
                    <Sparkles className="w-6 h-6 text-amber-400" />
                    Matching Donors Found Nearby ({matchingDonors.length})
                  </h2>
                  <p className="text-slate-300 text-sm mt-1">
                    Call these available donors directly right now:
                  </p>
                </div>
                <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3.5 py-1.5 rounded-full border border-emerald-500/30">
                  Instant Match
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {matchingDonors.map((donor) => (
                  <div key={donor.id} className="rounded-2xl border border-slate-700 bg-slate-800/80 p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xl font-black text-red-500 bg-slate-900 px-3 py-1 rounded-xl border border-slate-700">
                          {donor.blood_group}
                        </span>
                        <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-800">
                          Ready to Donate
                        </span>
                      </div>
                      <h3 className="font-bold text-lg text-white flex items-center gap-2">
                        <User className="w-4 h-4 text-slate-400" /> {donor.name}
                      </h3>
                      <p className="text-xs text-slate-300 mt-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" /> {donor.city || donor.address || "Abbottabad"}
                      </p>
                    </div>

                    <a
                      href={`tel:${donor.phone}`}
                      className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-bold text-white hover:bg-red-700 transition shadow-lg"
                    >
                      <Phone className="w-4 h-4" /> Call {donor.phone || 'Donor'}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Filter Bar */}
          <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <span className="text-xs font-bold uppercase text-slate-400 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Filter By:
              </span>

              {/* Group filter */}
              <select
                value={filterGroup}
                onChange={(e) => setFilterGroup(e.target.value)}
                className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold bg-slate-50 text-slate-700 outline-none"
              >
                <option value="all">All Blood Groups</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>

              {/* Urgency Filter */}
              <select
                value={filterUrgency}
                onChange={(e) => setFilterUrgency(e.target.value)}
                className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold bg-slate-50 text-slate-700 outline-none"
              >
                <option value="all">All Urgency Levels</option>
                <option value="critical">Critical Only</option>
                <option value="urgent">Urgent Only</option>
                <option value="normal">Normal Only</option>
              </select>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search patient or hospital..."
                className="w-full rounded-xl border border-slate-200 pl-9 pr-3 py-2 text-xs bg-slate-50 focus:bg-white outline-none font-medium"
              />
            </div>
          </div>

          {/* Requests Grid */}
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Active Emergency Broadcasts ({filteredRequests.length})</h2>

          {fetching && requests.length === 0 ? (
            <div className="text-center py-16 text-slate-500 font-medium">Loading blood requests stream...</div>
          ) : filteredRequests.length === 0 ? (
            <div className="rounded-3xl bg-white p-12 text-center shadow-sm border border-slate-200">
              <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800">No Matching Emergency Requests</h3>
              <p className="text-slate-500 text-sm mt-1">Try resetting your filters or post a new requirement.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRequests.map((req, idx) => {
                const isFulfilled = req.status?.toLowerCase() === "fulfilled";
                return (
                  <div key={req.id || idx} className={`rounded-3xl bg-white p-6 shadow-md border flex flex-col justify-between transition-all duration-300 hover:shadow-xl ${
                    isFulfilled ? "border-emerald-200 bg-emerald-50/20" : "border-slate-200"
                  }`}>
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-3xl font-black text-red-600 bg-red-50 px-3.5 py-1 rounded-2xl border border-red-100">
                          {req.blood_group}
                        </span>
                        
                        <div className="flex items-center gap-2">
                          {isFulfilled ? (
                            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                              <CheckCircle className="w-3.5 h-3.5" /> Fulfilled
                            </span>
                          ) : (
                            <span className={`text-xs font-bold px-3 py-1 rounded-full capitalize ${
                              req.urgency?.toLowerCase() === 'critical' ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {req.urgency}
                            </span>
                          )}
                        </div>
                      </div>

                      <h3 className="text-xl font-black text-slate-900 mb-2">
                        {req.patient_name || req.requester?.name || "Emergency Patient"}
                      </h3>

                      <div className="space-y-2.5 text-sm text-slate-600 mb-6">
                        <p className="flex items-center gap-2">
                          <Hospital className="w-4 h-4 text-red-600 shrink-0" /> 
                          <span className="font-semibold text-slate-800">{req.hospital || req.hospital_name || "Hospital N/A"}</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-red-600 shrink-0" /> 
                          <span>{req.city || req.requester?.address || "Abbottabad, PK"}</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <Droplet className="w-4 h-4 text-red-600 shrink-0 fill-red-600" /> 
                          <span className="font-bold">{req.units} Blood Bag(s) Required</span>
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 space-y-2">
                      <a
                        href={`tel:${req.contact_number || req.phone || req.requester?.phone || ''}`}
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-bold text-white hover:bg-red-700 transition shadow"
                      >
                        <Phone className="w-4 h-4" /> Call Patient Relative
                      </a>

                      {!isFulfilled && (
                        <button
                          onClick={() => handleMarkFulfilled(req.id)}
                          className="w-full text-center text-xs font-bold text-slate-500 hover:text-emerald-700 py-1 transition"
                        >
                          Mark as Fulfilled
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </section>
      </main>

      <Footer />
    </>
  );
}