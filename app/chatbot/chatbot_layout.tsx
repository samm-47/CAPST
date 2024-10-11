// app/layout.tsx
"use client"; // Mark this as a Client Component for client-side hooks

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import localFont from "next/font/local";
import "../globals.css";

// Font setup
const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Any client-side logic can go here (e.g., analytics)
  }, []);

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      {/* Top navigation bar with logo */}
      <div className="bg-white h-16 flex items-center justify-start px-8 sticky top-0 z-50 shadow-md"> {/* z-index deals with what elements eppear on top of others */}
        <Link href="/" passHref>
          <Image
            src="/green_expectations_logo.png"
            alt="Green Expectations Logo"
            width={35}
            height={35}
            className="ml-8 transition hover:filer-coffee-green hover:brightness-90"
            priority
          />
        </Link>

        {/* Add a link to the Calculator page */}
        <Link
          href="/calculator"
          className="ml-8 font-bold text-sm uppercase tracking-wider text-black hover:text-coffee-green"
        >
          Calculator
        </Link>
        {/* Add a link to the Calculator page */}
        <Link
          href="/chatbot"
          className="ml-8 font-bold text-sm uppercase tracking-wider text-black hover:text-coffee-green"
        >
          Chatbot
        </Link>
      </div>

      {/* Main content area */}
      <main>{children}</main>
    </div>
  );
}
