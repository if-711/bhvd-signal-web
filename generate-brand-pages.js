#!/usr/bin/env node
/**
 * Generates static SEO-optimised brand pages at /brand/[domain]/index.html
 *
 * Usage: node generate-brand-pages.js
 *
 * Fetches brand data from the API (free tier). Replaces head tags AND injects
 * a static body content block so Googlebot sees real content in the initial HTML
 * before any JavaScript executes.
 */

const fs   = require('fs');
const path = require('path');

const TEMPLATE_PATH = path.join(__dirname, 'brand', 'index.html');
const OUT_DIR       = path.join(__dirname, 'brand');
const API           = 'https://bhvd-signal-api.fly.dev';

const BRANDS = [
  'apolloneuro.com','betterhelp.com','blueprint.bryanjohnson.com','bulletproof.com',
  'calm.com','carlsonlabs.com','casper.com','cerave.com','cetaphil.com',
  'culturelle.com','cymbiotika.com','drinkag1.com','drinklmnt.com',
  'drunk-elephant.com','eightsleep.com','elemindtech.com','forhers.com',
  'forhims.com','foursigmatic.com','gaia-herbs.com','gainful.com','garmin.com',
  'getsensate.com','gnc.com','hatch.co','headspace.com','higherdose.com',
  'huel.com','hyperice.com','jarrow.com','joinzoe.com','joovv.com',
  'kachava.com','kleanathlete.com','legion.com','levels.com','lifeextension.com',
  'liquid-iv.com','megafood.com','mindlabpro.com','modernfertility.com',
  'momentouslabs.com','moonjuice.com','murad.com','myprotein.com',
  'naturemade.com','naturesway.com','neurohacker.com','neutrogena.com',
  'noom.com','nordic-naturals.com','nowfoods.com','nutrafol.com','nutrisense.io',
  'olipop.com','onnit.com','optimumnutrition.com','ouraring.com',
  'paulaschoice.com','plunge.com','poppi.com','pureencapsulations.com',
  'pureforyou.com','ritual.com','ro.co','rxbar.com','seed.com',
  'skinceuticals.com','sleepnumber.com','solgar.com','tatcha.com',
  'theordinary.com','therabody.com','thorne.com','transparentlabs.com',
  'vitalproteins.com','wakingup.com','whoop.com',
];

