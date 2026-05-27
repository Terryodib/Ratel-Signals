from fastapi import APIRouter, HTTPException
from app.services.coingecko import CoinGeckoService
from app.services.telegram import TelegramService

api_router = APIRouter()
coingecko_service = CoinGeckoService()
telegram_service = TelegramService()

@api_router.get('/tokens/top')
async def top_tokens():
    return await coingecko_service.fetch_top_tokens(limit=10)

@api_router.post('/alerts/telegram')
async def send_telegram_alert(message: str):
    success = await telegram_service.send_alert(message)
    if not success:
        raise HTTPException(status_code=500, detail='Telegram alert failed')
    return {'sent': True}
