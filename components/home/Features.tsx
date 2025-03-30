import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card } from "@/components/ui/card";
import { PaintBucket, Palette, Shield, Award } from "lucide-react";

const features = [
  {
    icon: PaintBucket,
    title: "Expert Residential & Commercial Painting",
    description:
      "Our certified house painters specialize in residential and commercial painting throughout Toronto, Mississauga, Niagara, and surrounding areas.",
  },
  {
    icon: Palette,
    title: "Premium Materials & Flawless Finishes",
    description:
      "We use top-tier interior and exterior paints to ensure smooth, durable results that transform your home or business space.",
  },
  {
    icon: Shield,
    title: "Licensed, Insured & Trusted Contractors",
    description:
      "Atlas Painting is a fully licensed and insured painting company you can trust for clean, professional work — done right the first time.",
  },
  {
    icon: Award,
    title: "Satisfaction Guaranteed by Local Experts",
    description:
      "Our experienced painters are committed to quality and customer satisfaction. We’re not done until you’re 100% happy.",
  },
];

export default function Features() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Atlas for Your Painting Needs?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From residential interiors to commercial exteriors, Atlas Painting delivers exceptional quality, expert craftsmanship, and dependable service across the GTA. Trusted by homeowners and businesses alike.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-all duration-300">
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
