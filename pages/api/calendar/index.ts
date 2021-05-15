import { NextApiRequest, NextApiResponse } from "next";
const { google } = require("googleapis");
import { getToken } from "next-auth/jwt";

/* {"participants":["aa","bb","cc"],
"rangeState":{"from":"2021-05-11T15:00:00.000Z","to":"2021-05-25T15:00:00.000Z"},
"duration":{"id":4,"name":"1h","value":"3600"}} */

const positions = [
  {
    id: 1,
    time: "14:00",
    date: "January 7, 2020",
  },
  {
    id: 2,
    time: "16:00",
    date: "January 7, 2020",
  },
  {
    id: 3,
    time: "17:30",
    date: "January 14, 2020",
  },
];

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token: any = await getToken({
      req: _req,
      secret: process.env.GOOGLE_CLIENT_SECRET,
    });

    let auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    let credentials = {
      access_token: token.accessToken,
      token_type: "Bearer",
    };

    auth.setCredentials(credentials);

    let participants: any[] = [];

    _req.body.participants.map((par: any) => {
      participants.push({ id: par });
    });

    const calendar = google.calendar({ version: "v3", auth });

    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: _req.body.rangeState.from,
        timeMax: _req.body.rangeState.to,
        timeZone: "-03:00",
        items: participants,
      },
    });

    res.status(200).json(positions);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
