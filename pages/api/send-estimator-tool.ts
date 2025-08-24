import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("Resend API Key is not set in environment variables.");
    return res.status(500).json({ message: "Server configuration error." });
  }

  // 1. Get the user's email and first name from the request body.
  const { email, firstName } = req.body;

  if (!email || !firstName) {
    return res.status(400).json({ message: 'Missing required fields: email and firstName.' });
  }

  const toolLink = 'https://atlas-paint.com/estimatora7b3x9c2v1z4pq8r';

  try {
    await resend.emails.send({
      // 2. Set the 'from' address. IMPORTANT: This must be a verified domain in your Resend account.
      from: 'Atlas HomeServices <notification@atlas-paint.com>',
      
      // 3. Set the recipient to the user's email address.
      to: email,

      // 4. Set a user-facing subject line.
      subject: `Here's Your Free Painting Estimator Tool!`,

      // 5. Use a new, mobile-first HTML template for the email body.
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <title>Your Free Estimator Tool</title>
          <style>
            @media only screen and (max-width: 620px) {
              table.body h1 {
                font-size: 28px !important;
                margin-bottom: 10px !important;
              }
              table.body p,
              table.body ul,
              table.body ol,
              table.body td,
              table.body span,
              table.body a {
                font-size: 16px !important;
              }
              table.body .wrapper,
              table.body .article {
                padding: 10px !important;
              }
              table.body .content {
                padding: 0 !important;
              }
              table.body .container {
                padding: 0 !important;
                width: 100% !important;
              }
              table.body .main {
                border-left-width: 0 !important;
                border-radius: 0 !important;
                border-right-width: 0 !important;
              }
            }
          </style>
        </head>
        <body style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f6f6f6; width: 100%;">
            <tr>
              <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
              <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; max-width: 580px; padding: 10px; width: 580px; margin: 0 auto;">
                <div class="content" style="box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px;">
                  <table role="presentation" class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; border-radius: 3px; width: 100%;">
                    <tr>
                      <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                          <tr>
                            <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
                              <p style="font-family: sans-serif; font-size: 18px; font-weight: bold; margin: 0; margin-bottom: 15px;">Hi ${firstName},</p>
                              <p style="font-family: sans-serif; font-size: 16px; font-weight: normal; margin: 0; margin-bottom: 15px;">Thank you for your interest! As promised, here is your exclusive access to the Homeowner's Shield Estimator.</p>
                              <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; box-sizing: border-box; width: 100%;">
                                <tbody>
                                  <tr>
                                    <td align="center" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;">
                                      <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
                                        <tbody>
                                          <tr>
                                            <td style="font-family: sans-serif; font-size: 16px; vertical-align: top; border-radius: 25px; text-align: center; background-color: #093373;">
                                              <a href="${toolLink}" target="_blank" style="display: inline-block; color: #ffffff; background-color: #093373; border: solid 1px #093373; border-radius: 25px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 16px; font-weight: bold; margin: 0; padding: 12px 25px; text-transform: capitalize;">Painting Estimator Tool</a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <p style="font-family: sans-serif; font-size: 16px; font-weight: normal; margin: 0; margin-bottom: 15px;">This tool will give you an unfair advantage when hiring painters by providing a fair and clear estimate in just 60 seconds.</p>
                              <p style="font-family: sans-serif; font-size: 16px; font-weight: normal; margin: 0; margin-bottom: 15px;">Best regards,<br>The Atlas HomeServices Team</p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    </table>
                  <div class="footer" style="clear: both; margin-top: 10px; text-align: center; width: 100%;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                      <tr>
                        <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #999999; font-size: 12px; text-align: center;">
                          <span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">Atlas HomeServices Inc. | Richmond Hill, ON</span>
                        </td>
                      </tr>
                    </table>
                  </div>
                  </div>
              </td>
              <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
            </tr>
          </table>
        </body>
        </html>
      `
    });
    return res.status(200).json({ message: 'Estimator tool email sent successfully.' });
  } catch (error) {
    console.error('Failed to send tool email:', error);
    return res.status(500).json({ message: 'Could not send the estimator tool email.' });
  }
}