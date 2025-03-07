import { motion } from "framer-motion";
import Head from "next/head";
import * as React from "react";

export default function WallCovering() {

  const localBusinessSchema = {
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
        }
      },
      {
        "@type": "Service",
        "@id": "https://atlas-paint.com/commercial-painting#service",
        "serviceType": "Commercial Painting",
        "provider": {
          "@id": "https://atlas-paint.com/#localBusiness"
        },
        "areaServed": {
          "@type": "Place",
          "name": "Toronto, Mississauga, Vaughan, Hamilton, Niagara"
        },
        "description": "High-quality commercial painting services for offices, retail spaces, and industrial facilities."
      }
    ]
  }

  const serviceSchema = {
    "@type": "Service",
    "@id": "https://atlas-paint.com/wall-covering#service",
    "serviceType": "Wall Covering",
    "provider": {
      "@id": "https://atlas-paint.com/#localBusiness"
    },
    "areaServed": {
      "@type": "Place",
      "name": "Toronto, Mississauga, Vaughan, Hamilton, Niagara"
    },
    "description": "Add style and protection to your walls with professional wall covering installations."
  };

  const schemaPayload = {
    "@context": "https://schema.org",
    "@graph": [localBusinessSchema, serviceSchema]
  };

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <link rel="canonical" href="https://www.atlas-paint.com/services/wall-covering/" />
        <title>
          Wall Covering Services in Toronto, Mississauga, Vaughan, Hamilton, Markham, Oakville, Richmond Hill, Burlington, Niagara Falls, and St. Catharines
        </title>
        <meta
          name="description"
          content="Premium wall covering services—wallpaper, vinyl, and specialty installations—in Toronto, Mississauga, Vaughan, Hamilton, Markham, Oakville, Richmond Hill, Burlington, Niagara Falls, and St. Catharines."
        />
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schemaPayload)
            }}
        />
      </Head>

      <div className="container mx-auto px-6 pt-32 pb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 mb-8"
        >
          Wall Covering Services
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 mb-8"
        >
          Elevate any interior with our premium wall covering services.
          From classic wallpapers to modern vinyl coverings, our
          skilled installers add personality, texture, and flair to
          homes and businesses alike.
        </motion.p>

        {/* Toronto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Wall Covering in Toronto
          </h2>
          <p className="text-gray-600">
            Transform Toronto interiors with an array of wall covering options.
            Whether you prefer bold patterns or subtle textures, our team
            ensures seamless application and a high-end finish that lasts.
            Add sophistication to offices, retail spaces, or living rooms
            with expert attention to detail.
          </p>
        </motion.div>

        {/* Mississauga */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-10"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Wall Covering in Mississauga
          </h2>
          <p className="text-gray-600">
            In Mississauga, our wall covering services offer a quick way
            to refresh any space. From durable vinyl coverings in high-traffic
            areas to intricate designer wallpapers for feature walls,
            we bring versatility and craftsmanship to every project.
          </p>
        </motion.div>

        {/* Vaughan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-10"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Wall Covering in Vaughan
          </h2>
          <p className="text-gray-600">
            Elevate your Vaughan home or business with tailored wall coverings.
            Our team helps you select materials, designs, and color schemes
            that complement your unique style. Professional installation
            guarantees a flawless result that boosts any interior aesthetic.
          </p>
        </motion.div>

        {/* Hamilton */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-10"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Wall Covering in Hamilton
          </h2>
          <p className="text-gray-600">
            Upgrade your Hamilton property with a stylish wall covering
            solution. Whether you want a minimalist accent or a vibrant,
            room-defining wallpaper, our meticulous installers ensure
            every roll and seam aligns perfectly for an elegant finish.
          </p>
        </motion.div>

        {/* Markham */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-10"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Wall Covering in Markham
          </h2>
          <p className="text-gray-600">
            Let us bring new life to your Markham home or commercial space
            with creative wall covering ideas. From subtle neutrals to
            statement-making prints, we tailor each project to your preferences,
            guaranteeing results that match your vision.
          </p>
        </motion.div>

        {/* Oakville */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-10"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Wall Covering in Oakville
          </h2>
          <p className="text-gray-600">
            Our Oakville clients enjoy a bespoke approach to wall coverings.
            We handle everything from material selection to final trim,
            ensuring minimal disruption and maximum visual impact.
            Trust our detail-oriented process for a flawless outcome.
          </p>
        </motion.div>

        {/* Richmond Hill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-10"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Wall Covering in Richmond Hill
          </h2>
          <p className="text-gray-600">
            Whether you crave a chic modern look or a classic design,
            our Richmond Hill wall covering services deliver results
            that stand out. Enhance your walls with premium materials,
            rich colors, or subtle patterns that reflect your style
            and elevate your ambiance.
          </p>
        </motion.div>

        {/* Burlington */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mb-10"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Wall Covering in Burlington
          </h2>
          <p className="text-gray-600">
            We help Burlington clients transform plain walls into works of art.
            From moisture-resistant vinyl for bathrooms to eye-catching
            wallpapers in living areas, our expert installation ensures
            lasting beauty in every room.
          </p>
        </motion.div>

        {/* Niagara Falls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mb-10"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Wall Covering in Niagara Falls
          </h2>
          <p className="text-gray-600">
            In Niagara Falls, we bring high-quality wall covering solutions
            to residential and commercial properties. Turn any room into a
            conversation piece with unique wallpapers and precise installation,
            all backed by our commitment to excellence.
          </p>
        </motion.div>

        {/* St. Catharines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mb-10"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Wall Covering in St. Catharines
          </h2>
          <p className="text-gray-600">
            Elevate your St. Catharines property with wall coverings that
            perfectly complement your décor. Our thorough preparation
            and precise installation techniques create polished,
            long-lasting results you&apos;ll love.
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-gray-600"
        >
          Ready to refresh your walls? Contact us for a consultation and explore
          the endless possibilities of wall coverings, from classic to contemporary.
          We&apos;re dedicated to helping you find the perfect fit for your style
          and budget.
        </motion.p>
      </div>
    </div>
  );
}
