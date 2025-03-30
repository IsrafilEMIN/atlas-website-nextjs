"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import WavePattern from "../ui/patterns/WavePattern";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const SERVICES = [
  {
    slug: "residential-painting",
    title: "Residential Painting Services",
    description:
      "Interior and exterior house painting services in Toronto, Mississauga, and surrounding areas. Clean lines, vibrant color, minimal disruption.",
    image: "/assets/projects/residential-painted-room.jpg",
  },
  {
    slug: "commercial-painting",
    title: "Commercial Painting Contractors",
    description:
      "High-performance commercial painting for offices, retail units, and new developments — completed on time with lasting results.",
    image: "/assets/projects/commercial-office.jpg",
  },
  {
    slug: "drywall-plastering",
    title: "Drywall & Plastering",
    description:
      "Wall prep done right — from patching holes and fixing cracks to smooth plaster surfaces, ready for a flawless paint job.",
    image: "/assets/projects/drywall-plastering.jpg",
  },
  {
    slug: "wall-covering",
    title: "Wallpaper & Wall Coverings",
    description:
      "Custom wallpaper installation and textured wall coverings to elevate your interior design. Precision guaranteed.",
    image: "/assets/projects/wall-covering.jpg",
  },
  {
    slug: "fencing",
    title: "Fencing & Painting Services",
    description:
      "Fence painting, staining, and construction that adds curb appeal and weather protection. Wood, vinyl, and custom designs.",
    image: "/assets/projects/fencing.jpg",
  },
];

export default function ProductShowcase() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="relative py-24 bg-gray-50 overflow-hidden">
      <WavePattern className="text-white/5" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Full-Service House Painting & Wall Finishing
          </h2>
          <p className="text-lg text-gray-600">
            We provide residential and commercial painting, drywall, and wall finishing services across the Greater Toronto Area — from Burlington to Niagara.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="relative mx-auto max-w-6xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`https://atlas-paint.com/services/${service.slug}/`}
                hrefLang="en"
                className="block transition-transform hover:scale-[1.015] duration-300 w-full"
              >
                <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition-all h-full">
                  <div className="relative aspect-video bg-gray-100">
                    <Image
                      src={service.image}
                      alt={`Atlas - ${service.title}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      onError={() => {
                        console.error(`Failed to load image: ${service.image}`);
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Explore our professional painting solutions
          </h3>
          <p className="text-gray-600 mb-6">
            From interior painting to drywall repairs and fence staining — we’ve got your property covered.
          </p>
          <Link href="https://atlas-paint.com/services/" hrefLang="en">
            <Button size="lg" className="bg-primary text-white hover:bg-primary/80">
              View All Painting Services
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
