import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sigñal — The claim quality index for wellness brands",
    template: "%s · Sigñal",
  },
  description:
    "Independent assessment of public marketing claims, visible evidence references, and claim proportionality across wellness, nutrition, and performance brands. Payment never influences scores.",
  metadataBase: new URL("https://bhvdsignal.com"),
  openGraph: {
    type: "website",
    siteName: "Sigñal by BHVD",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@bhvdsignal",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,400&family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
