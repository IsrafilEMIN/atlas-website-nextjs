import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Filter, Images } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Review } from "@/lib/shared/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Reviews() {
  const [ratingFilter, setRatingFilter] = useState<string>("all");

  const { data: apiReviews = [] } = useQuery<Review[]>({
    queryKey: ['/api/reviews/published'],
  });

  // Import static testimonials from Home page
  const staticTestimonials = [
    {
      id: 1,
      customerName: "John Smith",
      rating: 5,
      comment: "Outstanding service! The team was professional and the results exceeded my expectations.",
      serviceType: "Interior Painting",
      createdAt: new Date("2024-01-15").toISOString(),
      images: [
        "/public/assets/testimonials/interior-1.jpg",]
    },
    {
      id: 2,
      customerName: "Sarah Johnson",
      rating: 5,
      comment: "Very pleased with the quality of work. They were punctual, clean, and detail-oriented.",
      serviceType: "Exterior Painting",
      createdAt: new Date("2024-01-20").toISOString(),
      images: [
        "/public/assets/testimonials/interior-1.jpg", "/public/assets/testimonials/interior-2.jpg",]
    },
    {
      id: 3,
      customerName: "Michael Brown",
      rating: 5,
      comment: "Professional team, excellent communication, and beautiful results!",
      serviceType: "Commercial Painting",
      createdAt: new Date("2024-02-01").toISOString()
    },
    {
      id: 4,
      customerName: "Aliye Yiming",
      rating: 4,
      comment: "Very good service, they are very professional and the results are beautiful.",
      serviceType: "Commercial Painting",
      createdAt: new Date("2024-02-02").toISOString()
    },
    {
      id: 5,
      customerName: "Saadet Kutluk",
      rating: 3,
      comment: "Customer service is good, but the quality of the work is not good.",
      serviceType: "Commercial Painting",
      createdAt: new Date("2024-02-03").toISOString()
    }
  ];

  // Combine both sources
  const allReviews = [...staticTestimonials];

  const filteredReviews = allReviews.filter(review => 
    ratingFilter === "all" ? true : review.rating === parseInt(ratingFilter)
  );

  return (
    <div className="min-h-screen bg-white pb-24 pt-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Customer Reviews
          </h1>
          <p className="text-lg text-gray-600">
            See what our clients have to say about our services
          </p>
        </motion.div>

        {/* Filter Section */}
        <div className="flex items-center justify-end mb-8">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <Select
              value={ratingFilter}
              onValueChange={setRatingFilter}
            >
              <SelectTrigger className="w-[180px] bg-white text-black border-gray-200 hover:border-gray-200 focus:border-gray-200 [&[data-state=open]]:border-gray-200">
                <SelectValue placeholder="Filter by rating" />
              </SelectTrigger>
              <SelectContent className="bg-white text-black">
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
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
              <Card className="p-6 h-full flex flex-col justify-between bg-white border border-gray-200">
                <div>
                  <div className="flex mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">{review.comment}</p>
                  <p className="text-sm text-gray-500 mb-2">
                    Service: {review.serviceType}
                  </p>
                  {review.images && review.images.length > 0 && (
                    <div className="flex gap-2 mb-4">
                      {review.images.map((image, i) => (
                        <img
                          key={i}
                          src={image}
                          alt={`Review image ${i + 1}`}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  )}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="font-semibold text-gray-900">
                    {review.customerName}
                  </p>
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