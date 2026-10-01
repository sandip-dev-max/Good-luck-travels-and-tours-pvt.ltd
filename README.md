# Good Luck International Travels & Tours — Production UI

Premium Next.js 15 + TypeScript + Tailwind travel agency website for Good Luck International Travels & Tours PVT. LTD.

## Design direction
- Minimal, classic, premium blue-led visual system
- Bricolage Grotesque (display) + Figtree (body)
- One palette everywhere, taken from the hero: navy `#06152e`, sea blue `#1c6a98`, mist `#d5e8f2`, and gold `#f4b73f` as the single accent (tokens in `tailwind.config.ts` and `app/globals.css`)
- Aircraft-led above-the-fold hero designed to keep core content visible without scrolling on desktop
- Realistic travel photography with editorial cards
- WhatsApp-first enquiry UX instead of fake online booking/search behaviour
- Responsive navigation, mobile menu and floating WhatsApp CTA
- Founder-led About page with Aatif Aslam portrait
- Tinkune + Sinamangal location information

## Pages
- Home
- Destinations + destination details
- Tours + tour details
- Flights
- Hotels
- Visa assistance
- About
- Contact
- Blog + article details
- Privacy Policy
- Terms of Service
- Loading, 404 and error states
- Sitemap + robots metadata

## WhatsApp
Primary enquiry number: +977 981-680-0052

The homepage service selector, contact form and major package CTAs open a pre-filled WhatsApp conversation. No fake search results or pretend booking API is used.

## Local brand assets
- `public/images/jet-top.webp` (hero jet, transparent)
- `public/images/good-luck-logo.jpeg`
- `public/images/aatif-aslam.jpeg`
- `app/icon.jpeg`

## Run locally
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
npm start
```

The package intentionally excludes `node_modules` and `.next`; install dependencies on the deployment machine before building.

## Production checklist
- Add real social profile URLs to `company.socials` in `data/site.ts`; the footer shows icons only when entries exist.
- Connect any future booking/CRM/email service only when the business is ready; current CTAs intentionally use WhatsApp.
- Verify `goodluckintl.com` and update metadata if the canonical production domain changes.
- Review legal/privacy text with the company's preferred legal adviser before publication.
