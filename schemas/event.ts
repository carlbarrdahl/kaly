import { z } from "zod";

/*
type Event = {
  organizer: string; // DID
  start: string;
  end?: string; // either end OR duration
  duration?: string;
  title: string;
  description?: string;
  url?: string;
  attendees: string[]; // DID
  location?: string;
  geo: { lat: number; lng: number };
  rrule?: string;
  classification: "PUBLIC" | "PRIVATE" | "CONFIDENTIAL";
};
*/
/*

type IAvailability = {
  rules: {
    type: string;
    intervals: { from: string; to: string }[];
    wday: string;
  }[];
};

*/

export const availabilitySchema = z.object({
  rules: z.array(
    z.object({
      type: z.string(),
      intervals: z.array(
        z
          .object({ from: z.string(), to: z.string() })
          .refine(
            (val) =>
              !Object.values(val).every((v) =>
                /^([0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(v)
              ),
            { message: "Time must be in HH:MM format" }
          )
      ),
      wday: z.string(),
    })
  ),
});

export type Availability = z.infer<typeof availabilitySchema>;

export const eventSchema = z.object({
  id: z.string(),
  organizer: z.string(),
  start: z.string(), // ISO string "2022-02-08T11:00:00.000Z"
  end: z.string().optional(),
  duration: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  url: z.string().optional(),
  attendees: z.string().array().optional(),
  location: z.string().optional(),
  geo: z.object({ lat: z.number(), lng: z.number() }).optional(),
  rrule: z.string().optional(),
  classification: z.enum(["public", "private", "confidential"]).optional(),
});

export type Event = z.infer<typeof eventSchema>;
