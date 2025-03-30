import type { NextApiRequest, NextApiResponse } from "next";

interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  time: number;
}

interface GoogleApiResponse {
  result?: {
    reviews?: GoogleReview[];
  };
}

let cachedReviews: GoogleReview[] | null = null;
let cacheTime: number | null = null;
const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 hours

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const now = Date.now();

  if (cachedReviews && cacheTime && now - cacheTime < CACHE_DURATION) {
    return res.status(200).json({ cached: true, reviews: cachedReviews });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return res.status(500).json({ error: "Missing Google API credentials" });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews&key=${apiKey}`;
    const response = await fetch(url);
    const data: GoogleApiResponse = await response.json();

    const reviews: GoogleReview[] = data.result?.reviews || [];

    // Cache the reviews
    cachedReviews = reviews;
    cacheTime = now;

    return res.status(200).json({ cached: false, reviews });
  } catch (error) {
    console.error("Failed to fetch Google reviews:", error);
    return res.status(500).json({ error: "Failed to fetch reviews" });
  }
}
