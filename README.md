# Kaly

### Features

- [x] Web3 login with MetaMask (Self.ID)
- [x] Calendar and events is stored in Ceramic
- [x] Invite attendees with DID, wallet address or ENS (ENS not implemented yet)
- [x] The invited attendees can see these events when they sign in
- [ ] The organizer can update their created events
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
- [ ] API integration
  - Use Ceramic definitions to integrate on your own website

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.
