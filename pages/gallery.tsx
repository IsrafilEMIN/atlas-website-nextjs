import { motion } from "framer-motion";
import Head from "next/head";
import * as React from "react";

export default function Gallery() {
  return (
      <div className="min-h-screen bg-white">
          <Head>
              <title>Painting Portfolio | Stunning Residential & Commercial Projects</title>
              <meta name="description" content="See our past projects! Browse our gallery of premium residential & commercial painting, drywall, and wall finishes. Get inspired—Book your project today!" />
          </Head>
        <div className="container mx-auto px-6 pt-32 pb-16 flex flex-col items-center justify-center">
          <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-gray-900 mb-8"
          >
            Our Work
          </motion.h1>
          <div className="flex-1 flex items-center justify-center w-full">
            <span className="text-2xl text-gray-600">Coming soon...</span>
          </div>
        </div>
      </div>
  );
}
