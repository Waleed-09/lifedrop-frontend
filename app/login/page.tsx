"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/components/ui/Toast";
import { HeartPulse, Mail, Lock, LogIn, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (data.token) {
        login(data.token, data.user);
        toast.success(`Welcome back, ${data.user?.name || "Hero"}!`);

        if (data.user?.role === "admin" || email.toLowerCase().includes("admin")) {
          router.push("/admin");
        } else {
          router.push("/donor");
        }
      } else {
        toast.error("Token not received from server.");
      }
    } catch (err: any) {
      toast.error(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 via-slate-50 to-red-100 px-4 py-12">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 sm:p-10 shadow-2xl border border-slate-100 relative">
        
        <Link href="/" className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-red-600 mb-6 transition">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-red-600 text-white shadow-lg shadow-red-200 mb-4">
            <HeartPulse className="w-8 h-8 animate-pulse" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Login to your LifeDrop donor account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">Email Address</label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. waleed@example.com"
                required
                className="w-full rounded-xl border border-slate-200 pl-11 p-3.5 text-sm bg-slate-50 focus:bg-white focus:border-red-600 outline-none transition font-medium"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">Password</label>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="w-full rounded-xl border border-slate-200 pl-11 p-3.5 text-sm bg-slate-50 focus:bg-white focus:border-red-600 outline-none transition font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-600 py-4 font-bold text-white hover:bg-red-700 transition shadow-lg shadow-red-200 disabled:bg-red-300 text-base"
          >
            <LogIn className="w-5 h-5" />
            {loading ? "Logging in..." : "Login to Account"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-600 font-medium">
          Don't have an account yet?{" "}
          <Link
            href="/signup"
            className="font-extrabold text-red-600 hover:underline"
          >
            Sign Up Now
          </Link>
        </p>

      </div>
    </main>
  );
}