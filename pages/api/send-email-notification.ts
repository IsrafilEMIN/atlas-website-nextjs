// pages/api/send-instant-notification.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const myEmail = process.env.MY_PERSONAL_EMAIL;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  if (!process.env.RESEND_API_KEY || !myEmail) {
    console.error("Resend API Key or personal email is not set in environment variables.");
    return res.status(200).json({ message: "Notification system not configured on server." });
  }

  // We need to get the email from the request body as well
  const { name, phone, email, postalCode } = req.body;
  const subject = `🔥 Instant Lead Notification: ${name}`;
  
  try {
    await resend.emails.send({
      from: 'Lead Notifier <onboarding@resend.dev>', 
      to: myEmail,
      subject: subject,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ccc; border-radius: 8px;">
          <h2 style="color: #1a1a1a;">🔥 New Lead Opt-In!</h2>
          <p>A new lead just submitted their information.</p>
          <hr>
          <ul style="list-style-type: none; padding: 0;">
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Email:</strong> <a href="mailto:${email}">${email}</a></li>
            <li><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></li>
            <li><strong>Postal Code:</strong> ${postalCode}</li>
          </ul>
        </div>
      `
    });
    return res.status(200).json({ message: 'Email notification sent successfully.' });
  } catch (error) {
    console.error('Failed to send email notification:', error);
    return res.status(200).json({ message: 'Could not send email notification.' });
  }
}