import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-[120px] pb-20 overflow-hidden">
      {/* Glow */}
      <div className="pointer-events-none absolute top-[15%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse,rgba(79,124,255,0.09)_0%,transparent_65%)]" />

      {/* Eyebrow */}
      <div className="flex items-center justify-center gap-3 mb-7 animate-fade-up">
        <span className="w-9 h-px bg-accent/50 block" />
        <span className="font-mono text-[11px] tracking-[.2em] text-accent uppercase">
          Early beta&#160;&#183;&#160;Claim integrity infrastructure
        </span>
        <span className="w-9 h-px bg-accent/50 block" />
      </div>

      {/* Headline */}
      <h1 className="font-display text-[clamp(44px,7vw,88px)] font-normal leading-[1.04] tracking-[-0.025em] max-w-[940px] mb-6 animate-fade-up [animation-delay:80ms]">
        The signal the wellness<br />industry{" "}
        <em className="italic text-text-secondary">answers to.</em>
      </h1>

      {/* Sub */}
      <p className="text-[18px] text-text-secondary max-w-[560px] leading-[1.7] font-light mb-12 animate-fade-up [animation-delay:160ms]">
        Sig&#241;al scores whether wellness brands show their proof{" "}
        &#8212; so you know before you spend.
      </p>

      {/* CTAs */}
      <div className="flex items-center gap-3.5 flex-wrap justify-center mb-14 animate-fade-up [animation-delay:240ms]">
        <Link href="/leaderboard" className="inline-flex items-center justify-center rounded-md bg-accent hover:bg-accent/90 text-white text-[15px] px-7 h-12 font-medium transition-colors">
          View Verified Brands
        </Link>
        <Link href="/extension" className="inline-flex items-center justify-center rounded-md text-[15px] px-7 h-12 border border-accent/35 text-accent bg-accent/[.07] hover:bg-accent/[.14] hover:border-accent/60 hover:text-[#7fa8ff] font-medium transition-colors">
          Add to Browser
        </Link>
      </div>

      {/* Social proof */}
      <div className="flex items-center gap-5 flex-wrap justify-center animate-fade-up [animation-delay:320ms]">
        {[
          "Editorially reviewed",
          "Payment never influences scores",
          "Open methodology",
          "Wellness, nutrition & performance",
        ].map((item, i, arr) => (
          <span key={item} className="flex items-center gap-5">
            <span className="text-[12px] text-text-muted font-mono tracking-[.04em]">{item}</span>
            {i < arr.length - 1 && <span className="w-1 h-1 rounded-full bg-text-muted" />}
          </span>
        ))}
      </div>
    </section>
  );
}
