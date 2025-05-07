import * as React from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getStaticTestimonials } from "@/lib/getStaticTestimonials";
import { Testimonial } from "@/types/testimonials";

const Hero = dynamic(() => import("@/components/home/Hero"), { ssr: false });
const GrandSlamOffer = dynamic(() => import("@/components/home/GrandSlamOffer"), { ssr: false });
const GallerySection = dynamic(() => import("@/components/gallery/GallerySection"), { ssr: false });
const Header = dynamic(() => import("@/components/layout/Header"), { ssr: false });

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  dateISO: string;
  category: string;
}

interface HomeProps {
  posts: Post[];
  testimonials: Testimonial[]; // Replace `any` with your Testimonial type if defined
  averageRating: number;
  totalReviews: number;
}

export default function Home({ testimonials, averageRating, totalReviews }: HomeProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const schemaPayload = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "description": "Professional painting services for residential and commercial properties in Toronto.",
    "name": "Atlas HomeServices",
    "@id": "https://atlas-paint.com/",
    "logo": "https://atlas-paint.com/assets/apple-touch-icon.png",
    "url": "https://atlas-paint.com/",
    "telephone": "+1-647-916-0826",
    "priceRange": "$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "08:00",
        "closes": "20:00"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "8001 Woodsview Crescent",
      "addressLocality": "Niagara Falls",
      "addressRegion": "ON",
      "postalCode": "L2H 3E9",
      "addressCountry": "CA"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": averageRating.toFixed(1),
      "reviewCount": totalReviews.toString()
    },
    "image": "https://atlas-paint.com/assets/apple-touch-icon.png",
    "sameAs": [
      "https://www.instagram.com/atlas_homeservices/",
      "https://x.com/Atlas_Paint",
      "https://www.facebook.com/people/Atlas-HomeServices-Inc/61572733726450/"
    ]
  };

  return (
    <>
      <Head>
        <link rel="canonical" href="https://atlas-paint.com/" hrefLang="en" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaPayload) }}
        />
        <title>Residential & Commercial Painters in Toronto | Atlas HomeServices</title>
        <meta
          name="description"
          content="Atlas HomeServices offers premium residential and commercial painting services in Toronto, Mississauga, Vaughan, Hamilton, Niagara, and surrounding areas. Call for a free quote!"
        />
      </Head>

      {mounted && (
        <div className="bg-white min-h-screen">
          <Header />
          <main className="w-full">
            <Hero />
            <GrandSlamOffer reviews={testimonials} />
            <GallerySection />
          </main>
        </div>
      )}
    </>
  );
}

export async function getStaticProps() {
  const postsDir = path.join(process.cwd(), "content/posts");
  const filenames = fs.readdirSync(postsDir);

  const posts = filenames
    .filter((name) => name.endsWith(".mdx"))
    .map((filename) => {
      const filePath = path.join(postsDir, filename);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContent);

      return {
        slug: filename.replace(/\.mdx$/, ""),
        title: data.title || "",
        excerpt: data.excerpt || "",
        author: data.author || "",
        date: data.date || "",
        dateISO: data.dateISO || "",
        category: data.category || ""
      };
    })
    .sort((a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime())
    .slice(0, 3);

  const { testimonials, averageRating, totalReviews } = await getStaticTestimonials();

  return {
    props: {
      posts,
      testimonials,
      averageRating,
      totalReviews
    }
  };
}
