// src/pages/painting-thank-you-high.tsx
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import MinimalLayout from '@/components/layout/MinimalLayout';
import type { NextPageWithLayout } from '@/pages/_app';
import Image from 'next/image';

const PaintingThankYouHigh: NextPageWithLayout = () => {
    const router = useRouter();
    const [name, setName] = useState('Valued Customer');

    useEffect(() => {
        const canAccess = sessionStorage.getItem('canAccessThankYou');
        if (!canAccess) {
            router.push('/painting-landing');
            return;
        }

        const leadDataString = sessionStorage.getItem('leadDataForThankYou');
        if (leadDataString) {
            try {
                const leadData = JSON.parse(leadDataString);
                if (leadData.name) {
                    setName(leadData.name);
                }
            } catch (error) {
                console.error("Error parsing leadData from sessionStorage:", error);
            }
        }
    }, [router]);

    return (
        <>
            <Head>
                <title>Thank You - Atlas HomeServices</title>
                <meta name="description" content="Thank you for choosing Atlas HomeServices. We're excited to help with your painting project!" />
            </Head>
            <div className="flex flex-col items-center min-h-screen relative text-white pb-20 challenge-page-gradient">
                <div className="w-full px-4 sm:px-6 lg:px-6 py-8 sm:py-10 text-center z-10">
                    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
                        <h1 className="text-3xl md:text-6xl font-extrabold tracking-tight uppercase">Thank You<br></br> {name}</h1>
                        <p className="text-2xl md:text-4xl">You&apos;re interested in new ideas, and we hope our tools and guides can help you.</p>
                        <div className="flex justify-center">
                            <svg className="w-32 h-32 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <p className="text-2xl mt-8">If you&apos;re expecting a free estimate, our team will reach out to you ASAP<br></br>(within 1 hour between 8AM - 8PM)</p>
                        <p className="text-xl md:text-2xl font-semibold bg-white/10 p-4 rounded-lg shadow-md text-left">Check your email for the full bundle:<br></br>✔️ The Room Inspiration Color Collection<br></br>✔️ The Instant Project Budget Planner Tool</p>
                        <p className="text-xl md:text-2xl font-semibold bg-white/10 p-4 rounded-lg shadow-md">⬇️ You can also access them below ⬇️</p>
                        <div className="flex flex-col space-y-4">
                            <a href="https://atlas-paint.com/color-collection.pdf" download className="bg-[#093373] text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-800 transition-colors shadow-lg">Download &quot;The Room Inspiration Color Collection&quot;</a>
                            <a href="https://atlas-paint.com/estimatora7b3x9c2v1z4pq8r" target="_blank" className="bg-[#093373] text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-800 transition-colors shadow-lg">Open Estimator Tool</a>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col justify-between">
                                <div className="flex-grow flex items-center justify-center mb-4">
                                    <Image
                                        src="/paintingOfferImages/painting-offer-image-01.jpg"
                                        alt="Beautiful painting result"
                                        width={400}
                                        height={250}
                                        className="rounded-lg object-contain max-h-full max-w-full"
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
                            onClick={() => router.push('/painting-landing?utm_source=thank_you_page')}
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

PaintingThankYouHigh.getLayout = function getLayout(page: React.ReactElement) {
    return <MinimalLayout>{page}</MinimalLayout>;
};

export default PaintingThankYouHigh;