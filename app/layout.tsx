import "./globals.css";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yourdomain.com"),

  title: {
    default: "Muhammad Riduan | Full-Stack Developer",
    template: "%s | Muhammad Riduan",
  },

  description:
    "Full-Stack Developer specializing in scalable APIs, cloud infrastructure, and enterprise systems.",

  keywords: [
    "Fullstack Developer",
    "Backend Developer",
    "Software Engineer",
    "Next.js Developer",
    "Cloud Engineer",
  ],

  authors: [{ name: "Muhammad Riduan" }],

  creator: "Muhammad Riduan",

  openGraph: {
    title: "Muhammad Riduan Portfolio",
    description: "Full-Stack Developer Portfolio",
    url: "https://yourdomain.com",
    siteName: "Riduan Portfolio",
    locale: "en_US",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`
          ${inter.variable}
          font-sans
          text-slate-100
          antialiased
          min-h-screen
          bg-gradient-to-b
          from-slate-950
          via-slate-900
          to-slate-950
        `}
      >
        {/* GLOBAL BACKGROUND FX */}
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
          
          {/* top glow */}
          <div className="absolute top-[-12rem] left-1/2 -translate-x-1/2 w-[50rem] h-[50rem] bg-cyan-500/10 rounded-full blur-[120px]" />

          {/* bottom glow */}
          <div className="absolute bottom-[-12rem] right-1/2 translate-x-1/2 w-[50rem] h-[50rem] bg-blue-500/10 rounded-full blur-[120px]" />

          {/* noise overlay */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')]" />
        </div>

        {/* PAGE WRAPPER */}
        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>

      </body>
    </html>
  );
}
