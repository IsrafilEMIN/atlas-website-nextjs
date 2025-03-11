import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import Head from "next/head";  // Import Head to inject JSON-LD
import { useTestimonials } from "@/lib/useTestimonials";

export default function Testimonials() {
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false); // Added state for desktop detection
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    containScroll: "trimSnaps",
  });

  const { testimonials, totalReviews, averageRating } = useTestimonials();

  // Build your JSON-LD schema payload with aggregateRating
  const schemaPayload = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HomeAndConstructionBusiness",
        "@id": "https://atlas-paint.com/#localBusiness",
        "name": "Atlas HomeServices",
        "url": "https://atlas-paint.com/",
        "logo": "https://atlas-paint.com/logo.png",
        "description": "Professional painting, drywall, and fencing services in Toronto and surrounding areas.",
        "telephone": "+1-647-916-0826",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "123 Main St",
          "addressLocality": "Toronto",
          "addressRegion": "ON",
          "postalCode": "M4B 1B3",
          "addressCountry": "CA"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": averageRating.toFixed(1),
          "reviewCount": totalReviews.toString()
        }
      }
    ]
  };

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Detect desktop width
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768); // Matches md breakpoint
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  // Update Embla options on desktop change
  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit({
        loop: true,
        align: "center",
        skipSnaps: false,
        containScroll: "trimSnaps",
        watchDrag: !isDesktop, // Disable dragging on desktop
      });
    }
  }, [emblaApi, isDesktop]);

  useEffect(() => {
    setMounted(true);
  }, [emblaApi]);

  if (!mounted) {
    return null;
  }

  return (
      <>
        {/* Inject the JSON-LD schema into the head */}
        <Head>
          <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaPayload) }}
          />
        </Head>
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="container mx-auto px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                What Our Clients Say
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Real experiences from our valued customers
              </p>
              <Link href="/all-reviews" className="text-black hover:underline mt-2 inline-block">
                See all reviews →
              </Link>
            </motion.div>

            <div className="relative max-w-6xl mx-auto">
              <div className="absolute top-1/2 -translate-y-1/2 left-0 z-10 hidden md:block">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={scrollPrev}
                    className="rounded-full bg-white border border-gray-200 text-black hover:bg-gray-100 hover:border-gray-300 -translate-x-16 hover:text-black"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 right-0 z-10 hidden md:block">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={scrollNext}
                    className="rounded-full bg-white border border-gray-200 text-black hover:bg-gray-100 hover:border-gray-300 translate-x-16 hover:text-black"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>

              <div className="overflow-hidden px-4 md:px-24" ref={emblaRef}>
                <div className="flex">
                  {testimonials.map((review, index) => (
                      <div
                          key={review.id}
                          className="flex-[0_0_85%] min-w-0 sm:flex-[0_0_45%] lg:flex-[0_0_30%] pl-4"
                      >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <Card className="p-6 h-full flex flex-col justify-between bg-white border border-gray-200 hover:border-gray-300 transition-colors duration-200">
                            <div>
                              <div className="flex mb-4">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-5 h-5 text-yellow-400 fill-current"
                                    />
                                ))}
                              </div>
                              <p className="text-gray-700 mb-4">{review.comment}</p>
                              <p className="text-sm text-gray-500 mb-2">
                                Service: {review.serviceType}
                              </p>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <p className="font-semibold text-gray-900">
                                {review.customerName}
                              </p>
                              <p className="text-sm text-gray-500">
                                {new Date(review.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </Card>
                        </motion.div>
                      </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
  );
}