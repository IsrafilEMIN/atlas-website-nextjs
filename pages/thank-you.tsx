// pages/thank-you.tsx
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
  // you can add other fields here if needed by the widget
};

const ThankYouPage: NextPageWithLayout = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [leadData, setLeadData] = useState<LeadData | null>(null);

  useEffect(() => {
    // This effect runs on the client-side after the page loads
    const canAccess = sessionStorage.getItem('canAccessThankYou');

    if (canAccess === 'true') {
      // --- ACCESS GRANTED ---
      // 1. Retrieve the user's data from sessionStorage
      const dataString = sessionStorage.getItem('leadDataForThankYou');
      if (dataString) {
        setLeadData(JSON.parse(dataString));
      }

      // 2. IMPORTANT: Remove the items to make this a one-time access
      sessionStorage.removeItem('canAccessThankYou');
      sessionStorage.removeItem('leadDataForThankYou');

      // 3. Allow the page to render
      setIsLoading(false);
    } else {
      // --- ACCESS DENIED ---
      // Redirect user away because they didn't come from the form.
      // router.replace() prevents them from using the 'back' button to return here.
      router.replace('/painting-offer'); // Or redirect to your homepage '/'
    }
  }, [router]);

  // While checking for permission, show a loading state to prevent content flash
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  // If the check passes, render the full page
  return (
    <>
      <Head>
        <title>Schedule Your Call With Us - Atlas HomeServices</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-12">
        <div className="w-full max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            You&apos;re Almost Done!
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Please book your consultation time below. Your details have been pre-filled for you.
          </p>

          <div className="mt-8 relative h-[650px] w-full">
            {/* Render the HubSpot widget using the secure data from state */}
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

ThankYouPage.getLayout = function getLayout(page: React.ReactElement) {
  return <MinimalLayout>{page}</MinimalLayout>;
};

export default ThankYouPage;