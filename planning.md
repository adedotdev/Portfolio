# Portfolio Site — Architecture Roadmap

## Context

The `Portfolio` repo is currently empty (old static Sass/jQuery site assets are being removed at the parent-repo level). The goal is a personal portfolio consolidating projects, experience, skills, campus involvement/leadership, and contact info. The user is new to the modern web stack (React/Next.js/Tailwind/FastAPI/Vercel) but wants to use this build as a learning opportunity, so the roadmap is deliberately phased: each phase produces something real and deployable rather than one big-bang build.

Decisions locked in with the user:
- Frontend: **Next.js (App Router) + TypeScript + Tailwind CSS**, deployed on **Vercel**.
- Backend: **FastAPI**, deployed on **Render** (with Render's managed Postgres when a DB is introduced).
- Initial content management: **typed data files** in the frontend repo (fastest path to a real site); a DB-backed admin API comes later once the FastAPI/DB pieces exist.
- Feature set: dark/light mode toggle, animations (Framer Motion), resume download button, visitor analytics.
- FastAPI's job, per the user: contact form handling, dynamic GitHub project data, and eventually an admin/content API backed by a database — plus general learning value.

## Target Architecture

```
Portfolio/
├── frontend/                 Next.js app (TypeScript, Tailwind)
│   ├── app/                  routes: /, /projects, /experience, /contact, etc.
│   ├── components/
│   ├── data/                 typed content: projects.ts, experience.ts, skills.ts, leadership.ts
│   ├── public/                resume.pdf, images
│   └── ...
├── backend/                   FastAPI app
│   ├── app/
│   │   ├── main.py
│   │   ├── routers/           contact.py, github.py, admin.py (added over phases)
│   │   ├── models/            SQLAlchemy models (Phase 4+)
│   │   └── core/              config, CORS, env
│   └── ...
└── README.md
```

- **Frontend ↔ Backend**: frontend calls FastAPI via `NEXT_PUBLIC_API_URL`; FastAPI CORS allowlists the Vercel domain.
- **Data flow (early)**: content lives in `frontend/data/*.ts`, statically rendered — no DB dependency to ship v1.
- **Data flow (later)**: Postgres becomes source of truth for projects/experience; static data files are migrated in and retired, or kept as seed/fallback.

## Phased Roadmap

**Phase 0 — Scaffolding**
Monorepo layout above, `.gitignore`, `README.md`, env var templates (`.env.example` for both apps), base `package.json` / `pyproject.toml`.

**Phase 1 — Static frontend MVP (fully deployable on its own)**
Next.js + Tailwind site with all core sections (home/about, projects, experience, skills, campus involvement & leadership, contact) driven by `frontend/data/*.ts`. Add dark/light toggle (`next-themes`), Framer Motion animations, resume download button (`public/resume.pdf`). Deploy to Vercel. This alone is a complete, shippable portfolio.

**Phase 2 — FastAPI contact form**
Minimal FastAPI app with a single `POST /contact` endpoint that emails submissions (Resend or SMTP). Deploy to Render. Wire the Next.js contact form to call it; configure CORS.

**Phase 3 — Dynamic GitHub project data**
FastAPI endpoint (`GET /github/projects`) that fetches/caches pinned repos or stats from the GitHub API (simple TTL cache). Frontend project cards consume this for live stars/last-updated info instead of fully static data.

**Phase 4 — Database + admin content API**
Provision Postgres on Render. Add SQLAlchemy models mirroring the current typed-data shapes (projects, experience, leadership, skills) + Alembic migrations. Migrate static content into the DB. Add admin-only CRUD endpoints (simple bearer-token/API-key guard, not full auth) so content can be edited without a redeploy. Optionally add a lightweight password-gated admin page in Next.js.

**Phase 5 — Polish (stretch, ordered by likely value)**
SEO metadata/OpenGraph tags, Vercel Analytics wiring, custom domain, basic lint/test CI (ESLint/Prettier + Ruff/Black), Playwright smoke tests, blog/writing section if wanted later.

## Notes / Open Decisions for Later Phases
- Email delivery method for the contact form (Resend vs SMTP) — decide in Phase 2.
- Admin auth approach (single shared secret vs lightweight session) — decide in Phase 4.
- Whether static data files are fully retired after Phase 4 or kept as fallback/seed data.

## Verification per Phase
- Phase 1: `npm run dev` locally, click through all sections, verify dark/light toggle and resume download; confirm production build (`npm run build`) succeeds; verify live Vercel deploy.
- Phase 2: submit the contact form locally against a locally-run FastAPI instance, confirm email received; verify CORS works against the deployed Vercel frontend + Render backend.
- Phase 3: confirm GitHub-sourced data renders correctly and cache/TTL behaves (e.g. doesn't hit GitHub API on every request).
- Phase 4: run Alembic migrations against a local/dev Postgres instance, confirm CRUD endpoints work via `curl`/Swagger UI (`/docs`), confirm frontend still renders correctly reading from the DB-backed API.

This document is the roadmap only — no code has been written yet. Phase 0 scaffolding is the natural next step once this is approved.
