import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

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

export const event = z.object({
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

export const toJson = () => zodToJsonSchema(event);
export type Event = z.infer<typeof event>;
