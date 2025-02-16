import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY!);

// Create a mapping object to translate UI strings to your Prisma ENUM values.
const serviceTypeMapping: Record<string, "EXTERIOR" | "COMMERCIAL" | "RESIDENTIAL"> = {
    "residential": "RESIDENTIAL",
    "commercial": "COMMERCIAL",
    "exterior": "EXTERIOR",
  };

// Create a mapping object to translate UI strings to your Prisma ENUM values.
const statusMapping: Record<string, "PENDING"> = {
  "pending": "PENDING",
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  try {
    // Extract booking details from the request body
    const {
      customerName,
      customerPhone,
      customerEmail,
      serviceType,
      projectDetails,
      timeSlotId,
      status,
    } = req.body;

    // Map the UI service type to the ENUM value
    const normalizedServiceType = serviceTypeMapping[serviceType];
    if (!normalizedServiceType) {
      throw new Error(`Invalid service type provided: ${serviceType}`);
    }

    // Map the UI service type to the ENUM value
    const normalizedStatus = statusMapping[status];
    if (!normalizedStatus) {
      throw new Error(`Invalid service type provided: ${status}`);
    }

    // Create a new booking entry in the database
    const booking = await prisma.booking.create({
      data: {
        customerName,
        customerPhone,
        customerEmail,
        serviceType: normalizedServiceType,
        projectDetails,
        timeSlotId,
        status: normalizedStatus,
      },
    });

    // Send a booking confirmation email to the customer using Resend
    const customerEmailResponse = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: customerEmail,
      subject: "Booking Confirmation",
      html: `<p>Hi ${customerName},</p>
             <p>Your appointment for ${serviceType} has been booked successfully. We will contact you shortly.</p>`,
    });

    // Send an email notification to the admin
    const adminEmailResponse = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: process.env.ADMIN_EMAIL!,
      subject: "New Booking Received",
      html: `<p>New booking from <strong>${customerName}</strong> for ${serviceType}.</p>
             <p>Project Details: ${projectDetails}</p>
             <p>Contact: ${customerPhone}, ${customerEmail}</p>`,
    });

    console.log("Received request body:", req.body);

    return res.status(200).json({
      booking,
      customerEmailResponse,
      adminEmailResponse,
    });
  } catch (error: unknown) {
    console.error("Booking API Error:", error);
    return res.status(500).json({ error: "Error booking appointment" });
  }
}
