import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Filter } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Head from "next/head";
import { getStaticTestimonials } from "@/lib/getStaticTestimonials";

interface Testimonial {
  id: string;
  customerName: string;
  comment: string;
  serviceType: string;
  rating: number;
  createdAt: string;
}

interface AllReviewsProps {
  testimonials: Testimonial[];
  averageRating: number;
  totalReviews: number;
}

export default function AllReviews({
  testimonials,
  averageRating,
  totalReviews,
}: AllReviewsProps) {
  const [ratingFilter, setRatingFilter] = useState<string>("all");

  const sortedTestimonials = [...testimonials].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const filteredReviews = sortedTestimonials.filter((review) =>
    ratingFilter === "all" ? true : review.rating === parseInt(ratingFilter)
  );

  const schemaPayload = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HomeAndConstructionBusiness",
        "@id": "https://atlas-paint.com/#localBusiness",
        "name": "Atlas HomeServices",
        "url": "https://atlas-paint.com/",
        "logo": "https://atlas-paint.com/logo.png",
        "description": "Professional painting, drywall, and fencing services in Toronto and surrounding areas.",
        "telephone": "+1-647-916-0826",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "123 Main St",
          "addressLocality": "Toronto",
          "addressRegion": "ON",
          "postalCode": "M4B 1B3",
          "addressCountry": "CA",
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": averageRating.toFixed(1),
          "reviewCount": totalReviews.toString(),
        },
      },
      {
        "@type": "ItemList",
        "@id": "https://atlas-paint.com/all-reviews#ItemList",
        "itemListElement": filteredReviews.map((review, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Review",
            "author": {
              "@type": "Person",
              "name": review.customerName,
            },
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": review.rating.toString(),
              "bestRating": "5",
              "worstRating": "1",
            },
            "reviewBody": review.comment,
            "datePublished": review.createdAt,
            "itemReviewed": {
              "@type": "LocalBusiness",
              "@id": "https://atlas-paint.com/#localBusiness",
            },
          },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white pb-24 pt-24">
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaPayload) }}
        />
        <link rel="canonical" href="https://atlas-paint.com/all-reviews/" />
        <title>
          Customer Reviews | Residential & Commercial Painting | Atlas HomeServices
        </title>
        <meta
          name="description"
          content="See what our clients say! Read real reviews about our premium residential & commercial painting services in the GTA, Niagara, and beyond. Quality you can trust!"
        />
      </Head>

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Customer Reviews</h1>
          <p className="text-lg text-gray-600">
            See what our clients have to say about our services
          </p>
        </motion.div>

        {/* Filter Section */}
        <div className="flex items-center justify-end mb-8">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <Select value={ratingFilter} onValueChange={setRatingFilter}>
              <SelectTrigger className="w-[180px] bg-white text-black border-gray-200 hover:border-gray-200 focus:border-gray-200">
                <SelectValue placeholder="Filter by rating" />
              </SelectTrigger>
              <SelectContent className="bg-white text-black">
                <SelectItem className="rounded-md hover:bg-black hover:text-white" value="all">All Ratings</SelectItem>
                <SelectItem className="rounded-md hover:bg-black hover:text-white" value="5">5 Stars</SelectItem>
                <SelectItem className="rounded-md hover:bg-black hover:text-white" value="4">4 Stars</SelectItem>
                <SelectItem className="rounded-md hover:bg-black hover:text-white" value="3">3 Stars</SelectItem>
                <SelectItem className="rounded-md hover:bg-black hover:text-white" value="2">2 Stars</SelectItem>
                <SelectItem className="rounded-md hover:bg-black hover:text-white" value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredReviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-6 h-full flex flex-col justify-between bg-white border hover:border-gray-300 border-gray-200">
                <div>
                  <div className="flex mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">{review.comment}</p>
                  <p className="text-sm text-gray-500 mb-2">
                    Service: {review.serviceType}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="font-semibold text-gray-900">{review.customerName}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const { testimonials, averageRating, totalReviews } =
    await getStaticTestimonials();

  return {
    props: {
      testimonials,
      averageRating,
      totalReviews,
    },
  };
}
