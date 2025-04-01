"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const SERVICES = [
  {
    slug: "residential",
    title: "Residential Painting",
    description: "Interior and exterior painting for homes and condos.",
    image: "/images/gallery/commercial/04.jpg",
    gallery: [],
  },
  {
    slug: "commercial",
    title: "Commercial Painting",
    description: "Painting for offices, shops, and commercial spaces.",
    image: "/images/gallery/commercial/04.jpg",
    gallery: [
      "/images/gallery/commercial/01.jpg",
      "/images/gallery/commercial/02.jpg",
      "/images/gallery/commercial/03.jpg",
      "/images/gallery/commercial/04.jpg",
    ],
  },
  {
    slug: "drywall",
    title: "Drywall & Plastering",
    description: "Crack repair, taping, and seamless wall finishes.",
    image: "/images/gallery/commercial/04.jpg",
    gallery: [],
  },
  {
    slug: "wallcovering",
    title: "Wall Coverings",
    description: "Wallpaper and luxury wall finish installation.",
    image: "/images/gallery/commercial/04.jpg",
    gallery: [],
  },
];

type Service = (typeof SERVICES)[number];

export default function ProductShowcase() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleSelect = (service: Service) => {
    if (selectedService?.slug === service.slug) {
      setSelectedService(null);
    } else {
      setSelectedService(service);
    }
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Portfolio</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Click a service below to explore the results we&apos;ve delivered.
          </p>
        </motion.div>

        {/* Horizontal Service Card Row */}
        <div className="overflow-x-auto pb-6 -mx-4 px-4">
          <div className="flex space-x-6 w-max">
            {SERVICES.map((service) => (
              <div
                key={service.slug}
                onClick={() => handleSelect(service)}
                className={`cursor-pointer bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all min-w-[280px] max-w-[320px] ${
                  selectedService?.slug === service.slug
                    ? "border-primary ring-1 ring-primary"
                    : ""
                }`}
              >
                <div className="relative w-full aspect-[16/9] rounded-t-xl overflow-hidden bg-gray-100">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expanded Gallery Below Cards */}
        {selectedService && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-10 max-w-6xl mx-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-800">
                {selectedService.title} Gallery
              </h3>
              <Button
                variant="ghost"
                onClick={() => setSelectedService(null)}
                className="text-gray-500 hover:text-black"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {selectedService.gallery.length === 0 ? (
              <div className="text-center text-gray-500 text-lg py-8">
                Coming soon...
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {selectedService.gallery.slice(0, 3).map((src, i) => (
                    <div
                      key={i}
                      className="relative aspect-[16/9] rounded-lg overflow-hidden shadow-md bg-gray-100"
                    >
                      <Image
                        src={src}
                        alt={`${selectedService.title} ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  ))}
                </div>
                {selectedService.gallery.length > 3 && (
                  <div className="text-center mt-6">
                    <Link href={`/gallery#${selectedService.slug}`}>
                      <Button className="bg-primary text-white hover:bg-primary/80">
                        See More
                      </Button>
                    </Link>
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
