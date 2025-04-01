"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const GALLERIES = [
  {
    slug: "residential",
    title: "Residential Painting",
    description: "Interior and exterior painting for homes and condos.",
    image: "/images/gallery/commercial/04.jpg",
    images: [],
  },
  {
    slug: "commercial",
    title: "Commercial Painting",
    description: "Painting for offices, shops, and commercial spaces.",
    image: "/images/gallery/commercial/04.jpg",
    images: [
      {
        src: "/images/gallery/commercial/04.jpg",
        alt: "School in Richmond Hill",
      },
      {
        src: "/images/gallery/commercial/02.jpg",
        alt: "Retail shop painting project in Toronto",
      },
      {
        src: "/images/gallery/commercial/03.jpg",
        alt: "Condo project in Mississauga",
      },
      {
        src: "/images/gallery/commercial/01.jpg",
        alt: "Office interior commercial painting in Vaughan",
      },
    ],
  },
  {
    slug: "wallcovering",
    title: "Wall Coverings",
    description: "Wallpaper and luxury wall finish installation.",
    image: "/images/gallery/commercial/04.jpg",
    images: [],
  },
  {
    slug: "fencing",
    title: "Fencing",
    description: "Fence painting and refinishing services.",
    image: "/images/gallery/commercial/04.jpg",
    images: [],
  },
];

type Gallery = (typeof GALLERIES)[number];

export default function GallerySection() {
  const [selectedGallery, setSelectedGallery] = useState<Gallery | null>(null);
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

  const handleSelect = (gallery: Gallery) => {
    setSelectedGallery(selectedGallery?.slug === gallery.slug ? null : gallery);
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Project Gallery</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Browse our latest painting projects by category.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {GALLERIES.map((gallery) => (
            <div
              key={gallery.slug}
              onClick={() => handleSelect(gallery)}
              className={`cursor-pointer bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all overflow-hidden ${
                selectedGallery?.slug === gallery.slug
                  ? "border-primary ring-1 ring-primary"
                  : ""
              }`}
            >
              <div className="relative w-full aspect-[16/9] bg-gray-100">
                <Image
                  src={gallery.image}
                  alt={gallery.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{gallery.title}</h3>
                <p className="text-sm text-gray-600">{gallery.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Expanded Carousel */}
        {selectedGallery && (
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-800">
                {selectedGallery.title} Projects
              </h3>
              <Button
                variant="ghost"
                onClick={() => setSelectedGallery(null)}
                className="text-gray-500 hover:text-black"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {selectedGallery.images.length === 0 ? (
              <div className="text-center text-gray-500 text-lg py-8">Coming soon...</div>
            ) : (
              <div className="relative">
                <button
                  onClick={scrollPrev}
                  className="absolute top-1/2 left-0 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-800" />
                </button>

                <div className="overflow-hidden px-4" ref={emblaRef}>
                  <div className="flex">
                    {selectedGallery.images.map((image, index) => (
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
          </div>
        )}
      </div>
    </section>
  );
}
