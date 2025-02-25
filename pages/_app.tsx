// pages/_app.tsx
import Head from "next/head";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "@/styles/globals.css"; // Ensure global styles are included
import { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <Head>
                {/* Fallback Favicon for browsers that don't support `prefers-color-scheme` */}
                <link
                    rel="icon"
                    type="image/x-icon"
                    href="/assets/favicon.ico"
                />

                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
            </Head>
            <div className="min-h-screen flex flex-col">
                <Header />
                <div className="flex-grow">
                    <Component {...pageProps} />
                </div>
                <Footer />
            </div>
            <Toaster />
        </QueryClientProvider>
    );
}
