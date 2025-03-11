import { motion } from "framer-motion";
import Head from "next/head";
import * as React from "react";
import Link from "next/link";

export default function Services() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "description": "Professional painting services for residential and commercial properties in Toronto.",
    "name": "Atlas HomeServices",
    "@id": "https://atlas-paint.com/",
    "logo": "https://atlas-paint.com/assets/apple-touch-icon.png",
    "url": "https://atlas-paint.com/",
    "telephone": "+1-647-916-0826",
    "priceRange": "$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "08:00",
        "closes": "20:00"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "8001 Woodsview Crescent",
      "addressLocality": "Niagara Falls",
      "addressRegion": "ON",
      "postalCode": "L2H 3E9",
      "addressCountry": "CA"
    },
    "image": "https://atlas-paint.com/assets/apple-touch-icon.png",
    "sameAs": [
      "https://www.instagram.com/atlas_homeservices/",
      "https://x.com/Atlas_Paint",
      "https://www.facebook.com/people/Atlas-HomeServices-Inc/61572733726450/"
    ]
  };

  // If you want to list multiple services in one go:
  const commercialPaintingService = {
    "@type": "Service",
    "@id": "https://atlas-paint.com/services#commercial-painting",
    "serviceType": "Commercial Painting",
    "provider": { "@id": "https://atlas-paint.com/#localBusiness" },
    "areaServed": {
      "@type": "Place",
      "name": "Toronto, Mississauga, Vaughan"
    },
    "description": "High-quality commercial painting solutions for offices and retail spaces."
  };

  const residentialPaintingService = {
    "@type": "Service",
    "@id": "https://atlas-paint.com/services#residential-painting",
    "serviceType": "Residential Painting",
    "provider": { "@id": "https://atlas-paint.com/#localBusiness" },
    "description": "Interior and exterior house painting to revitalize your home."
  };

  const drywallPlasteringService = {
    "@type": "Service",
    "@id": "https://atlas-paint.com/services#drywall-plastering",
    "serviceType": "Drywall & Plastering",
    "provider": { "@id": "https://atlas-paint.com/#localBusiness" },
    "areaServed": {
      "@type": "Place",
      "name": "Toronto, Mississauga, Vaughan, Hamilton, Niagara"
    },
    "description": "Expert drywall installation, repair, and plastering solutions for walls and ceilings."
  };

  const fencingService = {
    "@type": "Service",
    "@id": "https://atlas-paint.com/services#fencing",
    "serviceType": "Fencing",
    "provider": { "@id": "https://atlas-paint.com/#localBusiness" },
    "description": "Durable fencing solutions for residential and commercial properties."
  };

  const wallCoveringService = {
    "@type": "Service",
    "@id": "https://atlas-paint.com/services#wall-covering",
    "serviceType": "Wall Covering",
    "provider": { "@id": "https://atlas-paint.com/#localBusiness" },
    "description": "Decorative wall coverings and wallpaper installation to transform any interior."
  };

  // Combine them via @graph
  const schemaPayload = {
    "@context": "https://schema.org",
    "@graph": [localBusinessSchema, commercialPaintingService, residentialPaintingService, drywallPlasteringService, fencingService, wallCoveringService]
  };

  return (
      <div className="min-h-screen bg-white">
        <Head>
          <link rel="canonical" href="https://atlas-paint.com/services/" hrefLang="en" />
          <title>House Painting, Commercial Painting & Wall Covering Services | Atlas HomeServices</title>
          <meta
              name="description"
              content="Atlas HomeServices offers premium residential & commercial painting in the Greater Toronto Area, Niagara, Hamilton & more. Get a flawless finish—Call today!"
          />
          <meta name="keywords" content="house painting services, commercial painting, drywall installation, plastering, wall covering, Toronto painters, Niagara painting experts" />
          <meta property="og:title" content="Professional House & Commercial Painting Services | Atlas HomeServices" />
          <meta property="og:description" content="Looking for expert house painting or commercial painting services? Atlas HomeServices offers top-tier painting, drywall, and wall covering solutions in Toronto and nearby areas!" />
          <meta property="og:url" content="https://atlas-paint.com/services/" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="/assets/og-services.jpg" />
          <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaPayload) }}
          />
        </Head>
        <div className="container mx-auto px-6 pt-32 pb-16">
          <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-gray-900 mb-8"
          >
            Our Services
          </motion.h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link
                href="/services/residential-painting"
                className="block transition-transform hover:scale-[1.02] duration-300 w-full"
            >
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 h-80 overflow-hidden">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Residential Painting
                </h3>
                <p className="text-gray-600">
                  Transform your home with timeless elegance. Our expert painters deliver flawless interior and exterior finishes, using high-quality, durable paints that enhance beauty and protect your space. Whether it’s a modern refresh or classic restoration, we bring precision, craftsmanship, and sophistication to every brushstroke.
                </p>
              </div>
            </Link>

            <Link
                href="/services/commercial-painting"
                className="block transition-transform hover:scale-[1.02] duration-300 w-full"
            >
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 h-80 overflow-hidden">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Commercial Painting
                </h3>
                <p className="text-gray-600">
                  Elevate your business with a professional, high-end finish. From corporate offices to luxury retail spaces, we provide seamless, durable coatings designed to impress clients and enhance productivity. Our team works efficiently to minimize downtime, ensuring a flawless application with premium-grade, long-lasting materials.
                </p>
              </div>
            </Link>

            <Link
                href="/services/drywall-plastering"
                className="block transition-transform hover:scale-[1.02] duration-300 w-full"
            >
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 h-80 overflow-hidden">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Drywall & Plastering
                </h3>
                <p className="text-gray-600">
                  Flawless walls, perfect foundations. We specialize in expert drywall installation, repairs, and high-end plaster finishing, ensuring seamless, smooth surfaces for paint application. Whether fixing imperfections or preparing a space for a luxury finish, our craftsmanship delivers structural integrity and aesthetic perfection.
                </p>
              </div>
            </Link>

            <Link
                href="/services/wall-covering"
                className="block transition-transform hover:scale-[1.02] duration-300 w-full"
            >
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 h-80 overflow-hidden">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Wall Covering
                </h3>
                <p className="text-gray-600">
                  Enhance your walls with premium wall coverings that add texture, elegance, and personality to any space. From luxury wallpapers to durable vinyl coverings, our expert team ensures precise application for a flawless, long-lasting finish. Whether you&apos;re looking to create a bold statement or a subtle, sophisticated ambiance, we provide customized solutions for both residential and commercial interiors. Elevate your walls with high-quality materials and professional craftsmanship for a refined, stylish look.
                </p>
              </div>
            </Link>

            <Link
                href="/services/fencing"
                className="block transition-transform hover:scale-[1.02] duration-300 w-full"
            >
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 h-80 overflow-hidden">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Fencing
                </h3>
                <p className="text-gray-600">
                  Define and secure your property with expertly crafted fencing solutions. We offer a variety of high-quality materials, including wood, vinyl, and metal, to match your aesthetic and functional needs. Whether you&apos;re looking for privacy, security, or a decorative boundary, our skilled team ensures precision installation for durability and visual appeal. Enhance your outdoor space with a custom fence that blends strength, style, and long-lasting performance.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
  );
}
