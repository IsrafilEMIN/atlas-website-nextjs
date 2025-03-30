"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card } from "@/components/ui/card";
import { MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const locations = [
  { city: "Toronto", description: "Interior and exterior house painting, office painting, and condo repainting services across Greater Toronto." },
  { city: "Mississauga", description: "Full-service residential and commercial painters delivering lasting results in Mississauga." },
  { city: "Vaughan", description: "From upscale homes to retail units, our painters in Vaughan provide quality and precision." },
  { city: "Hamilton", description: "Trusted local painters in Hamilton for interior touch-ups, drywall repair, and exterior finishes." },
  { city: "Markham", description: "Residential and commercial painting in Markham with a focus on clean lines and fast turnaround." },
  { city: "Oakville", description: "Oakville painting specialists providing luxury finishes for homes and businesses." },
  { city: "Richmond Hill", description: "Skilled painting contractors serving Richmond Hill with expert care and durable finishes." },
  { city: "Burlington", description: "Professional home painters in Burlington offering modern, efficient painting solutions." },
  { city: "Niagara Falls", description: "Interior and exterior house painting services in Niagara Falls tailored to your property’s needs." },
  { city: "St. Catharines", description: "Experienced painters in St. Catharines bringing fresh life to residential and commercial spaces." },
];

export default function ServiceAreas() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            House & Commercial Painting Services Across Southern Ontario
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Atlas Painting proudly serves homeowners and businesses in Toronto, Mississauga, Niagara Region, and across the GTA — delivering premium results, wherever you are.
          </p>
        </motion.div>

        {/* Location Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((location, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Card className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-all duration-300">
                <MapPin className="w-8 h-8 text-primary mb-3" />
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{location.city}</h3>
                <p className="text-gray-600">{location.description}</p>
              </Card>
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
            Local painting experts you can trust
          </h3>
          <p className="text-gray-600 mb-6">
            Serving Toronto, Mississauga, Vaughan, Hamilton, and beyond with professional house painting.
          </p>
          <Link href="https://atlas-paint.com/booking/" hrefLang="en">
            <Button size="lg" className="bg-primary text-white hover:bg-primary/80">
              Book a Painter Near You
            </Button>
          </Link>
        </motion.div>

        {/* Google Map + Get Directions */}
        <div className="mt-16 max-w-5xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Find Us in Niagara Falls
          </h3>

          <div className="flex justify-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2913.597134531424!2d-79.13283622346793!3d43.09196438854836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d34523ec362df5%3A0x378165b3b1c55b74!2sAtlas%20HomeServices!5e0!3m2!1sen!2sca!4v1743279952829!5m2!1sen!2sca"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg shadow-md"
            ></iframe>
          </div>

          <div className="mt-6">
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Atlas+HomeServices,+Niagara+Falls+ON"
              hrefLang="en"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/80 transition"
            >
              <ArrowRight className="w-4 h-4" />
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
