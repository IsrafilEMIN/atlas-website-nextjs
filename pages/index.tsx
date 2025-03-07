
import * as React from "react";
import dynamic from "next/dynamic";
import Head from 'next/head';

const Hero = dynamic(() => import("@/components/home/Hero"), {
    ssr: false,
});

const Features = dynamic(() => import("@/components/home/Features"), {
    ssr: false,
});

const ProductShowcase = dynamic(() => import("@/components/home/ProductShowcase"), {
    ssr: false,
});

const Testimonials = dynamic(() => import("@/components/home/Testimonials"), {
    ssr: false,
});

const Header = dynamic(() => import("@/components/layout/Header"), {
    ssr: false,
});

export default function Home() {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className="bg-white min-h-screen">
            <Head>
                <link rel="canonical" href="https://www.atlas-paint.com/" />
                <script type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
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
                    })
                }}/>
                <title>Residential & Commercial Painters in Toronto | Atlas HomeServices</title>
                <meta name="description" content="Atlas HomeServices offers premium residential and commercial painting services in Toronto, Mississauga, Vaughan, Hamilton, Niagara, and surrounding areas. Call for a free quote!"/>
            </Head>
            <Header/>

            <main className="w-full">
                <Hero/>
                <Features/>
                <Testimonials/>
                <ProductShowcase/>
            </main>
        </div>
    );
}
