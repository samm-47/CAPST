// app/faq/faq_layout.tsx
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
      <div className="bg-white h-14 flex items-center justify-start px-8 sticky top-0 z-50 shadow-md"> {/* z-index deals with what elements eppear on top of others */}
        <Link href="/" passHref>
          <Image
            src="/green_expectations_logo.png"
            alt="Green Expectations Logo"
            width={35}
            height={35}
            className="transition hover:grayscale hover:brightness-90"
            priority
          />
        </Link>
        {/* Create a multi-line entry for Green Expectations nav like they have on  their site */}
        <div className="leading-tight">{/* this wraps the text  */}
          <span className="ml-2 block text-med font-semibold">Green</span> {/* span is an inline element  */}
          <span className="ml-2 text-med">Expectations</span>{/* span is an inline element  */}
        </div>

      </div>

      {/* Main content area */}
      <main>{children}</main>
    </div>
  );
}
