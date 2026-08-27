"use client";

import Image from "next/image";
import { Star, Quote, Heart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Dr. Tariq Mahmood",
    role: "Emergency Coordinator",
    city: "Abbottabad",
    comment:
      "Ayub Medical Complex mein urgent surgery ke waqt LifeDrop ne minutes mein O- donors dhoond nikaalay. Absolutely life-saving platform!",
    rating: 5,
    badge: "Verified Medical Pro",
    image: "https://i.pravatar.cc/150?img=60",
  },
  {
    id: 2,
    name: "Ayesha Bibi",
    role: "Patient Relative",
    city: "Islamabad",
    comment:
      "Ameer-o-ghareeb ka farq kiye bina instant help mili. Request post ki aur within 15 minutes donor hospital pohanch gaya. Unbelievable response time!",
    rating: 5,
    badge: "Life Saved",
    image: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: 3,
    name: "Hamza Malik",
    role: "Active Hero Donor",
    city: "Peshawar",
    comment:
      "Aap ki ek click kisi ki zindagi bacha sakti hai. Profile availability status toggle karke directly zaroorat-mand ki madad karna super fulfilling hai!",
    rating: 5,
    badge: "10+ Donations",
    image: "https://i.pravatar.cc/150?img=33",
  },
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-red-50/30 to-white py-28">
      {/* Background Decorative Glow Circles */}
      <div className="absolute top-1/2 left-10 -z-10 h-72 w-72 -translate-y-1/2 rounded-full bg-red-200/40 blur-3xl" />
      <div className="absolute bottom-10 right-10 -z-10 h-80 w-80 rounded-full bg-red-300/30 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-red-100/80 px-5 py-2 text-xs font-extrabold uppercase tracking-widest text-red-600 border border-red-200 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-red-600 animate-spin" />
            Real Stories, Real Heroes
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-4xl font-black text-gray-900 tracking-tight sm:text-5xl"
          >
            Trusted by Doctors, Loved by <span className="text-red-600 underline decoration-red-300 decoration-wavy">Donors</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-gray-600"
          >
            Suno unki zubaani jinhone emergency mein LifeDrop par bharosa kiya aur zindagiyan bachayein!
          </motion.p>
        </div>

        {/* Testimonial Cards */}
        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group relative flex flex-col justify-between rounded-3xl bg-white/80 backdrop-blur-md p-8 border border-red-100/80 shadow-lg transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:border-red-400"
            >
              {/* Floating Quote Icon */}
              <div className="absolute -top-5 right-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-red-700 text-white shadow-md transition group-hover:scale-110 group-hover:rotate-6">
                <Quote className="w-6 h-6 fill-white" />
              </div>

              <div>
                {/* Badge & Rating */}
                <div className="flex items-center justify-between mb-6 pr-8">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600 border border-red-100">
                    <Heart className="w-3.5 h-3.5 fill-red-600" />
                    {item.badge}
                  </span>

                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-gray-700 font-medium leading-relaxed italic mb-8">
                  "{item.comment}"
                </p>
              </div>

              {/* User Details Footer */}
              <div className="flex items-center gap-4 pt-5 border-t border-gray-100">
                <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 ring-4 ring-red-100 group-hover:ring-red-400 transition">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 text-lg group-hover:text-red-600 transition">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-500 font-semibold">
                    {item.role} • <span className="text-red-600 font-bold">{item.city}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}