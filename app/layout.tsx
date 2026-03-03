import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Serif } from "next/font/google";
import "./globals.css";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
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
      <body className={`${bricolageGrotesque.variable} ${instrumentSerif.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
