import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rhythm Foundation School | Best School in Sasaram, Bihar",
  description:
    "Rhythm Foundation School, Sasaram, Bihar — Learning with Joy, Growing with Values. Nursery to Class 10. Enrol now for 2026-27 admissions.",
  keywords: [
    "school in Sasaram",
    "best school Sasaram Bihar",
    "Rhythm Foundation School",
    "admission 2026 Sasaram",
    "primary school Rohtas",
    "nursery to class 10 Sasaram",
    "CBSE school Sasaram",
  ],
  openGraph: {
    title: "Rhythm Foundation School | Sasaram, Bihar",
    description: "Learning with Joy, Growing with Values. Admissions open for 2026-27.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={nunito.variable}>
      <body className={`${nunito.className} antialiased bg-white`}>{children}</body>
    </html>
  );
}
