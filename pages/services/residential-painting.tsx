import { motion } from "framer-motion";
import Head from "next/head";
// import Image from "next/image"; // Added for image
import Link from "next/link";   // Added for internal linking
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
    "@id": "https://atlas-paint.com/residential-painting#service",
    "serviceType": "Residential Painting",
    "provider": {
        "@id": "https://atlas-paint.com/#localBusiness"
    },
    "areaServed": {
        "@type": "Place",
        "name": "Toronto, Mississauga, Vaughan, Hamilton, Niagara"
    },
    "description": "Transform your home with professional interior and exterior residential painting services."
};

const schemaPayload = {
    "@context": "https://schema.org",
    "@graph": [localBusinessSchema, serviceSchema]
};


const ResidentialPainting: React.FC = () => {
    return (
        <div className="min-h-screen bg-white">
            <Head>
                <title>Professional Residential Painting Services in Toronto | Atlas HomeServices</title>
                <meta
                    name="description"
                    content="Premium residential painting services in Toronto, Mississauga, Vaughan, Hamilton, and surrounding areas. Interior & exterior painting by professional painting contractors."
                />
                <link rel="canonical" href="https://atlas-paint.com/services/residential-painting/" hrefLang="en" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(schemaPayload)
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
                        Expert Residential Painting Services
                    </h1>
                    {/* Added image */}
                    {/*<Image*/}
                    {/*    src="/images/residential-painting.jpg"*/}
                    {/*    alt="Professional residential painting services by Atlas HomeServices"*/}
                    {/*    width={800}*/}
                    {/*    height={400}*/}
                    {/*    className="mb-6 rounded-lg shadow-md"*/}
                    {/*/>*/}
                    {/* Added internal link to homepage */}
                    <p className="text-gray-600 mb-6">
                        <Link href="/">
                            <span className="text-blue-600 hover:underline">Atlas HomeServices</span>
                        </Link> offers premium residential painting services tailored specifically to your home&apos;s unique style and needs. Our experienced team ensures superior craftsmanship, from meticulous preparation to flawless finishes.
                    </p>

                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                        Our Residential Painting Solutions
                    </h2>
                    <h3 className="text-xl font-medium text-gray-800 mb-3">
                        Interior Painting
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Enhance the beauty and comfort of your home&apos;s interior spaces with our detail-oriented painting services, designed to provide lasting and impressive results.
                    </p>

                    <h3 className="text-xl font-medium text-gray-800 mb-3">
                        Exterior Painting
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Protect and beautify your home&apos;s exterior. Our professional painters use high-quality, weather-resistant paints to deliver exceptional curb appeal and durability.
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
                    {/* Added internal link to projects page */}
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
                    {/* Added internal link to contact page */}
                    <p>
                        Ready to enhance your home? <Link href="/pricing"><span className="text-blue-600 hover:underline">Get an estimate</span></Link> or <Link href="mailto:atlas.homeservices@icloud.com"><span className="text-blue-600 hover:underline">contact</span></Link> Atlas HomeServices directly for a complimentary consultation and quote.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default ResidentialPainting;