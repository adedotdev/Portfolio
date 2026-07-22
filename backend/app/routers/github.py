import time

import httpx
from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/github", tags=["github"])

CACHE_TTL_SECONDS = 3600
_cache: dict[str, tuple[float, dict]] = {}


@router.get("/repos/{owner}/{repo}")
async def get_repo_stats(owner: str, repo: str) -> dict:
    cache_key = f"{owner}/{repo}"
    cached = _cache.get(cache_key)
    if cached and time.time() - cached[0] < CACHE_TTL_SECONDS:
        return cached[1]

    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"https://api.github.com/repos/{owner}/{repo}",
            headers={
                "Accept": "application/vnd.github+json",
                "User-Agent": "portfolio-app",
            },
        )

    if response.status_code == 404:
        raise HTTPException(status_code=404, detail="Repository not found")
    if response.status_code != 200:
        raise HTTPException(status_code=502, detail="GitHub API request failed")

    data = response.json()
    stats = {
        "name": data["name"],
        "description": data["description"],
        "stars": data["stargazers_count"],
        "forks": data["forks_count"],
        "language": data["language"],
        "updatedAt": data["pushed_at"],
        "url": data["html_url"],
    }
    _cache[cache_key] = (time.time(), stats)
    return stats
