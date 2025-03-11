import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import WavePattern from "../ui/patterns/WavePattern";
import Image from "next/image";
import Link from "next/link";

// Update image paths to include the assets directory
const IMAGES = {
  modernInterior: "/assets/projects/modern-interior.jpg",
  commercialOffice: "/assets/projects/commercial-office.jpg"
};

export default function ProductShowcase() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              House Painting & Commercial Projects
            </h2>
            <p className="text-gray-600 text-lg">
              Take a look at some of our finest home painting and commercial painting work that showcases our attention to detail and commitment to quality.
            </p>
          </motion.div>

          <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="relative mx-auto max-w-5xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center max-w-4.5xl mx-auto">
              {/* Project Card 1 */}
              <Link
                  href="/gallery"
                  className="block transition-transform hover:scale-[1.02] duration-300 w-full"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-lg h-full">
                  <div className="relative aspect-video bg-gray-100">
                    <Image
                        src={IMAGES.modernInterior}
                        alt="Modern Home Interior - Home Painting Services"
                        fill
                        className="object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.jpg";
                          console.error(`Failed to load image: ${IMAGES.modernInterior}`);
                        }}
                    />
                  </div>
                  <div className="p-6 flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Modern Home Interior - Expert Home Painting
                    </h3>
                    <p className="text-gray-600">
                      Complete interior renovation with premium home painting finish.
                    </p>
                  </div>
                </div>
              </Link>

              {/* Project Card 2 */}
              <Link
                  href="/gallery"
                  className="block transition-transform hover:scale-[1.02] duration-300 w-full"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-lg h-full">
                  <div className="relative aspect-video bg-gray-100">
                    <Image
                        src={IMAGES.commercialOffice}
                        alt="Commercial Office Space - Professional Painting Contractors"
                        fill
                        className="object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.jpg";
                          console.error(`Failed to load image: ${IMAGES.commercialOffice}`);
                        }}
                    />
                  </div>
                  <div className="p-6 flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Commercial Space - Trusted Commercial Painters
                    </h3>
                    <p className="text-gray-600">
                      Professional painting solution by experienced commercial painting contractors.
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
  );
}