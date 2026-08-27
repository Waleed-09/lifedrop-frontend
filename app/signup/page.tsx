"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/components/ui/Toast";
import { HeartPulse, User, Mail, Phone, MapPin, Lock, UserPlus, ArrowLeft, Droplet } from "lucide-react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bloodGroup, setBloodGroup] = useState("A+");
  const [address, setAddress] = useState("Abbottabad");
  const [role, setRole] = useState("donor");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    if (password !== passwordConfirmation) {
      toast.error("Passwords do not match!");
      return;
    }

    if (phone && !/^03\d{9}$/.test(phone.replace(/[- ]/g, ""))) {
      toast.error("Please enter a valid Pakistani phone number (e.g. 03001234567).");
      return;
    }

    setLoading(true);

    try {
      const data = await apiFetch("/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          phone,
          blood_group: bloodGroup,
          address,
          city: address,
          role,
          password,
          password_confirmation: passwordConfirmation,
          latitude: 34.1688,
          longitude: 73.2215,
        }),
      });

      if (data.token) {
        login(data.token, data.user);
        toast.success("Account created successfully! Welcome to LifeDrop.");
        router.push("/donor");
      } else {
        toast.success("Account created successfully! Please login.");
        router.push("/login");
      }
    } catch (err: any) {
      toast.error(err.message || "Registration failed. Please check inputs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 via-slate-50 to-red-100 px-4 py-12">
      <div className="w-full max-w-xl rounded-3xl bg-white p-8 sm:p-10 shadow-2xl border border-slate-100 relative">
        
        <Link href="/" className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-red-600 mb-6 transition">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-red-600 text-white shadow-lg shadow-red-200 mb-4">
            <HeartPulse className="w-8 h-8 animate-pulse" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Create LifeDrop Account
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Join thousands of active heroes saving lives across Pakistan
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700">Full Name</label>
            <div className="relative">
              <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Muhammad Waleed"
                required
                className="w-full rounded-xl border border-slate-200 pl-11 p-3.5 text-sm bg-slate-50 focus:bg-white focus:border-red-600 outline-none transition font-medium"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700">Email Address</label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="waleed@example.com"
                required
                className="w-full rounded-xl border border-slate-200 pl-11 p-3.5 text-sm bg-slate-50 focus:bg-white focus:border-red-600 outline-none transition font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700">Phone (03xx-xxxxxxx)</label>
              <div className="relative">
                <Phone className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="03001234567"
                  required
                  className="w-full rounded-xl border border-slate-200 pl-11 p-3.5 text-sm bg-slate-50 focus:bg-white focus:border-red-600 outline-none transition font-medium"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700">Blood Group</label>
              <div className="relative">
                <Droplet className="w-5 h-5 text-red-600 absolute left-3.5 top-3.5 fill-red-600" />
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 pl-11 p-3.5 text-sm bg-slate-50 focus:bg-white focus:border-red-600 outline-none font-bold text-red-600"
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
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700">City / Station</label>
            <div className="relative">
              <MapPin className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. Abbottabad"
                required
                className="w-full rounded-xl border border-slate-200 pl-11 p-3.5 text-sm bg-slate-50 focus:bg-white focus:border-red-600 outline-none transition font-medium"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700">Account Type</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-xl border border-slate-200 p-3.5 text-sm bg-slate-50 focus:bg-white focus:border-red-600 outline-none font-bold"
            >
              <option value="donor">Voluntary Blood Donor</option>
              <option value="recipient">Patient / Requester</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700">Password</label>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 chars"
                  required
                  className="w-full rounded-xl border border-slate-200 pl-11 p-3.5 text-sm bg-slate-50 focus:bg-white focus:border-red-600 outline-none transition font-medium"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700">Confirm Password</label>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  placeholder="Confirm password"
                  required
                  className="w-full rounded-xl border border-slate-200 pl-11 p-3.5 text-sm bg-slate-50 focus:bg-white focus:border-red-600 outline-none transition font-medium"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-600 py-4 font-bold text-white hover:bg-red-700 transition shadow-lg shadow-red-200 disabled:bg-red-300 text-base mt-2"
          >
            <UserPlus className="w-5 h-5" />
            {loading ? "Creating Account..." : "Create Free Account"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-600 font-medium">
          Already registered?{" "}
          <Link
            href="/login"
            className="font-extrabold text-red-600 hover:underline"
          >
            Login Here
          </Link>
        </p>

      </div>
    </main>
  );
}