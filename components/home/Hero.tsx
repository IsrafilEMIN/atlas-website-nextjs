"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import GridPattern from "../ui/patterns/GridPattern";

// Dynamically import the video component to prevent hydration errors
const BackgroundVideo = dynamic(() => import("@/components/ui/BackgroundVideo"), { ssr: false });

export default function Hero() {
  return (
      <section className="relative h-[100dvh] flex items-center pt-20 overflow-hidden bg-white">
      {/* Background Video Component */}
        <div className="absolute inset-0 w-full h-full z-0">
          <BackgroundVideo />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <GridPattern className="text-gray-100" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
          >
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-4 py-1.5 mb-6 text-sm font-medium bg-gray-100 text-gray-900 rounded-full"
            >
              Premium Residential & Commercial Painting in the GTA
            </motion.span>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Transform Your Space with Premium Paint Solutions
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-gray-200 mb-10"
            >
              Expert painting services for residential and commercial properties, delivering quality and excellence in every brushstroke. Contact us today for a free estimate!
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                  size="lg"
                  className="bg-primary text-white border-2 border-white/30 hover:bg-primary/80"
                  onClick={() => window.location.href = '/services'}
              >
                Our services
              </Button>
              <Button
                  size="lg"
                  className="bg-white text-black border-2 border-black hover:bg-primary hover:text-white"
                  onClick={() => window.location.href = '/booking'}
              >
                Book now
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
  );
}