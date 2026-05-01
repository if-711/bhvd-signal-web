"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

const BRANDS = [
  {
    name: "AG1", domain: "drinkag1.com", cat: "Supplements · Daily Nutrition",
    product: "All-in-one greens powder · $79/month",
    claims: ['"Clinically studied to support energy and recovery"', '"Supports gut health and microbiome diversity"', '"75+ vitamins, minerals, and whole-food nutrients"'],
    claimOk: [false, false, true],
    btnColor: "#1e9459", btnLabel: "Add to cart — $79/month",
    score: 67, verdict: "GENERALLY ALIGNED", color: "#c07718",
    summary: "Company-funded trials, 24 people. Real ingredients, bigger promises.",
    dims: { ev: 36, cp: 45, sp: 80 },
    gap: [{ c: "Clinically studied energy", e: "n=24 company trial", s: "gap" }, { c: "Gut health supported", e: "Probiotic ingredients — no product RCT", s: "partial" }],
  },
  {
    name: "Bloom Nutrition", domain: "bloomnutrition.com", cat: "Supplements · Women's Health",
    product: "Greens & Superfoods Powder · $44.99",
    claims: ['"Supports gut health, immunity, and energy"', '"Made with 15 superfoods"', '"Loved by 5 million customers"'],
    claimOk: [true, false, true],
    btnColor: "#c060e0", btnLabel: "Shop now — $44.99",
    score: 31, verdict: "EVIDENCE GAP", color: "#9e3028",
    summary: "Big marketing, zero product-level clinical evidence. Influencer backing is not proof.",
    dims: { ev: 8, cp: 15, sp: 40 },
    gap: [{ c: "Supports immunity & energy", e: "No clinical evidence found", s: "missing" }, { c: "5 million customers", e: "Sales claim, not evidence", s: "gap" }],
  },
  {
    name: "Thorne", domain: "thorne.com", cat: "Supplements · NSF Certified",
    product: "Multivitamin / Mineral line",
    claims: ['"NSF Certified for Sport"', '"Practitioner-grade formulations"', '"Full-dose ingredient transparency"'],
    claimOk: [true, true, true],
    btnColor: "#4f7cff", btnLabel: "Shop Thorne",
    score: 71, verdict: "VALIDATED", color: "#1e9459",
    summary: "NSF certified, practitioner-grade. One of the more trustworthy supplement brands.",
    dims: { ev: 72, cp: 78, sp: 87 },
    gap: [{ c: "NSF Certified for Sport", e: "Independently verified certification", s: "aligned" }, { c: "Full label transparency", e: "All doses disclosed on label", s: "aligned" }],
  },
  {
    name: "Elemind", domain: "elemindtech.com", cat: "Neurotech · Sleep Device",
    product: "EEG Sleep Headband · $349 + $19.99/mo",
    claims: ['"Falls asleep 2.2× faster"', '"EEG-based adaptive stimulation"', '"Scientifically validated"'],
    claimOk: [true, false, false],
    btnColor: "#4f7cff", btnLabel: "Pre-order — $349",
    score: 47, verdict: "OVEREXTENDED", color: "#9e3028",
    summary: "Real EEG tech — but the evidence base is early and the subscription requirement is a red flag.",
    dims: { ev: 32, cp: 30, sp: 65 },
    gap: [{ c: "2.2× faster sleep onset", e: "Single internal pilot study", s: "gap" }, { c: "EEG adaptive stimulation", e: "Technology is real — clinical outcomes limited", s: "partial" }],
  },
] as const;

type Phase = "idle" | "scanning" | "scored";

function dimColor(val: number) {
  return val < 40 ? "#9e3028" : val < 65 ? "#c07718" : "#1e9459";
}

