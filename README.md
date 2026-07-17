# Portfolio

Personal portfolio site — projects, experience, skills, campus involvement, and contact info.

See [planning.md](planning.md) for the full architecture roadmap.

## Preview

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

Runs at http://localhost:3000. Copy `.env.example` to `.env.local` and adjust as needed.

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

Runs at http://localhost:8000. Copy `.env.example` to `.env` and adjust as needed.

Interactive API docs available at http://localhost:8000/docs.

### Running both together

Start the backend first, then the frontend. The frontend expects the API at `http://localhost:8000` by default (configurable via `.env.local`).

## License

