import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

// List of service locations
const locations = [
  'Toronto',
  'Mississauga',
  'Vaughan',
  'Hamilton',
  'Markham',
  'Oakville',
  'Richmond Hill',
  'Burlington',
  'Niagara Falls',
  'St. Catharines',
];

// Schema markup for SEO
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'HomeAndConstructionBusiness',
      '@id': 'https://atlas-paint.com/#localBusiness',
      'name': 'Atlas HomeServices',
      'url': 'https://atlas-paint.com/',
      'logo': 'https://atlas-paint.com/logo.png',
      'description': 'Expert wall covering, wallpaper installation, and decorative finishes in Toronto and surrounding areas.',
      'telephone': '+1-647-916-0826',
      'priceRange': '$$',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': '123 Main St',
        'addressLocality': 'Toronto',
        'addressRegion': 'ON',
        'postalCode': 'M4B 1B3',
        'addressCountry': 'CA',
      },
    },
    {
      '@type': 'Service',
      '@id': 'https://atlas-paint.com/services/wall-covering#service',
      'serviceType': 'Wall Covering',
      'provider': {
        '@id': 'https://atlas-paint.com/#localBusiness',
      },
      'areaServed': {
        '@type': 'Place',
        'name': 'Toronto, Mississauga, Vaughan, Hamilton, Niagara',
      },
      'description': 'Transform your interiors with professional wallpaper installation and wall covering services.',
    },
  ],
};

const schemaPayload = {
  '@context': 'https://schema.org',
  '@graph': [localBusinessSchema],
};

// WallCovering component
const WallCovering: React.FC = () => {
  return (
      <div className="min-h-screen bg-white">
        {/* Head section for metadata and SEO */}
        <Head>
          <title>Expert Wallpaper Installation & Wall Covering Services in Toronto | Atlas HomeServices</title>
          <meta
              name="description"
              content="Transform your space with professional wallpaper installation, decorative finishes, and wall covering services in Toronto, Mississauga, and nearby areas."
          />
          <link rel="canonical" href="https://atlas-paint.com/services/wall-covering/" hrefLang="en" />
          <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(schemaPayload),
              }}
          />
        </Head>

        {/* Main content container */}
        <div className="container mx-auto px-6 pt-32 pb-16">
          <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-16"
          >
            {/* Page heading */}
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Expert Wallpaper Installation & Wall Covering Services in Toronto
            </h1>

            {/* Introductory paragraph with increased line height */}
            <p className="text-gray-600 mb-6 leading-7">
              Welcome to{' '}
              <Link href="/">
                <span className="text-blue-600 hover:underline">Atlas HomeServices</span>
              </Link>
              , your trusted provider of professional wall covering services in Toronto and beyond. From stunning wallpaper installation to elegant decorative finishes, our experienced team enhances your interiors with style and precision. Serving homeowners and businesses in Mississauga, Vaughan, and surrounding areas, we deliver exceptional quality every time.
            </p>

            {/* Wall covering solutions section */}
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Wall Covering Solutions</h2>

            {/* Wallpaper installation subsection */}
            <h3 className="text-xl font-medium text-gray-800 mb-3">Wallpaper Installation</h3>
            <p className="text-gray-600 mb-6 leading-7">
              Elevate your walls with our expert wallpaper installation services. Whether you prefer classic patterns, modern textures, or custom designs, we ensure a flawless application using materials like vinyl and fabric wallcoverings.
            </p>

            {/* Decorative finishes subsection */}
            <h3 className="text-xl font-medium text-gray-800 mb-3">Decorative Finishes</h3>
            <p className="text-gray-600 mb-6 leading-7">
              Add sophistication to your space with our decorative finishes. Options include textured paint, faux finishes, and specialty wallcoverings tailored to your unique vision.
            </p>

            {/* Paint subsection */}
            <h3 className="text-xl font-medium text-gray-800 mb-3">Interior Paint</h3>
            <p className="text-gray-600 mb-6 leading-7">
              Our interior painting services offer a wide range of colors and finishes to complement your style. We use high-quality paints for durable, beautiful results.
            </p>

            {/* Service area section */}
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Serving Toronto and Beyond</h2>
            <p className="text-gray-600 mb-6 leading-7">
              We provide wall covering services across the Greater Toronto Area and Niagara Region, including: {locations.join(', ')}.
            </p>

            {/* Why Choose Us section with increased spacing between list items */}
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Choose Atlas HomeServices?</h2>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li>Skilled Wallpaper Installers with Years of Experience</li>
              <li>Extensive Selection of Wall Covering Materials</li>
              <li>Customized Solutions for Homes and Businesses</li>
              <li>Trusted Local Service in Toronto, Mississauga, and More</li>
              <li>Commitment to Quality and Customer Satisfaction</li>
            </ul>

            {/* FAQs section with increased spacing */}
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="text-gray-600 mb-6 space-y-4">
              <p className="font-semibold">What types of wall coverings do you offer?</p>
              <p className="leading-7">We offer wallpaper installation (vinyl, fabric, custom), decorative finishes, and interior painting options.</p>
              <p className="font-semibold">Do you provide wallpaper removal services?</p>
              <p className="leading-7">Yes, we handle professional wallpaper removal to prep your walls for a fresh new look.</p>
              <p className="font-semibold">Which areas do you serve?</p>
              <p className="leading-7">We serve {locations.join(', ')} and surrounding regions.</p>
            </div>

            {/* Recent projects and testimonials */}
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Work Speaks for Itself</h2>
            <p className="text-gray-600 mb-6 leading-7">
              Check out our{' '}
              <Link href="/gallery">
                <span className="text-blue-600 hover:underline">recent projects</span>
              </Link>{' '}
              to see our wall covering expertise in action. Our clients in Toronto and Mississauga rave about our attention to detail and creativity.
            </p>
          </motion.section>

          {/* Call to action with increased line height */}
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 text-gray-600"
          >
            <p className="leading-7">
              Ready to refresh your walls?{' '}
              <Link href="/pricing">
                <span className="text-blue-600 hover:underline">Request a quote</span>
              </Link>{' '}
              or{' '}
              <Link href="mailto:atlas.homeservices@icloud.com">
                <span className="text-blue-600 hover:underline">contact us</span>
              </Link>{' '}
              today for a free consultation with our wall covering experts.
            </p>
          </motion.div>
        </div>
      </div>
  );
};

export default WallCovering;