import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "600", "800"],
});

export const metadata: Metadata = {
  title: "Aura Threads | Premium Drop-Shipped Streetwear",
  description: "Discover exclusive, high-quality t-shirts delivered straight to your door. Aura Threads combines premium design with seamless Apliiq fulfillment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
