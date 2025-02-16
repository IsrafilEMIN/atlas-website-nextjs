// pages/_app.tsx
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
