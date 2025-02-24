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
      availableTime,
      status,
    } = req.body;

    // ✅ Check if customer exists using `findFirst`
    let customer = await prisma.customer.findFirst({
      where: {
        OR: [
          { email: customerEmail },  // ✅ Check by email
          { phone: customerPhone }   // ✅ Check by phone
        ],
      },
    });

    // ✅ If customer does not exist, create a new customer entry
    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          name: customerName,
          email: customerEmail,
          phone: customerPhone,
        },
      });
    }

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
        customerId: customer.id,
        customerName,
        customerPhone,
        customerEmail,
        serviceType: normalizedServiceType,
        projectDetails,
        availableTime,
        status: normalizedStatus,
      },
    });

    // Send a booking confirmation email to the customer using Resend
    const customerEmailResponse = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: customerEmail,
      subject: "Your Booking is Confirmed - Atlas Painting",
      html: `<div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
      <h2 style="color: #2c3e50;">Booking Confirmation</h2>
      <p style="font-size: 16px; color: #444;">Hi <strong>${customerName}</strong>,</p>
      <p style="font-size: 16px; color: #444;">
        Thank you for booking with <strong>Atlas Painting</strong>! Your appointment for 
        <span style="color: #3498db;"><strong>${serviceType}</strong></span> has been successfully scheduled.
      </p>
      <p style="font-size: 16px; color: #444;">
        Our team will reach out to you shortly to finalize the details.
      </p>
      <hr style="border: 1px solid #ddd;">
      <p style="font-size: 14px; color: #777;">If you have any questions, feel free to <a href="mailto:${process.env.EMAIL_FROM}" style="color: #3498db; text-decoration: none;">contact us</a>.</p>
      <p style="font-size: 14px; color: #777;"><em>We look forward to transforming your space!</em></p>
    </div>`,
    });

    // Send an email notification to the admin
    const adminEmailResponse = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: process.env.ADMIN_EMAIL!,
      subject: "📝 New Booking Received – Atlas Painting",
      html: `<div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
      <h2 style="color: #e74c3c;">New Booking Received</h2>
      <p style="font-size: 16px; color: #444;">You have a new booking request from <strong>${customerName}</strong>.</p>
      
      <div style="background-color: #fff; padding: 15px; border-radius: 5px; box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);">
        <p><strong>📌 Service Type:</strong> <span style="color: #3498db;">${serviceType}</span></p>
        <p><strong>📋 Project Details:</strong> ${projectDetails}</p>
        <p><strong>⏳ Preferred Time:</strong> ${availableTime}</p>
        <p><strong>📞 Contact:</strong> <a href="tel:${customerPhone}" style="color: #27ae60; text-decoration: none;">${customerPhone}</a></p>
        <p><strong>✉️ Email:</strong> <a href="mailto:${customerEmail}" style="color: #3498db; text-decoration: none;">${customerEmail}</a></p>
      </div>
      
      <p style="font-size: 14px; color: #777;">Make sure to follow up promptly to confirm the details.</p>
    </div>`,
    });

    // ✅ Store a notification in the Notification table
    await prisma.notification.create({
      data: {
        message: `New booking created for ${customerName}: ${serviceType}.`,
        bookingId: booking.id,  // ✅ Link notification to the booking
      },
    });

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
