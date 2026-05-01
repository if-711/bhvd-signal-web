export function WhyItMatters() {
  return (
    <section className="max-w-[1100px] mx-auto px-8 py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Text */}
        <div>
          <p className="font-mono text-[11px] tracking-[.16em] text-text-muted uppercase mb-3.5">Why it matters</p>
          <h3 className="font-display text-[32px] font-normal leading-[1.15] tracking-[-0.015em] mb-5">
            The wellness industry spends<br />
            <em className="italic text-text-secondary">billions teaching you to trust it.</em>
            <br />We help you understand what that means.
          </h3>
          <p className="text-[15px] text-text-secondary leading-[1.75] mb-3.5 font-light">
            Every wellness brand website, every &#8220;clinically proven&#8221; hero headline, every decorative trust badge
            &#8212; designed to feel like evidence. Most of the time, they&#8217;re not.
          </p>
          <p className="text-[15px] text-text-secondary leading-[1.75] font-light">
            Sig&#241;al doesn&#8217;t tell you whether a product works. It tells you whether the brand showed their proof.
            That distinction is everything &#8212; because when you know which brands back their claims, you stop spending
            money on the ones that don&#8217;t.
          </p>
        </div>

        {/* Stats */}
        <div className="flex flex-col gap-3">
          {[
            {
              icon: "◼",
              num: "68%",
              color: "#9e3028",
              desc: "of wellness products scanned across supplements, skincare, devices, and wearables carry high-intensity claims with limited or no visible evidence on the page.",
            },
            {
              icon: "◉",
              num: "$2.1B",
              color: "#c07718",
              desc: "spent annually on wellness products consumers later say didn’t deliver what the marketing promised. Most had no signal before buying.",
            },
          ].map((s) => (
            <div key={s.num} className="bg-bg-surface border border-white/[.07] rounded-xl px-6 py-5 flex items-start gap-5">
              <div className="w-11 h-11 rounded-[10px] border border-white/[.13] flex items-center justify-center text-[20px] shrink-0">
                {s.icon}
              </div>
              <div>
                <div className="font-display text-[32px] font-normal leading-none mb-1" style={{ color: s.color }}>
                  {s.num}
                </div>
                <p className="text-[12px] text-text-secondary leading-[1.5]">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
