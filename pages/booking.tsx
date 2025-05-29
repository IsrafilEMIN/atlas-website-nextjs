// pages/book-now.tsx
import React from 'react';
import Head from 'next/head';
import MinimalLayout from '@/components/layout/MinimalLayout';
import type { NextPageWithLayout } from '@/pages/_app';
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

      {/* Main page container with the overall gradient background */}
      {/* The gradient covers the whole page, from dark to white */}
      <div className="flex flex-col items-center min-h-screen relative text-white"
        style={{
          background: 'linear-gradient(to bottom, #131628 0%, #131628 1070px, #e8e8e8 1520px, #e8e8e8 100%)', // Adjust points as needed
          // The 750px and 1250px values control where the gradient starts and ends.
          // 750px: The height at which the dark color is still fully visible.
          // 1250px: The height at which the white color is fully visible.
          // Adjust these to fine-tune the transition length and start point.
          // Make sure 750px is greater than the height of your initial dark content.
        }}>

        {/* Content for the dark section (headline, image, CTA) */}
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 text-center z-10" /* z-10 ensures content is above pseudo-elements if any */>
          <div className="max-w-5xl w-full mx-auto space-y-4 md:space-y-6">

            {/* Headline - Large and impactful */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto">
              TRANSFORM YOUR HOME WITH US
            </h1>

            {/* Sub-headline - Engaging and informative */}
            <p className="mt-3 text-4xl sm:text-4xl text-white max-w-5xl mx-auto">
              Entrust your home to our expert team with a <strong><u>limited-time</u></strong> offer.
            </p>

            {/* Visual Element (Image/Video) - Crucial for the example's feel */}
            <div className="mt-8 md:mt-10 mx-auto w-full max-w-2xl">
              <div className="aspect-video bg-slate-800 rounded-xl shadow-2xl flex items-center justify-center overflow-hidden">
                {/* === REPLACE THIS WITH YOUR IMAGE OR VIDEO === */}
                <Image
                  src="/path/to/your/image.jpg" // **IMPORTANT: Replace with your actual image path**
                  alt="Beautifully painted interior by Atlas HomeServices"
                  className="w-full h-full object-cover"
                  width={800} // Add appropriate width for Next.js Image component
                  height={400} // Add appropriate height for Next.js Image component (aspect-video ratio)
                />
              </div>
            </div>

            {/* Descriptive Text - Explaining the value/process */}
            <p className="mt-8 md:mt-10 text-base sm:text-3xl text-slate-300 max-w-5xl mx-auto leading-relaxed">
              It&apos;s a <strong>stress-free, flawless</strong> painting process with your own dedicated project manager. With <strong><u>10% off</u></strong> your first project, valid until June 30th.
            </p>

            {/* CTA Button - Prominent and inviting */}
            <div className="mt-10 md:mt-12">
              <button
                type="button"
                className="
                  inline-block
                  px-24 py-4 sm:px-26 sm:py-8
                  text-2xl sm:text-4xl font-bold text-center
                  bg-[#0F52BA] text-white
                  rounded-full
                  transition-all duration-300
                "
                onClick={handleBookingClick}
              >
                I&apos;M READY TO TRANSFORM
              </button>
            </div>
          </div>
        </div>

        {/* Testimonial Section - Positioned within the same gradient container */}
        {/* The top padding pushes it down from the previous content, into the gradient */}
        {/* We make the text color dynamic based on whether it's on dark or light part */}
        <div className="w-full px-4 sm:px-6 lg:px-8 text-center"
             style={{ /* Adjust this value to control where testimonials start */ }}>
          <div className="max-w-5xl w-full mx-auto">
            {/* Testimonial header - will be on the navy part of the gradient */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100" /* This text color needs to contrast with navy */>
              Hear From Our Clients:
            </h2>
            <div className="mt-6 space-y-6 max-w-xl mx-auto">
              {/* Testimonial Image 1 */}
              <div className="rounded-xl shadow-lg overflow-hidden bg-white"> {/* Added white background for consistency if needed */}
                <Image
                  src="/testimonials/project1.jpg" // **IMPORTANT: Replace with your actual image path**
                  alt="Transformed living room by Atlas HomeServices"
                  width={600} // Adjust width/height as needed for desired display size
                  height={400} // Maintain aspect ratio, e.g., 3:2 or 16:9 like the main image
                  className="w-full h-auto object-cover"
                />
                {/* Optional: You can still add a small caption or client name below the image if desired */}
                {/* <p className="p-4 text-[#131628] text-sm">Client: Sarah L.</p> */}
              </div>

              {/* Testimonial Image 2 */}
              <div className="rounded-xl shadow-lg overflow-hidden bg-white">
                <Image
                  src="/testimonials/project2.jpg" // **IMPORTANT: Replace with your actual image path**
                  alt="Freshly painted kitchen cabinets by Atlas HomeServices"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Testimonial Image 3 (Add more as needed) */}
              <div className="rounded-xl shadow-lg overflow-hidden bg-white">
                <Image
                  src="/testimonials/project3.jpg" // **IMPORTANT: Replace with your actual image path**
                  alt="Vibrant exterior house painting by Atlas HomeServices"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* CTA Button - Prominent and inviting */}
            <div className="mt-10 md:mt-12">
              <button
                type="button"
                className="
                  inline-block
                  px-24 py-4 sm:px-26 sm:py-8
                  text-2xl sm:text-4xl font-bold text-center
                  bg-[#0F52BA] text-white
                  rounded-full
                  transition-all duration-300
                "
                onClick={handleBookingClick}
              >
                I&apos;M READY TO TRANSFORM
              </button>
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