import * as React from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

// --- Import your new home page sections ---
import Hero from "@/components/home/Hero";
import TrustBadges from "@/components/home/TrustBadges";
import OurProcess from "@/components/home/OurProcess";
import DownloadGuides from "@/components/home/DownloadGuides";

export default function Home() {
  const schemaPayload = {
    "@context": "https://schema.org",
    "@type": "PaintingContractor", // More specific type for your business
    "name": "Atlas HomeServices",
    "description": "Professional residential and commercial painting services in Toronto and the Greater Toronto Area. We deliver high-quality results with a focus on customer satisfaction.",
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
    // --- SEO ENHANCEMENT: Specify areas you serve ---
    "areaServed": [
      {
        "@type": "City",
        "name": "Toronto"
      },
      {
        "@type": "City",
        "name": "Mississauga"
      },
      {
        "@type": "City",
        "name": "Vaughan"
      },
      {
        "@type": "City",
        "name": "Hamilton"
      },
      {
        "@type": "City",
        "name": "Niagara"
      }
    ],
    "image": "https://atlas-paint.com/assets/apple-touch-icon.png",
    "sameAs": [
      "https://www.instagram.com/atlas_homeservices/",
      "https://x.com/Atlas_Paint",
      "https://www.facebook.com/people/Atlas-HomeServices-Inc/61572733726450/"
    ]
  };

  return (
    <>
      <Head>
        <link rel="canonical" href="https://atlas-paint.com/" hrefLang="en" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaPayload) }}
        />
        <title>Residential & Commercial Painters in Toronto | Atlas HomeServices</title>
        <meta
          name="description"
          content="Atlas HomeServices offers premium residential and commercial painting services in Toronto, Mississauga, Vaughan, Hamilton, Niagara, and surrounding areas. Call for a free quote!"
        />
      </Head>

      <div className="bg-white">
        <main className="w-full">
          <Hero />
          <TrustBadges />
          <OurProcess />
          <DownloadGuides /> {/* Kept your original component */}
        </main>
      </div>
    </>
  );
}