import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainHeader from "@/components/MainHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IPL Dashboard",
  description: "Live scores, results, and points table for the IPL.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainHeader />
        <main className="main-container-bg">
          <div className="container mx-auto p-4 md:p-6">{children}</div>
        </main>
      </body>
    </html>
  );
}
