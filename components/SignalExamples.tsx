const EXAMPLES = [
  {
    color: "#1e9459",
    heroBg: "#051210",
    heroBdr: "#12382a",
    icon: "✓",
    iconBg: "#0a3a1a",
    label: "Green — claims proportionate to evidence",
    risk: "11",
    barPct: "89%",
    product: "Thorne — Magnesium Bisglycinate",
    rows: [
      ["Study links visible", "3 on page"],
      ["Third-party testing", "NSF certified"],
      ["Claim intensity", "Low — \"supports sleep\""],
      ["Category rank", "#1 of 412"],
    ],
    verdict: "This brand has shown their proof. Claims are proportionate to the evidence they've made visible. You can buy with confidence that the transparency is real — whether the product works for you is still your call.",
  },
  {
    color: "#c07718",
    heroBg: "#0e0a04",
    heroBdr: "#382b0e",
    icon: "!",
    iconBg: "#5a3a0a",
    label: "Yellow — partial receipts",
    risk: "38",
    barPct: "62%",
    product: "Ritual — Essential Protein",
    rows: [
      ["Study links visible", "1 (ingredient-level)"],
      ["Third-party testing", "Informed Sport"],
      ["Claim intensity", "Medium — \"improves recovery\""],
      ["Category rank", "#7 of 412"],
    ],
    verdict: "Some claims have backing, others don't. The ingredient evidence is real, but it's for the ingredient — not necessarily this product at this dose. Worth digging deeper before committing.",
  },
  {
    color: "#9e3028",
    heroBg: "#0d0605",
    heroBdr: "#361610",
    icon: "✗",
    iconBg: "#6a1515",
    label: "Red — claims extend beyond visible support",
    risk: "87",
    barPct: "13%",
    product: "Neurax — Neural Performance Patch",
    rows: [
      ["Study links visible", "None"],
      ["Third-party testing", "Not found"],
      ["Claim intensity", "High — \"clinically proven\""],
      ["Category rank", "#184 of 412"],
    ],
    verdict: "This brand is asking you to trust high-intensity claims with no visible evidence to back them up here. The product may still work — but right now, on this page, you're being asked to take their word for it.",
  },
];

export function SignalExamples() {
  return (
    <section className="max-w-[1100px] mx-auto px-8 py-24" id="signals">
      <p className="font-mono text-[11px] tracking-[.16em] text-text-muted uppercase mb-3.5">Signals in action</p>
      <h2 className="font-display text-[clamp(32px,4vw,54px)] font-normal leading-[1.08] tracking-[-0.022em] mb-4">
        What you actually<br />learn from the signal.
      </h2>
      <p className="text-[17px] text-text-secondary max-w-[520px] font-light leading-[1.7] mb-14">
        The signal is not a product review. It&#8217;s a proof check — does a brand&#8217;s visible evidence actually support what it claims?
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {EXAMPLES.map((e) => (
          <div key={e.risk} className="bg-bg-surface border border-white/[.07] rounded-2xl overflow-hidden">
            {/* Score header */}
            <div className="p-5 border-b" style={{ background: e.heroBg, borderColor: e.heroBdr }}>
              <div className="flex items-center gap-2.5 mb-2.5">
                <div
                  className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-[12px] shrink-0"
                  style={{ background: e.iconBg, borderColor: e.color, color: e.color }}
                >
                  {e.icon}
                </div>
                <div>
                  <div className="text-[13px] font-medium" style={{ color: e.color }}>{e.label}</div>
                  <div className="text-[10px] opacity-60 mt-0.5" style={{ color: e.color }}>Risk score: {e.risk} / 100</div>
                </div>
              </div>
              <div className="h-[3px] bg-bg-high rounded overflow-hidden relative">
                <div
                  className="absolute top-0 right-0 bottom-0 rounded"
                  style={{ width: e.barPct, background: e.color }}
                />
              </div>
            </div>

            {/* Body */}
            <div className="p-5">
              <p className="text-[12px] font-medium text-text-primary mb-3">{e.product}</p>
              <div className="flex flex-col">
                {e.rows.map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between py-1.5 border-b border-white/[.05] text-[12px] last:border-none">
                    <span className="text-text-muted">{k}</span>
                    <span style={{ color: e.color }}>{v}</span>
                  </div>
                ))}
              </div>
              <div
                className="mt-4 p-3 rounded-[7px] text-[12px] leading-[1.5] italic border-l-[3px]"
                style={{ borderColor: e.color, background: e.heroBg, color: e.color }}
              >
                &#8220;{e.verdict}&#8221;
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-[13px] text-text-muted mt-5 italic text-center">
        Sig&#241;al scores whether brands show their proof — not whether claims are true or whether the product works.
        A red signal means ask more questions, not that the product is bad.
      </p>
    </section>
  );
}
