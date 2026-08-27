import "./globals.css";
import type { Metadata } from "next";
import { AuthProvider } from "@/lib/auth-context";
import { ToastProvider } from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: "LifeDrop — Emergency Blood Donation & Assistance Platform",
  description: "Connect verified blood donors with patients in urgent need across Pakistan in real-time.",
  keywords: ["blood donation", "pakistan", "blood donor", "emergency blood", "abbottabad blood bank", "lifedrop"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-slate-50 text-slate-900 antialiased font-sans">
        <AuthProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}