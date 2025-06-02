import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, phone, eventDate, eventType, guestCount, additionalNotes } = req.body;

  try {
    const response = await fetch('https://formsubmit.co/ajax/430f12921ff038dc722474cb2e092d31', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: "New Booking Request from Locus Venue",
        _template: "table",
        _captcha: "false",
        _autoresponse: "Thank you for your booking request. We will contact you shortly to confirm your event details.",
        _replyto: email,
        name,
        email,
        phone,
        eventDate,
        eventType,
        guestCount,
        additionalNotes: additionalNotes || 'No additional notes'
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
} 