function esc(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function truncate(str, max) {
  if (!str) return '';
  str = str.replace(/\s+/g, ' ').trim();
  return str.length <= max ? str : str.slice(0, max - 1) + '…';
}

function signalColor(signal) {
  if (signal === 'green') return '#1e9459';
  if (signal === 'red')   return '#9e3028';
  return '#c07718';
}

function signalBg(signal) {
  if (signal === 'green') return 'rgba(30,148,89,0.12)';
  if (signal === 'red')   return 'rgba(158,48,40,0.12)';
  return 'rgba(192,119,24,0.12)';
}

function signalLabel(signal) {
  if (signal === 'green') return 'Green — Strong Evidence Alignment';
  if (signal === 'red')   return 'Red — Significant Evidence Gaps';
  return 'Yellow — Partial Evidence Alignment';
}

function categoryLabel(cat) {
  const map = {
    supplements: 'Dietary Supplements', skincare: 'Skincare', wearables: 'Wearables',
    recovery_devices: 'Recovery Devices', sleep_aids: 'Sleep', neurotech: 'Neurotech',
    fitness: 'Fitness', mental_wellness: 'Mental Wellness', functional_food: 'Functional Food',
  };
  return map[cat] || 'Wellness';
}

async function fetchBrand(domain) {
  const res = await fetch(`${API}/api/domain/${encodeURIComponent(domain)}`);
  if (!res.ok) return null;
  const json = await res.json();
  return json && json.data ? json.data : null;
}

function buildStaticBody(domain, data, title, description, canonical) {
  if (!data || !data.score) return '';

  const brandName   = data.brand_name || domain.replace(/\.(com|co|io|net|org)$/, '');
  const score       = data.score;
  const verdict     = data.verdict || '';
  const signal      = data.signal || 'yellow';
  const category    = data.category || 'wellness';
  const why         = data.why_this_verdict ? truncate(data.why_this_verdict, 300) : '';
  const lastScored  = data.last_scored_at
    ? new Date(data.last_scored_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : '';

  // Top claims from claim_snapshots
  const claims = Array.isArray(data.claim_snapshots)
    ? data.claim_snapshots.slice(0, 4)
    : [];

  const claimsHtml = claims.length > 0
    ? `<ul style="margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:8px">${
        claims.map(c => `<li style="font-size:13px;color:#8b93b0;padding:10px 14px;background:#111420;border-radius:8px;border:1px solid rgba(255,255,255,0.07);line-height:1.5">${esc(c.text || c)}</li>`).join('')
      }</ul>`
    : '';

  const claimsSection = claimsHtml
    ? `<div style="margin-top:28px"><h2 style="font-size:13px;font-family:'DM Mono',monospace;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:#4a5070;margin-bottom:12px">Top Claims Reviewed</h2>${claimsHtml}</div>`
    : '';

  const whySection = why
    ? `<div style="margin-top:24px;padding:16px 18px;background:#111420;border:1px solid rgba(255,255,255,0.07);border-radius:10px"><p style="font-size:13px;color:#8b93b0;line-height:1.6;margin:0">${esc(why)}</p></div>`
    : '';

  const dateSection = lastScored
    ? `<p style="font-size:11px;color:#4a5070;font-family:'DM Mono',monospace;letter-spacing:.06em;margin-top:20px">Last scored: ${lastScored}</p>`
    : '';

  return `
<div id="seo-static" style="max-width:820px;margin:0 auto;padding:100px 32px 48px;font-family:'DM Sans',system-ui,sans-serif">
  <nav style="position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:0 48px;height:56px;background:rgba(10,12,18,0.94);border-bottom:1px solid rgba(255,255,255,0.07)">
    <a href="/" style="font-family:'DM Mono',monospace;font-size:13px;font-weight:500;letter-spacing:.08em;color:#f2f2f2;text-decoration:none">NORM</a>
    <a href="/leaderboard" style="font-size:13px;color:#8b93b0;text-decoration:none">Leaderboard</a>
  </nav>
  <p style="font-size:11px;font-family:'DM Mono',monospace;color:#4a5070;letter-spacing:.08em;text-transform:uppercase;margin-bottom:12px">
    <a href="/" style="color:#4a5070;text-decoration:none">NORM</a> / <a href="/leaderboard" style="color:#4a5070;text-decoration:none">${esc(categoryLabel(category))}</a> / ${esc(brandName)}
  </p>
  <h1 style="font-size:28px;font-weight:400;color:#f2f2f2;line-height:1.25;margin-bottom:8px;font-family:'Instrument Serif',Georgia,serif">${esc(brandName)} Evidence Score</h1>
  <p style="font-size:14px;color:#8b93b0;margin-bottom:28px;line-height:1.5">${esc(description)}</p>
  <div style="display:flex;align-items:center;gap:20px;flex-wrap:wrap;margin-bottom:24px">
    <div style="display:flex;align-items:baseline;gap:6px">
      <span style="font-size:56px;font-weight:700;color:#f2f2f2;line-height:1;font-family:'DM Mono',monospace">${score}</span>
      <span style="font-size:18px;color:#4a5070;font-family:'DM Mono',monospace">/100</span>
    </div>
    <div>
      <div style="font-size:14px;font-weight:500;color:#f2f2f2;margin-bottom:4px">${esc(verdict)}</div>
      <div style="font-size:12px;padding:4px 10px;border-radius:6px;display:inline-block;background:${signalBg(signal)};color:${signalColor(signal)};font-family:'DM Mono',monospace;letter-spacing:.06em">${signalLabel(signal)}</div>
    </div>
  </div>
  ${whySection}
  ${claimsSection}
  ${dateSection}
  <div style="margin-top:32px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.07)">
    <p style="font-size:12px;color:#4a5070;line-height:1.6">NORM independently scores wellness brand claims against publicly visible evidence. Scores are not influenced by brand payments. <a href="/methodology" style="color:#4a78f0;text-decoration:none">How scoring works →</a></p>
  </div>
</div>
<script>document.getElementById('seo-static').style.display='none';</script>`;
}

async function generatePage(domain, template) {
  const data = await fetchBrand(domain);

  const brandName = (data && data.brand_name) || domain.replace(/\.(com|co|io|net|org)$/, '');
  const score     = (data && data.score)   || '';
  const verdict   = (data && data.verdict) || '';
  const signal    = (data && data.signal)  || 'yellow';
  const category  = (data && data.category) || 'wellness';
  const signalWord = signal === 'green' ? 'Green' : signal === 'red' ? 'Red' : 'Yellow';

  const title  = score
    ? `${brandName} Evidence Score — NORM | ${score}/100 · ${verdict}`
    : `${brandName} Brand Claim Analysis — NORM`;

  const description = score
    ? truncate(`${brandName} scores ${score}/100 on the NORM evidence index. Signal: ${signalWord}. Verdict: ${verdict}. Independent claim-evidence analysis — updated weekly.`, 160)
    : truncate(`Independent claim-evidence analysis for ${brandName}. NORM measures whether a brand's marketing claims are backed by visible evidence.`, 160);

  const canonical = `https://trynorm.co/brand/${domain}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    'name': `${brandName} Evidence Score`,
    'description': description,
    'datePublished': data && data.last_scored_at ? data.last_scored_at.slice(0, 10) : undefined,
    'reviewRating': score ? {
      '@type': 'Rating',
      'ratingValue': score,
      'bestRating': 100,
      'worstRating': 0,
      'description': verdict,
    } : undefined,
    'author': {
      '@type': 'Organization',
      'name': 'NORM',
      'url': 'https://trynorm.co',
    },
    'itemReviewed': {
      '@type': 'Organization',
      'name': brandName,
      'url': `https://${domain}`,
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'NORM',
      'url': 'https://trynorm.co',
    },
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'NORM', 'item': 'https://trynorm.co' },
      { '@type': 'ListItem', 'position': 2, 'name': 'Leaderboard', 'item': 'https://trynorm.co/leaderboard' },
      { '@type': 'ListItem', 'position': 3, 'name': `${brandName} Evidence Score`, 'item': canonical },
    ],
  };

  const faq = score ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': `What is ${brandName}'s NORM score?`,
        'acceptedAnswer': { '@type': 'Answer', 'text': `${brandName} scores ${score}/100 on the NORM evidence index with a verdict of ${verdict}. This score reflects the alignment between the brand's marketing claims and publicly visible evidence.` },
      },
      {
        '@type': 'Question',
        'name': `Is ${brandName} evidence-backed?`,
        'acceptedAnswer': { '@type': 'Answer', 'text': `NORM independently scores ${brandName} as ${verdict} (${score}/100). The score evaluates claim specificity, evidence presence, evidence strength, mechanism plausibility, consumer distortion, and effect reality across publicly visible brand materials.` },
      },
      {
        '@type': 'Question',
        'name': `How does NORM score ${brandName}?`,
        'acceptedAnswer': { '@type': 'Answer', 'text': `NORM captures publicly visible brand claims from ${brandName}'s website, marketing, and cited evidence. An editorial pipeline scores each claim across 6 dimensions. Scores are not influenced by brand payments. See trynorm.co/methodology for full details.` },
      },
    ],
  } : null;

  const staticBody = buildStaticBody(domain, data, title, description, canonical);

  let html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    .replace(
      /<meta id="meta-desc" name="description" content="[^"]*">/,
      `<meta id="meta-desc" name="description" content="${esc(description)}">`
    )
    .replace(
      /<meta id="og-title" property="og:title"\s+content="[^"]*">/,
      `<meta id="og-title" property="og:title" content="${esc(title)}">`
    )
    .replace(
      /<meta id="og-desc"\s+property="og:description"\s+content="[^"]*">/,
      `<meta id="og-desc" property="og:description" content="${esc(description)}">`
    )
    .replace(
      /<meta id="og-url"\s+property="og:url"\s+content="[^"]*">/,
      `<meta id="og-url" property="og:url" content="${canonical}">`
    )
    .replace(
      /<meta id="tw-title" name="twitter:title"\s+content="[^"]*">/,
      `<meta id="tw-title" name="twitter:title" content="${esc(title)}">`
    )
    .replace(
      /<meta id="tw-desc"\s+name="twitter:description"\s+content="[^"]*">/,
      `<meta id="tw-desc" name="twitter:description" content="${esc(description)}">`
    )
    .replace('</head>',
      `<link rel="canonical" href="${canonical}">\n` +
      `<script type="application/ld+json">${JSON.stringify(schema)}</script>\n` +
      `<script type="application/ld+json">${JSON.stringify(breadcrumb)}</script>\n` +
      (faq ? `<script type="application/ld+json">${JSON.stringify(faq)}</script>\n` : '') +
      `</head>`
    );

  // Remove duplicate canonical (template already has one)
  html = html.replace(/<link rel="canonical" href="[^"]*">\n(?=<link rel="canonical")/, '');

  // Inject static body block immediately after <body> (before JS-rendered content)
  if (staticBody) {
    html = html.replace('<body>', `<body>\n${staticBody}\n`);
  }

  const dir = path.join(OUT_DIR, domain);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf-8');

  const scoreStr = score ? `${score}/100 · ${verdict}` : 'no score yet';
  console.log(`✓ ${domain.padEnd(36)} ${scoreStr}`);
}

async function main() {
  const template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');
  console.log(`Generating ${BRANDS.length} brand pages…\n`);

  let ok = 0, fail = 0;
  for (const domain of BRANDS) {
    try {
      await generatePage(domain, template);
      ok++;
    } catch (err) {
      console.error(`✗ ${domain}: ${err.message}`);
      fail++;
    }
    await new Promise(r => setTimeout(r, 150));
  }

  console.log(`\nDone — ${ok} generated, ${fail} failed.`);
}

main().catch(console.error);
