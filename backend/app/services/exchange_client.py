import ccxt.async_support as ccxt
from typing import Any

class ExchangeClient:
    def __init__(self, exchange_name: str):
        mapper = {
            'binance': ccxt.binanceusdm,
            'bybit': ccxt.bybit,
            'okx': ccxt.okx,
            'bitget': ccxt.bitget,
            'mexc': ccxt.mexc,
            'dydx': ccxt.dydx,
        }
        self.exchange_class = mapper.get(exchange_name.lower())
        self.client = self.exchange_class({'enableRateLimit': True}) if self.exchange_class else None

    async def fetch_symbol_data(self, symbol: str) -> dict[str, Any]:
        if not self.client:
            return {}
        try:
            ticker = await self.client.fetch_ticker(symbol)
            funding = await self.client.fetch_funding_rate(symbol)
            return {
                'symbol': symbol,
                'ticker': ticker,
                'funding': funding,
            }
        finally:
            await self.client.close()
