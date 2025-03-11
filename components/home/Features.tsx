import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card } from "@/components/ui/card";
import { PaintBucket, Palette, Shield, Award } from "lucide-react";

const features = [
  {
    icon: PaintBucket,
    title: "Professional House Painting Services",
    description: "Expert house painters with years of experience in residential and commercial painting projects."
  },
  {
    icon: Palette,
    title: "Quality Materials for Home Painting",
    description: "Premium paints and materials ensure long-lasting, beautiful results for all your home painting needs."
  },
  {
    icon: Shield,
    title: "Licensed & Insured Painting Contractors",
    description: "Our painting contractors are fully licensed and insured for your peace of mind."
  },
  {
    icon: Award,
    title: "Satisfaction Guarantee from Expert Painters",
    description: "We're not satisfied until you're completely happy with our residential or commercial painting work."
  }
];

export default function Features() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
      <section ref={ref} className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our House Painting Services?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the difference with our premium home painting, residential painting, and commercial painting services.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-all duration-300">
                    <feature.icon className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </Card>
                </motion.div>
            ))}
          </div>
        </div>
      </section>
  );
}