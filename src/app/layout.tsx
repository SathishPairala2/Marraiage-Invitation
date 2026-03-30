import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes, Lora } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  weight: "400",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Saritha & Sravan Kumar | Wedding Invitation",
  description: "Join us in celebrating our wedding on April 2, 2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${greatVibes.variable} ${lora.variable} scroll-smooth antialiased`}
    >
      <body className="font-sans bg-theater-cream text-theater-red min-h-screen flex flex-col">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
