import { motion } from 'framer-motion';
import Head from "next/head";
import Link from "next/link";
import React from "react";

const locations = [
    "Toronto",
    "Mississauga",
    "Vaughan",
    "Hamilton",
    "Markham",
    "Oakville",
    "Richmond Hill",
    "Burlington",
    "Niagara Falls",
    "St. Catharines",
];

// Define schema markup outside the component
const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.atlaspainting.com/#business",
    "name": "Atlas Painting",
    "url": "https://www.atlaspainting.com",
    "areaServed": locations,
    "telephone": "+1-123-456-7890",
    "description": "Professional painting services in the Greater Toronto and Niagara Region."
};

const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Commercial Painting",
    "provider": {
        "@id": "https://www.atlaspainting.com/#business"
    },
    "areaServed": locations,
    "description": "Professional commercial painting services for businesses, including interior and exterior painting.",
    "url": "https://www.atlaspainting.com/services/commercial-painting"
};

const CommercialPainting: React.FC = () => {
    return (
        <div className="min-h-screen bg-white">
            <Head>
                <title>Professional Commercial Painting Services | Atlas Painting</title>
                <meta
                    name="description"
                    content="Atlas Painting offers expert commercial painting services for businesses in Toronto, Mississauga, Vaughan, and surrounding areas. Enhance your commercial space with our professional painting solutions."
                />
                <link rel="canonical" href="https://www.atlaspainting.com/services/commercial-painting" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@graph": [localBusinessSchema, serviceSchema]
                        })
                    }}
                />
            </Head>

            <div className="container mx-auto px-6 pt-32 pb-16">
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-16"
                >
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">
                        Expert Commercial Painting Services
                    </h1>
                    <p className="text-gray-600 mb-6">
                        <Link href="/">
                            <span className="text-blue-600 hover:underline">Atlas Painting</span>
                        </Link> provides top-tier commercial painting services designed to meet the unique needs of businesses. Our skilled team delivers exceptional results with minimal disruption to your operations.
                    </p>

                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                        Our Commercial Painting Solutions
                    </h2>
                    <h3 className="text-xl font-medium text-gray-800 mb-3">
                        Interior Commercial Painting
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Create a professional and inviting atmosphere for your clients and employees with our high-quality interior painting services. We use premium paints and meticulous techniques to ensure a flawless finish.
                    </p>

                    <h3 className="text-xl font-medium text-gray-800 mb-3">
                        Exterior Commercial Painting
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Make a strong first impression with a fresh, durable exterior paint job. Our team uses weather-resistant paints and proven methods to enhance your building’s appearance and protect it from the elements.
                    </p>

                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                        Proudly Serving the Greater Toronto and Niagara Region
                    </h2>
                    <ul className="list-disc list-inside text-gray-600 mb-6">
                        {locations.map((city) => (
                            <li key={city}>{city}</li>
                        ))}
                    </ul>

                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                        Recent Projects & Testimonials
                    </h2>
                    <p className="text-gray-600">
                        Discover our <Link href="/gallery">
                            <span className="text-blue-600 hover:underline">latest projects</span>
                        </Link> showcasing exceptional quality, creativity, and client satisfaction across all service areas.
                    </p>
                </motion.section>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 text-gray-600"
                >
                    <p>
                        Ready to enhance your commercial space? <Link href="/pricing"><span className="text-blue-600 hover:underline">Get an estimate</span></Link> or <Link href="mailto:atlas.homeservices@icloud.com"><span className="text-blue-600 hover:underline">contact</span></Link> Atlas Painting directly for a complimentary consultation and quote.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default CommercialPainting;