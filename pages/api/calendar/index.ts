import { NextApiRequest, NextApiResponse } from 'next'
const { google } = require('googleapis');
import { getToken } from 'next-auth/jwt';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token: any = await getToken({ req: _req, secret: process.env.GOOGLE_CLIENT_SECRET });

    let auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    let credentials = {
      access_token: token.accessToken,
      token_type: 'Bearer'
    };

    auth.setCredentials(credentials);

    const calendar = google.calendar({ version: 'v3', auth });

    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: '2021-05-15T10:00:00-03:00',
        timeMax: '2021-05-19T15:00:00-03:00',
        timeZone: '-03:00',
        items: [
          {
            id: "mcamerucci@kovix-group.com"
          },
          {
            id: "matias@kovix-group.com"
          }
        ]
      }
    });

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
