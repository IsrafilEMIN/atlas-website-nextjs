
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
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Painting Company",
                        "name": "Atlas Painting",
                        "@id": "https://atlas-paint.com/",
                        "logo": "https://i.imgur.com/UTbaF2Q.png",
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
                        "sameAs": [
                            "https://www.instagram.com/atlas_homeservices/",
                            "https://x.com/Atlas_Paint",
                            "https://www.facebook.com/people/Atlas-HomeServices-Inc/61572733726450/"
                        ]
                    }) }} />
                <title>Atlas - Premium Residential & Commercial Painting</title>
                <meta name="description" content="Atlas Painting offers premium residential & commercial painting in the Greater Toronto Area, Niagara, Hamilton & more. Get a flawless finish—Call today!" />
            </Head>
            <Header />

            <main className="w-full">
                <Hero />
                <Features />
                <Testimonials />
                <ProductShowcase />
            </main>
        </div>
    );
}
