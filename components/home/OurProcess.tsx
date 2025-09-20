// components/home/OurProcess.tsx
import { Palette, Shield, Sparkles, CheckCircle } from "lucide-react";

const steps = [
  {
    id: '01',
    name: 'Consultation & Quote',
    description: 'Detailed project assessment with transparent pricing and timeline discussion.',
    icon: Palette,
  },
  {
    id: '02', 
    name: 'Preparation & Protection',
    description: 'Professional surface prep and complete protection of your furniture and floors.',
    icon: Shield,
  },
  {
    id: '03',
    name: 'Expert Application',
    description: 'Skilled painters deliver flawless results using premium materials and proven techniques.',
    icon: Sparkles,
  },
  {
    id: '04',
    name: 'Quality Assurance',
    description: 'Thorough cleanup and final walkthrough to ensure your complete satisfaction.',
    icon: CheckCircle,
  },
];

export default function OurProcess() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-20">
          <div className="w-16 h-0.5 bg-slate-400 mx-auto mb-6"></div>
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            Our Streamlined Process
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Four clear steps from consultation to completion. No surprises, just professional results.
          </p>
        </div>

        {/* Process Grid */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={step.id} className="group">
                <div className="flex gap-6">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-slate-900 rounded-lg flex items-center justify-center group-hover:bg-slate-800 transition-colors duration-300">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-sm font-semibold px-3 py-1 bg-slate-100 text-slate-700 rounded-full">
                        {step.id}
                      </span>
                      <h3 className="text-xl font-semibold text-slate-900">
                        {step.name}
                      </h3>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
                
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block ml-7 mt-8 w-0.5 h-12 bg-slate-200"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center gap-2 text-slate-600">
            <span>Ready to get started?</span>
            <button className="font-semibold text-slate-900 hover:text-slate-700 transition-colors border-b border-slate-300 hover:border-slate-500">
              Get your free quote
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}