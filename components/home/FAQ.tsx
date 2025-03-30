"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const faqs = [
  {
    question: "How much does house painting cost in Ontario?",
    answer:
      "Costs can vary depending on the size of your home, surface conditions, and paint quality. On average, homeowners in Ontario pay between $2 to $4 per square foot. Contact us for a free, personalized quote.",
  },
  {
    question: "Do you offer both interior and exterior painting?",
    answer:
      "Yes! Atlas Painting provides comprehensive interior and exterior painting services for homes, condos, and commercial properties across Toronto and the GTA.",
  },
  {
    question: "Are your painters licensed and insured?",
    answer:
      "Absolutely. All our painting contractors are fully licensed, insured, and professionally trained to ensure top-tier results and your peace of mind.",
  },
  {
    question: "How long does a typical painting job take?",
    answer:
      "A standard 3-bedroom interior job usually takes 2–4 days. Larger or multi-surface projects may take longer. We always provide a clear timeline before starting.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We serve all major areas across Southern Ontario including Toronto, Mississauga, Hamilton, Vaughan, Oakville, Niagara Falls, and more.",
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
            Have questions about our painting services? We’ve got answers.
            If you need more help, feel free to contact us anytime.
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
                  <span className="ml-2 transition-transform group-open:rotate-180">▼</span>
                </summary>
                <p className="text-gray-700 mt-4 leading-relaxed">{faq.answer}</p>
              </details>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
