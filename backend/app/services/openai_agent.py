from typing import Any
import openai
from app.core.config import settings

openai.api_key = settings.openai_api_key

class OpenAIAgent:
    async def analyze_market(self, context: str) -> dict[str, Any]:
        response = await openai.ChatCompletion.acreate(
            model='gpt-4.1-mini',
            messages=[
                {'role': 'system', 'content': 'You are an AI market intelligence agent for perpetual futures trading.'},
                {'role': 'user', 'content': context},
            ],
            temperature=0.7,
            max_tokens=250,
        )
        choice = response.choices[0]
        return {
            'text': choice.message.content.strip(),
            'finish_reason': choice.finish_reason,
        }
