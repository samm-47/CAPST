// app/faq/faq_layout.tsx
"use client"; // Mark this as a Client Component for client-side hooks

import React, { useEffect } from "react";
import localFont from "next/font/local";
import "../globals.css";

import Navbar from "../components/navbar";

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
      <Navbar/>
      {/* Main content area */}
      <main>{children}</main>
    </div>
  );
}
