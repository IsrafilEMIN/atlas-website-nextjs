import React, { useState, useEffect } from 'react';
import { ChevronRight, Star, Shield, Award, CheckCircle, Users, Clock, Palette, Sparkles } from 'lucide-react';

const LuxuryPaintingHomepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Sophisticated hero carousel data
  const heroSlides = [
  {
    title: "Professional Results",
    subtitle: "On Time, Every Time",
    description: "Quality painting services that keep your projects on schedule and on budget",
    image: "linear-gradient(135deg, #64748b 0%, #94a3b8 50%, #cbd5e1 100%)",
    accent: "#475569"
  },
  {
    title: "Trusted by Professionals",
    subtitle: "Realtors & General Contractors",
    description: "Reliable painting partner for flips, new construction, and commercial projects",
    image: "linear-gradient(135deg, #6b7280 0%, #9ca3af 50%, #d1d5db 100%)",
    accent: "#4b5563"
  },
  {
    title: "Quality Meets Speed",
    subtitle: "No Compromises",
    description: "Expert craftsmanship with efficient processes that deliver results when you need them",
    image: "linear-gradient(135deg, #78716c 0%, #a8a29e 50%, #d6d3d1 100%)",
    accent: "#57534e"
  }
];

  const steps = [
    {
      id: '01',
      name: 'Luxury Consultation',
      description: 'Comprehensive design consultation with premium color curation and detailed project planning.',
      icon: <Palette className="w-8 h-8" />,
      color: 'from-slate-600 to-slate-700'
    },
    {
      id: '02',
      name: 'Precision Preparation',
      description: 'Museum-quality surface preparation with premium protection for your furnishings.',
      icon: <Shield className="w-8 h-8" />,
      color: 'from-stone-600 to-stone-700'
    },
    {
      id: '03',
      name: 'Master Craftsmanship',
      description: 'Expert application using the finest materials and time-honored techniques.',
      icon: <Sparkles className="w-8 h-8" />,
      color: 'from-zinc-600 to-zinc-700'
    },
    {
      id: '04',
      name: 'White-Glove Finish',
      description: 'Meticulous cleanup and comprehensive quality inspection for perfection.',
      icon: <CheckCircle className="w-8 h-8" />,
      color: 'from-gray-600 to-gray-700'
    }
  ];

  const trustBadges = [
    { 
      name: '500+', 
      description: '  Projects',
      icon: <Users className="w-12 h-12 text-amber-600" />
    },
    { 
      name: '15+', 
      description: 'Years Mastery',
      icon: <Award className="w-12 h-12 text-amber-700" />
    },
    { 
      name: '100%', 
      description: 'Client Satisfaction',
      icon: <Star className="w-12 h-12 text-amber-600" />
    },
    { 
      name: '24/7', 
      description: 'Concierge Support',
      icon: <Clock className="w-12 h-12 text-amber-700" />
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Sophisticated Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Elegant Background */}
        <div 
          className="absolute inset-0 transition-all duration-2000 ease-out"
          style={{ 
            background: heroSlides[currentSlide].image,
            transform: isVisible ? 'scale(1)' : 'scale(1.05)',
            opacity: isVisible ? 1 : 0
          }}
        >
          {/* Subtle overlay pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30"></div>
          
          {/* Elegant floating elements */}
          <div className="absolute top-32 left-20 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-40 right-32 w-56 h-56 bg-amber-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
          <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-white/3 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>

        {/* Refined Content */}
        <div className="relative z-10 h-full flex items-center justify-center text-center px-8">
          <div className="max-w-5xl mx-auto space-y-10">
            <div 
              className={`transition-all duration-1500 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              <h1 className="text-6xl md:text-8xl font-light text-white leading-tight tracking-wide mb-4">
                {heroSlides[currentSlide].title}
              </h1>
              <h2 className="text-4xl md:text-5xl font-light text-stone-200 leading-tight tracking-widest">
                {heroSlides[currentSlide].subtitle}
              </h2>
            </div>

            <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto"></div>

            <p 
              className={`text-xl md:text-2xl text-stone-200 max-w-3xl mx-auto leading-relaxed font-light tracking-wide transition-all duration-1500 delay-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              {heroSlides[currentSlide].description}
            </p>

            <div 
              className={`flex flex-col sm:flex-row gap-6 justify-center items-center pt-8 transition-all duration-1500 delay-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              <button 
                className="group relative px-12 py-4 bg-white text-stone-800 rounded-sm font-medium text-lg tracking-wide overflow-hidden hover:bg-stone-100 transition-all duration-500 border border-stone-200 shadow-lg hover:shadow-xl"
                onClick={() => window.location.href = '/painting-landing?utm_source=hero_section&utm_medium=organic'}
              >
                <span className="relative z-10 flex items-center">
                  Request Consultation
                  <ChevronRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Elegant slide indicators */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-4">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`h-px transition-all duration-500 ${
                index === currentSlide ? 'w-12 bg-white' : 'w-8 bg-white/40'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Refined Trust Section */}
      <section className="py-24 bg-gradient-to-b from-stone-50 to-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mb-8"></div>
            <h3 className="text-sm font-medium text-stone-600 tracking-widest uppercase mb-4">Distinguished Excellence</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {trustBadges.map((badge) => (
              <div key={badge.name} className="text-center group">
                <div className="mb-6 flex justify-center transform group-hover:scale-105 transition-transform duration-500">
                  {badge.icon}
                </div>
                <p className="text-4xl font-light text-stone-800 mb-2 tracking-wide">{badge.name}</p>
                <p className="text-stone-600 font-light tracking-wide text-sm uppercase">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sophisticated Process Section */}
      <section className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-24">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mb-8"></div>
            <h2 className="text-5xl font-light text-stone-800 mb-8 tracking-wide">
              Our Signature <em className="text-stone-600">Process</em>
            </h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed font-light">
              A refined approach perfected over years of delivering exceptional results 
              for discerning homeowners who value quality above all else.
            </p>
          </div>

          <div className="space-y-20">
            {steps.map((step, index) => (
              <div key={step.id} className="group relative">
                <div className={`flex flex-col md:flex-row items-start gap-8 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className={`w-20 h-20 rounded-sm bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-105`}>
                      {step.icon}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 max-w-2xl">
                    <div className="flex items-center mb-4">
                      <span className="text-xs font-medium px-4 py-2 rounded-sm bg-stone-100 text-stone-600 mr-6 tracking-widest">
                        {step.id}
                      </span>
                      <h3 className="text-3xl font-light text-stone-800 tracking-wide">{step.name}</h3>
                    </div>
                    <p className="text-stone-600 text-lg leading-relaxed font-light">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Guide Section */}
      {/* <section className="py-32 bg-stone-50">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <div className="bg-white rounded-none shadow-2xl p-16 relative overflow-hidden border border-stone-100">
\            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-50 rounded-full blur-3xl opacity-60"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-stone-50 rounded-full blur-2xl opacity-80"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-stone-800 rounded-sm flex items-center justify-center mx-auto mb-8 shadow-lg">
                <Palette className="w-8 h-8 text-white" />
              </div>
              
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mb-8"></div>
              
              <h2 className="text-4xl font-light text-stone-800 mb-6 tracking-wide">
                Curated Color Collection 2025
              </h2>
              <p className="text-xl text-stone-600 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                An exclusive guide to sophisticated color palettes that enhance property value 
                while creating environments of timeless elegance.
              </p>
              
              <button 
                className="group bg-stone-800 text-white px-12 py-4 rounded-sm font-medium text-lg tracking-wide hover:bg-stone-700 transition-all duration-500 shadow-lg hover:shadow-xl border border-stone-700"
                onClick={() => {
                  console.log('Download luxury guide triggered');
                }}
              >
                <span className="flex items-center justify-center">
                  Download Collection
                  <ChevronRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
              
              <p className="text-sm text-stone-500 mt-6 font-light tracking-wide">Complimentary access • No obligations</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Sophisticated CTA Section */}
      <section className="py-16 bg-gradient-to-b from-stone-800 via-stone-900 to-stone-800 relative overflow-hidden">
        {/* Subtle background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-white/3 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-8">
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-12"></div>
          
          <h2 className="text-5xl md:text-6xl font-light text-white mb-8 leading-tight tracking-wide">
            Ready to Begin
            <span className="block text-stone-300 italic">Your Transformation?</span>
          </h2>
          <p className="text-xl text-stone-300 mb-16 max-w-2xl mx-auto font-light leading-relaxed">
            Join our distinguished clientele who have discovered the difference that true craftsmanship makes. 
            Your exceptional home awaits.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              className="group bg-white text-stone-800 px-12 py-4 rounded-sm font-medium text-lg tracking-wide hover:bg-stone-100 transition-all duration-500 shadow-xl hover:shadow-2xl border border-stone-200"
              onClick={() => window.location.href = '/painting-landing?utm_source=hero_section&utm_medium=organic'}
            >
              <span className="flex items-center justify-center">
                Schedule Consultation
                <ChevronRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LuxuryPaintingHomepage;