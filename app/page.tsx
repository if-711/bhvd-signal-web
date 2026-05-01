import { Nav }                  from "@/components/Nav";
import { BetaBanner }           from "@/components/BetaBanner";
import { Hero }                 from "@/components/Hero";
import { ValueBand }            from "@/components/ValueBand";
import { LiveDemo }             from "@/components/LiveDemo";
import { WhyItMatters }         from "@/components/WhyItMatters";
import { HowItWorks }           from "@/components/HowItWorks";
import { SignalExamples }       from "@/components/SignalExamples";
import { BrandPulse }           from "@/components/BrandPulse";
import { MarketSignals }        from "@/components/MarketSignals";
import { Pricing }              from "@/components/Pricing";
import { Integrity }            from "@/components/Integrity";
import { FAQ }                  from "@/components/FAQ";
import { WhyItMattersCallout }  from "@/components/WhyItMattersCallout";
import { CTABand }              from "@/components/CTABand";
import { Footer }               from "@/components/Footer";

function Divider() {
  return <div className="h-px bg-white/[.07]" />;
}

export default function HomePage() {
  return (
    <>
      <Nav />
      <BetaBanner />

      <main className="pt-[84px]">
        <Hero />
        <ValueBand />
        <LiveDemo />
        <Divider />
        <WhyItMatters />
        <Divider />
        <HowItWorks />
        <Divider />
        <SignalExamples />
        <Divider />
        <BrandPulse />
        <Divider />
        <MarketSignals />
        <Divider />
        <Pricing />
        <Divider />
        <Integrity />
        <Divider />
        <FAQ />
        <WhyItMattersCallout />
        <CTABand />
      </main>

      <Footer />
    </>
  );
}
