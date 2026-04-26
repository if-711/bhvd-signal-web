const API = process.env.NEXT_PUBLIC_API_URL ?? "https://bhvd-signal-api.fly.dev";

export async function getMarketSignals() {
  const res = await fetch(`${API}/api/market-signals`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch market signals");
  return res.json();
}

export async function getLeaderboard(category?: string) {
  const url = category
    ? `${API}/api/leaderboard?category=${encodeURIComponent(category)}`
    : `${API}/api/leaderboard`;
  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error("Failed to fetch leaderboard");
  return res.json();
}

export async function getBrandReport(domain: string) {
  const res = await fetch(`${API}/api/domain/${encodeURIComponent(domain)}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error("Brand not found");
  return res.json();
}

export async function getCategories() {
  const res = await fetch(`${API}/api/categories`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function submitEvent(event: string, domain?: string) {
  return fetch(`${API}/api/event`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, domain }),
  }).catch(() => {});
}

export async function submitCapture(payload: {
  email: string;
  type: string;
  domain?: string;
  brand_name?: string;
}) {
  const res = await fetch(`${API}/api/capture`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Submission failed");
  return res.json();
}

export async function queueBrand(payload: { domain: string; brand_name?: string }) {
  const res = await fetch(`${API}/api/queue`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Queue failed");
  return res.json();
}
