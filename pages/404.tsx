import Head from "next/head";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
      <>
        <Head>
          <title>404 Page Not Found | Atlas HomeServices</title>
          <meta
              name="description"
              content="Oops! The page you're looking for doesn't exist. Visit Atlas HomeServices homepage for expert residential and commercial painting services in Toronto & GTA."
          />
          <link rel="canonical" href="https://atlas-paint.com/404" />
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
          <Card className="w-full max-w-md mx-4">
            <CardContent className="pt-6">
              <div className="flex mb-4 gap-2">
                <AlertCircle className="h-8 w-8 text-red-500" />
                <h1 className="text-2xl font-bold text-gray-900">404 Page Not Found</h1>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                The page you&apos;re looking for doesn&apos;t exist or might have been moved. Please return to our <Link href="/" className="text-blue-600 hover:underline">homepage</Link>.
              </p>
            </CardContent>
          </Card>
        </div>
      </>
  );
}
