import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { config } from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import fetch from 'node-fetch';

config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const WEBHOOK_URL = process.env.WEBHOOK_URL;
const PORT = Number(process.env.PORT ?? 3000);
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN ?? '*';

if (!BOT_TOKEN) {
  console.error('Missing BOT_TOKEN environment variable.');
  process.exit(1);
}

if (!WEBHOOK_URL) {
  console.error('Missing WEBHOOK_URL environment variable.');
  process.exit(1);
}

const TELEGRAM_API_BASE = `https://api.telegram.org/bot${BOT_TOKEN}`;
const app = express();
const subscribersPath = path.join(process.cwd(), 'subscribers.json');

app.use(express.json());
app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })
);

const standardLimiter = rateLimit({
  windowMs: 60_000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
});

const webhookLimiter = rateLimit({
  windowMs: 60_000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
});

async function readSubscribers() {
  try {
    const data = await fs.readFile(subscribersPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(subscribersPath, '[]', 'utf8');
      return [];
    }
    throw error;
  }
}

async function saveSubscribers(subscribers) {
  await fs.writeFile(subscribersPath, JSON.stringify(subscribers, null, 2), 'utf8');
}

async function sendTelegramMessage(chatId, text, options = {}) {
  const payload = {
    chat_id: chatId,
    text,
    parse_mode: 'Markdown',
    ...options,
  };

  const response = await fetch(`${TELEGRAM_API_BASE}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const result = await response.json();
  if (!result.ok) {
    const message = result.description || 'Telegram API error';
    throw new Error(message);
  }

  return result;
}

async function registerWebhook() {
  const url = `${TELEGRAM_API_BASE}/setWebhook`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: WEBHOOK_URL }),
  });

  const result = await response.json();
  if (!result.ok) {
    console.error('Failed to set Telegram webhook:', result.description || result);
    return;
  }

  console.log('Telegram webhook set successfully:', WEBHOOK_URL);
}

async function addSubscriber(chatId) {
  const subscribers = await readSubscribers();
  if (subscribers.includes(chatId)) {
    return false;
  }

  subscribers.push(chatId);
  await saveSubscribers(subscribers);
  return true;
}

app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.post('/send-alert', standardLimiter, async (req, res, next) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Invalid payload. `message` is required.' });
    }

    const subscribers = await readSubscribers();
    if (subscribers.length === 0) {
      return res.json({ delivered: 0, message: 'No subscribers available.' });
    }

    const results = await Promise.allSettled(
      subscribers.map((chatId) => sendTelegramMessage(chatId, message))
    );

    const delivered = results.filter((result) => result.status === 'fulfilled').length;
    const failed = results.filter((result) => result.status === 'rejected');

    console.log(`Alert broadcast: delivered=${delivered}, failed=${failed.length}`);

    return res.json({ delivered, failed: failed.length });
  } catch (error) {
    return next(error);
  }
});

app.post('/webhook', webhookLimiter, async (req, res) => {
  try {
    const update = req.body;
    if (!update?.message?.text || !update.message.chat?.id) {
      return res.sendStatus(200);
    }

    const chatId = update.message.chat.id;
    const text = update.message.text.trim();

    if (text === '/start') {
      const added = await addSubscriber(chatId);
      const welcomeMessage = added
        ? 'Welcome to Ratel Signals! You will now receive alert broadcasts from this bot.'
        : 'You are already subscribed to Ratel Signals alerts.';
      await sendTelegramMessage(chatId, welcomeMessage);
      return res.sendStatus(200);
    }

    return res.sendStatus(200);
  } catch (error) {
    console.error('Webhook handler error:', error);
    return res.sendStatus(200);
  }
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const startup = async () => {
  await registerWebhook();
  app.listen(PORT, () => {
    console.log(`Telegram backend listening on port ${PORT}`);
  });
};

startup().catch((error) => {
  console.error('Startup error:', error);
  process.exit(1);
});
