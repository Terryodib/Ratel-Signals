from pathlib import Path
from pydantic import BaseSettings, AnyUrl, Field, ValidationError

class Settings(BaseSettings):
    backend_host: str = Field('0.0.0.0', env='BACKEND_HOST')
    backend_port: int = Field(8000, env='BACKEND_PORT')
    database_url: AnyUrl = Field(..., env='DATABASE_URL')
    redis_url: AnyUrl = Field(..., env='REDIS_URL')
    openai_api_key: str = Field(..., env='OPENAI_API_KEY')
    telegram_bot_token: str = Field(..., env='TELEGRAM_BOT_TOKEN')
    telegram_chat_id: str = Field(..., env='TELEGRAM_CHAT_ID')
    coingecko_api_url: str = Field('https://api.coingecko.com/api/v3', env='COINGECKO_API_URL')

    class Config:
        env_file = Path('.env')
        env_file_encoding = 'utf-8'
        case_sensitive = False

    async def validate_settings(self) -> None:
        try:
            self.model_validate(self.model_dump())
        except ValidationError as exc:
            raise RuntimeError('Missing required environment variables') from exc

    def check_fields(self) -> None:
        self.model_validate(self.model_dump())

settings = Settings()
