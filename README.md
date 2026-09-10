# Campus Cup Clash

A plain Vite + React + TypeScript + Tailwind CSS v4 app (converted from a TanStack Start project — same UI, same components, no SSR/router).

## Getting started

```bash
npm install
npm run dev
```

The app will be available at http://localhost:5173.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — type-check and build for production (outputs to `dist/`)
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint
- `npm run format` — run Prettier

## Environment variables

Copy `.env.example` to `.env` and fill in your Supabase project values (already pre-filled with the original project's values in this conversion — replace `.env` with `.env.example` values if you want to point at your own Supabase project). Only variables prefixed with `VITE_` are exposed to the client, per Vite's convention.

## Structure

- `index.html` — Vite entry HTML (page `<head>` metadata lives here now)
- `src/main.tsx` — React root / mount point
- `src/App.tsx` — top-level component (renders the single `CampusCup` page)
- `src/components/campus-cup/CampusCup.tsx` — the actual page content (unchanged)
- `src/components/ui/*` — shadcn/ui components (unchanged)
- `src/styles.css` — Tailwind v4 + design tokens (unchanged)
- `src/integrations/supabase/` — Supabase client (client-only; server-only auth middleware/cron files from the TanStack Start version were removed since there's no server here)

## What changed from the original

This project originally ran on TanStack Start (file-based routing + SSR via Nitro, Lovable's `@lovable.dev/vite-tanstack-config`). Since the app only had a single route (`/`) and no server functions were used by the actual page, it's now a plain client-side Vite SPA:

- Removed: `@tanstack/react-router`, `@tanstack/react-start`, `@tanstack/router-plugin`, `@tanstack/react-query` (unused), `nitro`, `@lovable.dev/vite-tanstack-config`, `vite-tsconfig-paths`, `src/router.tsx`, `src/routeTree.gen.ts`, `src/routes/`, `src/start.ts`, `src/server.ts`, and the server-only Supabase auth/middleware files.
- Added: standard `vite.config.ts` (using `@vitejs/plugin-react` + `@tailwindcss/vite` + a plain `@` path alias), `index.html`, `src/main.tsx`, `src/App.tsx`.
- No visual/UI changes — `CampusCup.tsx` and all `src/components/ui/*` files are byte-for-byte the same as the original.
