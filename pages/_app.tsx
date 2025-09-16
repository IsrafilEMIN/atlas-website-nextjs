// pages/_app.tsx

import Head from "next/head";
import Script from "next/script";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import DefaultLayout from "@/components/layout/DefaultLayout";
import "@/styles/globals.css";

import React from "react";
import type { NextPage } from 'next';
import type { AppProps as NextAppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';

// --- Import necessary hooks and helpers for Meta Pixel ---
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import * as fpixel from '../lib/fpixel';
// ---------------------------------------------------------

// Define a type for pages that might have a custom getLayout method
export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

// Update AppProps type to use NextPageWithLayout
type AppPropsWithLayout = NextAppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available.
  const getLayout = Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

  // --- Meta Pixel Page View Tracking ---
  const router = useRouter();
  useEffect(() => {
    // This hook only runs once on component mount in the browser
    const handleRouteChange = () => {
      fpixel.pageview();
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    // Clean up the event listener on component unmount
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  // ------------------------------------

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        {/* ... (Your existing Head content) ... */}
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

      {/* Google Tag Manager - Loaded once here */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-TNNGCK8P');`,
        }}
      />

      {/* Optional: Consent Mode Defaults (add/update based on user consent later) */}
      <Script id="gtm-consent" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            'ad_storage': 'denied',
            'analytics_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied'
          });
        `}
      </Script>

      {/* The Toaster is placed outside the layout structure so it's globally available */}
      <Toaster />

      {/* Render the page with the determined layout */}
      {getLayout(<Component {...pageProps} />)}
    </QueryClientProvider>
  );
}