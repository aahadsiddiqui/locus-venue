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
    const response = await fetch('https://formsubmit.co/ajax/locuseventsinc@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: "New Booking Request from Locus Venue",
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