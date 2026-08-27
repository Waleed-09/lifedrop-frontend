"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  User, 
  MessageSquare, 
  HelpCircle, 
  ChevronDown, 
  CheckCircle2, 
  HeartHandshake 
} from "lucide-react";
import { apiFetch } from "@/lib/api";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Accordion state for FAQs
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      await apiFetch("/contact", {
        method: "POST",
        body: JSON.stringify({ name, email, subject, message }),
      });

      setSuccessMsg("Thank you! Your message has been sent successfully.");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    {
      q: "How fast do blood donors respond during emergencies?",
      a: "Once an emergency blood request is posted, nearby available donors receive instant notifications. Typically, donors initiate contact within 10 to 30 minutes."
    },
    {
      q: "Is LifeDrop completely free to use?",
      a: "Yes! LifeDrop is a 100% free community platform dedicated to saving lives. We never charge donors or seekers for blood matching."
    },
    {
      q: "How can I update my availability as a donor?",
      a: "Simply log in to your account and go to the Donor Dashboard. You can toggle your availability status ON or OFF at any time."
    }
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">
        
        {/* Modern Gradient Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-rose-800 py-20 text-white">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          
          <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md px-4 py-1.5 text-xs font-bold uppercase text-red-100 border border-white/20 mb-6">
              <HeartHandshake className="w-4 h-4 text-amber-300" /> We're Here To Help
            </span>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight">
              Get in Touch with <span className="text-amber-300">LifeDrop</span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-red-100 leading-relaxed font-medium">
              Have questions, feedback, or need urgent assistance? Reach out to our support team and emergency coordinators anytime.
            </p>
          </div>
        </section>

        {/* Contact Information & Form Grid */}
        <section className="mx-auto max-w-7xl px-6 -mt-10 relative z-20 pb-16">
          <div className="grid gap-8 lg:grid-cols-12">

            {/* Left Column: Info Cards (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="rounded-3xl bg-white p-8 shadow-xl border border-slate-100">
                <h2 className="text-2xl font-black text-slate-900 mb-6 border-b pb-4">
                  Contact Details
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">Main Office</h3>
                      <p className="text-slate-600 text-sm mt-0.5">Buner / Abbottabad, KP, Pakistan</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">Emergency Helpline</h3>
                      <p className="text-slate-600 text-sm mt-0.5 font-semibold">+92 349 3657462</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">Support Email</h3>
                      <p className="text-slate-600 text-sm mt-0.5 font-medium">Waleedali36559@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">Support Availability</h3>
                      <p className="text-slate-600 text-sm mt-0.5">24/7 Active for Blood Emergencies</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Call Box */}
              <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/20 rounded-full blur-xl pointer-events-none" />
                <h3 className="text-xl font-bold mb-2">Need Immediate Blood?</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  Don't wait for emails! Post a public emergency request on our network right away.
                </p>
                <a
                  href="/request"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-bold text-white hover:bg-red-700 transition"
                >
                  Post Emergency Request
                </a>
              </div>

            </div>

            {/* Right Column: Interactive Form (7 Cols) */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl bg-white p-8 sm:p-10 shadow-xl border border-slate-100">
                <h2 className="text-2xl font-black text-slate-900 mb-2">Send Us a Direct Message</h2>
                <p className="text-sm text-slate-500 mb-8">Fill out the form below and our team will respond within a few hours.</p>

                {successMsg && (
                  <div className="mb-6 flex items-center gap-3 rounded-2xl bg-emerald-50 p-4 text-emerald-800 font-medium border border-emerald-200 text-sm">
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
                    <span>{successMsg}</span>
                  </div>
                )}

                {errorMsg && (
                  <div className="mb-6 rounded-2xl bg-red-50 p-4 text-red-700 font-medium border border-red-200 text-sm">
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Full Name</label>
                      <div className="relative">
                        <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Muhammad Waleed"
                          required
                          className="w-full rounded-xl border border-slate-200 pl-11 p-3.5 text-sm text-slate-900 font-medium bg-slate-50 focus:bg-white focus:border-red-600 outline-none transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Email Address</label>
                      <div className="relative">
                        <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="waleed@example.com"
                          required
                          className="w-full rounded-xl border border-slate-200 pl-11 p-3.5 text-sm text-slate-900 font-medium bg-slate-50 focus:bg-white focus:border-red-600 outline-none transition"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Subject</label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Donor Partnership / Inquiry"
                      required
                      className="w-full rounded-xl border border-slate-200 p-3.5 text-sm text-slate-900 font-medium bg-slate-50 focus:bg-white focus:border-red-600 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Message</label>
                    <div className="relative">
                      <MessageSquare className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                      <textarea
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message here..."
                        required
                        className="w-full rounded-xl border border-slate-200 pl-11 p-3.5 text-sm text-slate-900 font-medium bg-slate-50 focus:bg-white focus:border-red-600 outline-none transition"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-600 py-4 font-bold text-white hover:bg-red-700 transition shadow-lg shadow-red-200 disabled:bg-red-300 text-sm"
                  >
                    <Send className="w-4 h-4" />
                    {loading ? "Sending Message..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>

          </div>
        </section>

        {/* Real Interactive Map Section */}
        <section className="py-12 mx-auto max-w-7xl px-6">
          <div className="rounded-3xl bg-white p-6 shadow-xl border border-slate-100 overflow-hidden">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-600" /> LifeDrop Station Map (Abbottabad / Buner)
              </h3>
              <span className="text-xs bg-red-50 text-red-600 font-bold px-3 py-1 rounded-full">Live Location</span>
            </div>

            <div className="h-96 w-full rounded-2xl overflow-hidden border border-slate-200">
              <iframe
                title="LifeDrop Location Map"
                src="https://maps.google.com/maps?q=Abbottabad%20Pakistan&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* FAQs Accordion Section */}
        <section className="py-16 mx-auto max-w-4xl px-6">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3.5 py-1 text-xs font-bold text-red-600 uppercase mb-2">
              <HelpCircle className="w-4 h-4" /> Got Questions?
            </span>
            <h2 className="text-3xl font-black text-slate-900">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="rounded-2xl bg-white border border-slate-200/80 overflow-hidden shadow-sm transition"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-900 hover:bg-slate-50 transition text-sm sm:text-base"
                >
        
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openFaq === index ? 'rotate-180 text-red-600' : ''}`} />
                </button>

                {openFaq === index && (
                  <div className="px-5 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}