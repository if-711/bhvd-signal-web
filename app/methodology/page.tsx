export default function MethodologyPage() {
  return (
    <div className="page-wrap page-narrow">
      <div className="page-header">
        <div className="section-label">Transparency</div>
        <h1 className="page-h1">Sigñal Methodology</h1>
        <p className="page-sub">How scores are calculated — open, editorial, and independent.</p>
      </div>

      <div className="prose">
        <h2>What Sigñal measures</h2>
        <p>
          Sigñal scores the relationship between a brand&apos;s public marketing claims and the visible
          evidence it provides to support those claims. We do not evaluate whether a product
          works — we evaluate whether the marketing is proportional to what is publicly known.
        </p>
        <p>
          Scores are editorial assessments, not regulatory determinations. A high score means
          a brand&apos;s claims are well-supported by the evidence it makes visible. A low score
          means claims outrun visible evidence — not necessarily that the product is ineffective.
        </p>

        <h2>The seven scoring dimensions</h2>

        <div className="dim-doc-grid">
          <div className="dim-doc-card">
            <div className="dim-doc-num">01</div>
            <h3>Claim Clarity</h3>
            <p>Are benefit claims specific and falsifiable, or vague and untestable? High scores go to brands that make concrete, testable claims over brands that use language like &quot;supports wellness&quot; or &quot;activates your potential.&quot;</p>
          </div>
          <div className="dim-doc-card">
            <div className="dim-doc-num">02</div>
            <h3>Evidence Quality</h3>
            <p>What evidence does the brand cite — human RCTs, mechanistic studies, animal data, or none? We score based on evidence type and whether it applies to the specific claim made.</p>
          </div>
          <div className="dim-doc-card">
            <div className="dim-doc-num">03</div>
            <h3>Mechanism Transparency</h3>
            <p>Does the brand explain how its product is supposed to work? Brands that explain mechanisms — even simple ones — score higher than those making black-box efficacy claims.</p>
          </div>
          <div className="dim-doc-card">
            <div className="dim-doc-num">04</div>
            <h3>Ingredient &amp; Dosage</h3>
            <p>Are ingredients disclosed at clinically relevant doses? Proprietary blends without disclosed dosages score lower than transparent formulas with doses matching the evidence cited.</p>
          </div>
          <div className="dim-doc-card">
            <div className="dim-doc-num">05</div>
            <h3>Claim Scope</h3>
            <p>Does the brand stay within what the evidence supports, or do claims generalize beyond the population, condition, or effect studied? Over-extrapolation is penalized here.</p>
          </div>
          <div className="dim-doc-card">
            <div className="dim-doc-num">06</div>
            <h3>Comparative Claims</h3>
            <p>Does the brand make comparative claims (&quot;the best,&quot; &quot;more effective than X&quot;)? These require stronger evidentiary support. Unsupported superlatives score poorly.</p>
          </div>
          <div className="dim-doc-card">
            <div className="dim-doc-num">07</div>
            <h3>Disclaimer Presence</h3>
            <p>Does the brand include appropriate disclaimers near health claims? FDA-required language, scope limitations, and &quot;results may vary&quot; disclosures all factor here.</p>
          </div>
        </div>

        <h2>How the overall score is calculated</h2>
        <p>
          The overall score is a weighted average of the seven dimension scores, on a 0–100 scale.
          Evidence Quality and Claim Scope carry heavier weight than Disclaimer Presence.
          Dimension weights are reviewed quarterly by the editorial team.
        </p>

        <h2>Signal verdicts</h2>
        <div className="verdict-doc-list">
          <div className="verdict-doc-row"><span className="vd-score grn">80–100</span><span className="vd-name grn">Aligned / Validated</span><span>Claims are well-supported by visible evidence. Strong proportionality.</span></div>
          <div className="verdict-doc-row"><span className="vd-score yel">60–79</span><span className="vd-name yel">Generally Aligned</span><span>Most claims supported, minor gaps in evidence or scope.</span></div>
          <div className="verdict-doc-row"><span className="vd-score yel">45–59</span><span className="vd-name yel">Partially Aligned</span><span>Some claims supported, notable gaps. Mixed evidence quality.</span></div>
          <div className="verdict-doc-row"><span className="vd-score red">25–44</span><span className="vd-name red">Overextended / Evidence Gap</span><span>Claims significantly outrun visible evidence. Weak or absent support.</span></div>
          <div className="verdict-doc-row"><span className="vd-score red">0–24</span><span className="vd-name red">Inflated</span><span>Substantial claim inflation with little to no supporting evidence visible.</span></div>
        </div>

        <h2>Editorial independence</h2>
        <p>
          Payment never influences scores. Brands cannot pay for inclusion, better scores, or
          expedited review. Brands can submit requests through the Brand Portal, which gives
          them an opportunity to provide context — but editorial decisions remain independent.
        </p>
        <p>
          Automated scores are screened before public display. Scores marked &apos;Reviewed&apos; have
          undergone additional editorial review. Scores are revisited when brands update their
          marketing materially.
        </p>

        <h2>Scope and limitations</h2>
        <p>
          Sigñal reviews only publicly visible marketing — websites, product pages, and
          publicly accessible ads. We do not review internal documents, clinical trial data
          not publicly cited by the brand, or claims made in press releases unless reflected
          in consumer-facing marketing.
        </p>
        <p>
          Sigñal scores are editorial assessments, not regulatory determinations. A high
          Sigñal score does not constitute FDA approval, health endorsement, or legal
          clearance of any kind.
        </p>
      </div>
    </div>
  )
}
