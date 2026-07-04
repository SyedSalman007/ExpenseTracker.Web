import type { Metadata } from "next";
import { Manrope, Hanken_Grotesk } from "next/font/google";
import { AuthProvider } from "@/providers/AuthProvider";
import { APP_NAME } from "@/lib/constants";
import "@/styles/globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--next-font-manrope",
  display: "swap",
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--next-font-hanken",
  display: "swap",
});

export const metadata: Metadata = {
  title: APP_NAME,
  description: "Financial wellness expense tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${hankenGrotesk.variable}`}>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
