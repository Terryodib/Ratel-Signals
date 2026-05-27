'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Token = {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  image: string;
};

export default function DashboardPage() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchTopTokens() {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=8&page=1&sparkline=false'
        );
        if (!response.ok) {
          throw new Error('Unable to load token data');
        }
        const data = await response.json();
        setTokens(data);
      } catch (err) {
        setError('Unable to load top tokens. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    }

    fetchTopTokens();
  }, []);

  return (
    <main className="min-h-screen bg-[#05060A] px-6 py-8 text-white md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-glow backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-fuchsia-300">Ratel Signals Dashboard</p>
              <h1 className="mt-3 text-3xl font-semibold">Terminal overview</h1>
            </div>
            <Link href="/alerts" className="rounded-full bg-[#FF3B5C] px-5 py-3 text-sm font-semibold text-white">
              AI Alerts Feed
            </Link>
          </div>
          <p className="text-slate-300">Live WebSocket feeds, token summaries, funding heatmaps, and cross-exchange anomaly signals in one premium interface.</p>
        </div>

        <section className="mb-10 rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-glow">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4">
            <div>
              <h2 className="text-2xl font-semibold text-white">Top tokens tracked</h2>
              <p className="mt-2 text-sm text-slate-400">Powered by CoinGecko market data.</p>
            </div>
            <Link href="/telegram" className="rounded-full border border-slate-500 px-5 py-3 text-sm text-slate-200 transition hover:border-white">
              Connect Telegram
            </Link>
          </div>

          {loading ? (
            <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-6 text-slate-300">Loading tokens...</div>
          ) : error ? (
            <div className="rounded-3xl border border-red-500/30 bg-red-950/20 p-6 text-red-200">{error}</div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {tokens.map((token) => (
                <div key={token.id} className="rounded-[28px] border border-white/10 bg-slate-900/90 p-5">
                  <div className="flex items-center gap-4">
                    <img src={token.image} alt={token.name} className="h-12 w-12 rounded-full bg-slate-800 p-1" />
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{token.symbol}</p>
                      <h3 className="mt-1 text-xl font-semibold text-white">{token.name}</h3>
                    </div>
                  </div>
                  <div className="mt-5 space-y-3 text-sm text-slate-300">
                    <p>
                      Price: <span className="text-white">${token.current_price.toLocaleString()}</span>
                    </p>
                    <p>
                      24h: <span className={token.price_change_percentage_24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                        {token.price_change_percentage_24h.toFixed(2)}%
                      </span>
                    </p>
                    <p>Market cap: ${token.market_cap.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="grid gap-6 xl:grid-cols-3">
          <section className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-glow">
            <h2 className="text-lg font-semibold text-white">Market heatmap</h2>
            <p className="mt-3 text-sm text-slate-400">Funding rates, open interest, and momentum divergence across top tokens.</p>
          </section>
          <section className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-glow">
            <h2 className="text-lg font-semibold text-white">Funding watchlist</h2>
            <p className="mt-3 text-sm text-slate-400">Track abnormal funding moves and squeeze setups across CEX and DEX venues.</p>
          </section>
          <section className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-glow">
            <h2 className="text-lg font-semibold text-white">Whale alerts</h2>
            <p className="mt-3 text-sm text-slate-400">Whale position tracking and liquidation risk intelligence for premium tokens.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
