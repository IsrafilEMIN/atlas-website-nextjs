import useSWR from "swr";

// Define static testimonials (yours)
const staticTestimonials: Review[] = [

];

interface GoogleReview {
    author_name: string;
    rating: number;
    text: string;
    time: number;
  }
  
  interface GoogleReviewResponse {
    reviews: GoogleReview[];
  }
  
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  
  export function useTestimonials() {
    const { data: googleResponse } = useSWR<GoogleReviewResponse>(
      "/api/google-reviews",
      fetcher,
      { fallbackData: { reviews: [] } }
    );
  
    const googleReviews: Review[] = Array.isArray(googleResponse?.reviews)
      ? googleResponse.reviews
          .filter((review) => review.text?.trim()) // ✅ Remove empty reviews
          .map((review, index) => ({
            id: 1000 + index,
            customerName: review.author_name,
            rating: review.rating,
            comment: review.text,
            serviceType: "Google Review",
            createdAt: new Date(review.time * 1000).toISOString(),
          }))
      : [];
  
    const allTestimonials = [...staticTestimonials, ...googleReviews].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  
    const totalReviews = allTestimonials.length;
    const averageRating =
      totalReviews > 0
        ? allTestimonials.reduce((sum, r) => sum + r.rating, 0) / totalReviews
        : 0;
  
    return {
      testimonials: allTestimonials,
      totalReviews,
      averageRating,
    };
  }
  
  // Review type
  export interface Review {
    id: number;
    customerName: string;
    rating: number;
    comment: string;
    serviceType: string;
    createdAt: string;
  }