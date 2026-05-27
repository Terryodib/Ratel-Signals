from typing import Any
import openai
from dotenv import load_dotenv
import os

load_dotenv()
openai.api_key = os.getenv('OPENAI_API_KEY', '')

class OpenAIClient:
    async def ask_market_ai(self, prompt: str) -> dict[str, Any]:
        response = await openai.ChatCompletion.acreate(
            model='gpt-4.1-mini',
            messages=[
                {'role': 'system', 'content': 'You are a crypto perpetual futures market analyst.'},
                {'role': 'user', 'content': prompt},
            ],
            temperature=0.6,
            max_tokens=300,
        )
        return {
            'analysis': response.choices[0].message.content.strip(),
            'usage': response.usage.to_dict() if response.usage else {},
        }
