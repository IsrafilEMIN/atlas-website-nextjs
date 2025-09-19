// src/pages/painting-thank-you-high.tsx
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import MinimalLayout from '@/components/layout/MinimalLayout';
import type { NextPageWithLayout } from '@/pages/_app';

const PaintingThankYouHigh: NextPageWithLayout = () => {
    const router = useRouter();
    const [name, setName] = useState('Valued Customer');
    const [message, setMessage] = useState('We hope our tools and guides can help you.');

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
                if (leadData.intent) {
                    const intent = leadData.intent;
                    if (['hire_now', 'hire_1_month', 'hire_1_3_months', 'budgeting_3_plus_months'].includes(intent)) {
                        setMessage("Our team will contact you shortly. In the meantime, explore our tools and guides.");
                    } else {
                        setMessage("We hope our tools and guides can help you.");
                    }
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
                <meta name="robots" content="noindex" />
            </Head>
            <div className="flex flex-col items-center min-h-screen relative text-white challenge-page-gradient">
                <div className="w-full px-4 sm:px-6 lg:px-6 py-8 sm:py-10 text-center z-10">
                    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
                        <h1 className="text-3xl md:text-6xl font-extrabold tracking-tight uppercase">Thank You<br></br> {name}</h1>
                        <p className="text-2xl md:text-3xl">{message}</p>
                        <div className="flex justify-center">
                            <svg className="w-28 h-28 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <p className="text-xl md:text-2xl bg-white/10 p-4 rounded-lg shadow-md text-center">Check your email for the full bundle<br></br><i><u>check your spam folder</u></i></p>
                        <p className="text-xl md:text-2xl font-semibold">⬇️ You can also access them below ⬇️</p>
                        <div className="flex flex-col space-y-4">
                            <a href="https://atlas-paint.com/color-collection.pdf" download className="bg-[#093373] text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-800 transition-colors shadow-lg">Download &quot;The Room Inspiration Color Collection&quot;</a>
                            <a href="https://atlas-paint.com/estimatora7b3x9c2v1z4pq8r" target="_blank" className="bg-[#093373] text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-800 transition-colors shadow-lg">Open Estimator Tool</a>
                        </div>
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