# Ratel Signals

AI-powered perpetual market intelligence for crypto traders.

## Overview

Ratel Signals is a production-ready web platform and backend agent built to monitor perpetual futures markets across centralized and decentralized exchanges. It combines real-time market data, AI signals, and Telegram alerts in a sleek dark-mode trading dashboard.

## Features

- Dynamic top 10 CoinGecko tokens feed
- Cross-exchange perpetual futures monitoring
- Funding rate, open interest, volume, liquidations, and orderbook imbalance analysis
- AI-driven bullish/bearish signals, squeeze detection, and arbitrage insights
- Telegram alert delivery for trading intelligence
- Next.js frontend with TailwindCSS and Framer Motion
- FastAPI backend with PostgreSQL and Redis support
- Docker Compose for local development and staging

## Project Structure

- `frontend/` - Next.js UI and dashboard experience
- `backend/` - FastAPI API, data ingestion, and alerting services
- `agents/` - modular AI agent architecture and OpenAI integration
- `services/` - shared utilities and runtime helpers
- `docker/` - Dockerfiles for frontend and backend
- `database/` - database initialization and schema references

## Setup

1. Copy environment example:

```bash
cp .env.example .env
```

2. Update `.env` with your API keys and secrets.

3. Start containers:

```bash
docker compose up --build
```

4. Open the frontend at `http://localhost:3000`.

## Local Development

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
python -m venv .venv
source .venv/Scripts/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Notes

- Secrets must never be committed.
- Use `.env.example` for sample values only.
- The project includes a secure environment loading architecture and validation.

