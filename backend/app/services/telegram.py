import logging
from telegram import Bot
from telegram.error import TelegramError
from app.core.config import settings

logger = logging.getLogger('telegram')

class TelegramService:
    def __init__(self) -> None:
        self.bot = Bot(token=settings.telegram_bot_token)
        self.chat_id = settings.telegram_chat_id

    async def send_alert(self, message: str) -> bool:
        try:
            await self.bot.send_message(chat_id=self.chat_id, text=message, parse_mode='Markdown')
            return True
        except TelegramError as exc:
            logger.error('Telegram send error: %s', exc)
            return False
