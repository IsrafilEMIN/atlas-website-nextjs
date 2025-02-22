
import * as React from "react";
import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/components/home/Hero"), {
    ssr: true,
});

const Features = dynamic(() => import("@/components/home/Features"), {
    ssr: true,
});

const ProductShowcase = dynamic(() => import("@/components/home/ProductShowcase"), {
    ssr: true,
});

const Testimonials = dynamic(() => import("@/components/home/Testimonials"), {
    ssr: true,
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
