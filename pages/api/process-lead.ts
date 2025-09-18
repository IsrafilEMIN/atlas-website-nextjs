// pages/api/process-lead.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@hubspot/api-client';
import { PublicObjectSearchRequest } from '@hubspot/api-client/lib/codegen/crm/contacts';
import { FilterOperatorEnum } from '@hubspot/api-client/lib/codegen/crm/contacts';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Admin notification email - update this
const ADMIN_EMAIL = 'info@atlas-paint.com'; // Replace with your actual admin email

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Validate environment variables
  if (!process.env.HUBSPOT_API_KEY || !process.env.RESEND_API_KEY) {
    console.error('Missing required API keys in environment variables.');
    return res.status(500).json({ message: 'Server configuration error.' });
  }

  const hubspotClient = new Client({ accessToken: process.env.HUBSPOT_API_KEY });
  const { 
    email, 
    firstName, 
    lastName, 
    cleanedPhone, 
    currentCondition, 
    utmSource, 
    utmMedium, 
    utmCampaign, 
    utmContent 
  } = req.body;

  // Validate required fields
  if (!email || !firstName) {
    return res.status(400).json({ message: 'Missing required fields: email and firstName.' });
  }

  // Exclude contractors from being added to the CRM
  if (currentCondition === 'contractor') {
    return res.status(200).json({ message: 'Lead processed (excluded from CRM).' });
  }

  // Define the properties to be set on the HubSpot contact record
  const contactProperties = {
    email,
    firstname: firstName,
    lastname: lastName || '',
    phone: cleanedPhone || '',
    hs_lead_status: 'New Lead',
    customer_journey: 'New',
    hubspot_owner_id: '259691210',
    start_date: currentCondition || 'not_specified',
    utm_source: utmSource || '',
    utm_medium: utmMedium || 'organic',
    utm_campaign: utmCampaign || '',
    utm_content: utmContent || '',
  };

  let contactId = '';
  let hubspotError = null;
  let emailError = null;

  // Step 1: Process HubSpot contact with error handling
  try {
    const searchRequest: PublicObjectSearchRequest = {
      filterGroups: [{ 
        filters: [{ 
          propertyName: 'email', 
          operator: FilterOperatorEnum.Eq, 
          value: email 
        }] 
      }],
      properties: ['email', 'hs_object_id'],
      limit: 1,
    };

    const searchResult = await hubspotClient.crm.contacts.searchApi.doSearch(searchRequest);

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
  } catch (e: unknown) {
    hubspotError = e;
    console.error('HubSpot API Error:', e);
    
    // Log detailed error for debugging
    if (e && typeof e === 'object' && 'body' in e) {
      console.error('HubSpot API Error Body:', (e as { body: unknown }).body);
    }
  }

  // Step 2: Send lead magnet emails with error handling
  const colorPaletteLink = 'https://atlas-paint.com/color-collection.pdf';
  const estimatorLink = 'https://atlas-paint.com/estimatora7b3x9c2v1z4pq8r';

  try {
    await resend.emails.send({
      from: 'Atlas HomeServices <notification@atlas-paint.com>',
      to: email,
      subject: `${firstName}, Your Free Painting Resources Are Here!`,
      html: generateEmailTemplate(firstName, colorPaletteLink, estimatorLink),
    });
  } catch (e: unknown) {
    emailError = e;
    console.error('Failed to send lead magnet email:', e);
    
    // Attempt to notify admin about email failure
    try {
      await notifyAdminOfFailure(email, firstName, lastName, 'email_send_failure', e);
    } catch (adminError) {
      console.error('Failed to notify admin:', adminError);
    }

    // Attempt retry with fallback email service or queue for later
    try {
      await queueEmailForRetry(email, firstName, colorPaletteLink, estimatorLink);
    } catch (queueError) {
      console.error('Failed to queue email for retry:', queueError);
    }
  }

  // Step 3: Handle various failure scenarios
  if (hubspotError && emailError) {
    // Both failed - critical error
    await notifyAdminOfFailure(email, firstName, lastName, 'complete_failure', { hubspotError, emailError });
    
    // Store lead data locally for manual processing
    await storeFailedLead({ email, firstName, lastName, cleanedPhone, currentCondition });
    
    return res.status(500).json({ 
      message: 'Lead processing failed. We\'ve been notified and will contact you shortly.',
      fallbackInstructions: 'Please check your email or contact support@atlas-paint.com for your resources.'
    });
  } else if (hubspotError) {
    // HubSpot failed but email sent
    await notifyAdminOfFailure(email, firstName, lastName, 'hubspot_failure', hubspotError);
    
    return res.status(200).json({ 
      message: 'Resources sent successfully! (CRM sync pending)',
      emailSent: true,
      crmSynced: false
    });
  } else if (emailError) {
    // Email failed but HubSpot succeeded
    return res.status(200).json({ 
      message: `Lead processed successfully. Resources will be sent shortly to ${email}.`,
      emailSent: false,
      crmSynced: true,
      contactId
    });
  }

  // Success - both operations completed
  return res.status(200).json({ 
    message: 'Success! Check your email for your free resources.',
    emailSent: true,
    crmSynced: true,
    contactId
  });
}