export function LiveDemo() {
  const [idx, setIdx]           = useState(0);
  const [phase, setPhase]       = useState<Phase>("idle");
  const [panelOpen, setPanelOpen] = useState(false);
  const [score, setScore]       = useState(0);
  const [assess, setAssess]     = useState(false);

  const idxRef    = useRef(0);
  const timers    = useRef<ReturnType<typeof setTimeout>[]>([]);
  const rafHandle = useRef(0);

  const clearAll = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    cancelAnimationFrame(rafHandle.current);
  }, []);

  const addTimer = useCallback((fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  }, []);

  const countUp = useCallback((target: number) => {
    const start = performance.now();
    const dur = 900;
    function tick(now: number) {
      const p    = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setScore(Math.round(target * ease));
      if (p < 1) rafHandle.current = requestAnimationFrame(tick);
    }
    rafHandle.current = requestAnimationFrame(tick);
  }, []);

  const loadBrand = useCallback((i: number) => {
    clearAll();
    idxRef.current = i;
    setIdx(i);
    setPhase("idle");
    setPanelOpen(false);
    setScore(0);
    setAssess(false);

    addTimer(() => {
      setPanelOpen(true);
      setPhase("scanning");
      addTimer(() => {
        const b = BRANDS[idxRef.current];
        setPhase("scored");
        countUp(b.score);
        addTimer(() => setAssess(true), 700);
        addTimer(() => loadBrand((idxRef.current + 1) % BRANDS.length), 5500);
      }, 1600);
    }, 1200);
  }, [clearAll, addTimer, countUp]);

  useEffect(() => {
    loadBrand(0);
    return clearAll;
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  const b = BRANDS[idx];

  return (
    <div className="py-16" style={{ background: "linear-gradient(to bottom,transparent,rgba(17,20,32,.5),transparent)" }}>
      <div className="max-w-[900px] mx-auto px-6">
        <p className="font-mono text-[10px] text-text-muted tracking-[.14em] uppercase text-center mb-2.5">Live Demo</p>
        <h2 className="font-display text-[clamp(22px,3vw,34px)] font-normal text-center tracking-[-0.018em] mb-10">
          See the signal appear. <em className="italic text-text-secondary">In real time.</em>
        </h2>

        {/* Browser chrome */}
        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,.6)]" style={{ background: "#111420" }}>
          <div className="h-[42px] flex items-center gap-2.5 px-4 border-b border-white/[.06]" style={{ background: "#0e1020" }}>
            <div className="flex gap-1.5">
              {["#ff5f57","#febc2e","#28c840"].map((c) => (
                <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
              ))}
            </div>
            <div className="flex-1 h-6 rounded flex items-center px-2.5 font-mono text-[11px] text-[#5a6090]" style={{ background: "rgba(255,255,255,.05)" }}>
              <span className="text-[8px] text-[#27ae60] mr-1.5">●</span>
              {b.domain}
            </div>
            {/* Signal tab button */}
            <button
              onClick={() => panelOpen ? (setPanelOpen(false), setPhase("idle")) : loadBrand(idxRef.current)}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center shrink-0 transition-shadow hover:shadow-[0_0_0_2px_rgba(74,120,240,.3)]"
              style={{ background: "#07080e" }}
            >
              <svg viewBox="0 0 52 52" width="26" height="26" fill="none">
                <path d="M25.9998 0C28.1731 0 29.9538 1.72582 30.0217 3.8981C30.1312 7.40731 33.1026 10.2196 35.1071 13.102C36.0252 14.4222 36.5452 16.038 36.4956 17.7728L36.2914 24.9228C36.1757 28.9731 33.5493 32.7567 33.2607 36.7983L32.6148 45.8407C32.3669 49.3111 29.4792 52 26 52C22.5207 52 19.633 49.3112 19.3851 45.8407L18.7391 36.7982C18.4504 32.7566 15.8242 28.9731 15.7085 24.9228L15.5041 17.7728C15.4545 16.0382 15.9744 14.4226 16.8924 13.1025C18.8968 10.2198 21.8683 7.4075 21.9781 3.8981C22.046 1.72584 23.8265 3.83946e-05 25.9998 0Z"
                  fill={phase === "scored" ? b.color + "44" : "#1e2440"}
                />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="flex min-h-[340px] relative overflow-hidden">
            {/* Page side */}
            <div className="flex-1 p-7 overflow-hidden">
              <p className="font-mono text-[9px] text-text-muted tracking-[.1em] uppercase mb-2">{b.cat}</p>
              <p className="font-display text-[26px] leading-[1.1] mb-1.5">{b.name}</p>
              <p className="text-[11px] text-text-muted mb-5">{b.product}</p>
              <div className="flex flex-col gap-2 mb-5">
                {b.claims.map((c, i) => (
                  <div
                    key={i}
                    className={cn(
                      "rounded-[7px] px-3 py-2.5 text-[11px] text-text-secondary border-l-2 transition-all duration-500",
                      b.claimOk[i]
                        ? "border-signal-green bg-signal-green/[.04]"
                        : "border-white/[.08] bg-white/[.04]"
                    )}
                  >
                    {c}
                  </div>
                ))}
              </div>
              <button
                className="px-5 py-2.5 rounded-lg text-[12px] font-medium text-white transition-colors"
                style={{ background: b.btnColor }}
              >
                {b.btnLabel}
              </button>
            </div>

            {/* Signal panel */}
            <div
              className="w-[230px] shrink-0 flex flex-col border-l border-white/[.07]"
              style={{
                background: "#08090f",
                transform: panelOpen ? "translateX(0)" : "translateX(100%)",
                opacity: panelOpen ? 1 : 0,
                transition: "transform 0.55s cubic-bezier(0.34,1.1,0.64,1), opacity 0.4s",
              }}
            >
              <div className="px-4 py-3.5 border-b border-white/[.06]">
                <p className="font-mono text-[9px] text-white/25 tracking-[.14em]">Sig&#241;al</p>
              </div>

              {phase === "scanning" && (
                <div className="flex-1 flex flex-col items-center justify-center gap-3 p-5">
                  <div className="w-8 h-8 rounded-full border-2 border-white/[.08] border-t-accent animate-spin" />
                  <p className="font-mono text-[11px] text-text-muted">Analyzing claims&#8230;</p>
                </div>
              )}

              {phase === "scored" && (
                <div className="flex-1 flex flex-col gap-2.5 p-3.5 overflow-hidden">
                  {/* Score hero */}
                  <div className="rounded-xl p-3.5 border transition-all" style={{ background: b.color + "0a", borderColor: b.color + "33" }}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-mono text-[12px] font-bold shrink-0"
                        style={{ background: b.color + "22", borderColor: b.color, color: b.color }}>
                        {b.score >= 68 ? "✓" : b.score >= 55 ? "~" : "✗"}
                      </div>
                      <div>
                        <div className="font-mono text-[22px] font-bold leading-none" style={{ color: b.color }}>{score}</div>
                        <div className="font-mono text-[8px] font-semibold tracking-[.08em] uppercase mt-0.5 opacity-85" style={{ color: b.color }}>{b.verdict}</div>
                      </div>
                    </div>
                    <div className="h-[3px] bg-white/[.06] rounded overflow-hidden mb-2">
                      <div className="h-full rounded transition-all duration-[1200ms]" style={{ width: `${score}%`, background: b.color }} />
                    </div>
                    <p className="text-[10px] leading-[1.6] italic opacity-65" style={{ color: b.color }}>{b.summary}</p>
                  </div>

                  {/* Dims */}
                  <div className="flex flex-col gap-1.5">
                    {[["Evidence Strength", b.dims.ev], ["Claim Scope", b.dims.cp], ["Specificity", b.dims.sp]].map(([label, val]) => (
                      <div key={label as string} className="flex items-center gap-1.5 text-[9px] text-text-muted">
                        <span className="w-[90px] shrink-0">{label}</span>
                        <div className="flex-1 h-[2px] bg-white/[.06] rounded overflow-hidden">
                          <div className="h-full rounded transition-all duration-700" style={{ width: `${val}%`, background: dimColor(val as number) }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Claim vs evidence */}
                  {assess && (
                    <div className="bg-white/[.03] border-t border-white/[.06] -mx-3.5 px-3.5 pt-2.5 pb-0 text-[10px] leading-[1.65] text-text-secondary mt-1">
                      <p className="font-mono text-[9px] text-text-muted font-bold tracking-[.08em] uppercase mb-1.5">Claim vs Evidence</p>
                      {b.gap.map((g) => {
                        const c = g.s === "aligned" ? "#1e9459" : g.s === "partial" ? "#c07718" : "#9e3028";
                        return (
                          <div key={g.c} className="flex gap-1.5 mb-1.5">
                            <div className="w-1.5 h-1.5 rounded-full mt-1 shrink-0" style={{ background: c }} />
                            <div>
                              <div className="text-[9.5px] text-[#c0c8e0]">{g.c}</div>
                              <div className="text-[9px] text-[#5a6080]">{g.e}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              <p className="font-mono text-[9px] text-white/20 tracking-[.07em] text-center pb-3 mt-auto">
                {b.name} · {b.domain}
              </p>
            </div>
          </div>
        </div>

        {/* Brand pills */}
        <div className="flex gap-2 justify-center mt-5 flex-wrap">
          {BRANDS.map((br, i) => (
            <button
              key={br.name}
              onClick={() => loadBrand(i)}
              className={cn(
                "font-mono text-[10px] px-3.5 py-1.5 rounded-full border transition-all",
                idx === i
                  ? "text-text-primary border-white/25 bg-bg-surface"
                  : "text-text-muted border-white/[.07] hover:text-text-secondary hover:border-white/15 bg-transparent"
              )}
            >
              {br.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
