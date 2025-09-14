// pages/estimator-consultation.tsx
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import MinimalLayout from '@/components/layout/MinimalLayout';
import type { NextPageWithLayout } from '@/pages/_app';
import HubSpotWidget from '@/components/HubSpotWidget';

// Define a type for the data we expect from the previous page
type LeadData = {
  name: string;
  email: string;
};

const ConsultationPriceCalculator: NextPageWithLayout = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [leadData, setLeadData] = useState<LeadData | null>(null);

  useEffect(() => {
    const canAccess = sessionStorage.getItem('canAccessThankYou');
    if (canAccess === 'true') {
      const dataString = sessionStorage.getItem('leadDataForThankYou');
      if (dataString) {
        setLeadData(JSON.parse(dataString));
      }
      sessionStorage.removeItem('canAccessThankYou');
      sessionStorage.removeItem('leadDataForThankYou');
      setIsLoading(false);
    } else {
      router.replace('/estimator-landing');
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Schedule Your Consultation - Atlas HomeServices</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-12">
        <div className="w-full max-w-4xl mx-auto text-center">

          {/* --- NEW: Email Confirmation Message --- */}
          <div className="bg-emerald-100 text-emerald-900 p-4 rounded-lg mb-8 text-center border border-emerald-200">
            <p className="font-semibold">✅ Success! We&apos;ve sent the estimator to your email.</p>
            <p className="text-sm">If you don&apos;t see it in the next few minutes, please check your spam folder.</p>
          </div>

          {/* --- UPDATED: Headline and Sub-headline --- */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            Want Help Planning Your Project?
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Let our experts take care of everything from planning to the final coat. Schedule a free, no-obligation consultation call with our team below.
          </p>

          {/* --- EXISTING: HubSpot Widget --- */}
          <div className="mt-8 relative h-[650px] w-full">
            <HubSpotWidget 
              name={leadData?.name}
              email={leadData?.email}
            />
          </div>
        </div>
      </div>
    </>
  );
};

ConsultationPriceCalculator.getLayout = function getLayout(page: React.ReactElement) {
  return <MinimalLayout>{page}</MinimalLayout>;
};

export default ConsultationPriceCalculator;