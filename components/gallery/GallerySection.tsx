"use client";

import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ImageType {
  src: string;
  alt: string;
}

interface GalleryCarouselProps {
  title: string;
  images: ImageType[];
}

export default function GalleryCarousel({ title, images }: GalleryCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit({
        loop: true,
        align: "center",
        skipSnaps: false,
        containScroll: "trimSnaps",
        watchDrag: !isDesktop,
      });
    }
  }, [emblaApi, isDesktop]);

  useEffect(() => setMounted(true), [emblaApi]);
  if (!mounted) return null;

  return (
    <section className="mb-24">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
        {title}
      </h2>

      {images.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">Coming soon...</div>
      ) : (
        <div className="relative max-w-5xl mx-auto">
          <button
            onClick={scrollPrev}
            className="absolute top-1/2 left-0 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>

          <div className="overflow-hidden px-4" ref={emblaRef}>
            <div className="flex">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="flex-[0_0_80%] sm:flex-[0_0_70%] md:flex-[0_0_60%] lg:flex-[0_0_50%] px-2 snap-center"
                >
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={800}
                      height={500}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollNext}
            className="absolute top-1/2 right-0 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>
        </div>
      )}
    </section>
  );
}