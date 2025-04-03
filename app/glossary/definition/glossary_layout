"use client"; // Add this directive at the top

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

export default function GlossaryLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Your effect code here
  }, []);

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      {/* Top navigation bar with logo */}
      <Navbar />
      {/* Main content area */}
      <main>{children}</main>
    </div>
  );
}
