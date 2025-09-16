// src/pages/painting-thank-you.tsx
import React, { useEffect, useState } from 'react'; // Import useState
import Head from 'next/head';
import { useRouter } from 'next/router';
import MinimalLayout from '@/components/layout/MinimalLayout';
import type { NextPageWithLayout } from '@/pages/_app';
import Image from 'next/image';

const PaintingThankYou: NextPageWithLayout = () => {
    const router = useRouter();
    // 1. Use state for the name, with a default fallback.
    const [name, setName] = useState('Valued Customer');

    useEffect(() => {
        // 2. All sessionStorage logic is now safely inside useEffect.
        const canAccess = sessionStorage.getItem('canAccessThankYou');
        if (!canAccess) {
            router.push('/painting-landing'); // Redirect if not authorized
            return; // Exit early
        }

        const leadDataString = sessionStorage.getItem('leadDataForThankYou');
        if (leadDataString) {
            try {
                const leadData = JSON.parse(leadDataString);
                // 3. Update the state with the name from sessionStorage.
                if (leadData.name) {
                    setName(leadData.name);
                }
            } catch (error) {
                console.error("Error parsing leadData from sessionStorage:", error);
                // Handle potential JSON parsing errors if needed
            }
        }
    }, [router]);

    // The line that caused the error has been removed from here.

    return (
        <>
            <Head>
                <title>Thank You - Atlas HomeServices</title>
                <meta name="description" content="Thank you for choosing Atlas HomeServices. We're excited to help with your painting project!" />
            </Head>
            <div className="flex flex-col items-center min-h-screen relative text-white pb-20 challenge-page-gradient">
                <div className="w-full px-4 sm:px-6 lg:px-6 py-8 sm:py-10 text-center z-10">
                    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
                        {/* This h1 now uses the 'name' from state */}
                        <h1 className="text-3xl md:text-7xl font-extrabold tracking-tight uppercase">Thank You<br></br> {name}</h1>
                        <p className="text-2xl md:text-4xl">You&apos;ve made an <strong>amazing decision</strong> by choosing Atlas HomeServices for your painting project.</p>
                        <div className="flex justify-center">
                            <svg className="w-32 h-32 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <p className="text-xl md:text-2xl font-semibold bg-white/10 p-4 rounded-lg shadow-md">We&apos;ll reach out to you within 1 hour between 8AM - 8PM.</p>
                        <p className="text-xl md:text-2xl">Our team of experts is thrilled to bring your vision to life with our hassle-free, high-quality painting services.</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col justify-between">
                                <div className="flex-grow flex items-center justify-center mb-4">
                                    <Image
                                        src="/paintingOfferImages/painting-offer-image-01.jpg"
                                        alt="Beautiful painting result"
                                        width={400} // Increased width for better display, maintaining aspect ratio
                                        height={250} // Adjusted height to maintain a common aspect ratio, e.g., 16:10 or 4:3
                                        className="rounded-lg object-contain max-h-full max-w-full" // Use object-contain and max-h/max-w to ensure centering without cropping
                                        unoptimized
                                    />
                                </div>
                                <p className="text-lg font-bold">Stunning transformations await!</p>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col justify-between">
                                <div className="flex-grow flex items-center justify-center mb-4">
                                    <Image
                                        src="/paintingOfferImages/painting-offer-image-02.jpg"
                                        alt="Professional painters at work"
                                        width={400}
                                        height={250}
                                        className="rounded-lg object-contain max-h-full max-w-full"
                                        unoptimized
                                    />
                                </div>
                                <p className="text-lg font-bold">Expert craftsmanship guaranteed.</p>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col justify-between">
                                <div className="flex-grow flex items-center justify-center mb-4">
                                    <Image
                                        src="/testimonialImages/testimonial-image-01.png"
                                        alt="Happy customer review"
                                        width={400}
                                        height={250}
                                        className="rounded-lg object-contain max-h-full max-w-full"
                                        unoptimized
                                    />
                                </div>
                                <p className="text-lg font-bold">Join our delighted clients.</p>
                            </div>
                        </div>
                        <p className="text-lg mt-8">In the meantime, if you have any immediate questions, feel free to contact us at your convenience.</p>
                        <button 
                            onClick={() => router.push('/painting-landing')}
                            className="mt-6 bg-[#093373] text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-800 transition-colors shadow-lg"
                        >
                            Return to Home
                        </button>
                    </div>
                </div>
            </div>
            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.8s ease-out;
                }
            `}</style>
        </>
    );
};

PaintingThankYou.getLayout = function getLayout(page: React.ReactElement) {
    return <MinimalLayout>{page}</MinimalLayout>;
};

export default PaintingThankYou;