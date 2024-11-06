import type { NextApiRequest, NextApiResponse } from 'next';
import Mailjet from 'node-mailjet';

const mailjet = new Mailjet({
  apiKey: process.env.MAILJET_API_KEY!,
  apiSecret: process.env.MAILJET_API_SECRET!
});

// Email validation helper
function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, question, wantsCall } = req.body;

  // Validate email
  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  try {
    const result = await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: process.env.MAILJET_SENDER_EMAIL || "dzikrisyairozi@gmail.com",
            Name: process.env.MAILJET_SENDER_NAME || "AD Fixtures Website"
          },
          To: [
            {
              Email: process.env.MAILJET_RECIPIENT_EMAIL || "info@adfixtures.com.tw",
              Name: process.env.MAILJET_RECIPIENT_NAME ||"AD Fixtures"
            }
          ],
          Subject: "New Contact Form Submission",
          TextPart: `New email subscription from: ${email}\nQuestion: ${question}\nWants a call: ${wantsCall ? 'Yes' : 'No'}`,
          HTMLPart: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>New Contact Request</title>
              </head>
              <body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: Arial, sans-serif;">
                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td align="center" style="padding: 40px 0;">
                      <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                        <!-- Header -->
                        <tr>
                          <td style="padding: 40px 40px 20px 40px; background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); border-radius: 8px 8px 0 0;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">New Contact Request</h1>
                            <p style="margin: 10px 0 0 0; color: #e5e7eb; font-size: 16px;">A potential client has reached out through the website</p>
                          </td>
                        </tr>
                        
                        <!-- Content -->
                        <tr>
                          <td style="padding: 30px 40px;">
                            <table role="presentation" style="width: 100%; border-collapse: collapse;">
                              <!-- Email -->
                              <tr>
                                <td style="padding: 15px; background-color: #f8fafc; border-radius: 6px;">
                                  <p style="margin: 0; color: #64748b; font-size: 14px;">Email Address</p>
                                  <p style="margin: 5px 0 0 0; color: #0f172a; font-size: 16px; font-weight: 500;">${email}</p>
                                </td>
                              </tr>
                              
                              <!-- Question -->
                              <tr>
                                <td style="padding: 20px 0;">
                                  <p style="margin: 0 0 8px 0; color: #64748b; font-size: 14px;">Question/Message</p>
                                  <p style="margin: 0; padding: 15px; background-color: #f8fafc; border-radius: 6px; color: #0f172a; font-size: 16px;">
                                    ${question || 'No questions asked'}
                                  </p>
                                </td>
                              </tr>
                              
                              <!-- Call Request -->
                              <tr>
                                <td style="padding: 15px; background-color: ${wantsCall ? '#ecfdf5' : '#f8fafc'}; border-radius: 6px; border-left: 4px solid ${wantsCall ? '#059669' : '#cbd5e1'};">
                                  <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                    <tr>
                                      <td>
                                        <p style="margin: 0; color: #64748b; font-size: 14px;">Call Requested</p>
                                        <p style="margin: 5px 0 0 0; color: #0f172a; font-size: 16px; font-weight: 500;">
                                          ${wantsCall ? '✅ Yes - Schedule a call' : '❌ No call needed'}
                                        </p>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                              
                              <!-- Timestamp -->
                              <tr>
                                <td style="padding-top: 30px; border-top: 1px solid #e2e8f0; margin-top: 20px;">
                                  <p style="margin: 0; color: #64748b; font-size: 14px; font-style: italic;">
                                    Received on ${new Date().toLocaleString('en-US', { 
                                      weekday: 'long',
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric',
                                      hour: '2-digit',
                                      minute: '2-digit',
                                      timeZoneName: 'short'
                                    })}
                                  </p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                          <td style="padding: 30px 40px; background-color: #f8fafc; border-radius: 0 0 8px 8px; border-top: 1px solid #e2e8f0;">
                            <p style="margin: 0; color: #64748b; font-size: 14px; text-align: center;">
                              This is an automated message from your website contact form.
                              <br>Please respond to this inquiry as soon as possible.
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </body>
            </html>
          `,
          CustomID: "WebsiteSubscription"
        }
      ]
    });

    console.log('Mailjet Response:', result.body);

    if (result.response.status === 200) {
      return res.status(200).json({ message: 'Email sent successfully' });
    } else {
      throw new Error('Failed to send email');
    }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error sending email:', {
      error: error.message,
      details: error.response?.body
    });
    return res.status(500).json({ 
      message: 'Error sending email',
      error: error.message 
    });
  }
}