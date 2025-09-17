// pages/api/process-lead.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@hubspot/api-client';
import { PublicObjectSearchRequest } from '@hubspot/api-client/lib/codegen/crm/contacts';
import { FilterOperatorEnum } from '@hubspot/api-client/lib/codegen/crm/contacts';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Ensure the HubSpot API key is available
  if (!process.env.HUBSPOT_API_KEY) {
    console.error('HubSpot API key is not set in environment variables.');
    return res.status(500).json({ message: 'Server configuration error.' });
  }
  const hubspotClient = new Client({ accessToken: process.env.HUBSPOT_API_KEY });
  const { email, firstName, lastName, cleanedPhone, currentCondition, utmSource, utmMedium, utmCampaign, utmContent } = req.body;
  // Exclude contractors from being added to the CRM
  if (currentCondition === 'contractor') {
    return res.status(200).json({ message: 'Lead processed (excluded from CRM).' });
  }
  // Define the properties to be set on the HubSpot contact record.
  // This now includes the new start_date property.
  const contactProperties = {
    email,
    firstname: firstName,
    lastname: lastName,
    phone: cleanedPhone,
    hs_lead_status: 'New Lead',
    customer_journey: 'New',
    hubspot_owner_id: '259691210',
    start_date: currentCondition, // This saves the user's selection to your new custom property
    utm_source: utmSource || '',
    utm_medium: utmMedium || 'organic',
    utm_campaign: utmCampaign || '',
    utm_content: utmContent || '',
  };
  try {
    // Step 1: Search for an existing contact by email
    const searchRequest: PublicObjectSearchRequest = {
      filterGroups: [{ filters: [{ propertyName: 'email', operator: FilterOperatorEnum.Eq, value: email }] }],
      properties: ['email', 'hs_object_id'], // Include hs_object_id to get the contact ID
      limit: 1,
    };
    const searchResult = await hubspotClient.crm.contacts.searchApi.doSearch(searchRequest);
    // Step 2: Update the contact if they exist, or create them if they don't
    let contactId;
    if (searchResult.total > 0) {
      contactId = searchResult.results[0].id;
      await hubspotClient.crm.contacts.basicApi.update(contactId, {
        properties: contactProperties,
      });
    } else {
      const createResult = await hubspotClient.crm.contacts.basicApi.create({
        properties: contactProperties,
      });
      contactId = createResult.id;
    }

    // Send lead magnets based on intent
    const highIntent = ['hire_now'];
    const midIntent = ['hire_1_month', 'hire_1_3_months'];
    const lowIntent = ['budgeting_3_plus_months', 'just_looking'];
    const paletteLink = '/color-palette.pdf'; // Assume hosted in public
    const checklistLink = '/mistake-checklist.pdf'; // Assume hosted in public
    const estimatorLink = 'https://atlas-paint.com/estimatora7b3x9c2v1z4pq8r';

    let subject = '';
    let html = '';

    if (highIntent.includes(currentCondition)) {
      subject = `Here's Your Full Bundle!`;
      html = `
        <!DOCTYPE html>
        <html>
        <!-- Similar HTML structure as before -->
        <body>
          <!-- ... -->
          <p>Hi ${firstName},</p>
          <p>Thank you for your interest! As promised, here is your full bundle: Color Palette, Mistake Checklist, and Estimator Tool.</p>
          <a href="${paletteLink}" target="_blank">Download Color Palette</a>
          <a href="${checklistLink}" target="_blank">Download Mistake Checklist</a>
          <a href="${estimatorLink}" target="_blank">Open Estimator Tool</a>
          <!-- ... -->
        </body>
        </html>
      `;
    } else if (midIntent.includes(currentCondition)) {
      subject = `Here's Your Palette and Checklist!`;
      html = `
        <!DOCTYPE html>
        <html>
        <!-- Similar -->
        <p>Hi ${firstName},</p>
        <p>Thank you! Here's your Color Palette and Mistake Checklist.</p>
        <a href="${paletteLink}" target="_blank">Download Color Palette</a>
        <a href="${checklistLink}" target="_blank">Download Mistake Checklist</a>
        <!-- ... -->
        </html>
      `;
    } else if (lowIntent.includes(currentCondition)) {
      subject = `Here's Your Color Palette!`;
      html = `
        <!DOCTYPE html>
        <html>
        <!-- Similar -->
        <p>Hi ${firstName},</p>
        <p>Thank you! Here's your Color Palette PDF.</p>
        <a href="${paletteLink}" target="_blank">Download Color Palette</a>
        <!-- ... -->
        </html>
      `;
    }

    if (subject) {
      await resend.emails.send({
        from: 'Atlas HomeServices <notification@atlas-paint.com>',
        to: email,
        subject,
        html,
      });
    }

    res.status(200).json({ message: `Successfully processed contact ID: ${contactId}` });
  } catch (e: unknown) { // Use 'unknown' for better type safety instead of 'any'
    // Log any errors from the HubSpot API for easier debugging
    // Type guard to safely check for a 'body' property on the error object
    if (e && typeof e === 'object' && 'body' in e) {
      console.error('HubSpot API Error Body:', (e as { body: unknown }).body);
    } else {
      console.error('HubSpot API Error:', e);
    }
    res.status(500).json({ message: 'Error processing lead.' });
  }
}