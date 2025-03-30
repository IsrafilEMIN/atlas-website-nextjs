"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card } from "@/components/ui/card";
import { Home, Building2, Layers, Wallpaper, Ruler } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Home,
    title: "Residential Painting",
    description:
      "Professional interior and exterior painting for houses, condos, and residential buildings across the GTA.",
    href: "https://atlas-paint.com/services/residential-painting/",
  },
  {
    icon: Building2,
    title: "Commercial Painting",
    description:
      "Clean, efficient painting for office spaces, retail units, and industrial buildings with minimal business interruption.",
    href: "https://atlas-paint.com/services/commercial-painting/",
  },
  {
    icon: Layers,
    title: "Drywall & Plastering",
    description:
      "Flawless drywall repair, patching, and plaster finishing. Prepping walls for long-lasting, beautiful paint results.",
    href: "https://atlas-paint.com/services/drywall-plastering/",
  },
  {
    icon: Wallpaper,
    title: "Wall Coverings",
    description:
      "Expert installation of wallpaper and decorative wall textures to enhance any interior design style.",
    href: "https://atlas-paint.com/services/wall-covering/",
  },
  {
    icon: Ruler,
    title: "Fencing Services",
    description:
      "Fence painting, staining, and maintenance — plus custom fencing solutions built to last and look sharp.",
    href: "https://atlas-paint.com/services/fencing/",
  },
];

export default function ServicesOverview() {
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
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our Core Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Atlas Painting delivers complete painting and finishing services for residential and commercial properties across Toronto, Niagara, and the surrounding regions.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={service.href} className="block h-full">
                <Card className="p-6 h-full bg-gray-50 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:border-primary">
                  <service.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
