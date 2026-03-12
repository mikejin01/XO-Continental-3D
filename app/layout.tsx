import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "X.O. Continental",
  description: "Custom-coded 3D-inspired landing page rebuild for X.O. Continental.",
  icons: {
    icon: "images/XO-Logo.avif",
    shortcut: "images/XO-Logo.avif",
    apple: "images/XO-Logo.avif",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
