import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";

interface TestimonialsProps {
  testimonials: {
    id: string;
    customerName: string;
    comment: string;
    serviceType: string;
    rating: number;
    createdAt: string;
  }[];
  averageRating: number;
  totalReviews: number;
}

export default function Testimonials({
  testimonials,
  averageRating,
  totalReviews,
}: TestimonialsProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const schemaPayload = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HomeAndConstructionBusiness",
        "@id": "https://atlas-paint.com/#localBusiness",
        "name": "Atlas HomeServices",
        "url": "https://atlas-paint.com/",
        "logo": "https://atlas-paint.com/logo.png",
        "description":
          "Professional house and commercial painting services in Toronto, Mississauga, Niagara Falls, and surrounding areas.",
        "telephone": "+1-647-916-0826",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "123 Main St",
          "addressLocality": "Toronto",
          "addressRegion": "ON",
          "postalCode": "M4B 1B3",
          "addressCountry": "CA",
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": averageRating.toFixed(1),
          "reviewCount": totalReviews.toString(),
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaPayload) }}
        />
      </Head>

      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted House Painters with 5-Star Reviews
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover why homeowners and business owners across the GTA, Mississauga, and Niagara region recommend Atlas Painting.
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-yellow-500 text-xl font-semibold">
              {[...Array(Math.round(averageRating))].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
              <span className="text-gray-800 text-base">
                {averageRating.toFixed(1)} ({totalReviews} reviews)
              </span>
            </div>
            <Link
              href="https://atlas-paint.com/all-reviews/"
              className="text-black hover:underline mt-2 inline-block"
            >
              Read all testimonials →
            </Link>
          </motion.div>

          <div className="relative max-w-6xl mx-auto">
            {/* Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 z-10 hidden md:block">
              <Button onClick={scrollPrev} variant="outline" size="icon" className="rounded-full bg-white border border-gray-200 hover:bg-gray-100 hover:border-gray-300 -translate-x-16">
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-0 z-10 hidden md:block">
              <Button onClick={scrollNext} variant="outline" size="icon" className="rounded-full bg-white border border-gray-200 hover:bg-gray-100 hover:border-gray-300 translate-x-16">
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>

            {/* Carousel */}
            <div className="overflow-hidden px-4 md:px-24" ref={emblaRef}>
              <div className="flex">
                {testimonials.map((review, index) => (
                  <div
                    key={review.id}
                    className="flex-[0_0_85%] min-w-0 sm:flex-[0_0_45%] lg:flex-[0_0_30%] pl-4"
                    itemScope
                    itemType="https://schema.org/Review"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="p-6 h-full flex flex-col justify-between bg-white border border-gray-200 hover:border-primary transition-all duration-200">
                        <div>
                          <div className="flex mb-4" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                            ))}
                            <meta itemProp="ratingValue" content={review.rating.toString()} />
                          </div>
                          <p className="text-gray-700 mb-4 line-clamp-5" itemProp="reviewBody">
                            {review.comment}
                          </p>
                          <p className="text-sm text-gray-500">
                            Service: {review.serviceType}
                          </p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <p className="font-semibold text-gray-900" itemProp="author">
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

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-12"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Trusted by Homeowners & Businesses Alike
            </h3>
            <p className="text-gray-600 mb-6">
              See why property owners across Toronto and Niagara choose Atlas Painting for quality and reliability.
            </p>
            <Link href="https://atlas-paint.com/booking/">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/80">
                Book For Your Free Quote
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
