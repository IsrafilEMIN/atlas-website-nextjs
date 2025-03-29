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
            '@id': 'https://atlas-paint.com/services/drywall-plastering#service',
            'serviceType': 'Drywall & Plastering Services',
            'provider': {
                '@id': 'https://atlas-paint.com/#localBusiness',
            },
            'areaServed': {
                '@type': 'Place',
                'name': 'Toronto, Mississauga, Vaughan, Hamilton, Niagara',
            },
            'description': 'Expert drywall installation, repair, and plastering services to create smooth, durable walls and ceilings.',
        },
    ],
};

const schemaPayload = {
    '@context': 'https://schema.org',
    '@graph': [localBusinessSchema],
};

const DrywallPlastering: React.FC = () => {
    return (
        <div className="min-h-screen bg-white">
            <Head>
                <title>Professional Drywall & Plastering Services in Toronto | Atlas HomeServices</title>
                <meta name="description" content="Expert drywall installation, repair, and plastering services in Toronto, Mississauga, and surrounding areas. Trust our team for high-quality finishes." />
                <link rel="canonical" href="https://atlas-paint.com/services/drywall-plastering/" />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaPayload) }} />
            </Head>
            <div className="container mx-auto px-6 pt-32 pb-16">
                <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">Expert Drywall Installation & Plastering Services in Toronto</h1>
                    <p className="text-gray-600 mb-6 leading-7">
                        As a leading drywall contractor in Toronto, Atlas HomeServices offers comprehensive drywall installation, repair, and plastering services. Our experienced team delivers flawless finishes for both residential and commercial properties.
                    </p>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Services</h2>
                    <h3 className="text-xl font-medium text-gray-800 mb-3">Drywall Installation</h3>
                    <p className="text-gray-600 mb-6 leading-7">
                        We handle all aspects of drywall installation, from framing to finishing, ensuring a seamless look.
                    </p>
                    <h3 className="text-xl font-medium text-gray-800 mb-3">Plastering Services</h3>
                    <p className="text-gray-600 mb-6 leading-7">
                        Our plastering services include repairing cracks, applying new plaster, and creating decorative finishes.
                    </p>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Serving Areas</h2>
                    <p className="text-gray-600 mb-6 leading-7">
                        {locations.join(', ')}
                    </p>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Choose Atlas HomeServices?</h2>
                    <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                        <li>Expert Drywall Installers</li>
                        <li>Quality Plastering Services</li>
                        <li>Local Service in Toronto, Mississauga, etc.</li>
                    </ul>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
                    <div className="text-gray-600 mb-6 space-y-4">
                        <p><strong>What is the process for drywall installation?</strong></p>
                        <p className="leading-7">From framing to taping to finishing, we follow a detailed process to ensure quality.</p>
                        <p><strong>How do you handle plaster repairs?</strong></p>
                        <p className="leading-7">Our team assesses the damage, removes old plaster if necessary, and applies new plaster to match the existing surface.</p>
                        <p><strong>What areas do you serve for drywall services?</strong></p>
                        <p className="leading-7">{locations.join(', ')}</p>
                    </div>
                </motion.section>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-12 text-gray-600">
                    <p className="leading-7">
                        Need drywall or plastering services? <Link href="/pricing"><span className="text-blue-600 hover:underline">Get an estimate</span></Link> or <Link href="mailto:atlas.homeservices@icloud.com"><span className="text-blue-600 hover:underline">contact</span></Link> us directly.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default DrywallPlastering;