import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import ProductShowcase from "@/components/home/ProductShowcase";
import Testimonials from "@/components/home/Testimonials";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("../components/layout/Header"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="bg-white min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <ProductShowcase />
      </main>
    </div>
  );
}