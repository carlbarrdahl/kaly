# dcal

0x6A4E948a81E20802C91bB48D825A741a6F1E9062

### TODO

Prio for deploy:

- [ ] Ceramic Network to deploy to (readonly could work for demo)
- [x] Move indexer to API so the controller will be the same between logged in users
- [x] Fix event id after created
- [ ] Availability
- [ ] Verify and resolve ens and eth addresses for attendees into DIDs
- [ ] Record demo
- [ ] Update event
- [ ] Event Details page
- [ ] Custome compontents for Event and EventWrapper in Calendar
- [ ] GeoCoding for location + gps
- [ ] Event comments
- [ ] Add support for Tasks and Journal
  - [ ] These could be great within DAOs?

### Features

- Web3 login with MetaMask (Self.ID)
- Calendar and events is stored in Ceramic
- Invite attendees with DID, wallet address or ENS
- The invited attendees can see these events when they sign in
- The organizer can update their created events
- Events can be public, private or confidential (encrypted, only invited attendees can decrypt)
- Public events can be shared with a link (`https://kaly.../api/event/:streamId`)
- API endpoint to add your calendar to apps that support iCalendar ((`https://kaly.../api/ical/:did`))
- Markdown for event descriptions
- Keyboard shortcuts
  - 1 - Month view
  - 2 - Week view
  - 3 - Day view
  - 4 - Agenday view
  - R - Previous month / week / day (depends on view)
  - T - Go to today
  - Y - Next month / week / day (depends on view)
  - N - New event from next available time
- API integration
  - Use Ceramic definitions to integrate on your own website

### Flow

- [x] Sign in with wallet
- [ ] Configure availability
- [x] Create new event
- [x] View event
- [x] Share link

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
