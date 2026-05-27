'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const features = [
  'Cross-exchange perpetual futures monitoring',
  'AI-generated market signals and arbitrage alerts',
  'Live funding heatmaps and liquidation trackers',
  'Telegram signal delivery with custom subscriptions',
];

export default function HomePage() {
  return (
    <main className="relative overflow-hidden px-6 py-8 md:px-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,59,92,0.18),_transparent_30%)]" />
      <div className="relative mx-auto max-w-7xl">
        <header className="flex flex-wrap items-center justify-between gap-6 pb-8">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-fuchsia-300">Ratel Signals</p>
            <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-tight text-white md:text-6xl">
              AI-Powered Perpetual Market Intelligence
            </h1>
          </div>
          <nav className="flex flex-wrap gap-4 text-sm text-slate-300">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/alerts">Alerts</Link>
            <Link href="/exchange-monitor">Exchange Monitor</Link>
            <Link href="/telegram">Telegram</Link>
          </nav>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <p className="inline-flex rounded-full bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-slate-300">
              Live perpetual futures intelligence
            </p>
            <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
              Stay ahead of funding squeezes, whale flows, and cross-exchange anomalies.
            </h2>
            <p className="max-w-xl text-base text-slate-300">
              Ratel Signals combines the top token feed from CoinGecko, live CEX and DEX futures monitoring, and AI-driven alerts delivered directly to Telegram.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/dashboard" className="rounded-full bg-[#FF3B5C] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#e03052]">
                View Terminal
              </Link>
              <Link href="/telegram" className="rounded-full border border-slate-500 px-6 py-3 text-sm text-slate-200 transition hover:border-white">
                Telegram Integration
              </Link>
            </div>
          </motion.div>

          <div className="rounded-[32px] border border-white/5 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between gap-3">
              <span className="rounded-full bg-[#FF3B5C] px-3 py-1 text-xs uppercase tracking-[0.3em] text-white">Live Pulse</span>
              <span className="text-xs text-slate-400">Updated every second</span>
            </div>
            <div className="grid gap-4">
              {features.map((feature) => (
                <div key={feature} className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                  <p className="text-sm text-slate-200">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {['Funding Rates', 'Open Interest', 'Liquidations', 'AI Signals'].map((label) => (
            <div key={label} className="rounded-[28px] border border-white/10 bg-slate-950/80 p-6 shadow-glow">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{label}</p>
              <p className="mt-4 text-3xl font-semibold text-white">Active</p>
              <p className="mt-2 text-sm text-slate-300">Premium market intelligence and tactical signal dispatch.</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
