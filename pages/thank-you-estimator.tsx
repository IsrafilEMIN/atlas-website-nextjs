// pages/thank-you-estimator.tsx

import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import MinimalLayout from '@/components/layout/MinimalLayout';
import type { NextPageWithLayout } from '@/pages/_app';
import Image from 'next/image';

const ThankYouEstimatorPage: NextPageWithLayout = () => {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Thank You! Your Estimator is on its Way - Atlas HomeServices</title>
                <meta name="robots" content="noindex" />
            </Head>
            <div className="flex flex-col items-center min-h-screen relative bg-gray-900 text-white pb-20">
                <div className="w-full text-center bg-gradient-to-b from-gray-800 to-gray-900 py-4 md:py-8 px-4">
                    <p className="font-bold text-yellow-400 mb-2">TRUSTED BY HUNDREDS OF HOMEOWNERS</p>
                    <h1 className="text-3xl lg:text-5xl font-extrabold tracking-tight uppercase">FREE TOOL: THE HOMEOWNER&apos;S SHIELD</h1>
                    <p className="mt-4 text-sm lg:text-xl text-white max-w-4xl mx-auto">Free Estimator Tool Will Give You An Unfair Advantage When Hiring Painters. With A Fair & Clear Estimate In 60 Seconds, No More Doubt, No More Guesses.</p>
                    <div className="mt-8 grid grid-cols-1 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
                        <div className="w-full max-w-4xl mx-auto text-center">
                            <div className="mb-8">
                                <svg className="mx-auto h-16 w-16 text-emerald-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-white">
                                You&apos;re All Set!
                            </h1>
                            <p className="mt-4 text-lg lg:text-2xl text-gray-300 max-w-4xl mx-auto">
                                We&apos;ve just sent the <strong><u>Homeowner&apos;s Shield Estimator</u></strong> to your email inbox. Please check your spam or promotions folder if you don&apos;t see it in the next few minutes.
                            </p>
                        </div>
                        <div className="aspect-video overflow-hidden max-w-md mx-auto">
                            <Image src="/paintingOfferImages/estimator-tool-demo.png" alt="Demonstration of the free paint cost estimator tool" className="w-full h-full object-cover" width={1280} height={720} priority unoptimized />
                        </div>
                    </div>
                </div>
                <div className="w-full max-w-5xl mx-auto py-20 px-4 text-left">
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-center mb-12">WHAT THIS FREE TOOL UNLOCKS FOR YOU</h2>
                    <div className="space-y-10 text-lg">
                        <div className="flex items-start space-x-4">
                            <div className="text-2xl flex-shrink-0 text-yellow-400 mt-1">✓</div>
                            <div>
                                <h3 className="font-bold">Instantly Spot an Inflated Quote</h3>
                                <p className="text-gray-400">Get an unbiased price range based on local Richmond Hill data, so you know if a quote is fair, overpriced, or too good to be true.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="text-2xl flex-shrink-0 text-yellow-400 mt-1">✓</div>
                            <div>
                                <h3 className="font-bold">Understand Material Costs</h3>
                                <p className="text-gray-400">We&apos;ll show you the typical costs for different paint qualities so you can have an intelligent conversation with your painter about your options.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="text-2xl flex-shrink-0 text-yellow-400 mt-1">✓</div>
                            <div>
                                <h3 className="font-bold">Hire With 100% Confidence</h3>
                                <p className="text-gray-400">Stop guessing. Walk into any conversation knowing exactly what your project <em>should</em> cost and negotiate from a position of power.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="w-full bg-gray-900 py-12 px-4">
              <div className="max-w-4xl mx-auto text-center">
                
                <Image src="/assets/Header - Atlas HomeServices Transparent-White.png" alt="Company Logo" width={300} height={100} className="mx-auto mb-4" unoptimized />

                <div className="space-y-4 text-md text-gray-400">
                  <p>
                    This website is NOT endorsed by YouTube, Google or Facebook in any way. FACEBOOK is a trademark of FACEBOOK Inc. YOUTUBE is a trademark of GOOGLE Inc.
                  </p>
                  <p>
                    Individual experiences presented here may not be typical. Their background, education, effort, and application affected their experience. The information shared here are for example purposes and not a guarantee of a rate of return or a specific result. Your results may vary.
                  </p>
                  <p className="pt-4 text-gray-500">
                    © {new Date().getFullYear()} Atlas HomeServices Inc. | Richmond Hill, ON. All Rights Reserved.
                  </p>
                </div>
              </div>
            </footer>
        </>
    );
};

ThankYouEstimatorPage.getLayout = function getLayout(page: React.ReactElement) {
    return <MinimalLayout>{page}</MinimalLayout>;
};

export default ThankYouEstimatorPage;