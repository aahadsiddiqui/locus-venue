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
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('eventDate', eventDate);
    formData.append('eventType', eventType);
    formData.append('guestCount', guestCount);
    formData.append('additionalNotes', additionalNotes || '');
    
    // Send to your email
    await fetch('https://formsubmit.co/aahadsidd@gmail.com', {
      method: 'POST',
      body: formData
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
} 