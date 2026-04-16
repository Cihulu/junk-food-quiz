import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "假如你是一种垃圾食品",
  description: "反正都是垃圾食品，你是哪种美味的垃圾呢？",
  openGraph: {
    title: "假如你是一种垃圾食品",
    description: "反正都是垃圾食品，你是哪种美味的垃圾呢？",
    url: "https://cihulu.store",
    images: [{ url: "https://cihulu.store/og-image.png", width: 800, height: 800 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
