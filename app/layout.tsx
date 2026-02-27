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
  title: "Dirac — One inbox, every conversation",
  description:
    "Dirac is an AI-native email client that unifies your inboxes and lets you manage everything through an intelligent sidebar.",
  openGraph: {
    title: "Dirac — One inbox, every conversation",
    description:
      "An AI-native email client that unifies your inboxes and lets you manage everything through an intelligent sidebar.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dirac — One inbox, every conversation",
    description:
      "An AI-native email client that unifies your inboxes and lets you manage everything through an intelligent sidebar.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
