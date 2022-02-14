## Features

- View calendar
  - Shows all events in calendars
- Manage calendars
  - Create
  - Subscribe
- Create event
  - Add attendees
- Config availability
- Request meeting
  - Get availability
- Search event

### Stories

#### 1. Create event in a calendar

1. Create Event tile in Ceramic
   - `title, duration, ..., calendarId`
2. Save event in IDX (`store.merge("calendar", { [calendarId]: { events: { eventId } } })`)
3. For each attendee, push eventId + did to indexer (so they can query events they've been invited to)
   - `tags: ["events", did]`

#### 2. View event details

1. Get streamId from url params (`event/:streamId`)
2. Load Tile from Ceramic
3. Fetch attendees with indexer (`["attendees", eventId]`)

#### 3. Attend event

1. Push eventId + did to indexer
   - `tags: ["attendees", eventId]`

```ts
const indexer = {
  ["events/:did"]: { eventId }, // What events are this did going to?
  ["attendees/:event"]: { did }, // Who are going to this event?
};
```

---

- View calendars (month, week, day, agenda)
- Create new event
  - Specify recurring
- View event
  - Attend event / Add to own calendar
- Manage calendars
  - Create / Remove / Color
- Set availability
- See availability of user

Each user can have one public calendar and many private or subscriptions?

### View calendar

The calendar has 4 different views: Month, Week, Day and Agenda
Week is selected by default.

It will show all the events of all the active calendars.

#### Dev notes:

Components

- Calendar

```ts
type Calendars = {
  name: string;
  owner: string; // metadata.controller should be the same
  type: "private" | "public";
  events: string[];
}[];

// Get all calendars
c.store.get("calendars", did);
calendars = [
  {
    name: "Home",
    owner: "did",
    type: "private",
    events: [],
  },
];

// Get all events
calendars.events.map((eventId) => TileDocument.load(c, eventId));
events = [
  {
    title: "",
    // ...
  },
];
```

- What happens when the events array grow too large?
  - Purge older events from array?
  - Find a way to query only a set of events?
- How to handle repeating events?
- Performance if many events?
  - Just pass a relevant slice of events to Calendar component

### Manage calendars

Initial state:

- Home calendar is defined and selected
- Create new calendar
  - Enter name and visibility
- Subscribe to other Calendar

#### Dev notes

Components

- CalendarList
- CalendarSubscribe

### Create event

Click or drag on the calendar to open the create new event modal.
Fill out:

- title
- description
- adjust start, end time
  - Use duration instead of end time? More common and better ux?
- location (physical, zoom, etc)

### Configure availability

#### Dev notes

```ts
type Availability = {
  name: "Working hours";
  rules: {
    type: "wday" | "date"; // Date used for overrides on specific dates
    intervals: { from: string; to: string }[];
    wday?: string;
    date?: string;
  }[];
}[];

// Get availability for user
store.get("availability", did);
```

### Request meeting

### Search events

The search bar in the top of the screen can be used to search events. Filters can also be applied such as within which calendar, from-to dates, etc.

## List of components

- Calendar
- CalendarSubscribe (subscribe to calendar)
- CalendarList
- Availability
- NewEvent
  - DurationSelect
  - AttendeeList
  - RecurrencySetting
- ViewEvent

---

### Ideas

- What if each Calendar is an NFT?
  - Look into 809 more and MeetEth
