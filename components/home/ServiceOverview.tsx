"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card } from "@/components/ui/card";
import { Home, Building2, Layers, Wallpaper, Ruler } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Home,
    title: "Residential Painting",
    description:
      "Interior and exterior house painting for homeowners, condos, and apartments across Toronto, Mississauga, and the Niagara region. Our residential painters provide detailed prep, color consultation, and flawless finishes that last.",
    href: "https://atlas-paint.com/services/residential-painting/",
    hrefLang: "en",
  },
  {
    icon: Building2,
    title: "Commercial Painting",
    description:
      "From offices and retail stores to warehouses and new developments — our commercial painting contractors deliver professional, low-disruption service tailored to your business schedule.",
    href: "https://atlas-paint.com/services/commercial-painting/",
    hrefLang: "en",
  },
  {
    icon: Layers,
    title: "Drywall & Plastering",
    description:
      "Whether you're repairing cracks or prepping for a full paint job, our drywall repair and plastering services ensure smooth, paint-ready surfaces with no bumps, seams, or flaws.",
    href: "https://atlas-paint.com/services/drywall-plastering/",
  hrefLang: "en",
  },
  {
    icon: Wallpaper,
    title: "Wall Coverings",
    description:
      "Accent your walls with luxury wallpaper, custom coverings, and designer finishes. We offer professional wallpaper installation across the GTA with precision and care.",
    href: "https://atlas-paint.com/services/wall-covering/",
  hrefLang: "en",
  },
  {
    icon: Ruler,
    title: "Fencing Services",
    description:
      "We build, paint, and stain wood, vinyl, and metal fences to boost curb appeal and protect your property. Custom fencing and touch-up maintenance available year-round.",
    href: "https://atlas-paint.com/services/fencing/",
    hrefLang: "en",
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
            Painting Services Across Toronto & Surrounding Areas
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Atlas Painting offers full-service solutions for home and business owners — from expert interior painters to drywall finishing, fence painting, and wallpaper installation.
            Serving Toronto, Mississauga, Oakville, Hamilton, Niagara, and the entire GTA.
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
              <Link href={service.href} hrefLang="en" className="block h-full group">
                <Card className="p-6 h-full bg-gray-50 border border-gray-200 hover:shadow-lg transition-all duration-300 group-hover:border-primary">
                  <service.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <p className="text-sm text-primary font-semibold group-hover:underline">
                    Learn more →
                  </p>
                </Card>
              </Link>
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
            All-in-One Painting Services Across Ontario
          </h3>
          <p className="text-gray-600 mb-6">
            From drywall repairs to interior painting — explore our residential and commercial service lineup.
          </p>
          <Link href="https://atlas-paint.com/services/" hrefLang="en">
            <Button size="lg" className="bg-primary text-white hover:bg-primary/80">
              Learn More About Our Services
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
