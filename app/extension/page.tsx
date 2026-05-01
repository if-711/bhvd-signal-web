import Link from 'next/link'

export default function ExtensionPage() {
  return (
    <div className="page-wrap">
      <div className="page-header">
        <div className="section-label">Browser Extension</div>
        <h1 className="page-h1">Sigñal for Chrome</h1>
        <p className="page-sub">
          See signal scores while you browse — on product pages, checkout flows, and brand sites.
        </p>
      </div>

      <div className="ext-mockup">
        <div className="ext-browser">
          <div className="ext-traffic">
            <span style={{ background: '#ff5f57' }} />
            <span style={{ background: '#febc2e' }} />
            <span style={{ background: '#28c840' }} />
          </div>
          <div className="ext-url-bar">ritual.com/products/essential-for-women</div>
        </div>
        <div className="ext-popup-preview">
          <div className="ext-popup-header">
            <span className="ext-popup-logo">Sigñal</span>
            <span className="ext-popup-domain">ritual.com</span>
          </div>
          <div className="ext-popup-score" style={{ color: '#1e9459' }}>79</div>
          <div className="ext-popup-verdict" style={{ color: '#1e9459' }}>Aligned</div>
          <div className="ext-popup-cta">View full report →</div>
        </div>
      </div>

      <div className="how-grid">
        <div className="how-card">
          <div className="how-num">01</div>
          <h3>Automatic detection</h3>
          <p>The extension detects brand domains as you browse and fetches the Sigñal score in the background — no manual lookup required.</p>
        </div>
        <div className="how-card">
          <div className="how-num">02</div>
          <h3>Instant score overlay</h3>
          <p>A small signal indicator appears on scored brands. Click to see the full breakdown without leaving the page.</p>
        </div>
        <div className="how-card">
          <div className="how-num">03</div>
          <h3>Request unscored brands</h3>
          <p>If a brand hasn&apos;t been scored yet, the extension lets you request it with one click. We track demand to prioritize our review queue.</p>
        </div>
        <div className="how-card">
          <div className="how-num">04</div>
          <h3>Privacy-first</h3>
          <p>The extension only sends the domain of the site you&apos;re on — never your full URL, browsing history, or personal data.</p>
        </div>
      </div>

      <div className="ext-install">
        <Link href="https://chrome.google.com/webstore" className="btn-primary" target="_blank" rel="noopener noreferrer">
          Add to Chrome — Free
        </Link>
        <div className="ext-note">Chrome Web Store · No account required</div>
      </div>

      <div className="ext-faq">
        <div className="section-label">FAQ</div>
        <div className="faq-list">
          <details className="faq-item">
            <summary className="faq-q">Is the extension free?</summary>
            <div className="faq-a">Yes. The browser extension is free and always will be. All public Sigñal scores are free to access.</div>
          </details>
          <details className="faq-item">
            <summary className="faq-q">Which browsers are supported?</summary>
            <div className="faq-a">Chrome and Chromium-based browsers (Brave, Edge, Arc) are supported now. Firefox support is planned.</div>
          </details>
          <details className="faq-item">
            <summary className="faq-q">What data does the extension collect?</summary>
            <div className="faq-a">Only the domain of the current site is sent to the Sigñal API to look up a score. No URLs, no browsing history, no personal data.</div>
          </details>
          <details className="faq-item">
            <summary className="faq-q">Does the extension affect page performance?</summary>
            <div className="faq-a">No. The score lookup is a single lightweight API call made after the page loads. It has no effect on page rendering.</div>
          </details>
        </div>
      </div>
    </div>
  )
}
