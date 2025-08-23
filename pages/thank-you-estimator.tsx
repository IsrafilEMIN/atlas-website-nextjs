import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import MinimalLayout from '@/components/layout/MinimalLayout';
import type { NextPageWithLayout } from '@/pages/_app';

const ThankYouEstimatorPage: NextPageWithLayout = () => {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Thank You! Your Estimator is on its Way - Atlas HomeServices</title>
                <meta name="robots" content="noindex" />
            </Head>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4 py-12">
                <div className="w-full max-w-4xl mx-auto text-center">
                    
                    <div className="mb-8">
                        <svg className="mx-auto h-16 w-16 text-emerald-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-extrabold text-white">
                        You&apos;re All Set!
                    </h1>
                    <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                        We&apos;ve just sent the **Homeowner&apos;s Shield Estimator** to your email inbox. Please check your spam or promotions folder if you don&apos;t see it in the next few minutes.
                    </p>

                    {/* Value-add Section for Nurture Leads */}
                    <div className="mt-12 bg-gray-800 border border-gray-700 rounded-2xl p-8 max-w-2xl mx-auto">
                        <h2 className="text-2xl font-bold text-yellow-400 mb-4">Planning Your Perfect Project</h2>
                        <p className="text-gray-400 mb-6">
                            Whether you&apos;re budgeting for the future or planning a DIY project, having the right information is key. Here are some resources to help you get started.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button 
                                onClick={() => router.push('/blog/painting-guide')} // Replace with your actual blog URL
                                className="bg-gray-700 text-white font-bold py-3 px-6 rounded-full hover:bg-gray-600 transition-colors"
                            >
                                Read Our Home Painting Guide
                            </button>
                            <button 
                                onClick={() => router.push('/gallery')} // Replace with your gallery URL
                                className="bg-transparent border-2 border-yellow-400 text-yellow-400 font-bold py-3 px-6 rounded-full hover:bg-yellow-400 hover:text-gray-900 transition-colors"
                            >
                                Explore Our Work
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

ThankYouEstimatorPage.getLayout = function getLayout(page: React.ReactElement) {
    return <MinimalLayout>{page}</MinimalLayout>;
};

export default ThankYouEstimatorPage;
