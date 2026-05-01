import Link from "next/link";

export function CTABand() {
  return (
    <div className="bg-bg-surface border-y border-white/[.07] py-20 px-8 text-center">
      <h2 className="font-display text-[clamp(34px,4vw,56px)] font-normal leading-[1.08] tracking-[-0.022em] mb-5">
        Start knowing<br /><em className="italic text-text-secondary">before you spend.</em>
      </h2>
      <p className="text-[17px] text-text-secondary max-w-[500px] mx-auto mb-10 font-light leading-[1.7]">
        The wellness industry spends billions on marketing claims. Sig&#241;al is free.
        Independent analysis, before the money leaves your pocket.
      </p>
      <div className="flex items-center gap-3 justify-center flex-wrap mb-6">
        <Link href="/extension" className="inline-flex items-center justify-center rounded-md bg-accent hover:bg-accent/90 text-white text-[15px] px-7 h-12 font-medium transition-colors">
          <svg width="15" height="15" viewBox="0 0 20 20" fill="none" className="mr-2">
            <path d="M10 2L3 5v5c0 4.5 3 7.5 7 8.5C14 17.5 17 14.5 17 10V5L10 2z" stroke="#fff" strokeWidth="1.5" fill="none"/>
          </svg>
          Add Sig&#241;al to Browser
        </Link>
        <Link href="/leaderboard" className="inline-flex items-center justify-center rounded-md text-[15px] px-7 h-12 border border-white/[.13] text-text-secondary hover:text-text-primary hover:border-white/25 font-medium transition-colors">
          Browse the leaderboard
        </Link>
        <Link href="/compare" className="inline-flex items-center justify-center rounded-md text-[15px] px-7 h-12 border border-white/[.13] text-text-secondary hover:text-text-primary hover:border-white/25 font-medium transition-colors">
          Compare brands
        </Link>
      </div>
      <p className="text-[12px] text-text-muted font-mono tracking-[.04em]">
        No account required&#160;&#183;&#160;Free&#160;&#183;&#160;No brand payments
      </p>
    </div>
  );
}
