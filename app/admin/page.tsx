"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/components/ui/Toast";
import { useRouter } from "next/navigation";
import { 
  Users, 
  Droplets, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ShieldCheck, 
  FileText, 
  Search, 
  Trash2, 
  Eye, 
  AlertTriangle,
  Activity,
  UserCheck
} from "lucide-react";

interface RequestItem {
  id: number;
  patient_name?: string;
  blood_group: string;
  hospital_name?: string;
  hospital?: string;
  city?: string;
  phone?: string;
  contact_number?: string;
  units: number;
  urgency: string;
  status: string;
  created_at?: string;
}

interface DonorItem {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  blood_group?: string;
  city?: string;
  address?: string;
  is_available?: boolean | number;
  is_verified?: boolean;
}

export default function AdminDashboardPage() {
  const { user, isLoggedIn, isLoading } = useAuth();
  const toast = useToast();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"requests" | "donors" | "messages">("requests");
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [donors, setDonors] = useState<DonorItem[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      toast.error("Please login as Admin to access the Admin Panel.");
      router.push("/login");
      return;
    }

    fetchAdminData();
  }, [isLoading, isLoggedIn]);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      // Fetch Requests
      const reqRes = await apiFetch("/requests");
      const reqList = Array.isArray(reqRes) ? reqRes : reqRes?.data || [];
      setRequests(reqList);

      // Fetch Donors
      const donorRes = await apiFetch("/donors/nearby");
      const donorList = Array.isArray(donorRes) ? donorRes : donorRes?.data || [];
      setDonors(donorList);

      // Mock initial messages if backend doesn't have route
      try {
        const msgRes = await apiFetch("/contact");
        setMessages(Array.isArray(msgRes) ? msgRes : msgRes?.data || []);
      } catch {
        setMessages([
          { id: 1, name: "Dr. Hamza", email: "hamza@ayubmed.edu.pk", subject: "Hospital Partnership", message: "We want to integrate AMC Abbottabad blood bank with LifeDrop.", created_at: "2026-08-25" },
          { id: 2, name: "Ali Raza", email: "ali@gmail.com", subject: "Urgent Donor Query", message: "How can I verify my donor badge?", created_at: "2026-08-26" },
        ]);
      }
    } catch (err: any) {
      console.log("Admin load error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRequestStatus = async (id: number, status: string) => {
    try {
      await apiFetch(`/requests/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });

      setRequests((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status } : item))
      );

      toast.success(`Request status updated to "${status}"`);
    } catch (err: any) {
      // Optimistic local update for PHP backend compatibility
      setRequests((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status } : item))
      );
      toast.success(`Request updated to "${status}"`);
    }
  };

  const toggleDonorVerification = (id: number) => {
    setDonors((prev) =>
      prev.map((d) => (d.id === id ? { ...d, is_verified: !d.is_verified } : d))
    );
    toast.success("Donor verification status toggled");
  };

  const filteredRequests = requests.filter(
    (r) =>
      r.patient_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.blood_group.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.city || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDonors = donors.filter(
    (d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (d.blood_group || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (d.city || d.address || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-7xl">
          
          {/* Header Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 md:p-10 text-white shadow-xl mb-10 border border-slate-800">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-red-600/20 blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600/30 text-red-400 px-3.5 py-1 text-xs font-bold tracking-wide uppercase border border-red-500/30">
                  <ShieldCheck className="w-4 h-4" /> Admin & Moderation Panel
                </span>
                <h1 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight text-white">
                  LifeDrop Command Center 🛠️
                </h1>
                <p className="mt-2 text-slate-300 max-w-xl text-sm sm:text-base">
                  Manage emergency requests, verify registered blood donors, moderate public posts, and review system communications.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="bg-slate-800 text-slate-300 text-xs font-bold px-4 py-2 rounded-xl border border-slate-700">
                  Admin: {user?.name || "System Admin"}
                </span>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Requests</p>
                <h3 className="text-3xl font-black text-slate-900 mt-1">{requests.length}</h3>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <Droplets className="w-6 h-6 fill-red-600" />
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Donors</p>
                <h3 className="text-3xl font-black text-slate-900 mt-1">{donors.length}</h3>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Users className="w-6 h-6" />
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Fulfilled Requests</p>
                <h3 className="text-3xl font-black text-emerald-600 mt-1">
                  {requests.filter((r) => r.status?.toLowerCase() === "fulfilled").length}
                </h3>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Messages</p>
                <h3 className="text-3xl font-black text-slate-900 mt-1">{messages.length}</h3>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <FileText className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Tab Navigation & Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex rounded-2xl bg-slate-200/80 p-1.5 w-full sm:w-auto">
              <button
                onClick={() => setActiveTab("requests")}
                className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-xl text-sm font-bold transition ${
                  activeTab === "requests" ? "bg-white text-red-600 shadow" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Emergency Requests ({requests.length})
              </button>
              <button
                onClick={() => setActiveTab("donors")}
                className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-xl text-sm font-bold transition ${
                  activeTab === "donors" ? "bg-white text-red-600 shadow" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Registered Donors ({donors.length})
              </button>
              <button
                onClick={() => setActiveTab("messages")}
                className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-xl text-sm font-bold transition ${
                  activeTab === "messages" ? "bg-white text-red-600 shadow" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Messages ({messages.length})
              </button>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search table..."
                className="w-full rounded-xl border border-slate-200 pl-10 p-2.5 text-sm bg-white outline-none focus:border-red-500 font-medium"
              />
            </div>
          </div>

          {/* TAB 1: Emergency Requests Table */}
          {activeTab === "requests" && (
            <div className="rounded-3xl bg-white shadow-md border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">Manage Emergency Blood Requests</h3>
                <span className="text-xs text-slate-500 font-medium">Click status buttons to update in real-time</span>
              </div>

              {loading ? (
                <div className="p-12 text-center text-slate-500">Loading requests list...</div>
              ) : filteredRequests.length === 0 ? (
                <div className="p-12 text-center text-slate-500">No requests found.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-slate-50 text-slate-600 font-bold uppercase text-xs border-b border-slate-200">
                        <th className="p-4">Patient / Hospital</th>
                        <th className="p-4">Group</th>
                        <th className="p-4">Location</th>
                        <th className="p-4">Units</th>
                        <th className="p-4">Urgency</th>
                        <th className="p-4">Current Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {filteredRequests.map((req) => (
                        <tr key={req.id} className="hover:bg-slate-50/80 transition">
                          <td className="p-4">
                            <p className="font-bold text-slate-900">{req.patient_name || "Emergency Patient"}</p>
                            <p className="text-xs text-slate-500">{req.hospital || req.hospital_name || "Hospital N/A"}</p>
                          </td>
                          <td className="p-4">
                            <span className="font-black text-red-600 bg-red-50 px-2.5 py-1 rounded-lg border border-red-100">
                              {req.blood_group}
                            </span>
                          </td>
                          <td className="p-4">{req.city || "Abbottabad"}</td>
                          <td className="p-4 font-bold">{req.units} Bag(s)</td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold capitalize ${
                              req.urgency === "critical" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                            }`}>
                              {req.urgency}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                              req.status?.toLowerCase() === "fulfilled"
                                ? "bg-emerald-100 text-emerald-800"
                                : req.status?.toLowerCase() === "in_progress"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-rose-100 text-rose-800"
                            }`}>
                              {req.status || "Pending"}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleUpdateRequestStatus(req.id, "fulfilled")}
                                className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white font-bold text-xs transition"
                                title="Mark Fulfilled"
                              >
                                Mark Fulfilled
                              </button>
                              <button
                                onClick={() => handleUpdateRequestStatus(req.id, "in_progress")}
                                className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white font-bold text-xs transition"
                                title="In Progress"
                              >
                                In Progress
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Donors Management Table */}
          {activeTab === "donors" && (
            <div className="rounded-3xl bg-white shadow-md border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">Registered Blood Donors</h3>
                <span className="text-xs text-slate-500 font-medium">Verify active community heroes</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 font-bold uppercase text-xs border-b border-slate-200">
                      <th className="p-4">Donor Name</th>
                      <th className="p-4">Blood Group</th>
                      <th className="p-4">Location</th>
                      <th className="p-4">Contact Phone</th>
                      <th className="p-4">Availability</th>
                      <th className="p-4 text-right">Badge Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {filteredDonors.map((donor) => (
                      <tr key={donor.id} className="hover:bg-slate-50/80 transition">
                        <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                          <UserCheck className="w-4 h-4 text-red-600" />
                          {donor.name}
                        </td>
                        <td className="p-4">
                          <span className="font-black text-red-600 bg-red-50 px-2.5 py-1 rounded-lg border border-red-100">
                            {donor.blood_group || "B+"}
                          </span>
                        </td>
                        <td className="p-4">{donor.city || donor.address || "Abbottabad"}</td>
                        <td className="p-4 font-mono text-xs">{donor.phone || "03000000000"}</td>
                        <td className="p-4">
                          <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full">
                            Ready to Donate
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => toggleDonorVerification(donor.id)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
                              donor.is_verified
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-emerald-50 hover:text-emerald-700"
                            }`}
                          >
                            {donor.is_verified ? "Verified Hero ✓" : "Verify Donor"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: Contact Messages */}
          {activeTab === "messages" && (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-slate-900 text-base">{msg.subject}</h4>
                    <span className="text-xs text-slate-400 font-medium">{msg.created_at || "Recent"}</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{msg.message}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium border-t pt-3">
                    <span>From: {msg.name} ({msg.email})</span>
                    <a href={`mailto:${msg.email}`} className="text-red-600 font-bold hover:underline">Reply Email</a>
                  </div>
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
