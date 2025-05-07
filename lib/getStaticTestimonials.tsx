// lib/getStaticTestimonials.ts
import fs from "fs/promises";
import path from "path";
import type { Testimonial } from "@/types/testimonials";

/** Raw shape of each record as it comes from the JSON file */
interface RawTestimonial {
  customerName: string;
  comment: string;
  rating: number;
  serviceType?: string;
  createdAt: string;
}

type GetStaticTestimonialsResult = {
  testimonials: Testimonial[];
  averageRating: number;
  totalReviews: number;
};

/**
 * Reads the local JSON file and returns typed testimonial data.
 * Swap this out for a real DB call when needed.
 */
export async function getStaticTestimonials(): Promise<GetStaticTestimonialsResult> {
  const filePath = path.join(process.cwd(), "data", "testimonials.json");

  // Read & parse JSON
  const fileContent = await fs.readFile(filePath, "utf-8");
  const rawTestimonials: RawTestimonial[] = JSON.parse(fileContent);

  // Map raw records ➜ typed Testimonial objects
  const testimonials: Testimonial[] = rawTestimonials.map((item) => ({
    customerName: item.customerName,
    comment: item.comment,
    rating: item.rating,
    serviceType: item.serviceType ?? "", // fallback to empty string
    createdAt: item.createdAt,
  }));

  const totalReviews = testimonials.length;
  const averageRating =
    totalReviews > 0
      ? testimonials.reduce((sum, t) => sum + t.rating, 0) / totalReviews
      : 0;

  return { testimonials, averageRating, totalReviews };
}
