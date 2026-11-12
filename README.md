# noomeroo

React + TypeScript (Vite) app backed by [Supabase](https://supabase.com).

## Setup

```bash
npm install
cp .env.example .env.local   # then fill in your Supabase URL and anon key
npm run dev
```

Get the URL and anon key from the Supabase Dashboard → Project Settings → API.

## Scripts

- `npm run dev` – start the dev server
- `npm run build` – type-check and build for production
- `npm run preview` – preview the production build
- `npm run lint` – lint with oxlint

## Structure

- `src/lib/supabase.ts` – shared Supabase client
- `src/App.tsx` – app entry; shows connection and auth status
