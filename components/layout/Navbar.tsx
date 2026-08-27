"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, HeartPulse, LogOut, User, ShieldCheck, Droplets } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/components/ui/Toast";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoggedIn, logout } = useAuth();
  const toast = useToast();

  const handleLogout = () => {
    logout();
    toast.info("Logged out successfully.");
    router.push("/login");
  };

  const links = [
    { title: "Home", href: "/" },
    { title: "Find Donors", href: "/search" },
    { title: "Emergency Requests", href: "/request" },
    { title: "Become Donor", href: "/donor" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
  ];

  const isAdmin = user?.role === "admin" || user?.email?.includes("admin");

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo & Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="rounded-2xl bg-gradient-to-br from-red-600 to-rose-700 p-2.5 text-white shadow-md shadow-red-200 group-hover:scale-105 transition">
            <HeartPulse size={24} className="animate-pulse" />
          </div>

          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-red-600 transition flex items-center gap-1">
              Life<span className="text-red-600">Drop</span>
            </h1>
            <p className="text-xs text-slate-500 font-semibold">Donate Blood. Save Lives.</p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden gap-7 lg:flex items-center">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.title}
                href={link.href}
                className={`text-sm font-bold transition-colors duration-200 relative py-1 ${
                  isActive
                    ? "text-red-600"
                    : "text-slate-700 hover:text-red-600"
                }`}
              >
                {link.title}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Auth Buttons / User Session Dropdown */}
        <div className="hidden gap-3 lg:flex items-center">
          {isLoggedIn ? (
            <>
              {isAdmin && (
                <Link
                  href="/admin"
                  className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition shadow"
                >
                  <ShieldCheck size={16} className="text-red-400" />
                  Admin
                </Link>
              )}

              <Link
                href="/donor"
                className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-800 hover:bg-slate-200 transition border border-slate-200"
              >
                <User size={16} className="text-red-600" />
                {user?.name?.split(" ")[0] || "Dashboard"}
              </Link>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-600 hover:text-white transition"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-xl border border-slate-300 px-5 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100 transition"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="rounded-xl bg-red-600 px-5 py-2 text-sm font-bold text-white hover:bg-red-700 transition shadow-md shadow-red-200"
              >
                Become a Donor
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          aria-label="Toggle Navigation Menu"
          className="lg:hidden text-slate-700 p-2 rounded-xl hover:bg-slate-100 transition"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>

      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="space-y-3 border-t border-slate-100 bg-white p-6 lg:hidden shadow-xl animate-in slide-in-from-top duration-200">
          {links.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block px-3 py-2 rounded-xl text-base font-bold transition ${
                pathname === link.href
                  ? "bg-red-50 text-red-600"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              {link.title}
            </Link>
          ))}

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            {isLoggedIn ? (
              <>
                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 font-bold text-white"
                  >
                    <ShieldCheck size={18} className="text-red-400" />
                    Admin Panel
                  </Link>
                )}

                <Link
                  href="/donor"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-slate-100 py-3 font-bold text-slate-800"
                >
                  <User size={18} className="text-red-600" />
                  Donor Dashboard
                </Link>

                <button
                  onClick={() => {
                    setOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 py-3 font-bold text-red-600"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="block text-center rounded-xl border border-slate-300 py-3 font-bold text-slate-700"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                  className="block text-center rounded-xl bg-red-600 py-3 font-bold text-white shadow-md"
                >
                  Become a Donor
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}