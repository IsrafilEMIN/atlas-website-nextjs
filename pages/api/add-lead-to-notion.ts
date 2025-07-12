import { Client } from '@notionhq/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { CreatePageParameters } from '@notionhq/client/build/src/api-endpoints';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID!;

// --- MODIFICATION 1: Update the RequestBody type ---
// Added 'otherAreasToPaint' to match the data being sent from the frontend.
type RequestBody = {
  name: string;
  phone: string;
  email: string;
  postalCode: string;
  leadSource: string;
  otherAreasToPaint: string[]; // This is the new field
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  if (!databaseId || !process.env.NOTION_API_KEY) {
    return res.status(500).json({ error: 'Notion API Key or Database ID not configured.' });
  }

  // --- MODIFICATION 2: Destructure the new field ---
  // Get 'otherAreasToPaint' from the request body.
  const { name, email, phone, postalCode, leadSource, otherAreasToPaint } = req.body as RequestBody;

  const properties: CreatePageParameters['properties'] = {
    // IMPORTANT: These property names MUST exactly match your Notion database columns.
    'Name': {
      title: [
        {
          text: {
            content: name,
          },
        },
      ],
    },
    'Email': {
      email: email,
    },
    'Phone': {
      phone_number: phone,
    },
    'Postal Code': {
      rich_text: [
        {
          text: {
            content: postalCode,
          },
        },
      ],
    },
  };

  // Conditionally add 'Lead Source' if it exists
  if (leadSource) {
    properties['Lead Source'] = {
      select: {
        name: leadSource,
      },
    };
  }

  // --- MODIFICATION 3: Add the 'Other Areas' multi-select property ---
  // Check if otherAreasToPaint has items and format it for the Notion API.
  if (otherAreasToPaint && otherAreasToPaint.length > 0) {
    properties['Other Areas'] = { // This MUST match the Notion property name.
      multi_select: otherAreasToPaint.map((area: string) => {
        return { name: area }; // Format each string into an object Notion expects.
      }),
    };
  }

  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: properties, // The properties object is now fully type-safe and complete.
    });

    return res.status(201).json({ message: 'Success!', data: response });

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Notion API Error:', error);
      return res.status(500).json({
        error: 'Failed to add data to Notion.',
        details: error.message
      });
    }
    console.error('An unexpected error occurred:', error);
    return res.status(500).json({ error: 'An unexpected error occurred.' });
  }
}
