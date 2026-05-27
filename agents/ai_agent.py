from typing import Any
from .openai_client import OpenAIClient

class MarketIntelligenceAgent:
    def __init__(self) -> None:
        self.client = OpenAIClient()

    async def generate_signal(self, payload: dict[str, Any]) -> dict[str, Any]:
        context = self._build_context(payload)
        return await self.client.ask_market_ai(context)

    def _build_context(self, payload: dict[str, Any]) -> str:
        lines = [f'{key}: {value}' for key, value in payload.items()]
        return 'Analyze this market payload for perpetual futures signals:\n' + '\n'.join(lines)
