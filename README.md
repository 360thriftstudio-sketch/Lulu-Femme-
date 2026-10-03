# Lulu Femme

Wholesale website for Grade A pre-owned Lululemon bundles. Next.js 15 (App Router), TypeScript, Tailwind CSS v4.

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in the IDs (optional for local testing)
npm run dev                  # http://localhost:3000
```

| Command                       | What it does                                                                           |
| ----------------------------- | -------------------------------------------------------------------------------------- |
| `npm run dev`                 | Development server                                                                     |
| `npm run build` / `npm start` | Production build / serve it                                                            |
| `npm run lint`                | ESLint                                                                                 |
| `npm run format`              | Prettier                                                                               |
| `npm run test:a11y`           | Builds, then runs axe (WCAG 2.1 AA) + layout tests at 375px and 1440px, light and dark |

## Where to edit things

- **Bundles** – `data/bundles.ts` (items, sizes, status `available`/`reserved`/`sold`, optional `video` URL). Item quantities are checked against `pieces` and a console error is shown if they don't add up.
- **Bundle photos** – `public/bundles/`. **Logos** – `public/brand/`. Favicon – `app/icon.png`, `app/apple-icon.png`.
- **Contact details** – `lib/site.ts`. **FAQ** – `lib/faq.ts`. **Bundle page policies** – `lib/policies.tsx`.
- **Colours / fonts** – `app/globals.css`; see `/styleguide` on the site.
- Placeholder text is marked **`[EDIT]`** – search the project for it.

## Environment variables

| Name                       | Purpose                                                                                                     |
| -------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_FORMSPREE_ID` | Formspree form ID (the part after `formspree.io/f/`). Used by the quote, custom order and drop-alert forms. |
| `NEXT_PUBLIC_GA_ID`        | Google Analytics 4 measurement ID (`G-XXXXXXX`). Only loaded after a visitor accepts cookies.               |
| `NEXT_PUBLIC_SITE_URL`     | Your live domain, e.g. `https://www.lulufemme.co.uk` (sitemap, Open Graph, structured data).                |

GA4 events: `view_bundle`, `save_bundle`, `add_to_quote`, `start_quote`, `submit_quote`, `submit_custom_order`, `click_instagram`, `click_email`, `newsletter_signup`.

## Deploy to Vercel

1. **Code on GitHub** – this repository (`360thriftstudio-sketch/Lulu-Femme-`) already holds the code. Merge the working branch into `main` (open a pull request on GitHub and merge it).
2. **Formspree** – sign up at formspree.io → _New form_ → copy the ID from the endpoint `https://formspree.io/f/<ID>`. Set the notification email to lulufemmee@gmail.com.
3. **Google Analytics** – analytics.google.com → _Admin → Create property_ → _Web data stream_ → copy the Measurement ID (`G-…`).
4. **Vercel** – sign in at vercel.com with GitHub → _Add New… → Project_ → import `Lulu-Femme-`. Vercel detects Next.js; leave the build settings as they are.
5. Before clicking _Deploy_, open **Environment Variables** and add `NEXT_PUBLIC_FORMSPREE_ID` and `NEXT_PUBLIC_GA_ID` (and `NEXT_PUBLIC_SITE_URL` once you have a domain). Click **Deploy**.
6. Every push to `main` now redeploys automatically; other branches get preview URLs. After changing an environment variable, redeploy (_Deployments → … → Redeploy_) – `NEXT_PUBLIC_` values are baked in at build time.

### Connect your own domain

1. Buy a domain (e.g. from Namecheap, GoDaddy, Cloudflare or 123-reg).
2. In Vercel: _Project → Settings → Domains_ → add `lulufemme.co.uk` **and** `www.lulufemme.co.uk` (choose which one redirects to the other).
3. Vercel shows the DNS records to add at your registrar – usually an **A record** for the root domain and a **CNAME** for `www` pointing to Vercel. Copy them exactly from Vercel's screen.
4. Wait for DNS (minutes to a few hours). Vercel issues the HTTPS certificate automatically.
5. Set `NEXT_PUBLIC_SITE_URL` to the final address and redeploy. Optionally add the domain in Google Search Console and submit `/sitemap.xml`.
