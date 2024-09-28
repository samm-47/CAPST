// app/layout.server.tsx
import React from "react";
import type { Metadata } from "next";
import "./globals.css";

// Metadata for the application
export const metadata: Metadata = {
  title: "Green Expectations",
  description: "Empowering Communities through green initiatives",
  keywords: "sustainability, eco-friendly, solutions, housing",
  robots: "index, follow",
};

export default function ServerLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Green Expectations website" />
        <link rel="icon" href="/green_expectations_logo.png" />
      </head>
      <body>
        {/* Global structure that wraps all pages */}
        {children}
      </body>
    </html>
  );
}
