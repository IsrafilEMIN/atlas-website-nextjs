// pages/book-now.tsx
import React from 'react';
import Head from 'next/head';
import { Button } from '@/components/ui/button';
import MinimalLayout from '@/components/layout/MinimalLayout';

// Import NextPageWithLayout (adjust path if you moved it to a types file)
import type { NextPageWithLayout } from './_app'; // Or e.g., from '@/types';

// --- Configuration for Booking Link and UTM Parameters ---
const BASE_BOOKING_URL = process.env.NEXT_PUBLIC_BASE_BOOKING_URL || 'https://calendar.app.google/Pvtmhjp63k4J6vvf8';

const getBookingLinkWithUTM = (utmContent: string = 'primary_booking_button') => {
  // ... (your UTM function remains the same)
  const utmParams = new URLSearchParams({
    utm_source: 'website',
    utm_medium: 'dedicated_booking_page',
    utm_campaign: 'direct_booking_flow',
    utm_content: utmContent,
  });
  const separator = BASE_BOOKING_URL.includes('?') ? '&' : '?';
  return `${BASE_BOOKING_URL}${separator}${utmParams.toString()}`;
};

// Change the type from React.FC or React.FC<{}> to NextPageWithLayout
const BookNowPage: NextPageWithLayout = () => { // <--- UPDATE THIS LINE
  const primaryBookingLink = getBookingLinkWithUTM('main_book_now_cta');

  const handleBookingClick = () => {
    if (typeof window !== 'undefined') {
      // window.location.href = primaryBookingLink;
      window.open(primaryBookingLink, '_blank'); // Open in a new tab
    }
  };

  return (
    <>
      <Head>
        <title>Book Your Service - Atlas HomeServices</title>
        <meta name="description" content="Secure your appointment for expert home services with Atlas HomeServices. Fast and easy online booking." />
        {/* <meta name="robots" content="noindex, nofollow" /> */}
      </Head>

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
        {/* ... (rest of your JSX remains the same) ... */}
        <div className="max-w-lg w-full space-y-8 text-center p-6 sm:p-10 bg-white shadow-xl rounded-lg">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Secure Your Spot!
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Ready to start your home transformation? Book your consultation or service
            appointment with Atlas HomeServices quickly and easily.
          </p>
          <div className="mt-8">
            <Button
              size="lg"
              className="
                w-full
                rounded-full
                px-8 py-4
                font-bold
                text-base sm:text-lg
                bg-[#0F52BA] text-white
                hover:bg-[#0d47a1]
                hover:shadow-lg
                transition-all duration-300 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0F52BA]
              "
              onClick={handleBookingClick}
            >
              Book Your Appointment Now
            </Button>
          </div>
          <div className="mt-6 text-sm">
            <a
              href="/"
              className="font-medium text-[#0F52BA] hover:text-[#0d47a1] transition-colors"
            >
              &larr; Return to Main Site
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

// This line should now be free of TypeScript errors
BookNowPage.getLayout = function getLayout(page: React.ReactElement) {
  return <MinimalLayout>{page}</MinimalLayout>;
};

export default BookNowPage;