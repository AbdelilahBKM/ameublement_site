"use client"
import About_us from "@/components/about-us";
import Akram_footer from "@/components/akram_footer";
import Collections from "@/components/collection-cards";
import ContactForm from "@/components/Contact-form";
import HeroSection from "@/components/Hero-section";
import Header from "@/components/layout/Header";
import Product_section from "@/components/products-section";
import { useEffect, useState } from "react";

export default function Home() {
  const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
        setHydrated(true);  
    }, []);
    if (!hydrated) {
        return null;
    }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <header className="w-full flex items-center justify-center fixed z-20">
        <Header />
      </header>
      <section className="w-full" id="hero">
        <HeroSection />
      </section>
      <section className="w-full px-0 py-1" id="collection">
        <Collections />
      </section>
      <section className="w-full px-0 py-16" id="product">
        <Product_section />
      </section>
      <section className="w-full px-0 py-16" id="about-us">
        <About_us />
      </section>
      <section className="w-full px-0 py-16" id="contact">
        <ContactForm />
      </section>

      <Akram_footer />
    </main>
  );
}
