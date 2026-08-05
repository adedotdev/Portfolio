@AGENTS.md
# Portfolio (frontend)

Next.js 16 App Router + React 19 + TypeScript (strict). Tailwind v4. Single-page personal portfolio site.

## Commands
- Dev: `npm run dev` | Build: `npm run build` | Lint: `npm run lint`

## Architecture
- Single page (`app/page.tsx`) composed of section components from `components/` (hero, about, projects, skills, experience, leadership, contact, footer).
- Content lives in typed data files under `data/` (`profile.ts`, `projects.ts`, `skills.ts`, `experience.ts`, `education.ts`, `leadership.ts`), shaped by `data/types.ts`.
- Backend is a separate FastAPI service (see `backend/`); the frontend talks to it via `NEXT_PUBLIC_API_URL` (see `contact-form.tsx`/`contact.tsx`).
- Theming via `next-themes` (`theme-provider.tsx`, `theme-toggle.tsx`).

## Conventions
- Tailwind v4 configured via `@theme` in `app/globals.css` — there is NO tailwind.config.ts.
- Dark mode is the default-supported path; test both themes, including mobile (there's a history of mobile-only theme glitches).

## Off-limits
- `.env.local` is gitignored — never commit it or its values.
