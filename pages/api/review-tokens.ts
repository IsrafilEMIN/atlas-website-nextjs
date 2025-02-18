import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto"; // for random token generation

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Suppose we only allow POST
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    // Check for admin authorization.
    const adminSecret = process.env.ADMIN_SECRET;
    const authHeader = req.headers.authorization;

    if (!authHeader || authHeader !== `Bearer ${adminSecret}`) {
        return res.status(403).json({ error: "Forbidden: You are not authorized to generate tokens." });
    }

    try {
        const { customerId } = req.body;
        if (!customerId) {
            return res.status(400).json({ error: "Missing customerId" });
        }

        // Generate a random token
        const token = crypto.randomBytes(16).toString("hex"); // or use uuid

        // Set expiryTime to, say, 7 days from now
        const expiryTime = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);

        // Insert into DB
        await prisma.reviewToken.create({
            data: {
                token,
                customerId: String(customerId),
                expiryTime,
            },
        });

        // Determine the protocol based on NODE_ENV
        const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

        // Get the host from the request headers
        const host = req.headers.host;

        // Construct the dynamic review link
        const reviewLink = `${protocol}://${host}/reviews/${token}`;

        return res.status(201).json({ token, reviewLink });
    } catch (error) {
        console.error("Error creating review token:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
