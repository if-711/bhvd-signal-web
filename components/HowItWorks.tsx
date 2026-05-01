const STEPS = [
  {
    n: "01", icon: "▶",
    title: "Page detected",
    body: "Detects any wellness product page — supplements, skincare, neurotech, recovery devices, wearables, sleep tech, and more. If it makes a health-adjacent claim, we score it.",
  },
  {
    n: "02", icon: "◉",
    title: "Claims extracted",
    body: "Every marketing claim is pulled and tagged by location. Hero headlines count 3× more than footer disclaimers — because that's where the money is.",
  },
  {
    n: "03", icon: "◼",
    title: "Receipts checked",
    body: "Study links, certifications, dosage panels, and third-party testing are matched against each claim across the brand's full public domain.",
  },
  {
    n: "04", icon: "▲",
    title: "Score calculated",
    body: "Six weighted dimensions — blended with AI analysis — produce a single Claim Support Risk score. The full methodology is published publicly.",
  },
  {
    n: "05", icon: "✓", green: true,
    title: "Signal appears",
    body: "Red, Yellow, or Green. Category rank. One sentence. The gap between what a brand claims and what it visibly supports — measured and on the record.",
  },
];

export function HowItWorks() {
  return (
    <section className="max-w-[1100px] mx-auto px-8 py-24" id="how">
      <p className="font-mono text-[11px] tracking-[.16em] text-text-muted uppercase mb-3.5">Process</p>
      <h2 className="font-display text-[clamp(32px,4vw,54px)] font-normal leading-[1.08] tracking-[-0.022em] mb-4">
        Five steps.<br />Under two seconds.
      </h2>
      <p className="text-[17px] text-text-secondary max-w-[520px] font-light leading-[1.7] mb-14">
        Fully automated. No manual review. No brand influence at any stage.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 border border-white/[.07] rounded-xl overflow-hidden">
        {STEPS.map((s, i) => (
          <div
            key={s.n}
            className={`bg-bg-surface p-7 ${i < STEPS.length - 1 ? "md:border-r border-white/[.07] border-b md:border-b-0" : ""}`}
          >
            <p className="font-mono text-[10px] text-text-muted tracking-[.09em] mb-4">{s.n}</p>
            <div
              className={`w-9 h-9 rounded-[9px] border flex items-center justify-center mb-3.5 text-[17px] ${
                s.green
                  ? "bg-[#071610] border-[#1e9459]"
                  : "border-white/[.13] bg-transparent"
              }`}
            >
              {s.icon}
            </div>
            <h3 className="text-[13px] font-medium text-text-primary mb-1.5">{s.title}</h3>
            <p className="text-[12px] text-text-secondary leading-[1.6]">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
