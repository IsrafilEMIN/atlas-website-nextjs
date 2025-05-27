// pages/book-now.tsx
import React from 'react';
import Head from 'next/head';
// import { Button } from '@/components/ui/button'; // Assuming your Button component path
import MinimalLayout from '@/components/layout/MinimalLayout';
import type { NextPageWithLayout } from '@/pages/_app'; // Or from your types file
import Image from 'next/image';

// --- Configuration for Booking Link and UTM Parameters ---
const BASE_BOOKING_URL = process.env.NEXT_PUBLIC_BASE_BOOKING_URL || '';

const getBookingLinkWithUTM = (utmContent: string = 'primary_booking_button') => {
  const utmParams = new URLSearchParams({
    utm_source: 'website',
    utm_medium: 'dedicated_booking_page_v2', // Updated medium for new design
    utm_campaign: 'focused_booking_experience',
    utm_content: utmContent,
  });
  const separator = BASE_BOOKING_URL.includes('?') ? '&' : '?';
  return `${BASE_BOOKING_URL}${separator}${utmParams.toString()}`;
};

const BookNowPage: NextPageWithLayout = () => {
  const primaryBookingLink = getBookingLinkWithUTM('main_hero_book_cta');

  const handleBookingClick = () => {
    if (typeof window !== 'undefined') {
      window.location.href = primaryBookingLink;
    }
  };

  return (
    <>
      <Head>
        <title>Book Your Premium Painting Service - Atlas HomeServices</title>
        <meta name="description" content="Experience a seamless booking process for your next painting project. Atlas HomeServices guarantees quality and satisfaction." />
        {/* <meta name="robots" content="noindex, nofollow" /> */}
      </Head>

      {/* Main page container with dark background, similar to the example */}
      <div className="flex flex-col items-center justify-start min-h-screen bg-[#131628] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        {/* Optional: Small logo, can be placed here or absolutely positioned */}
        {/* <img src="/assets/atlas-logo-icon-white.png" alt="Atlas HomeServices" className="h-10 mb-8" /> */}

        <div className="max-w-3xl w-full space-y-8 md:space-y-10 text-center">

          {/* Headline - Large and impactful */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-50">
            TRANSFORM YOUR HOME
          </h1>

          {/* Sub-headline - Engaging and informative */}
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
            Join hundreds of satisfied homeowners who chose Atlas HomeServices for a flawless finish.
            Book your premium painting service today.
          </p>

          {/* Visual Element (Image/Video) - Crucial for the example's feel */}
          <div className="mt-8 md:mt-10 mx-auto w-full max-w-2xl">
            <div className="aspect-video bg-slate-800 rounded-xl shadow-2xl flex items-center justify-center overflow-hidden">
              {/* === REPLACE THIS WITH YOUR IMAGE OR VIDEO === */}
              {/* Example Image: */}
              <Image
                src="/images/sample-beautifully-painted-room.jpg" // Replace with your image path
                alt="Beautifully painted interior by Atlas HomeServices"
                className="w-full h-full object-cover"
              />
              {/* Or, for a placeholder if you don't have an image yet: */}
              {/* <p className="text-slate-500 text-lg">Showcasing Our Best Work</p> */}
              {/* For a video, you'd use a video player component or an iframe embed */}
            </div>
          </div>

          {/* Descriptive Text - Explaining the value/process */}
          <p className="mt-8 md:mt-10 text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
            Our streamlined booking process makes it simple to schedule your project. Receive a transparent quote,
            choose your colors with expert guidance, and let our professional team deliver exceptional results.
          </p>

          {/* CTA Button - Prominent and inviting */}
          <div className="mt-10 md:mt-12">
            <button
              type="button" // Good practice for buttons not submitting forms
              className="
                inline-block
                min-w-[260px] sm:min-w-[300px]
                px-10 py-4 sm:px-12 sm:py-5
                text-lg sm:text-xl font-bold text-center
                bg-[#0F52BA] text-white
                rounded-full
                hover:bg-[#0F52BA] /* Adjusted hover for visibility */
                transition-all duration-300
                focus:outline-none focus:ring-4 focus:ring-[#0F52BA]/50
              "
              onClick={handleBookingClick}
            >
              I&apos;M READY TO BOOK
            </button>
          </div>

          {/* Optional: Testimonial Section Placeholder - "What Attendees Are Saying" equivalent */}
          <div className="mt-16 md:mt-20 pt-10 border-t border-slate-700/50">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
              Hear From Our Happy Clients
            </h2>
            <div className="mt-6 space-y-6 max-w-xl mx-auto">
              {/* Example Testimonial Structure (repeat for multiple) */}
              <blockquote className="text-left p-6 bg-slate-800 rounded-lg shadow-md">
                <p className="text-slate-300 italic">&quot;Atlas HomeServices transformed our living room! The team was professional, clean, and the results exceeded our expectations. Highly recommend!&quot;</p>
                <cite className="mt-3 block text-sm font-semibold text-slate-400 not-italic">- Sarah L., Toronto</cite>
              </blockquote>
              {/* Add more testimonials or a link to a testimonials page */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Assign the MinimalLayout to this page (ensures no main site header/footer)
BookNowPage.getLayout = function getLayout(page: React.ReactElement) {
  return <MinimalLayout>{page}</MinimalLayout>;
};

export default BookNowPage;