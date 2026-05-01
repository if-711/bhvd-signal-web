const STATS = [
  {
    num: "$6,293",
    color: "#4a78f0",
    label: "average annual wellness spend per U.S. consumer",
    desc: "Most of that spending is guided by marketing claims, not proof. Start knowing before you spend.",
  },
  {
    num: "2 sec",
    color: "#1e9459",
    label: "from page load to Sigñal",
    desc: "The signal appears instantly — before checkout, without additional research.",
  },
  {
    num: "587",
    color: "#c07718",
    label: "public claim receipts archived",
    desc: "Each receipt links a brand claim to visible supporting evidence — or highlights where that connection is missing.",
  },
];

export function ValueBand() {
  return (
    <div className="bg-bg-surface border-y border-white/[.07] py-14 px-8">
      <p className="text-center text-[12px] text-text-muted font-mono tracking-[.04em] mb-9">
        Scores update as claims and evidence change.
      </p>

      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3">
        {STATS.map((s, i) => (
          <div key={i} className={`px-7 py-8 ${i < STATS.length - 1 ? "md:border-r border-white/[.07]" : ""}`}>
            <div className="font-display text-[52px] font-normal leading-none mb-2" style={{ color: s.color }}>
              {s.num}
            </div>
            <div className="text-[15px] font-medium text-text-primary mb-2.5">{s.label}</div>
            <div className="text-[13px] text-text-secondary leading-[1.65]">{s.desc}</div>
          </div>
        ))}
      </div>

      <div className="max-w-[1100px] mx-auto mt-10 pt-9 border-t border-white/[.07] text-center">
        <p className="font-display text-[22px] font-normal text-text-primary tracking-[-0.01em] mb-2">
          Start knowing before you spend.
        </p>
        <p className="text-[13px] text-text-muted font-mono tracking-[.02em] max-w-[520px] mx-auto leading-[1.6]">
          Sig&#241;al creates a public record of brand claims and whether brands show their proof.
        </p>
      </div>
    </div>
  );
}
