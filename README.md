# Portfolio

Personal portfolio site — about me, experience, projects, skills, campus involvement/leadership, and contact info. Single-page scrolling layout with anchor-linked sections (`#about`, `#experience`, `#projects`, `#skills`, `#leadership`, `#contact`).

See [planning.md](planning.md) for the full architecture roadmap.

## Live

**[dami-adenugba.vercel.app](https://dami-adenugba.vercel.app)** — frontend on Vercel, backend on Render, both auto-deploying on every push to `main`.

## Features

- Serif (Fraunces) + monospace (Geist Mono) type pairing for headings vs. meta info
- Dark/light mode toggle (dark-first)
- Rotating 3D dot sphere (Fibonacci sphere distribution, pure CSS)
- Full-bleed looping skills marquee
- Typewriter effect on experience role titles
- Scroll-reveal animations (Framer Motion), respects `prefers-reduced-motion`
- Resume download button
- Contact form (FastAPI + Resend), verified end-to-end in production

## Structure

- `frontend/` — Next.js (App Router, TypeScript, Tailwind CSS)
- `backend/` — FastAPI

## Getting started

### Frontend

Requires Node.js 18+.

```bash
cd frontend
npm install
npm run dev
```

Runs at http://localhost:3000. Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_API_URL` — URL of the running backend (e.g. `http://localhost:8000` for local dev)

### Backend

Requires Python 3.11+.

```bash
cd backend
python -m venv .venv

# macOS/Linux
source .venv/bin/activate

# Windows
.venv\Scripts\activate

pip install -r requirements.txt
uvicorn app.main:app --reload
```

Runs at http://localhost:8000. Copy `.env.example` to `.env` and set:

- `RESEND_API_KEY` — API key from [Resend](https://resend.com)
- `CONTACT_TO_EMAIL` — inbox that contact form submissions are sent to
- `CONTACT_FROM_EMAIL` — sender address (e.g. `onboarding@resend.dev` for the sandbox sender)
- `CORS_ORIGINS` — allowed origins (e.g. `http://localhost:3000`)

Interactive API docs available at http://localhost:8000/docs.

> **Note:** Without a verified custom domain in Resend, the sandbox sender (`onboarding@resend.dev`) only delivers to the Resend account owner's own inbox. Fine for personal use, but keep in mind if testing with a different `CONTACT_TO_EMAIL`.

### Running both together

Start the backend first, then the frontend. Point `NEXT_PUBLIC_API_URL` at wherever the backend is running.

## Deployment

- **Frontend** deploys to [Vercel](https://vercel.com) with **Root Directory** set to `frontend` (this is a monorepo, so this matters). Env var: `NEXT_PUBLIC_API_URL` pointing at the deployed backend.
- **Backend** deploys to [Render](https://render.com) with **Root Directory** set to `backend`, build command `pip install -r requirements.txt`, start command `uvicorn app.main:app --host 0.0.0.0 --port $PORT`. Env vars: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `CORS_ORIGINS` (must include the live frontend's exact origin, **including the `https://` scheme** — a scheme mismatch silently breaks CORS).
- Both platforms auto-deploy on every push to `main` via GitHub webhook — no manual redeploy step needed for normal changes.

## License

[Add license here, e.g., MIT]
