"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CONSUMER_PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever · no credit card",
    features: [
      { text: "Red / Yellow / Green Signal on every scan", on: true },
      { text: "Claim Support Risk score", on: true },
      { text: "Category rank", on: true },
      { text: "Top flagged reasons", on: true },
      { text: "25 scans per month", on: true },
      { text: "7-day scan history", on: true },
      { text: "Full 6-dimension breakdown", on: false },
      { text: "Unlimited scans", on: false },
      { text: "Signal change alerts", on: false },
      { text: "Watchlist tracking", on: false },
    ],
    cta: "Add to Chrome — free",
    featured: false,
  },
  {
    name: "Signal Pro",
    price: "$6",
    period: "per month · cancel anytime",
    badge: "Most popular",
    features: [
      { text: "Everything in Free — unlimited", on: true },
      { text: "Full 6-dimension breakdown with explanations", on: true },
      { text: "Complete scan history — never expires", on: true },
      { text: "Watchlist — track products over time", on: true },
      { text: "Signal change alerts via email", on: true },
      { text: "CSV export of your scan history", on: true },
      { text: "Early access to new categories", on: true },
    ],
    cta: "Start free 14-day trial",
    featured: true,
  },
  {
    name: "Brand transparency",
    price: "$199",
    period: "per month · brands only",
    features: [
      { text: "See your full scoring breakdown", on: true },
      { text: "Understand exactly what drives your signal", on: true },
      { text: "Submit supporting evidence for review", on: true },
      { text: "Evidence review status tracking", on: true },
      { text: "Category benchmark vs. peers", on: true },
      { text: "Methodology support", on: true },
    ],
    cta: "Contact us",
    note: "Brand payment never changes a score. The only path to a better signal is making stronger evidence visible on your actual product page.",
    featured: false,
  },
];

const B2B_PLANS = [
  {
    name: "Retailer intelligence",
    price: "$999",
    period: "per month · per category",
    features: [
      { text: "Full category leaderboard with all dimension scores", on: true },
      { text: "Brand portfolio audit across your entire shelf", on: true },
      { text: "Signal change monitoring with alerts", on: true },
      { text: "Regulatory risk flagging", on: true },
      { text: "API access for internal tooling", on: true },
      { text: "Monthly benchmark report", on: true },
    ],
    cta: "Talk to us",
    note: "For retailers who need ongoing brand risk intelligence before regulatory issues surface in the press.",
    featured: false,
  },
  {
    name: "Due diligence report",
    price: "$299",
    period: "per brand · one-time",
    badge: "High value",
    features: [
      { text: "Full brand signal audit — every product page scored", on: true },
      { text: "All 6 dimensions with detailed reasoning", on: true },
      { text: "Claim-by-claim analysis with exact quotes", on: true },
      { text: "Regulatory risk summary", on: true },
      { text: "Category peer comparison", on: true },
      { text: "Delivered in 48 hours", on: true },
    ],
    cta: "Order a report",
    note: "Used by investors before writing checks into wellness brands, journalists investigating marketing claims, and legal teams assessing risk.",
    featured: true,
  },
  {
    name: "BHVD Verified badge",
    price: "$299",
    period: "per month · green-signal brands only",
    features: [
      { text: "License to display the BHVD Verified badge", on: true },
      { text: "Badge links live to your current score", on: true },
      { text: "Eligible only while maintaining Green signal", on: true },
      { text: "Auto-deactivates if signal drops", on: true },
      { text: "Listed in the BHVD Verified brand directory", on: true },
    ],
    cta: "Apply for verification",
    note: "The badge is earned through evidence quality — not purchased. It revokes automatically the moment a signal drops below Green.",
    featured: false,
  },
];

type Plan = typeof CONSUMER_PLANS[number];

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div className={cn(
      "relative rounded-2xl p-7 flex flex-col",
      plan.featured
        ? "bg-bg-raised border border-accent"
        : "bg-bg-surface border border-white/[.07]"
    )}>
      {plan.badge && (
        <div className="absolute -top-px left-1/2 -translate-x-1/2 bg-accent text-white text-[10px] font-mono tracking-[.08em] px-3.5 py-0.5 rounded-b-lg">
          {plan.badge}
        </div>
      )}
      <p className="font-mono text-[11px] tracking-[.11em] text-text-muted uppercase mb-2.5">{plan.name}</p>
      <div className="font-display text-[44px] font-normal leading-none mb-1">
        <sup className="text-[20px] font-sans align-top mt-2 inline-block">{plan.price.startsWith("$") ? "$" : ""}</sup>
        {plan.price.replace("$", "")}
      </div>
      <p className="text-[12px] text-text-muted mb-6">{plan.period}</p>

      <ul className="flex flex-col gap-2.5 mb-6 flex-1">
        {plan.features.map((f) => (
          <li key={f.text} className={cn("flex items-start gap-2.5 text-[12px] leading-[1.5]", f.on ? "text-text-secondary" : "text-text-muted")}>
            <span className={cn(
              "mt-0.5 w-[15px] h-[15px] rounded-full shrink-0 border",
              f.on ? "bg-signal-green-bg border-signal-green" : "bg-bg-high border-white/[.13]"
            )} />
            {f.text}
          </li>
        ))}
      </ul>

      <Button
        variant={plan.featured ? "default" : "outline"}
        className={cn(
          "w-full text-[13px] font-medium",
          plan.featured ? "bg-accent hover:bg-accent/90 text-white border-none" : "border-white/[.13] text-text-secondary hover:text-text-primary"
        )}
      >
        {plan.cta}
      </Button>

      {"note" in plan && plan.note && (
        <div className="mt-3.5 p-3 bg-signal-green/[.05] border border-signal-green/[.14] rounded-lg text-[11px] text-text-muted leading-[1.55]">
          {plan.note}
        </div>
      )}
    </div>
  );
}

export function Pricing() {
  const [tab, setTab] = useState<"consumer" | "b2b">("consumer");

  return (
    <section className="max-w-[1100px] mx-auto px-8 py-24" id="pricing">
      <p className="font-mono text-[11px] tracking-[.16em] text-text-muted uppercase mb-3.5">Pricing</p>
      <h2 className="font-display text-[clamp(32px,4vw,54px)] font-normal leading-[1.08] tracking-[-0.022em] mb-4">
        Always free to<br />protect yourself.
      </h2>
      <p className="text-[17px] text-text-secondary max-w-[520px] font-light leading-[1.7] mb-8">
        The signal is free forever for every consumer. Pro features are for people who want more depth.
        No brand money touches either tier.
      </p>

      {/* Tab switcher */}
      <div className="flex gap-0.5 mb-6 bg-bg-surface border border-white/[.07] rounded-xl p-1 w-fit">
        {(["consumer", "b2b"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "px-5 py-2 rounded-[7px] text-[12px] font-medium transition-all",
              tab === t ? "bg-bg-high text-text-primary" : "text-text-muted hover:text-text-secondary"
            )}
          >
            {t === "consumer" ? "For consumers" : "For industry"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(tab === "consumer" ? CONSUMER_PLANS : B2B_PLANS).map((plan) => (
          <PlanCard key={plan.name} plan={plan as Plan} />
        ))}
      </div>
    </section>
  );
}
