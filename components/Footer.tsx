import Link from "next/link";
import { SignalLogo } from "./SignalLogo";
import { Separator } from "@/components/ui/separator";

const LINKS = [
  {
    heading: "Product",
    items: [
      { label: "Browser Extension", href: "/extension" },
      { label: "Leaderboard", href: "/leaderboard" },
      { label: "Compare brands", href: "/compare" },
      { label: "Methodology", href: "/methodology" },
      { label: "How it works", href: "#how" },
    ],
  },
  {
    heading: "Industry",
    items: [
      { label: "For retailers", href: "mailto:signal@bhvd.com" },
      { label: "For investors", href: "mailto:signal@bhvd.com" },
      { label: "For brands", href: "/brand-portal" },
      { label: "BHVD Verified", href: "mailto:signal@bhvd.com" },
    ],
  },
  {
    heading: "Company",
    items: [
      { label: "Contact", href: "mailto:signal@bhvd.com" },
    ],
  },
];

export function Footer() {
  return (
    <footer>
      <div className="max-w-[1100px] mx-auto px-8 py-14 flex flex-wrap justify-between gap-9">
        <div>
          <SignalLogo className="mb-4" />
          <p className="text-[11px] text-text-muted max-w-[340px] leading-[1.65]">
            Sig&#241;al scores whether brands show their proof — not whether claims are true or whether products work.
            Editorial-only. Never influenced by payment.
          </p>
        </div>
        <div className="flex gap-14 flex-wrap">
          {LINKS.map((col) => (
            <div key={col.heading}>
              <h5 className="font-mono text-[10px] tracking-[.11em] text-text-muted uppercase mb-3.5">{col.heading}</h5>
              {col.items.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block text-[13px] text-text-secondary mb-2.5 hover:text-text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Separator className="bg-white/[.07]" />
      <p className="text-center py-4 px-8 text-[10px] text-text-muted font-mono tracking-[.05em]">
        &#169; 2025 Sig&#241;al&#160;&#183;&#160;by BHVD&#160;&#183;&#160;Payment never influences scores&#160;&#183;&#160;Open methodology
      </p>
    </footer>
  );
}
