import { Client } from '@notionhq/client';
import type { NextApiRequest, NextApiResponse } from 'next';

// Initialize the Notion client with your API key from environment variables
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID!;

// ⭐ MODIFIED: Define the expected structure of the request body, including leadSource
type RequestBody = {
  name: string;
  phone: string;
  email: string;
  postalCode: string;
  leadSource: string; // To track UTM source
};

// The main handler function for the API route
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // We only want to handle POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  // Basic validation to ensure we have the necessary credentials
  if (!databaseId || !process.env.NOTION_API_KEY) {
    return res.status(500).json({ error: 'Notion API Key or Database ID not configured.' });
  }

  // ⭐ MODIFIED: Destructure leadSource from the request body
  const { name, email, phone, postalCode, leadSource } = req.body as RequestBody;

  // ⭐ MODIFIED: Build the properties object dynamically to conditionally add the 'Lead Source'
  const properties: any = {
    // IMPORTANT: These property names ('Name', 'Email', etc.) 
    // MUST exactly match the column titles in your Notion database.
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

  // ⭐ NEW: If leadSource exists, add it to the properties object.
  // This assumes your Notion database has a 'Select' column named "Lead Source".
  if (leadSource) {
    properties['Lead Source'] = {
      select: {
        name: leadSource,
      },
    };
  }

  try {
    // Create a new page in the specified Notion database
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      // ⭐ MODIFIED: Use the dynamically created properties object
      properties: properties,
    });

    // If successful, send back a 201 Created status
    return res.status(201).json({ message: 'Success!', data: response });

  } catch (error: unknown) {
    // Check if the error is an actual Error object
    if (error instanceof Error) {
      console.error('Notion API Error:', error);
      return res.status(500).json({ 
        error: 'Failed to add data to Notion.', 
        details: error.message 
      });
    }
    // Handle cases where the thrown value is not an Error object
    console.error('An unexpected error occurred:', error);
    return res.status(500).json({ error: 'An unexpected error occurred.' });
  }
}