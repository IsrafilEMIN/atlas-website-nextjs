import useSWR from "swr";

// Define static testimonials (yours)
const staticTestimonials: Review[] = [
  {
    id: 1,
    customerName: "Jonathan Miller",
    rating: 5,
    comment:
      "The team did an exceptional job painting our home interior. They were professional, courteous, and the attention to detail was impressive. Highly recommend!",
    serviceType: "Interior Painting",
    createdAt: new Date("2024-01-15").toISOString(),
  },
  {
    id: 2,
    customerName: "Emily Thompson",
    rating: 5,
    comment:
      "Fantastic experience from start to finish. The exterior paint job looks amazing and the crew was always on time, tidy, and respectful of our property.",
    serviceType: "Interior Painting",
    createdAt: new Date("2024-01-20").toISOString(),
  },
  {
    id: 3,
    customerName: "Mark Davies",
    rating: 5,
    comment:
      "Highly professional team with excellent communication throughout the project. The finished commercial space exceeded our expectations.",
    serviceType: "Interior Painting",
    createdAt: new Date("2024-02-01").toISOString(),
  },
  {
    id: 4,
    customerName: "Alina Yilmaz",
    rating: 5,
    comment:
      "Outstanding craftsmanship and professionalism. Our office now looks vibrant and welcoming thanks to the team's hard work and dedication.",
    serviceType: "Interior Painting",
    createdAt: new Date("2024-02-02").toISOString(),
  },
  {
    id: 5,
    customerName: "Sandra Klein",
    rating: 5,
    comment:
      "Excellent experience! The crew delivered impeccable work, maintained great communication, and finished ahead of schedule. I would definitely hire them again.",
    serviceType: "Interior Painting",
    createdAt: new Date("2024-02-03").toISOString(),
  },
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