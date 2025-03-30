"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import WavePattern from "../ui/patterns/WavePattern";
import Image from "next/image";
import Link from "next/link";

const SERVICES = [
  {
    slug: "residential-painting",
    title: "Residential Painting Services",
    description:
      "Premium home painting with clean lines, lasting finishes, and minimal disruption. Interior and exterior house painting across Southern Ontario.",
    image: "/assets/projects/modern-interior.jpg",
  },
  {
    slug: "commercial-painting",
    title: "Commercial Painting Contractors",
    description:
      "Experienced commercial painters for offices, retail spaces, and developments. Fast, professional results with long-term durability.",
    image: "/assets/projects/commercial-office.jpg",
  },
  {
    slug: "drywall-plastering",
    title: "Drywall & Plastering",
    description:
      "Flawless drywall repairs and smooth plaster finishing for walls and ceilings. Perfect prep for any paint job.",
    image: "/assets/projects/drywall-plastering.jpg",
  },
  {
    slug: "wall-covering",
    title: "Wall Covering Installation",
    description:
      "Custom wallpaper and decorative wall coverings installed with precision. Add texture and personality to any space.",
    image: "/assets/projects/commercial-office.jpg",
  },
  {
    slug: "fencing",
    title: "Fencing & Painting Services",
    description:
      "Wood, vinyl, or metal fencing — built or refreshed with high-quality paint/stain finishes for outdoor durability and style.",
    image: "/assets/projects/commercial-office.jpg",
  },
];


export default function ProductShowcase() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="relative py-24 bg-gray-50 overflow-hidden">
      <WavePattern className="text-white/5" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Our Core Painting & Finishing Services
          </h2>
          <p className="text-gray-600 text-lg">
            Explore our full range of professional painting, drywall, wall treatment, and fencing solutions built for both residential and commercial clients.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-6xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="block transition-transform hover:scale-[1.02] duration-300 w-full"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-lg h-full">
                  <div className="relative aspect-video bg-gray-100">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.jpg";
                        console.error(`Failed to load image: ${service.image}`);
                      }}
                    />
                  </div>
                  <div className="p-6 flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
