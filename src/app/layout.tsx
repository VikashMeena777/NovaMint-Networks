import type { Metadata } from "next";
import { Outfit, Inter, JetBrains_Mono, Syne } from "next/font/google";
import { Header, Footer } from "@/components/layout";
import { DynamicBackground } from "@/components/animations";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NovaMint Networks | AI Automation & Content Creation Agency",
    template: "%s | NovaMint Networks",
  },
  description:
    "Premium AI Automation, Video Editing, and Content Creation Services. Transform your content empire with battle-tested automation systems designed for serious creators.",
  keywords: [
    "AI automation",
    "video editing",
    "content creation",
    "social media management",
    "Instagram reels",
    "YouTube automation",
    "n8n workflows",
    "digital products",
  ],
  authors: [{ name: "NovaMint Networks" }],
  creator: "NovaMint Networks",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://novamintnetworks.in",
    siteName: "NovaMint Networks",
    title: "NovaMint Networks | AI Automation & Content Creation Agency",
    description:
      "Premium AI Automation, Video Editing, and Content Creation Services. Transform your content empire with battle-tested automation systems.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NovaMint Networks",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NovaMint Networks | AI Automation & Content Creation Agency",
    description:
      "Premium AI Automation, Video Editing, and Content Creation Services.",
    images: ["/og-image.png"],
    creator: "@novamintnet",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${outfit.variable} ${inter.variable} ${jetbrainsMono.variable} ${syne.variable} font-sans antialiased`}
      >
        <AuthProvider>
          <CartProvider>
            {/* Lightweight static background */}
            <DynamicBackground />

            <Header />
            <main className="min-h-screen pt-16 md:pt-20">{children}</main>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
