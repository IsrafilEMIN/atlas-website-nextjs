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
            'description': 'Professional painting, drywall, and fencing services in Toronto and surrounding areas.',
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
            '@id': 'https://atlas-paint.com/commercial-painting#service',
            'serviceType': 'Commercial Painting',
            'provider': {
                '@id': 'https://atlas-paint.com/#localBusiness',
            },
            'areaServed': {
                '@type': 'Place',
                'name': 'Toronto, Mississauga, Vaughan, Hamilton, Niagara',
            },
            'description': 'High-quality commercial painting services for offices, retail spaces, and industrial facilities.',
        },
    ],
};

const serviceSchema = {
    '@type': 'Service',
    '@id': 'https://atlas-paint.com/commercial-painting#service',
    'serviceType': 'Commercial Painting',
    'provider': {
        '@id': 'https://atlas-paint.com/#localBusiness',
    },
    'areaServed': {
        '@type': 'Place',
        'name': 'Toronto, Mississauga, Vaughan, Hamilton, Niagara',
    },
    'description': 'High-quality commercial painting solutions for offices, retail spaces, and industrial facilities.',
};

const schemaPayload = {
    '@context': 'https://schema.org',
    '@graph': [localBusinessSchema, serviceSchema],
};

// CommercialPainting component
const CommercialPainting: React.FC = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Head section for metadata and SEO */}
            <Head>
                <title>Expert Commercial Painting Contractor in Toronto | Atlas HomeServices</title>
                <meta
                    name="description"
                    content="Expert commercial painting contractor in Toronto, Mississauga, Vaughan, and surrounding areas. We offer high-quality commercial painting services to enhance your business's space."
                />
                <link rel="canonical" href="https://atlas-paint.com/services/commercial-painting/" hrefLang="en" />
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
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">Expert Commercial Painting Services</h1>

                    {/* Introductory paragraph with increased line height */}
                    <p className="text-gray-600 mb-6 leading-7">
                        At{' '}
                        <Link href="/">
                            <span className="text-blue-600 hover:underline">Atlas HomeServices</span>
                        </Link>
                        , we are a trusted painting contractor specializing in commercial painting services. We understand that
                        your business’s appearance plays a crucial role in your success. That’s why we offer top-tier commercial
                        painting services designed to meet your specific needs. Our team of professional commercial painters is
                        committed to providing high-quality results with minimal disruption to your operations.
                    </p>

                    {/* Painting solutions section */}
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Commercial Painting Solutions</h2>

                    {/* Interior painting subsection */}
                    <h3 className="text-xl font-medium text-gray-800 mb-3">Interior Commercial Painting</h3>
                    <p className="text-gray-600 mb-6 leading-7">
                        Our interior commercial painting services are designed to create a professional and inviting atmosphere
                        for your clients and employees. As experienced interior painters, we use only the highest quality paints
                        and meticulous techniques to ensure a flawless finish that stands the test of time.
                    </p>

                    {/* Exterior painting subsection */}
                    <h3 className="text-xl font-medium text-gray-800 mb-3">Exterior Commercial Painting</h3>
                    <p className="text-gray-600 mb-6 leading-7">
                        Your building’s exterior is the first thing your clients and customers see. Our team of skilled exterior
                        painters uses weather-resistant paints and proven methods to enhance your building’s appearance and
                        protect it from the elements. We ensure that your property makes a strong first impression.
                    </p>

                    {/* Service area section */}
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                        Proudly Serving the Greater Toronto and Niagara Region
                    </h2>
                    <p className="text-gray-600 mb-6 leading-7">
                        We proudly serve businesses in the Greater Toronto and Niagara Region, including{' '}
                        {locations.join(', ')}.
                    </p>

                    {/* Why Choose Us section with increased spacing between list items */}
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Choose Atlas HomeServices?</h2>
                    <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                        <li>
                            <strong>Experienced Commercial Painters:</strong> Our team consists of highly skilled and experienced
                            painters dedicated to delivering exceptional results.
                        </li>
                        <li>
                            <strong>Quality Materials:</strong> We use only the highest quality paints and materials to ensure
                            long-lasting finishes.
                        </li>
                        <li>
                            <strong>Minimal Disruption:</strong> We work efficiently to minimize any disruption to your business
                            operations during the painting process.
                        </li>
                        <li>
                            <strong>Local Expertise:</strong> Serving the Greater Toronto and Niagara Region, we understand the
                            unique needs of businesses in these areas.
                        </li>
                    </ul>

                    {/* FAQs section with increased spacing */}
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
                    <div className="text-gray-600 mb-6 space-y-4">
                        <p>
                            <strong>What areas do you serve?</strong>
                        </p>
                        <p className="leading-7">We serve businesses in {locations.join(', ')}.</p>
                        <p>
                            <strong>What types of commercial properties do you paint?</strong>
                        </p>
                        <p className="leading-7">
                            We handle a wide range of commercial properties, including offices, retail stores, restaurants,
                            warehouses, and more.
                        </p>
                        <p>
                            <strong>How do I get a quote for my project?</strong>
                        </p>
                        <p className="leading-7">
                            You can get an estimate by filling out our online form or contacting us directly for a consultation.
                        </p>
                    </div>

                    {/* Recent projects and testimonials */}
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recent Projects & Testimonials</h2>
                    <p className="text-gray-600 mb-6 leading-7">
                        Discover our{' '}
                        <Link href="/gallery">
                            <span className="text-blue-600 hover:underline">latest projects</span>
                        </Link>{' '}
                        showcasing exceptional quality, creativity, and client satisfaction across all service areas.
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
                        Ready to enhance your commercial space?{' '}
                        <Link href="/pricing">
                            <span className="text-blue-600 hover:underline">Get an estimate</span>
                        </Link>{' '}
                        or{' '}
                        <Link href="mailto:atlas.homeservices@icloud.com">
                            <span className="text-blue-600 hover:underline">contact</span>
                        </Link>{' '}
                        Atlas HomeServices directly for a complimentary consultation and quote.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default CommercialPainting;