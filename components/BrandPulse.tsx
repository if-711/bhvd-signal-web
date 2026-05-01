"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { API, timeAgo, signalColor } from "@/lib/api";

interface Brand {
  brand_name?: string;
  domain: string;
  signal_color?: string;
  total_score?: number;
  verdict?: string;
  reviewed_at?: string;
  request_count?: number;
}

interface DemandData {
  recently_reviewed?: Brand[];
  most_requested?: Brand[];
}

function BrandRow({ brand, type }: { brand: Brand; type: "reviewed" | "requested" }) {
  const color = signalColor(brand.signal_color);
  const name = brand.brand_name || brand.domain;

  return (
    <Link
      href={`/brand?d=${encodeURIComponent(brand.domain)}`}
      className="flex items-center justify-between bg-bg-surface border border-white/[.07] rounded-xl px-4 py-3 hover:border-white/[.13] transition-colors group"
    >
      <div className="flex items-center gap-3">
        <span className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
        <div>
          <p className="text-[13px] font-medium text-text-primary">{name}</p>
          <p className="font-mono text-[10px] text-text-muted mt-0.5">{brand.domain}</p>
        </div>
      </div>
      <div className="text-right shrink-0">
        {type === "reviewed" && brand.total_score != null ? (
          <>
            <div className="font-mono text-[13px] font-medium" style={{ color }}>{brand.total_score}<span className="text-[9px] text-text-muted">/100</span></div>
            <div className="font-mono text-[9px] text-text-muted mt-0.5">{timeAgo(brand.reviewed_at)}</div>
          </>
        ) : (
          <>
            <div className="font-mono text-[11px] text-accent font-medium">{brand.request_count ?? 0}</div>
            <div className="text-[10px] text-text-muted">requests</div>
          </>
        )}
      </div>
    </Link>
  );
}

export function BrandPulse() {
  const [data, setData] = useState<DemandData | null>(null);

  useEffect(() => {
    fetch(`${API}/api/demand`)
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  return (
    <section className="max-w-[1100px] mx-auto px-8 py-24" id="brands">
      <p className="font-mono text-[11px] tracking-[.16em] text-text-muted uppercase mb-3.5">Brand Pulse</p>
      <h2 className="font-display text-[clamp(32px,4vw,54px)] font-normal leading-[1.08] tracking-[-0.022em] mb-4">
        What&#8217;s being<br />reviewed right now.
      </h2>
      <p className="text-[17px] text-text-secondary max-w-[520px] font-light leading-[1.7] mb-14">
        Brands recently added to the index, and brands people are asking us to review next.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {[
          { title: "Recently reviewed", key: "recently_reviewed" as const, type: "reviewed" as const },
          { title: "Most requested",    key: "most_requested" as const,    type: "requested" as const },
        ].map((col) => (
          <div key={col.key}>
            <p className="font-mono text-[10px] text-text-muted tracking-[.12em] uppercase mb-3.5">{col.title}</p>
            <div className="flex flex-col gap-1.5">
              {!data ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-[60px] bg-bg-surface border border-white/[.07] rounded-xl animate-skeleton" />
                ))
              ) : (data[col.key] ?? []).length === 0 ? (
                <p className="text-[13px] text-text-muted py-4">No data yet.</p>
              ) : (
                (data[col.key] ?? []).slice(0, 6).map((b) => (
                  <BrandRow key={b.domain} brand={b} type={col.type} />
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
