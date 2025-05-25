// pages/api/send-guides.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import { Client as NotionClient, isNotionClientError } from '@notionhq/client';
// Import specific types from the Notion SDK for better type safety
import type {
  CreatePageParameters,
} from '@notionhq/client/build/src/api-endpoints';

// --- Type Definitions (align with your frontend types) ---
interface RequestedGuide {
  id: string;
  title: string;
  fileName: string;
}

interface LeadFormData {
  name: string;
  email: string;
  phone: string;
}

interface SendGuidesRequestBody extends LeadFormData {
  guides: RequestedGuide[];
  downloadSource?: string; // New field for the source page (e.g., "GuidesPage", "BookingPageInquiry")
}

// --- Environment Variable Retrieval & Client Initialization ---

// Resend
const resendApiKey = process.env.RESEND_API_KEY;
const resendFromEmail = process.env.RESEND_FROM_EMAIL;
let resend: Resend | null = null;
if (resendApiKey) {
  resend = new Resend(resendApiKey);
} else {
  console.error("CRITICAL: Resend API key (RESEND_API_KEY) is not configured in environment variables.");
}
if (!resendFromEmail) {
    console.error("CRITICAL: Resend 'From' email (RESEND_FROM_EMAIL) is not configured.");
}

// Notion (using your specified environment variable names)
const notionApiKey = process.env.NOTION_API_KEY_EMAIL_LIST;
const notionDatabaseId = process.env.NOTION_DATABASE_ID_EMAIL_LIST;
let notion: NotionClient | null = null;
if (notionApiKey) {
  notion = new NotionClient({ auth: notionApiKey });
} else {
  console.warn("Notion API Key (NOTION_API_KEY_EMAIL_LIST) not found. Notion integration will be skipped.");
}
if (!notionDatabaseId && notionApiKey) {
    console.warn("Notion Database ID (NOTION_DATABASE_ID_EMAIL_LIST) not found. Notion integration will be skipped.");
}

