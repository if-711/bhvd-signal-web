import Link from "next/link";

export function SignalLogo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 no-underline ${className}`}>
      <svg width="24" height="11" viewBox="0 0 24 11" fill="none" aria-hidden="true">
        <path d="M1 8C3.2 3.5 5.8 3.5 7.8 8C9.8 12.5 12.4 12.5 14.4 8C16.4 3.5 19 3.5 23 5.5"
          stroke="#4a78f0" strokeWidth="1.7" strokeLinecap="round"/>
      </svg>
      <span className="font-mono text-[13px] font-medium tracking-wide text-text-primary">
        Sig&#241;al
        <span className="text-[9px] text-text-muted tracking-[.13em] uppercase font-normal border-l border-white/[.13] pl-2 ml-2">
          by BHVD
        </span>
      </span>
    </Link>
  );
}
