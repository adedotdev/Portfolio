# Portfolio

Personal portfolio site — projects, experience, skills, campus involvement, and contact info. Single-page scrolling layout with anchor-linked sections (`#experience`, `#projects`, `#skills`, `#leadership`, `#education`, `#contact`).

See [planning.md](planning.md) for the full architecture roadmap.

## Preview

Deploy pending

## Features

- Dark/light mode toggle (dark-first)
- Scroll-reveal animations (Framer Motion)
- Resume download button
- Contact form (FastAPI + Resend)

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

## License

[Add license here, e.g., MIT]
