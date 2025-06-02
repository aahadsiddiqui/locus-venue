import type { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Debug: Log environment variables (without exposing sensitive data)
    console.log('Checking environment variables:', {
      hasClientEmail: !!process.env.GOOGLE_CLIENT_EMAIL,
      hasPrivateKey: !!process.env.GOOGLE_PRIVATE_KEY,
      hasCalendarId: !!process.env.GOOGLE_CALENDAR_ID,
    });

    // Ensure environment variables are set and properly formatted
    const privateKey = process.env.GOOGLE_PRIVATE_KEY 
      ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
      : undefined;
    
    if (!process.env.GOOGLE_CLIENT_EMAIL || !privateKey || !process.env.GOOGLE_CALENDAR_ID) {
      throw new Error('Missing required Google Calendar credentials');
    }

    // Create JWT auth client
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
    });

    // Create calendar client
    const calendar = google.calendar({ version: 'v3', auth });

    // Get events
    const response = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      timeMin: (new Date()).toISOString(),
      maxResults: 100,
      singleEvents: true,
      orderBy: 'startTime',
    });

    return res.status(200).json({ 
      events: response.data.items || [],
      message: 'Successfully fetched calendar events'
    });

  } catch (error) {
    console.error('Calendar API Error:', error);
    
    // Return a more detailed error response
    return res.status(500).json({ 
      error: 'Failed to fetch calendar events',
      details: error instanceof Error ? error.message : 'Unknown error',
      // Add additional debug info
      debug: {
        hasCredentials: {
          clientEmail: !!process.env.GOOGLE_CLIENT_EMAIL,
          privateKey: !!process.env.GOOGLE_PRIVATE_KEY,
          calendarId: !!process.env.GOOGLE_CALENDAR_ID,
        }
      }
    });
  }
} 