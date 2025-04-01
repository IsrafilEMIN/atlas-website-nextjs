// lib/getStaticTestimonials.ts
import fs from "fs";
import path from "path";

// Replace this with actual DB query if needed
export async function getStaticTestimonials() {
  // Simulate a local data file (e.g., JSON or Markdown frontmatter)
  const filePath = path.join(process.cwd(), "data", "testimonials.json");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const rawTestimonials = JSON.parse(fileContent);

  const testimonials = rawTestimonials.map((item: any, index: number) => ({
    id: item.id || index.toString(),
    customerName: item.customerName,
    comment: item.comment,
    serviceType: item.serviceType,
    rating: item.rating,
    createdAt: item.createdAt,
  }));

  const totalReviews = testimonials.length;
  const averageRating =
    testimonials.reduce((sum: number, t: any) => sum + t.rating, 0) /
    totalReviews;

  return {
    testimonials,
    averageRating,
    totalReviews,
  };
}
