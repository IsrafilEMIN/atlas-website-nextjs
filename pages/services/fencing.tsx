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
            '@id': 'https://atlas-paint.com/services/fencing#service',
            'serviceType': 'Fencing Services',
            'provider': {
                '@id': 'https://atlas-paint.com/#localBusiness',
            },
            'areaServed': {
                '@type': 'Place',
                'name': 'Toronto, Mississauga, Vaughan, Hamilton, Niagara',
            },
            'description': 'Comprehensive fencing services including installation, repair, and maintenance for various types of fences.',
        },
    ],
};

const schemaPayload = {
    '@context': 'https://schema.org',
    '@graph': [localBusinessSchema],
};

const Fencing: React.FC = () => {
    return (
        <div className="min-h-screen bg-white">
            <Head>
                <title>Professional Fencing Services in Toronto | Atlas HomeServices</title>
                <meta name="description" content="Expert fence installation, repair, and maintenance services in Toronto, Mississauga, and surrounding areas. We offer a variety of fence types to suit your needs." />
                <link rel="canonical" href="https://atlas-paint.com/services/fencing/" />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaPayload) }} />
            </Head>
            <div className="container mx-auto px-6 pt-32 pb-16">
                <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">Expert Fence Installation & Repair Services in Toronto</h1>
                    <p className="text-gray-600 mb-6 leading-7">
                        As a top fence contractor in Toronto, Atlas HomeServices offers comprehensive fencing services including installation, repair, and maintenance. We specialize in various types of fences such as vinyl, wooden, chain link, and privacy fences.
                    </p>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Fencing Services</h2>
                    <h3 className="text-xl font-medium text-gray-800 mb-3">Vinyl Fence</h3>
                    <p className="text-gray-600 mb-6 leading-7">
                        Durable, low-maintenance, and aesthetically pleasing.
                    </p>
                    <h3 className="text-xl font-medium text-gray-800 mb-3">Wooden Fence</h3>
                    <p className="text-gray-600 mb-6 leading-7">
                        Classic look with various customization options.
                    </p>
                    <h3 className="text-xl font-medium text-gray-800 mb-3">Chain Link Fence</h3>
                    <p className="text-gray-600 mb-6 leading-7">
                        Affordable, secure, and versatile for different purposes.
                    </p>
                    <h3 className="text-xl font-medium text-gray-800 mb-3">Privacy Fence</h3>
                    <p className="text-gray-600 mb-6 leading-7">
                        Provides seclusion and enhances privacy.
                    </p>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Serving Areas</h2>
                    <p className="text-gray-600 mb-6 leading-7">
                        {locations.join(', ')}
                    </p>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Choose Atlas HomeServices?</h2>
                    <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                        <li>Experienced Fence Installers</li>
                        <li>Quality Materials for Durable Fences</li>
                        <li>Custom Designs for Your Property</li>
                        <li>Local Service in Toronto, Mississauga, etc.</li>
                    </ul>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
                    <div className="text-gray-600 mb-6 space-y-4">
                        <p><strong>What types of fences do you install?</strong></p>
                        <p className="leading-7">Vinyl, wooden, chain link, privacy, etc.</p>
                        <p><strong>How long does fence installation take?</strong></p>
                        <p className="leading-7">Depends on the type and size of the fence; we provide estimates based on your specific needs.</p>
                        <p><strong>Do you offer fence repair services?</strong></p>
                        <p className="leading-7">Yes, we handle all types of fence repairs.</p>
                    </div>
                </motion.section>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-12 text-gray-600">
                    <p className="leading-7">
                        Need fencing services? <Link href="/pricing"><span className="text-blue-600 hover:underline">Get an estimate</span></Link> or <Link href="mailto:atlas.homeservices@icloud.com"><span className="text-blue-600 hover:underline">contact</span></Link> us directly.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Fencing;