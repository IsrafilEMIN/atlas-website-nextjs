// pages/_app.tsx
import Head from "next/head";
import Script from "next/script";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "@/styles/globals.css";
import { AppProps } from "next/app";
import * as React from "react";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <link rel="icon" type="image/png" href="/assets/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg" />
        <link rel="shortcut icon" href="/assets/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Residential & Commercial Painters in Toronto | Atlas HomeServices" />
        <link rel="manifest" href="/assets/site.webmanifest" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <title>House Painting & Commercial Painting Services | Atlas HomeServices</title>
        <meta name="description" content="Atlas HomeServices provides expert house painting, home painting, and commercial painting solutions in Toronto, Mississauga, Vaughan, Hamilton, and Niagara. Contact us for a free quote today!" />
        <meta name="keywords" content="house painting, home painting, commercial painting, professional painters, painting contractors, interior painting, exterior painting, Toronto painters, Mississauga painting services" />
        <meta property="og:title" content="Top-Rated House & Commercial Painting Services | Atlas HomeServices" />
        <meta property="og:description" content="Trusted professional painters for house painting and commercial painting in Toronto and beyond. Enhance your home or business with our expert painting solutions!" />
        <meta property="og:url" content="https://atlas-paint.com/" />
        <meta property="og:type" content="business.business" />
        <meta property="og:image" content="/assets/og-image.jpg" />
      </Head>

      {/* Google Analytics gtag.js */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-QBLLD7KWPN"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-QBLLD7KWPN');
        `}
      </Script>

      {/* Google Ads Conversion Tag */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=AW-17058358443"
      />
      <Script id="google-ads" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-17058358443');
        `}
      </Script>

      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow">
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 w-full z-50 md:hidden bg-[#162733] px-4 py-3 flex justify-between items-center shadow-lg">
        <span className="text-white text-sm font-medium">🎯 Free White-Glove Quote</span>
        <a
          href="#booking"
          className="bg-[#cdb898] text-[#162733] font-semibold px-4 py-2 rounded-lg text-sm shadow hover:bg-[#bba784] transition"
        >
          Book Now
        </a>
      </div>

      <Toaster />
    </QueryClientProvider>
  );
}
