import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

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
            '@id': 'https://atlas-paint.com/services/residential-painting#service',
            'serviceType': 'Residential Painting',
            'provider': {
                '@id': 'https://atlas-paint.com/#localBusiness',
            },
            'areaServed': {
                '@type': 'Place',
                'name': 'Toronto, Mississauga, Vaughan, Hamilton, Niagara',
            },
            'description': 'High-quality residential painting services for homes, apartments, townhouses, etc.',
        },
    ],
};

const schemaPayload = {
    '@context': 'https://schema.org',
    '@graph': [localBusinessSchema],
};

const ResidentialPainting: React.FC = () => {
    return (
        <div className="min-h-screen bg-white">
            <Head>
                <title>Expert House Painters in Toronto | Atlas HomeServices</title>
                <meta name="description" content="Top-rated house painters in Toronto offering high-quality residential painting services. Transform your home with our expert team." />
                <link rel="canonical" href="https://atlas-paint.com/services/residential-painting/" />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaPayload) }} />
            </Head>
            <div className="container mx-auto px-6 pt-32 pb-16">
                <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">Expert House Painters in Toronto</h1>
                    <p className="text-gray-600 mb-6 leading-7">
                        As a leading house painter in Toronto, Atlas HomeServices offers top-tier residential painting services. Our team of skilled home painters is committed to transforming your house into a stunning, welcoming space with meticulous attention to detail.
                    </p>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Residential Painting Solutions</h2>
                    <h3 className="text-xl font-medium text-gray-800 mb-3">Interior House Painting</h3>
                    <p className="text-gray-600 mb-6 leading-7">
                        Our interior house painting services are designed to create a warm, inviting atmosphere. We use only the highest quality paints to ensure a flawless finish.
                    </p>
                    <h3 className="text-xl font-medium text-gray-800 mb-3">Exterior Home Painting</h3>
                    <p className="text-gray-600 mb-6 leading-7">
                        Your home’s exterior is the first thing visitors see. Our team uses weather-resistant paints to enhance your home’s appearance and protect it from the elements.
                    </p>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Proudly Serving</h2>
                    <p className="text-gray-600 mb-6 leading-7">
                        {locations.join(', ')}
                    </p>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Choose Atlas HomeServices?</h2>
                    <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                        <li>Experienced House Painters</li>
                        <li>Quality Materials for Your Home</li>
                        <li>Personalized Service for Each Project</li>
                        <li>Local Experts in Toronto, Mississauga, etc.</li>
                    </ul>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
                    <div className="text-gray-600 mb-6 space-y-4">
                        <p><strong>What areas do you serve for house painting?</strong></p>
                        <p className="leading-7">{locations.join(', ')}</p>
                        <p><strong>What types of residential properties do you paint?</strong></p>
                        <p className="leading-7">Homes, apartments, townhouses, etc.</p>
                        <p><strong>How do I get a quote for my home painting project?</strong></p>
                        <p className="leading-7">Fill out our online form or contact us directly.</p>
                    </div>
                </motion.section>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-12 text-gray-600">
                    <p className="leading-7">
                        Ready to transform your home? <Link href="/pricing"><span className="text-blue-600 hover:underline">Get an estimate</span></Link> or <Link href="mailto:atlas.homeservices@icloud.com"><span className="text-blue-600 hover:underline">contact</span></Link> us directly.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default ResidentialPainting;