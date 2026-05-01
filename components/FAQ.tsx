"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "Does a Red signal mean the product doesn't work?",
    a: "No — and this is the most important thing to understand about Sigñal. A Red signal means a brand made strong claims without showing you the evidence to back them up on their page. The product might work brilliantly. The ingredient might have decades of research behind it. But right now, on this page, they're asking you to take their word for it. That's worth knowing before you spend $80 a month.",
  },
  {
    q: "So what does Sigñal actually tell me?",
    a: "It measures the gap between what a brand claims and what evidence they visibly connect to those claims. Green means claims appear proportionate to available evidence. Yellow means evidence exists, but is not clearly connected to all claims. Red means claims extend beyond visible support. Signal does not tell you whether to buy. It shows what holds.",
  },
  {
    q: "Can a brand pay to improve their signal?",
    a: "No. Scores are determined solely by what's visible on the consumer-facing product page at time of scan. The Brand Transparency plan ($199/month) shows brands what's driving their signal and lets them submit evidence for review — but paying for that has zero effect on their score. The only path to a better signal is making stronger evidence visible on the actual page consumers visit.",
  },
  {
    q: "How is the score calculated?",
    a: "The Claim Support Risk score (0–100) runs across six dimensions: Evidence Alignment (25%), Claim Clarity (15%), Evidence Quality (15%), Consumer Distortion Risk (15%), Claim Strength (10%), and Evidence Accessibility (10%). Each claim is also weighted by where it appears — hero headlines carry 3× more weight than footer disclaimers. The complete methodology is published publicly.",
  },
  {
    q: "What data does the extension collect?",
    a: "The extension reads the text content of health and wellness product pages to extract marketing claims and visible evidence. It sends that extracted text — never your personal data, identity, or browsing history — to our API for scoring. Free users' scan history is retained for 7 days. Pro users retain full history. We never sell scan data to the brands being scored.",
  },
  {
    q: "I'm a brand with a Red signal — what do I do?",
    a: "The signal reflects what's visible on your page right now. The fastest path to a better signal is making your evidence more visible — add links to published studies, display your third-party testing certificates, disclose ingredient dosages clearly. Our Brand Transparency plan ($199/month) shows you exactly which dimensions are driving your score.",
  },
];

export function FAQ() {
  return (
    <section className="max-w-[1100px] mx-auto px-8 py-24" id="faq">
      <p className="font-mono text-[11px] tracking-[.16em] text-text-muted uppercase mb-3.5">Questions</p>
      <h2 className="font-display text-[clamp(32px,4vw,54px)] font-normal leading-[1.08] tracking-[-0.022em] mb-14">
        Things people<br />ask us.
      </h2>

      <Accordion multiple={false} className="flex flex-col gap-0.5 max-w-[700px]">
        {FAQS.map((f, i) => (
          <AccordionItem
            key={i}
            value={`faq-${i}`}
            className="bg-bg-surface border border-white/[.07] rounded-xl overflow-hidden px-0 data-[state=open]:border-white/[.13]"
          >
            <AccordionTrigger className="px-6 py-4 text-[14px] font-medium text-text-primary text-left hover:no-underline hover:text-text-primary [&[data-state=open]]:text-text-primary">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-5 text-[13px] text-text-secondary leading-[1.8] border-t border-white/[.07] pt-4">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
