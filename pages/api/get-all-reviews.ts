import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const reviews = await prisma.review.findMany({
                // Optionally, add ordering or filtering here.
                orderBy: { createdAt: "desc" },
            });
            return res.status(200).json(reviews);
        } catch (error) {
            console.error("Error fetching reviews:", error);
            return res.status(500).json({ error: "Failed to fetch reviews" });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}
