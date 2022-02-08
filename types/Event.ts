export type Event = {
  start: string;
  end: string;
  title: string;
  description: string;
  url: string;
  attendees: string[];
  allDay?: boolean;
};
