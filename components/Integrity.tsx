const PRINCIPLES = [
  {
    icon: "◼",
    title: "No brand payments influence scores",
    body: "The only path to a better signal is making stronger evidence visible on the actual consumer-facing product page. That creates exactly the market pressure toward transparency that we exist to generate.",
  },
  {
    icon: "▲",
    title: "Revenue from consumers and data — never from brands being scored",
    body: "Consumer Pro subscriptions and B2B intelligence products are the entire model. No advertising. No affiliate commissions. No brand-sponsored placements. No scan data sold to the brands we score.",
  },
  {
    icon: "◉",
    title: "Fully published methodology",
    body: "All six dimension weights, location multipliers, intensity classifications, and category add-on rules are published publicly. Anyone can audit the scoring.",
  },
  {
    icon: "▶",
    title: "Evidence reviewed, never auto-applied",
    body: "Brands can submit supporting evidence at any time. Scores update only when that evidence becomes visible on the live consumer-facing page — not when it's submitted to us privately.",
  },
];

const FLOWS_ALLOWED = [
  "Pro subscribers",
  "Retailer intelligence",
  "Due diligence reports",
  "Verified badge licensing",
];

const FLOWS_BLOCKED = [
  "Brands paying for better scores",
  "Advertiser product promotion",
  "Affiliate commissions per click",
  "User data sold to scored brands",
];

export function Integrity() {
  return (
    <section className="max-w-[1100px] mx-auto px-8 py-24" id="integrity">
      <p className="font-mono text-[11px] tracking-[.16em] text-text-muted uppercase mb-3.5">Independence</p>
      <h2 className="font-display text-[clamp(32px,4vw,54px)] font-normal leading-[1.08] tracking-[-0.022em] mb-4">
        Scores can&#8217;t<br />be bought.
      </h2>
      <p className="text-[17px] text-text-secondary max-w-[520px] font-light leading-[1.7] mb-14">
        The signal is only worth something if it can&#8217;t be gamed. Every decision we make is built around protecting that.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
        {/* Principles */}
        <div className="flex flex-col gap-6">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="flex gap-4 items-start">
              <div className="w-9 h-9 rounded-[9px] border border-white/[.13] flex items-center justify-center text-[15px] shrink-0 mt-0.5">
                {p.icon}
              </div>
              <div>
                <h4 className="text-[14px] font-medium text-text-primary mb-1.5">{p.title}</h4>
                <p className="text-[13px] text-text-secondary leading-[1.65]">{p.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Flow diagram */}
        <div className="bg-bg-surface border border-white/[.07] rounded-2xl p-7">
          <p className="font-mono text-[10px] text-text-muted tracking-[.09em] uppercase mb-4">Where money flows</p>

          <div className="flex flex-col gap-1.5 mb-4">
            {FLOWS_ALLOWED.map((f) => (
              <div key={f} className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg bg-accent/[.08] border border-accent/15 text-[12px]">
                <span className="text-text-primary flex-1">&#10004;&#160;&#160;{f}</span>
                <span className="text-accent font-mono text-[10px]">&#8594; Sig&#241;al</span>
              </div>
            ))}
          </div>

          <p className="text-[10px] text-text-muted px-1 pb-3 leading-[1.5]">
            All revenue is from consumers paying for features, or industry paying for data. None of it touches scores.
          </p>

          <div className="flex flex-col gap-1.5 mb-4">
            {FLOWS_BLOCKED.map((f) => (
              <div key={f} className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg bg-white/[.03] border border-white/[.07] text-[12px]">
                <span className="text-text-muted flex-1">&#10005;&#160;&#160;{f}</span>
                <span className="text-signal-red font-mono text-[10px]">BLOCKED</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2.5 bg-signal-green/[.07] border border-signal-green/[.18] rounded-lg text-[11px] text-signal-green font-mono tracking-[.04em]">
            <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L3 5v5c0 4.5 3 7.5 7 8.5C14 17.5 17 14.5 17 10V5L10 2z" stroke="#27ae60" strokeWidth="1.5" fill="none"/>
            </svg>
            Score firewall &#8212; commercially and structurally enforced
          </div>
        </div>
      </div>
    </section>
  );
}
