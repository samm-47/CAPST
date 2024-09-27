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
      <div className="bg-gray-100 h-16 flex items-center justify-center px-8">
        <Link href="/" passHref>
          <Image
            src="/green_expectations_logo.png"
            alt="Green Expectations Logo"
            width={50}
            height={50}
            className="transition hover:grayscale hover:brightness-90"
            priority
          />
        </Link>
      </div>

      {/* Main content area */}
      <main>
        {children}
      </main>
    </div>
  );
}
