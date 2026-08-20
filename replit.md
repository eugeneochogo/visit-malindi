# Visit Malindi

Visit Malindi is a Vite + React destination guide for Malindi, Watamu and the Kenyan Coast.

## Run locally in Replit

```bash
npm run dev
```

The development server runs on port `5000` and is configured to allow Replit's preview host.

## Production build

```bash
npm run build
```

Vite writes the deployable static site to `dist/`, ready for a standard Vercel deployment.

## WhatsApp configuration

The website uses WhatsApp as its primary enquiry path. To direct links to the final concierge number, add a `VITE_WHATSAPP_NUMBER` environment variable containing the number in international digits only (for example, `254...`). Until then, the site opens WhatsApp with the relevant enquiry message ready to send.

## Content

The public content is maintained as structured static data in `src/data.js`. The existing `MASTER-SPECIFICATION.md` remains the product source of truth.