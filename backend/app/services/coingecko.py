from typing import Any
import httpx
from app.core.config import settings

class CoinGeckoService:
    async def fetch_top_tokens(self, limit: int = 10) -> list[dict[str, Any]]:
        url = f'{settings.coingecko_api_url}/coins/markets'
        params = {
            'vs_currency': 'usd',
            'order': 'market_cap_desc',
            'per_page': limit,
            'page': 1,
            'sparkline': 'false',
        }
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.get(url, params=params)
            response.raise_for_status()
            return response.json()