// General App Config
const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
const emailSenderName = process.env.EMAIL_SENDER_NAME || 'Atlas HomeServices'; // Default if not in .env
const contactPhone = process.env.CONTACT_PHONE || '';
const websiteUrl = process.env.WEBSITE_URL || appUrl;
const websiteUrlDisplay = process.env.WEBSITE_URL_DISPLAY || new URL(appUrl).hostname;


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, phone, guides, downloadSource } = req.body as SendGuidesRequestBody;

  // Validation
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Name, Email, and Phone are required.' });
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }
  if (!/^\+?[0-9\s-()]{7,}$/.test(phone)) {
    return res.status(400).json({ error: 'Invalid phone number format.' });
  }
  if (!guides || !Array.isArray(guides) || guides.length === 0) {
    return res.status(400).json({ error: 'Guide selection is missing or invalid.' });
  }

  // --- 1. Add Lead to Notion (if configured) ---
  let notionMessage = 'Notion integration skipped (not configured).';

  if (notion && notionDatabaseId) {
    // VITAL: Replace these property string keys with the EXACT (case-sensitive) names
    // of your columns/properties in your Notion Database.
    // Use the specific type from Notion SDK for page properties
    const notionPageProperties: CreatePageParameters['properties'] = {
      // Replace 'YOUR_NOTION_NAME_PROPERTY' with your actual Notion column name for Name (Title type)
      'Name': { title: [{ text: { content: name } }] },
      // Replace 'YOUR_NOTION_EMAIL_PROPERTY' with your actual Notion column name for Email (Email type)
      'Email': { email: email },
      // Replace 'YOUR_NOTION_PHONE_PROPERTY' with your actual Notion column name for Phone (Phone number type)
      'Phone': { phone_number: phone },
      // Replace 'YOUR_NOTION_DATE_PROPERTY' with your actual Notion column name for Date (Date type)
      'Date': { date: { start: new Date().toISOString().split('T')[0] } }, // Format: YYYY-MM-DD
    };

    // Handle 'Source' tag (Multi-select type in Notion)
    // Replace 'YOUR_NOTION_SOURCE_PROPERTY' with your actual Notion column name for Source
    const sourcePropertyName = 'Source'; // Replace with your actual Notion property name for Source
    if (downloadSource) {
      const sourceTagName = `Website - ${downloadSource}`;
      notionPageProperties[sourcePropertyName] = { multi_select: [{ name: sourceTagName }] };
    } else {
      // Optional: set a default source if not provided, or leave it blank
      notionPageProperties[sourcePropertyName] = { multi_select: [{ name: 'Unknown' }] };
    }
    
    try {
      const notionResponse = await notion.pages.create({
        parent: { database_id: notionDatabaseId },
        properties: notionPageProperties,
      });

      // Type guard to safely access 'id' from the response.
      // A successfully created page should be a PageObjectResponse.
      if ('id' in notionResponse) {
        console.log('Lead successfully added to Notion. Page ID:', notionResponse.id);
      } else {
        console.log('Lead added to Notion, but response format was unexpected:', notionResponse);
      }
      notionMessage = 'Lead added to Notion successfully.';
    } catch (error: unknown) {
      console.error('Error adding lead to Notion:');
      if (isNotionClientError(error)) {
        console.error('Notion Client Error Code:', error.code);
        console.error('Notion Client Error Body:', JSON.stringify(error.body, null, 2)); // Stringify for better readability
        notionMessage = `Failed to add lead to Notion: ${error.message} (Code: ${error.code})`;
      } else {
        const generalError = error as Error;
        console.error(generalError.message || "An unknown error occurred with Notion.");
        notionMessage = `Failed to add lead to Notion: ${generalError.message || "Unknown error"}`;
      }
    }
  } else {
    console.warn("Notion API key or Database ID not configured correctly. Skipping Notion integration.");
    notionMessage = 'Notion integration not configured or failed due to missing credentials.';
  }

  // --- 2. Send Email with PDF Links using Resend (if configured) ---
  if (!resend || !resendFromEmail) {
    console.error("Resend client or From Email not initialized. Cannot send email.");
    return res.status(500).json({ 
        error: 'Email service is not configured correctly on the server.',
        notionStatus: notionMessage 
    });
  }
  
  const subject = `Your Free Painting Guide${guides.length > 1 ? 's are' : ' is'} Here from ${emailSenderName}!`;
  let htmlGuideLinks = '<ul style="list-style-type: disc; padding-left: 20px; margin: 0; padding:0;">';
  guides.forEach(guide => {
    const pdfDownloadLink = `${appUrl}${guide.fileName}`; 
    const suggestedFileName = guide.fileName.split('/').pop() || guide.fileName;
    htmlGuideLinks += `
      <li style="margin-bottom: 10px;">
        <p style="margin: 0; padding: 0;">
          <strong>${guide.title}:</strong> 
          <a 
            href="${pdfDownloadLink}" 
            download="${suggestedFileName}" 
            target="_blank" 
            rel="noopener noreferrer" 
            style="color: #0F52BA; text-decoration: underline;"
          >
            Download PDF
          </a>
        </p>
      </li>`;
  });
  htmlGuideLinks += '</ul>';

  try {
    const { data: resendData, error: resendError } = await resend.emails.send({
      from: resendFromEmail, // Ensured this is checked above
      to: [email],
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 25px; border-radius: 5px;">
          <h2 style="color: #0F52BA; margin-top:0;">Hello ${name},</h2>
          <p>Thank you for requesting our expert painting guide${guides.length > 1 ? 's' : ''}!</p>
          <p>You can download your guide${guides.length > 1 ? 's' : ''} instantly by clicking the link${guides.length > 1 ? 's' : ''} below:</p>
          ${htmlGuideLinks}
          <p style="margin-top: 25px;">We hope ${guides.length > 1 ? 'these resources help' : 'this resource helps'} you plan your future transformation and achieve stunning results.</p>
          <p>Ready for a personalized quote for your painting project? We offer comprehensive services designed for your peace of mind.</p>
          ${contactPhone ? `<p><strong>Phone:</strong> ${contactPhone}</p>` : ''}
          <p><strong>Website:</strong> <a href="${websiteUrl}" style="color: #0F52BA;">${websiteUrlDisplay}</a></p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 0.9em; color: #777;">Best regards,<br/>The ${emailSenderName} Team</p>
        </div>
      `,
    });

    if (resendError) {
      console.error('Error sending email with Resend:', resendError);
      return res.status(500).json({ 
        error: resendError.message || 'Failed to send email.',
        notionStatus: notionMessage 
      });
    }

    console.log('Email sent successfully via Resend:', resendData);
    res.status(200).json({ 
        message: `Success! Your guide(s) have been sent to your email.`,
        notionStatus: notionMessage 
    });

  } catch (error) {
    console.error('API route error during email sending:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
    res.status(500).json({ 
      error: `An unexpected error occurred: ${errorMessage}`,
      notionStatus: notionMessage
    });
  }
}
