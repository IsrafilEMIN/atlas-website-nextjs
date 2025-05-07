"use client";

import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

/* ─ gallery data ─ */
const IMAGES = [
  { src: "/images/gallery/04.jpg", alt: "School in Richmond Hill" },
  { src: "/images/gallery/02.jpg", alt: "Retail shop in Toronto" },
  { src: "/images/gallery/03.jpg", alt: "Condo in Mississauga" },
  { src: "/images/gallery/01.jpg", alt: "Office in Vaughan" },
  { src: "/images/gallery/05.jpg", alt: "House in Oakville" },
  { src: "/images/gallery/06.jpg", alt: "House in Toronto" },
  { src: "/images/gallery/07.jpg", alt: "House in Niagara Falls" },
  { src: "/images/gallery/08.jpg", alt: "House in Hamilton" },
  { src: "/images/gallery/09.jpg", alt: "House in St. Catharines" },
  { src: "/images/gallery/10.jpg", alt: "House in Burlington" },
  { src: "/images/gallery/11.jpg", alt: "House in Oakville" },
  { src: "/images/gallery/12.jpg", alt: "House in Toronto" },
  { src: "/images/gallery/13.jpg", alt: "House in Vaughan" },
  { src: "/images/gallery/14.jpg", alt: "House in Mississauga" },
  { src: "/images/gallery/15.jpg", alt: "House in Niagara Falls" },
];

export default function GalleryCarousel() {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: "center" });
  const scrollPrev = useCallback(() => embla?.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla?.scrollNext(), [embla]);
  const [zoomed, setZoomed] = useState<{ src: string; alt: string } | null>(null);

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Title */}
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-3">
          Painting Projects
        </h2>

        {/* Mini-offer banner */}
        <p className="text-center text-gray-700 mb-10 text-sm sm:text-base">
          All projects shown are backed by our <strong>5-Year Warranty</strong> &{" "}
          <strong>No-Final-Payment-Until-You’re-Thrilled</strong> Promise.
        </p>

        {/* ────────── slider wrapper ────────── */}
        <div className="relative max-w-6xl mx-auto h-60 sm:h-72 md:h-80 lg:h-[30rem]">
          {/* ← arrow */}
          <button
            onClick={scrollPrev}
            className="absolute top-1/2 -translate-y-1/2 left-0 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-100"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>

          {/* track */}
          <div className="overflow-hidden px-4 h-full" ref={emblaRef}>
            <div className="flex h-full">
              {IMAGES.map((img, i) => (
                <div
                  key={i}
                  className="px-2 snap-center flex-[0_0_80%] sm:flex-[0_0_70%] md:flex-[0_0_60%] lg:flex-[0_0_50%]"
                >
                  <button
                    onClick={() => setZoomed(img)}
                    className="block w-full h-full focus:outline-none"
                  >
                    <div className="relative w-full h-full aspect-square overflow-hidden rounded-lg bg-gray-100 shadow-lg">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={500}
                        height={500}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* → arrow */}
          <button
            onClick={scrollNext}
            className="absolute top-1/2 -translate-y-1/2 right-0 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-100"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>
        </div>
      </div>

      {/* ────────── zoom overlay ────────── */}
      {zoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
          onClick={() => setZoomed(null)}
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setZoomed(null)}
              className="absolute top-4 right-4 p-2 bg-white/80 rounded-full backdrop-blur hover:bg-white"
            >
              <X className="w-5 h-5 text-gray-800" />
            </button>

            <Image
              src={zoomed.src}
              alt={zoomed.alt}
              width={1600}
              height={1000}
              className="object-contain w-full h-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}
