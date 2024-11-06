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
            Email: process.env.MAILJET_SENDER_EMAIL || "dikiogres@gmail.com",
            Name: "AD Fixtures Website"
          },
          To: [
            {
              Email: process.env.MAILJET_RECIPIENT_EMAIL || "dzikrisyairozi@gmail.com",
              Name: "AD Fixtures"
            }
          ],
          Subject: "New Contact Form Submission",
          TextPart: `New email subscription from: ${email}\nQuestion: ${question}\nWants a call: ${wantsCall ? 'Yes' : 'No'}`,
          HTMLPart: `
            <h3>New Email Subscription</h3>
            <p>A new user has subscribed through the website:</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Question:</strong> ${question || 'No question asked'}</p>
            <p><strong>Wants a call:</strong> ${wantsCall ? 'Yes' : 'No'}</p>
            <p>Date: ${new Date().toLocaleString()}</p>
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