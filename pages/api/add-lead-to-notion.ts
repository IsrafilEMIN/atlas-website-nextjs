import { Client } from '@notionhq/client';
import type { NextApiRequest, NextApiResponse } from 'next';
// ⭐ 1. IMPORT THE NOTION-SPECIFIC TYPE
import type { CreatePageParameters } from '@notionhq/client/build/src/api-endpoints';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID!;

type RequestBody = {
  name: string;
  phone: string;
  email: string;
  postalCode: string;
  leadSource: string;
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

  const { name, email, phone, postalCode, leadSource } = req.body as RequestBody;

  // ⭐ 2. REPLACE 'any' WITH THE IMPORTED TYPE
  const properties: CreatePageParameters['properties'] = {
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

  // If leadSource exists, add it to the properties object.
  if (leadSource) {
    properties['Lead Source'] = {
      select: {
        name: leadSource,
      },
    };
  }

  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: properties, // Now this is fully type-safe!
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