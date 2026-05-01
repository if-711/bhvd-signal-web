import Link from "next/link";
import { SignalLogo } from "./SignalLogo";

const NAV_LINKS = [
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/compare",     label: "Compare" },
  { href: "/methodology", label: "Methodology" },
  { href: "/pricing",     label: "Pricing" },
];

export function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 h-[58px] bg-[#0a0c12]/95 backdrop-blur-md border-b border-white/[.07]">
      <SignalLogo />

      <ul className="hidden md:flex items-center gap-8 list-none">
        {NAV_LINKS.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-[13px] text-text-secondary hover:text-text-primary transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      <Link href="/extension" className="inline-flex items-center justify-center rounded-md bg-accent hover:bg-accent/90 text-white text-[13px] px-4 h-8 font-medium transition-colors">
        Add to Browser
      </Link>
    </nav>
  );
}
