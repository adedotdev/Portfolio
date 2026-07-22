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
| 3 — Dynamic GitHub project data | 🟡 Backend done; not wired into frontend yet |
| 4 — Database + admin content API | Not started |
| 5 — Polish | Not started |

**Deployment status:**
- Vercel (frontend): blocked — the user's Vercel account is stuck in a "deleted-but-not-deleted" backend state (can't sign up or log in with the same email via GitHub, Google, or email code). Support ticket filed; waiting on Vercel support before deploying. Code is deploy-ready and pushed to `main` whenever the account is unblocked.
- Render (backend): not yet started; planned once Phase 2 work is ready to go live alongside the frontend.

## Actual Architecture (as built)

```
Portfolio/
├── frontend/
│   ├── app/
│   │   ├── layout.tsx          root layout: fonts, ThemeProvider, Nav, Footer, metadata
│   │   ├── page.tsx             assembles all sections in order
│   │   └── globals.css          Tailwind v4 theme tokens (light/dark via .dark class)
│   ├── components/
│   │   ├── nav.tsx, footer.tsx, theme-provider.tsx, theme-toggle.tsx
│   │   ├── reveal.tsx            Framer Motion scroll-in wrapper
│   │   ├── section-heading.tsx   numbered section heading used across sections
│   │   ├── hero.tsx, experience.tsx, projects.tsx, skills.tsx,
│   │   │   leadership.tsx, education.tsx, contact.tsx, contact-form.tsx
│   ├── data/                     typed content, single source of truth for site copy
│   │   ├── types.ts              Profile, Education, Experience, Project, SkillGroup, LeadershipRole
│   │   ├── profile.ts, education.ts, experience.ts, projects.ts, skills.ts, leadership.ts
│   ├── public/resume.pdf
│   └── .env.example / .env.local  NEXT_PUBLIC_API_URL
├── backend/
│   ├── app/
│   │   ├── main.py               FastAPI app, CORS, router registration
│   │   ├── routers/contact.py    POST /contact — validates via Pydantic, sends via Resend
│   │   └── core/config.py        pydantic-settings: CORS origins, Resend key, to/from email
│   ├── requirements.txt
│   └── .env.example / .env        RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL, CORS_ORIGINS
└── README.md, planning.md
```

Notable deviations from the original target sketch:
- **Single page, not multi-route.** All sections (`#experience`, `#projects`, `#skills`, `#leadership`, `#education`, `#contact`) live on `/` with anchor navigation, rather than separate `/projects`, `/experience` routes.
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

**Phase 3 — Dynamic GitHub project data** 🟡
FastAPI endpoint `GET /github/repos/{owner}/{repo}` fetches repo stats (stars, forks, language, last-pushed date) from the GitHub REST API, cached in-memory for 1 hour (`backend/app/routers/github.py`). Verified against a real public repo: correct data, ~8x faster on cache hit, clean 404 for missing repos. **Not yet wired into the frontend** — the two current projects (SyllabAI, Rent-N-Run) don't have public repos yet, so there's nothing to link to. Once a project has a public GitHub repo, add its URL to `githubUrl` in `frontend/data/projects.ts` and have the project card fetch `/github/repos/{owner}/{repo}` to overlay live stats.

**Phase 4 — Database + admin content API**
Provision Postgres on Render. Add SQLAlchemy models mirroring the current typed-data shapes (profile, education, experience, projects, skills, leadership) + Alembic migrations. Migrate static content into the DB. Add admin-only CRUD endpoints (simple bearer-token/API-key guard, not full auth) so content can be edited without a redeploy. Optionally add a lightweight password-gated admin page in Next.js.

**Phase 5 — Polish (stretch, ordered by likely value)**
SEO metadata/OpenGraph tags, Vercel Analytics wiring, custom domain, basic lint/test CI (ESLint/Prettier + Ruff/Black), Playwright smoke tests, blog/writing section if wanted later, mobile nav menu (section links currently hide below `sm` breakpoint).

## Notes / Open Decisions for Later Phases
- Admin auth approach (single shared secret vs lightweight session) — decide in Phase 4.
- Whether static data files are fully retired after Phase 4 or kept as fallback/seed data.
- Whether to verify a custom domain sender in Resend if contact form usage ever needs to go beyond the account owner's own inbox.

## Verification per Phase
- Phase 1: `npm run dev` locally, click through all sections, verify dark/light toggle and resume download; confirm production build (`npm run build`) succeeds; verify live Vercel deploy (pending account unblock).
- Phase 2: submit the contact form locally against a locally-run FastAPI instance, confirm email received (done); verify CORS works against the deployed Vercel frontend + Render backend once both are live.
- Phase 3: confirm GitHub-sourced data renders correctly and cache/TTL behaves (e.g. doesn't hit GitHub API on every request).
- Phase 4: run Alembic migrations against a local/dev Postgres instance, confirm CRUD endpoints work via `curl`/Swagger UI (`/docs`), confirm frontend still renders correctly reading from the DB-backed API.