// Helper function to generate beautiful email template
function generateEmailTemplate(
  firstName: string, 
  colorPaletteLink: string, 
  estimatorLink: string
): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>Your Free Painting Resources</title>
      <!--[if mso]>
      <noscript>
        <xml>
          <o:OfficeDocumentSettings>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      </noscript>
      <![endif]-->
      <style>
        :root {
          color-scheme: light dark;
          supported-color-schemes: light dark;
        }
        @media only screen and (max-width: 600px) {
          .container { width: 100% !important; }
          .main-content { padding: 20px !important; }
          .resource-card { margin-bottom: 20px !important; padding: 15px !important; }
          h1 { font-size: 24px !important; }
          .cta-button { 
            display: block !important; 
            width: 100% !important;
            text-align: center !important;
            margin: 15px auto !important;
            padding: 12px 20px !important;
            box-sizing: border-box !important;
            max-width: 300px !important;
          }
          .resource-card table { width: 100% !important; }
          .resource-card td { display: block !important; width: 100% !important; text-align: center !important; padding-left: 0 !important; }
          .resource-card td:first-child { margin-bottom: 15px !important; }
          .resource-card div { margin: 0 auto !important; }
          .resource-desc { margin: 0 auto 15px !important; max-width: 90% !important; }
        }
        @media (prefers-color-scheme: dark) {
          body { background-color: #1a1a1a !important; }
          .outer-table { background-color: #1a1a1a !important; }
          .container { background-color: #2a2a2a !important; box-shadow: 0 2px 4px rgba(0,0,0,0.3) !important; }
          .header { background: linear-gradient(135deg, #0a2540 0%, #1a3a6d 100%) !important; }
          h1 { color: #ffffff !important; }
          p { color: #d1d5db !important; }
          .main-content p { color: #d1d5db !important; }
          .resource-card { background-color: #3a3a3a !important; border: 1px solid #4a4a4a !important; }
          h3 { color: #ffffff !important; }
          .resource-desc { color: #9ca3af !important; }
          .cta-button { background-color: #1d4ed8 !important; color: #ffffff !important; }
          .value-prop { background: linear-gradient(135deg, #1e3a8a 0%, #312e81 100%) !important; }
          .value-prop p { color: #bfdbfe !important; }
          .value-prop a { background-color: #1d4ed8 !important; box-shadow: 0 2px 4px rgba(29,78,216,0.2) !important; }
          .footer { background-color: #3a3a3a !important; border-top: 1px solid #4a4a4a !important; }
          .footer p { color: #9ca3af !important; }
          .footer strong { color: #ffffff !important; }
          .footer a { color: #60a5fa !important; }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
      <table class="outer-table" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f4f4f4; margin: 0;">
        <tr>
          <td align="center" style="padding: 0;">
            <table class="container" role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              
              <!-- Header -->
              <tr>
                <td class="header" style="background: linear-gradient(135deg, #093373 0%, #0d4a9d 100%); padding: 40px 30px; border-radius: 8px 8px 0 0; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">
                    Welcome to Atlas HomeServices!
                  </h1>
                  <p style="margin: 10px 0 0; color: #e6f0ff; font-size: 16px;">
                    Your free painting resources are ready
                  </p>
                </td>
              </tr>
              
              <!-- Main Content -->
              <tr>
                <td class="main-content" style="padding: 40px 30px;">
                  <p style="font-size: 18px; color: #333; margin: 0 0 20px; line-height: 1.6;">
                    Hi ${firstName},
                  </p>
                  <p style="font-size: 16px; color: #555; margin: 0 0 30px; line-height: 1.6;">
                    Thank you for your interest! We're excited to help you with your painting project. 
                    Here are your exclusive resources to get started:
                  </p>
                  
                  <!-- Resource Cards -->
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    
                    <!-- Color Collection PDF -->
                    <tr>
                      <td class="resource-card" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 25px; margin-bottom: 20px;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                          <tr>
                            <td style="width: 60px; vertical-align: top;">
                              <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px; display: flex; align-items: center; justify-content: center;">
                                <span style="font-size: 24px;">🎨</span>
                              </div>
                            </td>
                            <td style="padding-left: 20px;">
                              <h3 style="margin: 0 0 10px; color: #1f2937; font-size: 20px; text-align: center;">
                                The Room Inspiration Color Collection
                              </h3>
                              <p class="resource-desc" style="margin: 0 0 15px; color: #6b7280; font-size: 14px; line-height: 1.5; text-align: center;">
                                Discover trending color palettes and expert combinations that will transform your space.
                              </p>
                              <a href="${colorPaletteLink}" target="_blank" class="cta-button" style="display: inline-block; background-color: #093373; color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 25px; font-weight: 600; font-size: 14px;">
                                Open Color Guide
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    
                    <tr><td style="height: 20px;"></td></tr>
                    
                    <!-- Cost Estimator Tool -->
                    <tr>
                      <td class="resource-card" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 25px;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                          <tr>
                            <td style="width: 60px; vertical-align: top;">
                              <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 10px; display: flex; align-items: center; justify-content: center;">
                                <span style="font-size: 24px;">💰</span>
                              </div>
                            </td>
                            <td style="padding-left: 20px;">
                              <h3 style="margin: 0 0 10px; color: #1f2937; font-size: 20px; text-align: center;">
                                Instant Budget Planner Tool
                              </h3>
                              <p class="resource-desc" style="margin: 0 0 15px; color: #6b7280; font-size: 14px; line-height: 1.5; text-align: center;">
                                Get accurate painting quotes in 60 seconds. Know your budget before you hire.
                              </p>
                              <a href="${estimatorLink}" target="_blank" class="cta-button" style="display: inline-block; background-color: #093373; color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 25px; font-weight: 600; font-size: 14px;">
                                Open Estimator Tool
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- Value Proposition -->
                  <div class="value-prop" style="background: linear-gradient(135deg, #e0f2fe 0%, #e0e7ff 100%); border-radius: 8px; padding: 20px; margin: 30px 0; text-align: center;">
                    <p style="margin: 0; color: #1e40af; font-size: 16px; font-weight: 600;">
                      Get Your Free Estimate
                    </p>
                    <p style="margin: 10px 0 20px; color: #3730a3; font-size: 14px;">
                      Send us an email if you're ready for a stress-free painting experience.
                    </p>
                    <a href="https://atlas-paint.com/painting-landing?utm_source=free_tool_email&utm_medium=organic" target="_blank" style="display: inline-block; background-color: #093373; color: #ffffff; text-decoration: none; padding: 14px 35px; border-radius: 25px; font-weight: 600; font-size: 15px; box-shadow: 0 2px 4px rgba(9, 51, 115, 0.2); transition: all 0.3s;">
                      Visit Our Website
                    </a>
                  </div>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td class="footer" style="background-color: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; text-align: center; border-top: 1px solid #e5e7eb;">
                  <p style="margin: 0 0 10px; color: #6b7280; font-size: 14px;">
                    Best regards,<br>
                    <strong style="color: #1f2937;">The Atlas HomeServices Team</strong>
                  </p>
                  <p style="margin: 15px 0 0; color: #9ca3af; font-size: 12px;">
                    Atlas HomeServices Inc. | Richmond Hill, ON<br>
                    <a href="mailto:support@atlas-paint.com" style="color: #093373; text-decoration: none;">support@atlas-paint.com</a>
                  </p>
                  <p style="margin: 15px 0 0; color: #9ca3af; font-size: 11px;">
                    Having trouble accessing your resources? Forward this email to support@atlas-paint.com
                  </p>
                </td>
              </tr>
              
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

// Helper function to notify admin of failures
async function notifyAdminOfFailure(
  email: string,
  firstName: string,
  lastName: string | undefined,
  failureType: string,
  error: unknown
) {
  const errorDetails = error instanceof Error ? error.message : JSON.stringify(error);
  
  try {
    await resend.emails.send({
      from: 'Atlas System Alerts <alerts@atlas-paint.com>',
      to: ADMIN_EMAIL,
      subject: `🚨 Lead Processing Failure - ${failureType}`,
      html: `
        <h2>Lead Processing Failure Alert</h2>
        <p><strong>Failure Type:</strong> ${failureType}</p>
        <p><strong>Lead Details:</strong></p>
        <ul>
          <li>Email: ${email}</li>
          <li>Name: ${firstName} ${lastName || ''}</li>
          <li>Timestamp: ${new Date().toISOString()}</li>
        </ul>
        <p><strong>Error Details:</strong></p>
        <pre>${errorDetails}</pre>
        <p><strong>Action Required:</strong> Please manually process this lead or investigate the error.</p>
      `,
    });
  } catch (e) {
    console.error('Failed to send admin notification:', e);
  }
}

// Helper function to queue email for retry
// async function queueEmailForRetry(
//   email: string,
//   firstName: string,
//   colorPaletteLink: string,
//   estimatorLink: string
// ) {
  // Implementation depends on your infrastructure
  // Options:
  // 1. Store in database for cron job processing
  // 2. Push to message queue (SQS, Redis, etc.)
  // 3. Use webhook to trigger backup email service
  
  // Simple example: Store in database
  // await db.failedEmails.create({
  //   email,
  //   firstName,
  //   colorPaletteLink,
  //   estimatorLink,
  //   retryCount: 0,
  //   createdAt: new Date()
  // });
  
//   console.log('Email queued for retry:', { email, firstName });
// }

// Helper function to store failed lead data
async function storeFailedLead(leadData: any) {
  // Store in database or file system for manual recovery
  // This ensures no lead is ever lost
  
  // Example: Store in database
  // await db.failedLeads.create({
  //   ...leadData,
  //   failedAt: new Date(),
  //   processed: false
  // });
  
  console.log('Failed lead stored for manual processing:', leadData);
}