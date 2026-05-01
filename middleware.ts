import { NextRequest, NextResponse } from "next/server";

const PASSWORD = process.env.SITE_PASSWORD ?? "signal711";
const COOKIE_NAME = "bhvd_auth";
const COOKIE_SECRET = "bhvd_signal_access_v1";

function loginPage(error = false) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Sig&#241;al &#8212; Access</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{background:#0a0c12;color:#f2f2f2;font-family:system-ui,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;-webkit-font-smoothing:antialiased}
    .card{width:100%;max-width:360px;padding:48px 40px;background:#111420;border:1px solid rgba(255,255,255,.07);border-radius:16px}
    .label{font-size:11px;letter-spacing:.16em;color:#8b93b0;text-transform:uppercase;margin-bottom:28px}
    h1{font-size:22px;font-weight:400;margin-bottom:8px}
    p{font-size:14px;color:#8b93b0;margin-bottom:28px;line-height:1.6}
    input{width:100%;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:8px;color:#f2f2f2;font-size:15px;padding:12px 14px;outline:none;transition:border-color .2s;font-family:inherit}
    input:focus{border-color:#4a78f0}
    input::placeholder{color:#4a5070}
    button{width:100%;margin-top:10px;background:#4a78f0;color:#fff;border:none;border-radius:8px;font-size:15px;font-weight:500;padding:12px;cursor:pointer;font-family:inherit;transition:background .2s}
    button:hover{background:#3a68e0}
    .err{color:#c05555;font-size:13px;margin-top:14px;text-align:center}
  </style>
</head>
<body>
  <div class="card">
    <div class="label">Sig&#241;al by BHVD</div>
    <h1>Early access</h1>
    <p>This build is password&#8209;protected.</p>
    <form method="POST" action="/_auth">
      <input type="password" name="password" placeholder="Password" autofocus/>
      <button type="submit">Enter</button>
      ${error ? '<p class="err">Incorrect password. Try again.</p>' : ""}
    </form>
  </div>
</body>
</html>`;
}

const PUBLIC_PATHS = ["/login", "/pricing", "/_auth", "/api/auth"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Auth-related routes are always public
  if (PUBLIC_PATHS.some(p => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Handle auth form submission
  if (pathname === "/_auth" && request.method === "POST") {
    const formData = await request.formData();
    const password = formData.get("password") as string;

    if (password === PASSWORD) {
      const response = NextResponse.redirect(new URL("/", request.url));
      response.cookies.set(COOKIE_NAME, COOKIE_SECRET, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });
      return response;
    }

    return new NextResponse(loginPage(true), {
      status: 401,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  // Check auth cookie
  const cookie = request.cookies.get(COOKIE_NAME);
  if (cookie?.value === COOKIE_SECRET) {
    return NextResponse.next();
  }

  // Show login page
  return new NextResponse(loginPage(false), {
    status: 401,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

export const config = {
  // Runs on everything except Next.js internals and static files
  matcher: ["/((?!_next/static|_next/image|favicon.ico|og-image.png|robots.txt|sitemap.xml).*)"],
};
