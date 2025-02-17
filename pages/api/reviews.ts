import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        const { token, rating, comment, serviceType } = req.body;
        if (!token || !rating || !comment || !serviceType) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Find the review token
        const reviewToken = await prisma.reviewToken.findUnique({
            where: { token },
            include: { customer: true },
        });

        if (!reviewToken) {
            return res.status(404).json({ error: "Invalid token" });
        }
        if (reviewToken.used) {
            return res.status(400).json({ error: "Token already used" });
        }

        // Create the review referencing the correct customer
        const newReview = await prisma.review.create({
            data: {
                customerId: String(reviewToken.customerId),
                customerName: reviewToken.customer?.name || "",
                rating: Number(rating),
                comment,
                serviceType,
            },
        });

        // Mark the token as used if you only allow one usage
        await prisma.reviewToken.update({
            where: { id: reviewToken.id },
            data: { used: true },
        });

        return res.status(201).json(newReview);
    } catch (error) {
        console.error("Error creating review:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
