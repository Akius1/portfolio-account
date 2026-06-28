import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import Loader from "@/components/ui/Loader";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Andrew Urom - Senior Frontend Engineer",
  description:
    "Andrew Urom - Senior Frontend Engineer based in Lagos, Nigeria. 6+ years building TypeScript and React products at Interswitch Group, Access Bank, and Africa Prudential.",
  keywords:
    "Andrew Urom, andrewurom, Senior Frontend Engineer, React Developer Nigeria, TypeScript Engineer",
  authors: [{ name: "Andrew Urom" }],
  metadataBase: new URL("https://andrewurom.com"),
  openGraph: {
    type: "website",
    title: "Andrew Urom — Senior Frontend Engineer",
    description:
      "6+ years crafting high-performance TypeScript & React products at scale.",
    images: ["/assets/images/andrew-profile.jpg"],
    url: "https://andrewurom.com",
    siteName: "Andrew Urom Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Andrew Urom — Senior Frontend Engineer",
    description: "6+ years building TypeScript & React products at scale.",
    images: ["/assets/images/andrew-profile.jpg"],
  },
  verification: {
    google: "xS4zK-gxsOKfrW_BrtSLLys1HXFlmJq0LurTr_6F7rY",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#141412" />
      </head>
      <body>
        <CustomCursor />
        <Loader />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Andrew Urom",
              url: "https://andrewurom.com",
              image: "https://andrewurom.com/assets/images/andrew-profile.jpg",
              jobTitle: "Senior Frontend Engineer",
              worksFor: { "@type": "Organization", name: "Interswitch Group" },
              address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
              email: "andrewurom@gmail.com",
              sameAs: [
                "https://linkedin.com/in/andrew-urom",
                "https://github.com/Akius1",
              ],
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };`,
          }}
        />
        <script defer src="/_vercel/insights/script.js" />
      </body>
    </html>
  );
}
