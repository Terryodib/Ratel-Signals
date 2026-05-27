-- Ratel Signals database bootstrap script

CREATE TABLE IF NOT EXISTS tokens (
    id SERIAL PRIMARY KEY,
    symbol TEXT NOT NULL,
    name TEXT NOT NULL,
    market_cap BIGINT,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS alerts (
    id SERIAL PRIMARY KEY,
    token_symbol TEXT NOT NULL,
    alert_type TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
