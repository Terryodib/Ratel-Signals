import Link from 'next/link';

export default function DashboardPage() {
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
