import * as React from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
// import GoogleReviewPill from "@/components/GoogleReviewPill";
import DownloadGuides from "@/components/home/DownloadGuides";

const Hero = dynamic(() => import("@/components/home/Hero"), { ssr: false });

export default function Home() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const schemaPayload = {
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

      {mounted && (
        <div className="bg-white min-h-screen">
          <main className="w-full">
            <Hero />
            <DownloadGuides />
            {/* <GoogleReviewPill 
              reviewLink="https://g.page/r/CXRbxbGzZYE3EBI/review" 
              rating={5} 
              reviewCount={5}
            /> */}
          </main>
        </div>
      )}
    </>
  );
}