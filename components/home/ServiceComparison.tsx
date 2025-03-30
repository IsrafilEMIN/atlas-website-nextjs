"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ServiceComparison() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Residential vs. Commercial Painting
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Not sure which service is right for you? Explore the key differences between our home and commercial painting services in Toronto, Mississauga, and the GTA.
          </p>
        </motion.div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="p-4">Features</th>
                <th className="p-4">Residential Painting</th>
                <th className="p-4">Commercial Painting</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm md:text-base">
              <tr className="border-t border-gray-200">
                <td className="p-4 font-medium">Property Types</td>
                <td className="p-4">Houses, condos, apartments</td>
                <td className="p-4">Retail stores, offices, warehouses, industrial units</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="p-4 font-medium">Project Size</td>
                <td className="p-4">Small to medium</td>
                <td className="p-4">Medium to large scale</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="p-4 font-medium">Painting Hours</td>
                <td className="p-4">Daytime, flexible based on homeowner schedule</td>
                <td className="p-4">Evenings/weekends to avoid business disruption</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="p-4 font-medium">Materials & Finish</td>
                <td className="p-4">Premium paints for comfort and aesthetics</td>
                <td className="p-4">High-durability coatings for heavy traffic areas</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="p-4 font-medium">Compliance & Insurance</td>
                <td className="p-4">Licensed & insured house painters</td>
                <td className="p-4">WSIB-compliant with safety certifications</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="p-4 font-medium">Timeline</td>
                <td className="p-4">1–5 days depending on size</td>
                <td className="p-4">Based on scale & site access — tightly managed</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="p-4 font-medium">Common Add-Ons</td>
                <td className="p-4">Drywall repairs, trim painting, fence staining</td>
                <td className="p-4">Epoxy floors, signage painting, metal surfaces</td>
              </tr>
            </tbody>
          </table>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Residential or Commercial — We've Got It Covered
          </h3>
          <p className="text-gray-600 mb-6">
            Whether you're a homeowner or a business manager, Atlas Painting offers tailored painting solutions for your space.
          </p>
          <Link href="https://atlas-paint.com/services/" hrefLang="en">
            <Button size="lg" className="bg-primary text-white hover:bg-primary/80">
              Compare Our Services
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
