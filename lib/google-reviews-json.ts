import dotenv from "dotenv";
dotenv.config({ path: ".env.local" }); // 👈 explicitly load local env

import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import type { Testimonial } from "@/types/testimonials";

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY!;
const PLACE_ID = process.env.GOOGLE_PLACE_ID!;

async function fetchReviews() {
  if (!GOOGLE_API_KEY || !PLACE_ID) {
    console.error("❌ Missing GOOGLE_API_KEY or GOOGLE_PLACE_ID in environment variables.");
    process.exit(1);
  }

  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=review&key=${GOOGLE_API_KEY}`
    );

    const data = (await res.json()) as {
      result?: {
        reviews?: {
          author_name: string;
          text: string;
          rating: number;
          time: number;
        }[];
      };
    };
    const newReviews: Testimonial[] =
      data.result?.reviews?.map((r: any) => ({
        customerName: r.author_name,
        comment: r.text,
        rating: r.rating,
        serviceType: "Google Review",
        createdAt: r.time ? new Date(r.time * 1000).toISOString() : new Date().toISOString(),
      })) || [];

    const filePath = path.join(process.cwd(), "data", "testimonials.json");

    let existingReviews: any[] = [];
    if (fs.existsSync(filePath)) {
      const existingData = fs.readFileSync(filePath, "utf-8");
      existingReviews = JSON.parse(existingData);
    }

    const merged = [...existingReviews];

    newReviews.forEach((r) => {
      const alreadyExists = existingReviews.some(
        (e) => e.comment === r.comment && e.customerName === r.customerName
      );
      if (!alreadyExists) {
        merged.push(r);
      }
    });

    fs.writeFileSync(filePath, JSON.stringify(merged, null, 2));
    console.log(`✅ Added ${merged.length - existingReviews.length} new Google review(s) to testimonials.json`);
  } catch (error) {
    console.error("❌ Failed to fetch or save Google reviews:", error);
  }
}

fetchReviews();
