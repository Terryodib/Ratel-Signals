# Telegram Bot Backend

A standalone Node.js + Express backend for the Ratel Signals Telegram bot.

## Features

- Telegram webhook receiver for `/start`
- Subscriber chat IDs stored in a local JSON file
- `POST /send-alert` broadcasts alerts to all subscribers
- `GET /health` health check
- CORS support for Netlify frontend
- Rate limiting and error handling
- Render and Railway deployment config included

## Environment Variables

Create a `.env` file or configure environment variables in your hosting provider:

```env
BOT_TOKEN=your_telegram_bot_token_here
WEBHOOK_URL=https://your-backend-host.example.com/webhook
PORT=3000
FRONTEND_ORIGIN=https://your-netlify-site.netlify.app
```

## Local development

```bash
cd telegram-backend
npm install
cp .env.example .env
# edit .env with your bot token and webhook URL
npm run dev
```

## Production deployment

### Render

1. Push this repo to GitHub.
2. Create a new Web Service on Render and connect your repo.
3. Set the build command to `npm install` and the start command to `npm start`.
4. Add environment variables `BOT_TOKEN`, `WEBHOOK_URL`, and `FRONTEND_ORIGIN`.
5. Deploy the service.

### Railway

1. Create a new project on Railway.
2. Connect the repo and choose `telegram-backend` as the root directory.
3. Set `BOT_TOKEN`, `WEBHOOK_URL`, and `FRONTEND_ORIGIN` in Railway environment settings.
4. Deploy the service.

## Telegram webhook setup

The backend automatically registers the webhook during startup using `WEBHOOK_URL`.

Your webhook path should be: `https://your-backend-host.example.com/webhook`

## Endpoints

- `GET /health`
- `POST /send-alert`
- `POST /webhook`

### Example alert payload

```json
{
  "message": "Market alert: BTC price is breaking out!"
}
```

## Notes

- The bot saves chat IDs locally in `subscribers.json`.
- Duplicate subscribers are prevented.
- Keep `BOT_TOKEN` secret and never commit `.env` to source control.
