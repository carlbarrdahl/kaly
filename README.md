# Kaly

A decentralized calendar and scheduling app built with Ceramic.

### Features

- [x] Web3 login with MetaMask (Self.ID)
- [x] Calendar and events is stored in Ceramic
- [x] Invite attendees with DID, wallet address or ENS (ENS not implemented yet)
- [x] The invited attendees can see these events when they sign in
- [ ] The organizer can update their created events
- [ ] Configure availability
- [ ] Events can be public, private or confidential (encrypted, only invited attendees can decrypt)
- Public events can be shared with a link (`https://kaly.../api/event/:streamId`)
- API endpoint to add your calendar to apps that support iCalendar ((`https://kaly.../api/ical/:did`))
- [x] Markdown for event descriptions
- [x] Keyboard shortcuts
  - 1 - Month view
  - 2 - Week view
  - 3 - Day view
  - 4 - Agenday view
  - R - Previous month / week / day (depends on view)
  - T - Go to today
  - Y - Next month / week / day (depends on view)
  - N - New event from next available time
- [ ] Import ical url into other Calendars (google, apple, microsoft, ...)
- [ ] API integration
  - Use Ceramic definitions to integrate on your own website

### Data models

#### Event

```ts
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
```

#### Availability

TBD

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.
