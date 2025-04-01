import { motion } from "framer-motion";
import { ClipboardList, Paintbrush2, CheckCircle2, CalendarCheck2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: ClipboardList,
    title: "Step 1: Book Your Free Consultation",
    description:
      "Request a free, no-obligation quote for your house painting project in Toronto, Mississauga, Vaughan, or surrounding areas. Our team will assess your space and recommend the best solutions for interior or exterior painting.",
  },
  {
    icon: CalendarCheck2,
    title: "Step 2: Schedule & Preparation",
    description:
      "We work around your schedule to minimize disruption. Our expert painters handle all prep work — covering floors and furniture, fixing wall imperfections, and ensuring the perfect foundation for painting.",
  },
  {
    icon: Paintbrush2,
    title: "Step 3: Professional Painting",
    description:
      "Whether it’s a home, office, or commercial space, our licensed painters use premium materials to deliver flawless finishes. We specialize in interior painting, exterior surfaces, drywall, and even fence painting services.",
  },
  {
    icon: CheckCircle2,
    title: "Step 4: Walkthrough & Satisfaction",
    description:
      "Once your project is complete, we do a thorough walkthrough to ensure everything meets our strict quality standards. Customer satisfaction is 100% guaranteed — that’s why we’re one of the most trusted painting companies in Southern Ontario.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-gray-100">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How Our Painting Services Work
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto text-lg">
            Our proven 4-step process ensures stress-free painting for homeowners and business owners across Toronto, the GTA, Niagara, and beyond.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex gap-4 items-start"
            >
              <div className="p-4 bg-primary/10 text-primary rounded-full">
                <step.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Your painting project is just a few steps away
          </h3>
          <p className="text-gray-600 mb-6">
            Get started with Toronto’s trusted house painters and transform your property today.
          </p>
          <Link href="https://atlas-paint.com/booking/" hrefLang="en">
            <Button size="lg" className="bg-primary text-white hover:bg-primary/80">
              Schedule Your Free Quote
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
