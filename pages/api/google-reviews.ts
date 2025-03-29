import type { NextApiRequest, NextApiResponse } from "next";

let cachedReviews: any[] | null = null;
let cacheTime: number | null = null;
const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 hours

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const now = Date.now();

  if (cachedReviews && cacheTime && now - cacheTime < CACHE_DURATION) {
    return res.status(200).json({ cached: true, reviews: cachedReviews });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    const reviews = data.result?.reviews || [];

    // Cache in memory
    cachedReviews = reviews;
    cacheTime = now;

    res.status(200).json({ cached: false, reviews });
  } catch (error) {
    console.error("Failed to fetch Google reviews:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
}
