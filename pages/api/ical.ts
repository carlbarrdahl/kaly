import { NextApiRequest, NextApiResponse } from "next";

import nc from "next-connect";
import * as ics from "ics";

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})
  //   .use(someMiddleware())
  .get((req, res) => {
    res.setHeader("Content-Type", "text/calendar; charset=utf-8");
    res.setHeader("Content-Disposition", "attachment; filename=calendar.ics");

    const { error, value } = ics.createEvents([
      {
        title: "Yoga",
        start: [2022, 2, 5, 18],
        duration: { minutes: 60 },
        alarms: [
          {
            action: "display",
            description: "Reminder",
            trigger: { minutes: 30, before: true },
          },
        ],
        attendees: [
          {
            name: "Carl Barrdahl",
            email: "carlbarrdahl@gmail.com",
            rsvp: true,
            partstat: "ACCEPTED",
            role: "REQ-PARTICIPANT",
          },
        ],
      },
      {
        title: "Dinner",
        start: [2022, 2, 5, 12, 15],
        duration: { hours: 1, minutes: 30 },
      },
    ]);

    console.log(value);

    res.send(value);
  });

export default handler;
