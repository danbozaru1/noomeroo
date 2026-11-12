# noomeroo

React + TypeScript (Vite) app backed by [Supabase](https://supabase.com).

## Setup

```bash
npm install
```

### Option A: local Supabase (needs Docker)

```bash
npx supabase start
```

This prints an `API_URL` and `ANON_KEY`. Put them in `.env.local`:

```
VITE_SUPABASE_URL=http://127.0.0.1:54321
VITE_SUPABASE_ANON_KEY=<ANON_KEY from supabase start>
```

Supabase Studio runs at http://127.0.0.1:54323. Stop the stack with `npx supabase stop`.

### Option B: hosted Supabase project

```bash
cp .env.example .env.local
```

Fill in the URL and anon key from the Supabase Dashboard → Project Settings → API.

### Run the app

```bash
npm run dev
```

## Scripts

- `npm run dev` – start the dev server
- `npm run build` – type-check and build for production
- `npm run preview` – preview the production build
- `npm run lint` – lint with oxlint

## Structure

- `src/lib/supabase.ts` – shared Supabase client
- `src/App.tsx` – app entry; shows connection and auth status
- `supabase/` – Supabase CLI config (migrations go in `supabase/migrations`)
