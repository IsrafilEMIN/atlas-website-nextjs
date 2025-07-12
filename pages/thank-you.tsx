import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import MinimalLayout from '@/components/layout/MinimalLayout';
import type { NextPageWithLayout } from '@/pages/_app';
import HubSpotWidget from '@/components/HubSpotWidget'; // IMPORT THE NEW HUBSPOT WIDGET

const ThankYouPage: NextPageWithLayout = () => {
  const router = useRouter();
  
  const { name, email } = router.query;

  return (
    <>
      <Head>
        <title>Schedule Your Consultation - Atlas HomeServices</title>
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

          {/* Render the HubSpot widget and pass the user's data to it */}
          <div className="mt-8 relative h-[650px] w-full">
            <HubSpotWidget 
              name={Array.isArray(name) ? name[0] : name}
              email={Array.isArray(email) ? email[0] : email}            />
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