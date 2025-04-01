import { motion } from "framer-motion";
import GridPattern from "../ui/patterns/GridPattern";
import { Button } from "@/components/ui/button";
import BackgroundVideo from "@/components/ui/BackgroundVideo";

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
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-4xl font-bold text-white mb-6 leading-tight">
            Trusted Home Painters & Commercial Painting Contractors in Toronto, Mississauga & the GTA
            <br />Atlas Painting Services You Can Rely On
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-gray-200 mb-10"
          >
            From residential interior painting in Vaughan to commercial repainting projects in Niagara Falls, our licensed painting professionals deliver clean lines, premium finishes, and guaranteed results.
            <br />
            Serving homeowners, property managers, and businesses across Southern Ontario.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-primary text-white border-2 border-white/30 hover:bg-primary/80"
              onClick={() => window.location.href = 'https://atlas-paint.com/services/'}
            >
              Explore Our Services
            </Button>
            <Button
              size="lg"
              className="bg-white text-black border-2 border-black hover:bg-primary hover:text-white"
              onClick={() => window.location.href = 'https://atlas-paint.com/booking/'}
            >
              Book a Free Quote
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
