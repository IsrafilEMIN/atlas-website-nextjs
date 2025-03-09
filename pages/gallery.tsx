import { motion } from "framer-motion";
import Head from "next/head";
import * as React from "react";

export default function Gallery() {
    const collectionPageSchema = {
        "@type": "CollectionPage",
        "@id": "https://atlas-paint.com/gallery",
        "url": "https://atlas-paint.com/gallery",
        "name": "Gallery - Atlas HomeServices",
        "description": "Browse our completed painting and construction projects.",
        "hasPart": [
            {
                "@type": "ImageObject",
                "@id": "https://atlas-paint.com/gallery#img1",
                "url": "https://atlas-paint.com/images/project1.jpg",
                "caption": "Interior painting project in Toronto."
            },
            {
                "@type": "ImageObject",
                "@id": "https://atlas-paint.com/gallery#img2",
                "url": "https://atlas-paint.com/images/project2.jpg",
                "caption": "Exterior fencing job in Mississauga."
            },
            {
                "@type": "ImageObject",
                "@id": "https://atlas-paint.com/gallery#img3",
                "url": "https://atlas-paint.com/images/project3.jpg",
                "caption": "Wall covering installation for a commercial client."
            }
            // ... add more images as needed
        ]
    };

    const schemaPayload = {
        "@context": "https://schema.org",
        ...collectionPageSchema
    };

    return (
      <div className="min-h-screen bg-white">
          <Head>
              <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                      __html: JSON.stringify(schemaPayload)
                  }}
              />
              <link rel="canonical" href="https://www.atlas-paint.com/gallery/" hrefLang="en" />
              <title>Residential & Commercial Painting Portfolio | Atlas HomeServices</title>
              <meta name="description" content="See our past projects! Browse our gallery of premium residential & commercial painting, drywall, and wall finishes. Get inspired—Book your project today!" />
          </Head>
        <div className="container mx-auto px-6 pt-32 pb-16 flex flex-col items-center justify-center">
          <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-gray-900 mb-8"
          >
            Our Work
          </motion.h1>
          <div className="flex-1 flex items-center justify-center w-full">
            <span className="text-2xl text-gray-600">Coming soon...</span>
          </div>
        </div>
      </div>
  );
}
