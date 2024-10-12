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

        {/* Add the Font Awesome CSS link */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </head>
      <body>
        {/* Global structure that wraps all pages */}
        {children}
      </body>
    </html>
  );
}
