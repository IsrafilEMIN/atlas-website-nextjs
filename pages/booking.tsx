// pages/book-now.tsx
import React from 'react';
import Head from 'next/head';
import MinimalLayout from '@/components/layout/MinimalLayout';
import type { NextPageWithLayout } from '@/pages/_app';
import Image from 'next/image';

// --- Configuration for Booking Link ---
const BASE_BOOKING_URL = process.env.NEXT_PUBLIC_BASE_BOOKING_URL || '';

// A reusable function to generate the booking link with UTM parameters
const getBookingLinkWithUTM = (utmContent: string) => {
  const utmParams = new URLSearchParams({
    utm_source: 'website',
    utm_medium: 'dedicated_booking_page_v2',
    utm_campaign: 'focused_booking_experience',
    utm_content: utmContent,
  });
  const separator = BASE_BOOKING_URL.includes('?') ? '&' : '?';
  return `${BASE_BOOKING_URL}${separator}${utmParams.toString()}`;
};

// --- Reusable Booking Button Component ---
// This avoids duplicating the button code and centralizes its logic.
const BookingButton = ({ utmContent }: { utmContent: string }) => {
  const bookingLink = getBookingLinkWithUTM(utmContent);

  const handleClick = () => {
    // The onClick handler only runs in the browser, so no need for a `window` check.
    window.location.href = bookingLink;
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-block px-24 py-4 sm:px-26 sm:py-8 text-2xl sm:text-4xl font-bold text-center bg-[#0F52BA] text-white rounded-full transition-all duration-300"
    >
      I'M READY TO TRANSFORM
    </button>
  );
};

const BookNowPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Book Your Premium Painting Service - Atlas HomeServices</title>
        <meta
          name="description"
          content="Experience a seamless booking process for your next painting project. Atlas HomeServices guarantees quality and satisfaction."
        />
      </Head>

      {/* Main page container with gradient background and bottom padding */}
      <div
        className="flex flex-col items-center min-h-screen relative text-white pb-20" // <-- SOLUTION: Added padding-bottom here
        style={{
          background:
            'linear-gradient(to bottom, #131628 0%, #131628 1070px, #e8e8e8 1520px, #e8e8e8 100%)',
        }}
      >
        {/* Content for the dark section (headline, image, CTA) */}
        <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10 text-center z-10">
          <div className="space-y-4 md:space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto">
              TRANSFORM YOUR HOME WITH US
            </h1>

            <p className="mt-3 text-4xl sm:text-4xl text-white max-w-5xl mx-auto">
              Entrust your home to our expert team with a{' '}
              <strong>
                <u>limited-time</u>
              </strong>{' '}
              offer.
            </p>

            <div className="mt-8 md:mt-10 mx-auto w-full max-w-2xl">
              <div className="aspect-video bg-slate-800 rounded-xl shadow-2xl overflow-hidden">
                <Image
                  src="/images/atlas-hero-image.png"
                  alt="Beautifully painted interior by Atlas HomeServices"
                  className="w-full h-full object-cover"
                  width={800}
                  height={400}
                  priority // Add priority to the hero image for better performance
                />
              </div>
            </div>

            <p className="mt-8 md:mt-10 text-base sm:text-3xl text-slate-300 max-w-5xl mx-auto leading-relaxed">
              It&apos;s a <strong>stress-free, flawless</strong> painting
              process with your own dedicated project manager. With{' '}
              <strong>
                <u>10% off</u>
              </strong>{' '}
              your first project, valid until June 30th.
            </p>

            <div className="mt-10 md:mt-12">
              <BookingButton utmContent="main_hero_book_cta" />
            </div>
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-full mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
              Hear From Our Clients:
            </h2>
            <div className="mt-6 space-y-6 max-w-xl mx-auto">
              {/* Testimonial Images */}
              <div className="rounded-xl shadow-lg overflow-hidden bg-white">
                <Image
                  src="/testimonials/project1.jpg"
                  alt="Transformed living room by Atlas HomeServices"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="rounded-xl shadow-lg overflow-hidden bg-white">
                <Image
                  src="/testimonials/project2.jpg"
                  alt="Freshly painted kitchen cabinets by Atlas HomeServices"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="rounded-xl shadow-lg overflow-hidden bg-white">
                <Image
                  src="/testimonials/project3.jpg"
                  alt="Vibrant exterior house painting by Atlas HomeServices"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Final CTA Button */}
            <div className="mt-10 md:mt-12">
              <BookingButton utmContent="testimonial_section_cta" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

BookNowPage.getLayout = function getLayout(page: React.ReactElement) {
  return <MinimalLayout>{page}</MinimalLayout>;
};

export default BookNowPage;