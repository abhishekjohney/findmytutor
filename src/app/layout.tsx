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
  title: "FindMyTutor — Home Tuition by College Students in Kochi",
  description:
    "Connect with verified college student tutors near you. Affordable home tuition for CBSE, State Board, JEE, and NEET preparation in Kochi, Kerala.",
  keywords: [
    "home tuition",
    "Kochi tutor",
    "CBSE tutor",
    "college student tutor",
    "CUSAT",
    "affordable tuition",
    "Kerala",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
