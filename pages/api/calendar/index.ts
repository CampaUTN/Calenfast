import { NextApiRequest, NextApiResponse } from "next";
const { google } = require("googleapis");
import { getToken } from "next-auth/jwt";
const availability = require('timeslot-availability');
const moment = require('moment-timezone');

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

    let start = _req.body.rangeState.from;
    let end = _req.body.rangeState.to;
    const timespan = _req.body.duration.value;

    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: start,
        timeMax: end,
        items: participants,
      }
    });

    let busy: any = [];

    Object.values(response.data.calendars).forEach(
      (mail: any) => {
        busy = busy.concat(mail.busy);
      }
    );

    console.log(busy);

    const bookable = availability(start, end, timespan, busy);

    bookable.forEach((date: any) => {
      date.start = moment(date.start).tz('America/Argentina/Buenos_Aires').format('YYYY-MM-DDTHH:mm');
      date.end = moment(date.end).tz('America/Argentina/Buenos_Aires').format('YYYY-MM-DDTHH:mm');
    });

    res.status(200).json(bookable);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
