"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    question: "How much does house painting cost in Ontario?",
    answer:
      "Interior or exterior painting costs typically range from $2 to $4 per square foot depending on the project size, paint type, and condition of your surfaces. We offer detailed, no-obligation quotes for homeowners and commercial clients across Ontario.",
  },
  {
    question: "Do you offer both interior and exterior painting?",
    answer:
      "Yes! Atlas Painting specializes in both residential and commercial interior and exterior painting throughout Toronto, Mississauga, Niagara, and the GTA.",
  },
  {
    question: "Are your painters licensed and insured?",
    answer:
      "Absolutely. All of our painters are fully licensed, insured, and trained to deliver high-quality results with professionalism and care. Safety and accountability are always top priorities.",
  },
  {
    question: "How long does a typical painting job take?",
    answer:
      "Most interior house painting projects take 2–4 days depending on size and surface condition. We always provide a clear timeline so you know exactly what to expect from start to finish.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We serve homeowners and businesses across Southern Ontario including Toronto, Mississauga, Vaughan, Hamilton, Oakville, St. Catharines, and Niagara Falls.",
  },
  {
    question: "Can I get an online painting estimate?",
    answer:
      "Yes! You can get a fast, AI-assisted house painting estimate using our online quote tool. Whether you're in Mississauga or Hamilton, our system helps you start planning in minutes.",
  },
  {
    question: "Do you use eco-friendly or low-VOC paints?",
    answer:
      "We offer a full range of eco-friendly, low-VOC paints for healthier interiors — perfect for homes with children, pets, or allergies. Ask us about sustainable painting solutions when booking your project.",
  },
  {
    question: "What prep work is included before painting?",
    answer:
      "All jobs include basic prep: covering floors and furniture, patching minor wall damage, sanding, and priming. We also handle drywall repairs and plastering for more extensive surface restoration.",
  },
  {
    question: "How soon can your painters start?",
    answer:
      "Depending on your location and project scope, we can usually start within 7–14 days. For urgent commercial painting projects, we offer flexible scheduling and weekend availability.",
  },
  {
    question: "Why choose Atlas over other painters in Toronto?",
    answer:
      "Atlas Painting is known for quality, reliability, and local expertise. With hundreds of 5-star reviews and a proven track record in both residential and commercial spaces, we’re one of the most trusted painting companies in Toronto and beyond.",
  },
];

export default function FAQ() {
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
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about our residential and commercial painting services.  
            If your question isn’t here,{" "}
            <a href="https://atlas-paint.com/booking/" hrefLang="en" className="text-primary underline">
              get in touch with our team.
            </a>
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <details className="group bg-gray-50 border border-gray-200 p-6 rounded-lg cursor-pointer transition-all hover:shadow-md">
                <summary className="font-semibold text-gray-900 text-lg flex justify-between items-center">
                  {faq.question}
                  <span className="ml-2 transform transition-transform duration-300 group-open:rotate-180">▼</span>
                </summary>
                <p className="text-gray-700 mt-4 leading-relaxed">{faq.answer}</p>
              </details>
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
            Still have questions about painting services?
          </h3>
          <p className="text-gray-600 mb-6">
            Our Toronto-based painting experts are ready to help you with residential or commercial projects.
          </p>
          <Link href="https://atlas-paint.com/booking/" hrefLang="en">
            <Button size="lg" className="bg-primary text-white hover:bg-primary/80">
              Contact Our Team
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
