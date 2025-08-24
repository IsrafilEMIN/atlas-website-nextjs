// pages/api/send-error-notification.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
// Make sure you have your email in the .env.local file
const businessOwnerEmail = process.env.MY_PERSONAL_EMAIL; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  if (!businessOwnerEmail) {
      console.error('Business owner email is not set in environment variables.');
      // We can fail silently here as this is a background task
      return res.status(200).json({ message: 'Notifier not configured.' });
  }

  const { error, leadData } = req.body;

  const subject = `🚨 URGENT: API Failure on Estimator Form`;
  const errorMessage = typeof error === 'object' ? JSON.stringify(error) : String(error);

  try {
    await resend.emails.send({
      from: businessOwnerEmail, // Use a different 'from' for system emails
      to: 'israfil.kutluk@icloud.com',
      subject: subject,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 2px solid #d9534f; border-radius: 8px;">
          <h2 style="color: #d9534f;">🚨 Estimator Form Submission Failed</h2>
          <p>An error occurred while processing a new lead. Please follow up with them manually.</p>
          <hr>
          <h3>Lead Information:</h3>
          <ul style="list-style-type: none; padding: 0;">
            <li><strong>Name:</strong> ${leadData.firstName || ''} ${leadData.lastName || ''}</li>
            <li><strong>Email:</strong> <a href="mailto:${leadData.email}">${leadData.email}</a></li>
            <li><strong>Phone:</strong> <a href="tel:${leadData.phone}">${leadData.phone}</a></li>
            <li><strong>Intent:</strong> ${leadData.currentCondition || 'Not specified'}</li>
          </ul>
          <hr>
          <h3>Error Details:</h3>
          <pre style="background-color: #f5f5f5; padding: 10px; border-radius: 4px; white-space: pre-wrap; word-wrap: break-word;">${errorMessage}</pre>
        </div>
      `,
    });
    return res.status(200).json({ message: 'Error notification sent.' });
  } catch (notificationError) {
    console.error('CRITICAL: Failed to send the error notification email itself.', notificationError);
    return res.status(500).json({ message: 'Failed to send notification.' });
  }
}