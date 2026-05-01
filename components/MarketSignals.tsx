"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { API, signalColor } from "@/lib/api";

interface Stats {
  views_7d?: number; views_prev_7d?: number;
  signals_7d?: number; signals_prev_7d?: number;
  watchers?: number;
  assessments_7d?: number; assessments_prev_7d?: number;
  evidence_7d?: number;
  claim_changes_30d?: number;
  demand?: { brand_name?: string; domain: string; request_count?: number }[];
  movers?: { brand_name?: string; domain: string; signal_color?: string; score_delta?: number }[];
}

function delta(curr?: number, prev?: number) {
  if (!curr || !prev) return null;
  const d = curr - prev;
  if (d === 0) return null;
  return { val: d > 0 ? `+${d}` : `${d}`, up: d > 0 };
}

function StatCard({ val, deltaStr, up, label }: { val: string; deltaStr?: string; up?: boolean; label: string }) {
  return (
    <div className="bg-bg-surface border border-white/[.07] rounded-xl px-4 py-4">
      <div className="font-mono text-[24px] font-semibold text-text-primary mb-0.5">{val}</div>
      {deltaStr && (
        <div className={`font-mono text-[11px] mb-1 min-h-[15px] ${up ? "text-signal-green" : "text-signal-red"}`}>{deltaStr}</div>
      )}
      <div className="text-[11px] text-text-muted">{label}</div>
    </div>
  );
}

export function MarketSignals() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch(`${API}/api/stats`)
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  const fmt = (n?: number) => (n != null ? n.toLocaleString() : "—");
  const d1 = delta(stats?.views_7d,      stats?.views_prev_7d);
  const d2 = delta(stats?.signals_7d,    stats?.signals_prev_7d);
  const d3 = delta(stats?.assessments_7d, stats?.assessments_prev_7d);

  return (
    <section className="max-w-[1100px] mx-auto px-8 py-24" id="market-signals">
      <p className="font-mono text-[11px] tracking-[.16em] text-text-muted uppercase mb-3.5">Market Signals</p>
      <h2 className="font-display text-[clamp(32px,4vw,54px)] font-normal leading-[1.08] tracking-[-0.022em] mb-4">
        Live activity across<br />the Sig&#241;al index.
      </h2>
      <p className="text-[17px] text-text-secondary max-w-[520px] font-light leading-[1.7] mb-2">
        Real-time activity from searches, extension lookups, and public claim records.
      </p>
      <p className="text-[13px] text-text-muted font-mono tracking-[.01em] mb-7">Scores update as claims and evidence change.</p>

      <p className="text-[12px] text-text-muted font-mono tracking-[.01em] mb-6 border-l-2 border-white/[.13] pl-3 leading-[1.65]">
        Sig&#241;al reflects how brands present claims publicly — and how that presentation changes over time.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
        <StatCard val={fmt(stats?.views_7d)}    deltaStr={d1?.val} up={d1?.up} label="Record views (7d)" />
        <StatCard val={fmt(stats?.signals_7d)}  deltaStr={d2?.val} up={d2?.up} label="Signals generated (7d)" />
        <StatCard val={fmt(stats?.watchers)}    label="Brands being tracked" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
        <StatCard val={fmt(stats?.assessments_7d)} deltaStr={d3?.val} up={d3?.up} label="Assessment requests (7d)" />
        <StatCard val={fmt(stats?.evidence_7d)}    label="Evidence submissions (7d)" />
        <StatCard val={fmt(stats?.claim_changes_30d)} label="Claim changes detected (30d)" />
      </div>

      {/* Data access CTA */}
      <div className="flex items-start justify-between gap-4 flex-wrap rounded-xl bg-accent/[.04] border border-accent/12 px-5 py-4">
        <div className="flex-1 min-w-0">
          <p className="text-[13px] text-text-primary leading-[1.5] mb-1">Monitor claim trends across a category.</p>
          <p className="text-[12px] text-text-secondary leading-[1.5] mb-1">
            Request structured access to score history, claim patterns, and category benchmarks.
            Designed for investors, retailers, due diligence teams, researchers, and journalists.
          </p>
          <p className="text-[10px] text-text-muted font-mono tracking-[.01em]">
            Paid access never influences public Sig&#241;al scores, rankings, or review outcomes.
          </p>
        </div>
        <Link
          href="/pricing"
          className="shrink-0 self-center px-3.5 py-1.5 rounded-lg text-[12px] font-medium border border-accent/35 text-accent hover:bg-accent/[.08] hover:border-accent/60 transition-colors"
        >
          Request data access &#8594;
        </Link>
      </div>
    </section>
  );
}
