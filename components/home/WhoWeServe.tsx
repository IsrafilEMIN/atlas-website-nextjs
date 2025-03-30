"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Briefcase, Home, Building2, Wrench } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const audiences = [
  {
    icon: Home,
    title: "Homeowners",
    description:
      "We help homeowners across Toronto, Mississauga, and Niagara Falls elevate their interiors and exteriors with stunning, long-lasting finishes.",
  },
  {
    icon: Building2,
    title: "Commercial Property Managers",
    description:
      "From office spaces to retail shops and restaurants, we deliver fast, clean commercial painting with minimal business disruption.",
  },
  {
    icon: Briefcase,
    title: "Real Estate & Construction Pros",
    description:
      "We partner with realtors, builders, and developers to provide pre-sale touch-ups, staging repaints, and new-build painting across Southern Ontario.",
  },
  {
    icon: Wrench,
    title: "Renovation Contractors",
    description:
      "General contractors trust us to handle drywall, plastering, and high-quality paint application as part of complete renovation projects.",
  },
];

export default function WhoWeServe() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Who We Serve
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Whether you're a homeowner, builder, or business owner — our painting services are designed to meet your needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {audiences.map((audience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="p-6 bg-gray-50 border border-gray-200 hover:shadow-md rounded-lg transition-all text-center h-full flex flex-col justify-between">
                <audience.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {audience.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {audience.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Serving Homeowners, Builders & Property Managers
          </h3>
          <p className="text-gray-600 mb-6">
            Whether you manage commercial properties or need a fresh coat for your home, we tailor painting services to your needs.
          </p>
          <Link href="https://atlas-paint.com/booking/" hrefLang="en">
            <Button size="lg" className="bg-primary text-white hover:bg-primary/80">
              Let’s Paint Your Property
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
