import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Statoplast | Moderna Arhitektura i Industrijska obrada metala",
  description:
    "Statoplast — Vaš partner za modernu arhitekturu i metalnu industriju. Istražite premium ALU stolariju i pivot vrata ili industrijske usluge CNC obrade i plastifikacije.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr">
      <body className="antialiased">{children}</body>
    </html>
  );
}
