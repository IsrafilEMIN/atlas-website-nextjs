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
    // Return a 200 status to prevent the client-side from showing an error for this non-critical failure.
    return res.status(200).json({ message: "Notification system not configured on server." });
  }

  // --- MODIFICATION 1: Get 'otherAreasToPaint' from the request body ---
  // The frontend sends this as a comma-separated string.
  const { name, phone, email, postalCode, otherAreasToPaint } = req.body;
  const subject = `🔥 Instant Lead Notification: ${name}`;
  
  // --- MODIFICATION 2: Conditionally create HTML for the other areas ---
  // This block will only be added to the email if 'otherAreasToPaint' has content.
  let otherAreasHtml = '';
  if (otherAreasToPaint && otherAreasToPaint.length > 0) {
    otherAreasHtml = `<li><strong>Other Areas:</strong> ${otherAreasToPaint}</li>`;
  }

  try {
    await resend.emails.send({
      from: 'Lead Notifier <onboarding@resend.dev>',
      to: myEmail,
      subject: subject,
      // --- MODIFICATION 3: Add the new HTML to the email body ---
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
            ${otherAreasHtml}
          </ul>
        </div>
      `
    });
    return res.status(200).json({ message: 'Email notification sent successfully.' });
  } catch (error) {
    console.error('Failed to send email notification:', error);
    // Again, return 200 to not break the user flow on a non-critical error.
    return res.status(200).json({ message: 'Could not send email notification.' });
  }
}
