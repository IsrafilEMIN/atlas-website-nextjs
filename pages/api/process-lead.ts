// pages/api/process-lead.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@hubspot/api-client';
import { PublicObjectSearchRequest } from '@hubspot/api-client/lib/codegen/crm/contacts';
import { FilterOperatorEnum } from '@hubspot/api-client/lib/codegen/crm/contacts';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const hubspotClient = new Client({ accessToken: process.env.HUBSPOT_API_KEY });
  const { email, firstName, lastName, phone, currentCondition } = req.body;

  // Exclude contractors from being added to the CRM
  if (currentCondition === 'contractor') {
    return res.status(200).json({ message: 'Lead processed (excluded from CRM).' });
  }

  // Determine the lead status based on intent
  let leadStatus = 'Nurture';
  const highIntentConditions = ['hire_now', 'hire_3_months'];
  if (highIntentConditions.includes(currentCondition)) {
    leadStatus = 'New';
  }

  // Define the properties to be set on the HubSpot contact record.
  // This now includes the new user_intent property.
  const contactProperties = {
    email,
    firstname: firstName,
    lastname: lastName,
    phone,
    hs_lead_status: leadStatus,
    user_intent: currentCondition, // This saves the user's selection to your new custom property
  };

  try {
    // Step 1: Search for an existing contact by email
    const searchRequest: PublicObjectSearchRequest = {
      filterGroups: [{ filters: [{ propertyName: 'email', operator: FilterOperatorEnum.Eq, value: email }] }],
      properties: ['email'],
      limit: 1,
    };
    const searchResult = await hubspotClient.crm.contacts.searchApi.doSearch(searchRequest);

    // Step 2: Update the contact if they exist, or create them if they don't
    if (searchResult.total > 0) {
      const existingContactId = searchResult.results[0].id;
      await hubspotClient.crm.contacts.basicApi.update(existingContactId, {
        properties: contactProperties,
      });
      res.status(200).json({ message: `Successfully updated contact ID: ${existingContactId}` });
    } else {
      const createResult = await hubspotClient.crm.contacts.basicApi.create({
        properties: contactProperties,
      });
      res.status(200).json({ message: `Successfully created contact ID: ${createResult.id}` });
    }
  } catch (e: any) {
    // Log any errors from the HubSpot API for easier debugging
    console.error('HubSpot API Error:', e.body || e);
    res.status(500).json({ message: 'Error processing lead.' });
  }
}
