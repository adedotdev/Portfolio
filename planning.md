# Portfolio Site — Architecture Roadmap

## Context

The `Portfolio` repo is currently empty (old static Sass/jQuery site assets are being removed at the parent-repo level). The goal is a personal portfolio consolidating projects, experience, skills, campus involvement/leadership, and contact info. The user is new to the modern web stack (React/Next.js/Tailwind/FastAPI/Vercel) but wants to use this build as a learning opportunity, so the roadmap is deliberately phased: each phase produces something real and deployable rather than one big-bang build.

Decisions locked in with the user:
- Frontend: **Next.js (App Router) + TypeScript + Tailwind CSS**, deployed on **Vercel**.
- Backend: **FastAPI**, deployed on **Render** (with Render's managed Postgres when a DB is introduced).
- Initial content management: **typed data files** in the frontend repo (fastest path to a real site); a DB-backed admin API comes later once the FastAPI/DB pieces exist.
- Feature set: dark/light mode toggle, animations (Framer Motion), resume download button, visitor analytics.
- FastAPI's job, per the user: contact form handling, dynamic GitHub project data, and eventually an admin/content API backed by a database — plus general learning value.
- Layout: **single-page scrolling** site with anchor-linked sections, dark-first/techy visual style.
- Contact email delivery: **Resend** (not SMTP).

## Current Status (updated as phases complete)

| Phase | Status |
|---|---|
| 0 — Scaffolding | ✅ Done |
| 1 — Static frontend MVP | ✅ Done |
| 2 — FastAPI contact form | ✅ Done (verified end-to-end with a real Resend send) |
| 3 — Dynamic GitHub project data | ✅ Done |
| — Content & design polish (post-Phase-3) | ✅ Done — see below |
| — Visual redesign round 2 (fonts, orb, marquee, typewriter) | ✅ Done — see below |
| — Deploy to Vercel + Render | ✅ Done — both live, verified end-to-end |
| 4 — Database + admin content API | Not started |
| 5 — Polish | Partially covered by the design passes above; SEO/analytics/CI/tests still open |

**Deployment status:** ✅ Both live.
- **Vercel (frontend)**: live at `https://dami-adenugba.vercel.app`. Root Directory set to `frontend`. The earlier account-recovery blocker (a "deleted-but-not-deleted" Vercel account state) resolved itself via Vercel support before this deploy.
- **Render (backend)**: live at `https://portfolio-uzmr.onrender.com`. Root Directory `backend`, start command `uvicorn app.main:app --host 0.0.0.0 --port $PORT`. Env vars set: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `CORS_ORIGINS`.
- **CI/CD**: both platforms auto-deploy on every push to `main` via GitHub webhook — no manual redeploy step for normal changes. This is genuine continuous deployment; there's no separate CI stage (test suite / lint gate independent of the build), which is still the Phase 5 stretch item.
- **Verified end-to-end in production**: contact form submission → FastAPI → Resend → real email delivered. One real bug hit and fixed during verification: `CORS_ORIGINS` on Render was initially set to `["http://dami-adenugba.vercel.app"]` (http, not https) — browsers send `https://` as the Origin for the live site, so the scheme mismatch caused FastAPI's CORS check to reject the preflight ("Disallowed CORS origin") even though the domain name was correct. Fixed by correcting the scheme.

## Content & Design Polish (post-Phase-3)

Not part of the original phased roadmap, but a substantial pass done between Phase 3 and Phase 4 to fix the site feeling generic/template-y and add real personal content:

- **New About section** (`components/about.tsx`): LinkedIn bio as two paragraphs plus a "currently seeking full-time roles" status badge.
- **Education merged into About**: the standalone Education section was removed; a "diploma"-styled card now sits beside the About text in the same section — circular photo, small pin accent, school/degree header, CSUN affiliations listed as `Org · Role` lines (NSBE VP, ARCS Research Associate, NSA Historian, BSU Member), coursework as a flowing comma-separated line, and a `date · location` footer.
- **Leadership rebuilt**: NSBE promoted to a full-width featured card with real accomplishments (chapter revival, NSBE Jr. chapter founding, membership growth, etc.); ARCS, ColorStack, CodePath, and STEM Advantage given real bullets instead of empty org/role pills. ColorStack links back to `#projects` since it's the same SyllabAI work.
- **Experience rebuilt**: current role (Hyve Solutions) gets an accent border and a pulsing "Current" badge to visually outrank past roles; each role's bullets condensed from 3 down to 1 dense, impact-preserving sentence; added company logos (`hyve.jpg`, `arcs-logo.jpg`) and per-role tech-stack badges.
- **`PhotoSlot` component** (`components/photo-slot.tsx`): shared image component used across Hero/About/Leadership/Experience — shows the real image via `next/image` when a data file sets a `photo` path, otherwise renders a dashed placeholder box printing the exact file path to drop the image at. Supports `fit="cover" | "contain"` — `contain` (with inner padding) is used for company logos so they're never cropped, `cover` (default) for real photos.
- **Sitewide container widened** `max-w-4xl → max-w-6xl` — this, not padding, was the actual fix for the "too much empty space on the sides" complaint.
- **Subtle dot-grid background texture** added site-wide via `globals.css` (uses the existing `--border` token so it adapts across light/dark).
- **Mobile nav**: hamburger menu added to `nav.tsx` — section links were previously unreachable below the `sm` breakpoint.
- Numerous sizing/spacing iterations on photos and top padding based on visual feedback.

## Visual Redesign Round 2 (post-deployment-prep, pre-first-deploy)

A second design pass, inspired by a reference portfolio the user liked (serif/mono typography, understated dividers instead of heavy boxes, a rotating dot sphere). Scope was deliberately curated — the reference's light "paper" theme was explicitly rejected in favor of keeping the dark-first look:

- **Serif + mono type pairing**: added Fraunces (`next/font/google`, exposed as `--font-serif` / `font-serif`) for the hero name, all section headings, and every card/role/project/org title. Dates, tags, and labels stay in the existing Geist Mono; body copy stays Geist Sans.
- **Lighter card style**: removed the heavy `border + bg-surface` boxes from Experience, Skills, Leadership, About, and Contact — replaced with divider lines between list items (or a column divider for About/Contact split panels), plus `·`-joined plain text instead of boxed tags. Projects kept a thin border but dropped the background fill; bullets there use `→` instead of a dot marker.
- **3D dot orb** (`components/dot-orb.tsx`): ~160 points distributed evenly across a real sphere via a Fibonacci sphere algorithm (not a flat circle), rendered as plain accent-colored dots (a code-glyph-character variant was tried and explicitly rejected — read as "math major," not personality). Rotates via CSS `rotateY` + `perspective` + `preserve-3d`, alternating direction every 6s cycle; near dots are larger/more opaque than far dots for depth. Pure CSS animation, no JS/hooks needed, so it stays a server component. Currently mounted standalone between Hero and the skills marquee for evaluation — **final placement (next to name vs. behind photo vs. elsewhere) is still an open decision.**
- **Skills marquee** (`components/skills-marquee.tsx`): full-bleed, seamlessly-looping horizontal strip of Frameworks/Libraries skills (with icons from `skill-icons.tsx`) directly under the Hero, pure CSS `@keyframes` animation, pauses on hover.
- **Typewriter effect** (`components/typewriter.tsx`): both experience role titles (`Systems Software Engineer`, `Software Engineer Associate`) type out character-by-character when scrolled into view, using framer-motion's `useInView` to trigger once. Screen-reader friendly (`aria-label` carries the full text, animated span is `aria-hidden`).
- Both `Reveal`-based scroll animations and the new marquee/orb/typewriter all respect `prefers-reduced-motion` (via `useReducedMotion()` or Tailwind's `motion-reduce:` variant), consistent with the rest of the site.
- Small fixes from user feedback: removed a left-accent border on the current (Hyve Solutions) experience entry that was misaligning it against the ARCS entry (the pulsing "Current" badge alone was judged sufficient), and tightened the spacing above the "currently seeking" badge in About.

## Actual Architecture (as built)

```
Portfolio/
├── frontend/
│   ├── app/
│   │   ├── layout.tsx          root layout: fonts, ThemeProvider, Nav, Footer, metadata
│   │   ├── page.tsx             assembles all sections in order
│   │   └── globals.css          Tailwind v4 theme tokens (light/dark via .dark class) + dot-grid texture
│   ├── components/
│   │   ├── nav.tsx (with mobile menu), footer.tsx, theme-provider.tsx, theme-toggle.tsx
│   │   ├── reveal.tsx            Framer Motion scroll-in wrapper (one-time, on scroll into view)
│   │   ├── typewriter.tsx        character-by-character text reveal, triggered on scroll into view
│   │   ├── dot-orb.tsx           rotating 3D sphere of dots (Fibonacci distribution), CSS-only
│   │   ├── skills-marquee.tsx    full-bleed looping strip of Frameworks/Libraries skills
│   │   ├── skill-icons.tsx       icon lookup map (react-icons) keyed by skill name
│   │   ├── section-heading.tsx   numbered section heading used across sections
│   │   ├── photo-slot.tsx        shared image-or-placeholder component (cover/contain fit)
│   │   ├── hero.tsx, about.tsx, experience.tsx, projects.tsx, skills.tsx,
│   │   │   leadership.tsx, contact.tsx, contact-form.tsx
│   │   │   (no standalone education.tsx — merged into about.tsx)
│   ├── data/                     typed content, single source of truth for site copy
│   │   ├── types.ts              Profile, Education, Experience, Project, SkillGroup, LeadershipRole
│   │   ├── profile.ts, education.ts, experience.ts, projects.ts, skills.ts, leadership.ts
│   ├── public/resume.pdf, public/images/ (profile, education, leadership, experience logos)
│   └── .env.example / .env.local  NEXT_PUBLIC_API_URL
├── backend/
│   ├── app/
│   │   ├── main.py               FastAPI app, CORS, router registration
│   │   ├── routers/contact.py    POST /contact — validates via Pydantic, sends via Resend
│   │   ├── routers/github.py     GET /github/repos/{owner}/{repo} — GitHub stats, 1hr in-memory cache
│   │   └── core/config.py        pydantic-settings: CORS origins, Resend key, to/from email
│   ├── requirements.txt
│   └── .env.example / .env        RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL, CORS_ORIGINS
└── README.md, planning.md
```

Notable deviations from the original target sketch:
- **Single page, not multi-route.** All sections (`#about`, `#experience`, `#projects`, `#skills`, `#leadership`, `#contact`) live on `/` with anchor navigation, rather than separate `/projects`, `/experience` routes. Education has no anchor of its own — it lives inside `#about`.
- **`data/` uses a shared `profile.ts`**, not a `site.ts` — same purpose (name, tagline, bio, contact links, resume path), different filename, defined via a shared `types.ts` interface file.
- **Resend sandbox sender**: using the default `onboarding@resend.dev` sender (no custom domain verified yet), which only delivers to the Resend account owner's own email — fine for a personal contact form pointed at `damidenuga16@gmail.com`, but will need a verified domain sender if that ever changes.

- **Frontend ↔ Backend**: frontend calls FastAPI via `NEXT_PUBLIC_API_URL`; FastAPI CORS allowlists `localhost:3000` today and will add the Vercel domain once deployed.
- **Data flow (current)**: content lives in `frontend/data/*.ts`, statically rendered — no DB dependency to ship v1.
- **Data flow (later)**: Postgres becomes source of truth for projects/experience; static data files are migrated in and retired, or kept as seed/fallback.

## Phased Roadmap

**Phase 0 — Scaffolding** ✅
Monorepo layout above, `.gitignore`, `README.md`, env var templates (`.env.example` for both apps), base `package.json` / `requirements.txt`.

**Phase 1 — Static frontend MVP (fully deployable on its own)** ✅
Next.js + Tailwind site with all core sections driven by `frontend/data/*.ts`. Dark/light toggle (`next-themes`, dark-first default), Framer Motion scroll-reveal animations, resume download button (`public/resume.pdf`). Lint and production build verified clean; dev server verified in-browser.

**Phase 2 — FastAPI contact form** ✅
FastAPI `POST /contact` endpoint validates input via Pydantic and sends through Resend. Frontend contact form (`contact-form.tsx`) posts to it with loading/success/error states, alongside direct mailto/GitHub/LinkedIn links. Verified end-to-end locally: CORS preflight from `localhost:3000`, a real send via Resend, and a delivered email.

**Phase 3 — Dynamic GitHub project data** ✅
FastAPI endpoint `GET /github/repos/{owner}/{repo}` fetches repo stats (stars, forks, language, last-pushed date) from the GitHub REST API, cached in-memory for 1 hour (`backend/app/routers/github.py`). Frontend wiring lives in `frontend/components/projects.tsx`: any project with a `githubUrl` in `data/projects.ts` automatically gets its star count + last-updated date fetched and overlaid on the card. Verified working end-to-end using this site's own repo as a real test case (`adedotdev/Portfolio` — confirmed live stats baked into the build), then removed that entry from `data/projects.ts` since listing the portfolio as a project *within itself* read as too self-referential/redundant next to the footer credit. The infrastructure is fully live and verified — SyllabAI or California Jones will pick up live stats automatically the moment either gets a `githubUrl` set.

Architecturally, this fetch happens **server-side at build time** (`Projects` is an `async` Server Component), not client-side — Next.js bakes the result into the static HTML on each deploy, rather than the visitor's browser fetching it live. Simpler (no loading state / failure UI needed — a failed fetch just falls back to no stats shown for that card) and consistent with the rest of the site being fully static, at the cost of stats only refreshing on the next deploy rather than being truly real-time. Good enough for a personal portfolio; would need reconsidering if live-second freshness ever mattered.

**Local dev gotcha hit during this**: `NEXT_PUBLIC_API_URL=http://localhost:8000` silently failed during `npm run build` even with the backend running — Node's `fetch` resolved `localhost` to the IPv6 loopback (`::1`) first, which nothing was listening on (`uvicorn` without `--host` only binds IPv4). Fixed by using `http://127.0.0.1:8000` explicitly in `.env.local`/`.env.example`. Doesn't affect production (Vercel's build fetches the real `https://portfolio-uzmr.onrender.com` URL, no localhost involved) — local-dev-only footgun, now documented in `.env.example`.

**(Content & design polish — see dedicated section above)** ✅

**Phase 4 — Database + admin content API**
Provision Postgres on Render. Add SQLAlchemy models mirroring the current typed-data shapes (profile, education, experience, projects, skills, leadership) + Alembic migrations. Migrate static content into the DB. Add admin-only CRUD endpoints (simple bearer-token/API-key guard, not full auth) so content can be edited without a redeploy. Optionally add a lightweight password-gated admin page in Next.js.

**Phase 5 — Polish (stretch, ordered by likely value)**
SEO metadata/OpenGraph tags, Vercel Analytics wiring, custom domain, basic lint/test CI (ESLint/Prettier + Ruff/Black), Playwright smoke tests, blog/writing section if wanted later. (Mobile nav menu is done — see polish section above.)

## Notes / Open Decisions for Later Phases
- Admin auth approach (single shared secret vs lightweight session) — decide in Phase 4.
- Whether static data files are fully retired after Phase 4 or kept as fallback/seed data.
- Whether to verify a custom domain sender in Resend if contact form usage ever needs to go beyond the account owner's own inbox.

## Verification per Phase
- Phase 1: `npm run dev` locally, click through all sections, verify dark/light toggle and resume download; confirm production build (`npm run build`) succeeds ✅; verify live Vercel deploy ✅ (`https://dami-adenugba.vercel.app`).
- Phase 2: submit the contact form locally against a locally-run FastAPI instance, confirm email received ✅; verify CORS works against the deployed Vercel frontend + Render backend ✅ — including catching and fixing a real `http` vs `https` scheme mismatch in the production `CORS_ORIGINS` value.
- Phase 3: confirm GitHub-sourced data renders correctly and cache/TTL behaves (e.g. doesn't hit GitHub API on every request).
- Phase 4: run Alembic migrations against a local/dev Postgres instance, confirm CRUD endpoints work via `curl`/Swagger UI (`/docs`), confirm frontend still renders correctly reading from the DB-backed API.
