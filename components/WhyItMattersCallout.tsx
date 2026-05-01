export function WhyItMattersCallout() {
  return (
    <div className="bg-bg-surface border-y border-white/[.07] py-[72px] px-8">
      <div className="max-w-[860px] mx-auto text-center">
        <div className="flex items-center justify-center gap-2.5 mb-6">
          <span className="block w-8 h-px bg-accent/50" />
          <span className="font-mono text-[11px] tracking-[.18em] text-accent uppercase">Why it matters</span>
          <span className="block w-8 h-px bg-accent/50" />
        </div>
        <h2 className="font-display text-[clamp(32px,4vw,52px)] font-normal leading-[1.08] tracking-[-0.022em] mb-5">
          Knowledge in your head.<br />
          <em className="italic text-text-secondary">Money back in your pocket.</em>
        </h2>
        <p className="text-[17px] text-text-secondary max-w-[600px] mx-auto mb-4 font-light leading-[1.7]">
          The wellness industry spans supplements, skincare, recovery tech, wearables, neurotech, sleep devices, and more.
          Across every category, the pattern is the same — marketing language engineered to feel like evidence.
          Most of the time, it isn&#8217;t. It&#8217;s just confident copy.
        </p>
        <p className="text-[17px] text-text-secondary max-w-[600px] mx-auto mb-14 font-light leading-[1.7]">
          Sig&#241;al doesn&#8217;t tell you whether a product works. It tells you whether the brand showed their proof
          &#8212; before you spend.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 max-w-[800px] mx-auto">
          {[
            { num: "$500B", color: "#4a78f0", label: "global wellness market by 2026",
              desc: "The largest it has ever been. The marketing budgets are bigger than ever. The receipts are harder to find than ever." },
            { num: "0", color: "#9e3028", label: "tools like this existed before Sigñal",
              desc: "No real-time, independent, claim-level transparency index for wellness. Until now. That's the gap we exist to close." },
            { num: "2 sec", color: "#1e9459", label: "from page load to signal",
              desc: "Independent. Editorial. On the record." },
          ].map((s, i) => (
            <div
              key={s.num}
              className={`bg-bg-raised border border-white/[.07] p-7 ${
                i === 0 ? "rounded-xl md:rounded-r-none" :
                i === 2 ? "rounded-xl md:rounded-l-none" :
                "md:rounded-none border-y md:border-x-0 md:border-y border-y-0"
              }`}
            >
              <div className="font-display text-[44px] font-normal leading-none mb-2.5" style={{ color: s.color }}>{s.num}</div>
              <div className="text-[13px] font-medium text-text-primary mb-2">{s.label}</div>
              <div className="text-[12px] text-text-secondary leading-[1.6]">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
