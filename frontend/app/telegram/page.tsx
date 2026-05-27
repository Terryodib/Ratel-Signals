'use client';

import { FormEvent, useState } from 'react';

export default function TelegramPage() {
  const [message, setMessage] = useState('Hello from Ratel Signals!');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const backendUrl = process.env.NEXT_PUBLIC_TELEGRAM_BACKEND_URL || 'https://your-backend-url.example.com';

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('Sending test alert...');
    setLoading(true);

    try {
      const response = await fetch(`${backendUrl}/send-alert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error('Telegram test alert failed.');
      }

      setStatus('Test alert sent successfully!');
    } catch (error) {
      setStatus('Unable to send test alert. Please confirm backend Telegram settings.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#05060A] px-6 py-8 text-white md:px-12">
      <div className="mx-auto max-w-6xl rounded-[32px] border border-white/10 bg-slate-950/80 p-8 shadow-glow backdrop-blur-xl">
        <h1 className="text-3xl font-semibold">Telegram Integration</h1>
        <p className="mt-3 text-slate-400">Connect your Telegram bot to receive real-time trading alerts from Ratel Signals.</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_0.7fr]">
          <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-6">
            <h2 className="text-xl font-semibold text-white">How to connect</h2>
            <ol className="mt-4 space-y-3 text-sm text-slate-300">
              <li>1. Create a Telegram bot via @BotFather and copy the bot token.</li>
              <li>2. Start a chat with your bot and copy your chat ID.</li>
              <li>3. Add your bot token and chat ID to backend environment settings.</li>
              <li>4. Use the test alert form to verify the Telegram connection.</li>
            </ol>
            <p className="mt-4 text-sm text-slate-400">If your site is deployed as a static frontend only, the backend must also be running and connected for alerts to work.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 rounded-[28px] border border-white/10 bg-slate-900/80 p-6">
            <div>
              <label className="block text-sm font-medium text-slate-300">Test message</label>
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                rows={4}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-fuchsia-400"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-full bg-[#FF3B5C] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#e03052] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Sending...' : 'Send test alert'}
            </button>
            <p className="text-sm text-slate-400">Status: {status || 'Ready to test your Telegram connection.'}</p>
          </form>
        </div>
      </div>
    </main>
  );
}
