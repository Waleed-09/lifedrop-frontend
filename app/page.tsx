"use client";

import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import FeaturedDonors from "@/components/home/FeaturedDonors";
import Stats from "@/components/home/Stats";
import BloodCompatibilityMatrix from "@/components/home/BloodCompatibilityMatrix";
import Testimonials from "@/components/home/Testimonials";
import EmergencyCTA from "@/components/home/EmergencyCTA";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <HowItWorks />
        <BloodCompatibilityMatrix />
        <FeaturedDonors />
        <Testimonials />
        <EmergencyCTA />
      </main>
      <Footer />
    </>
  );
}