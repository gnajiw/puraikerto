import type { Metadata } from "next"
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/layout/Navbar"

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: "700",
})

export const metadata: Metadata = {
  title: "Puraikerto.my.id - Pusat Informasi AI Purwokerto & Berita Lokal Banyumas",
  description:
    "Pusat informasi ekosistem Artificial Intelligence Purwokerto & agregasi berita lokal Kabupaten Banyumas dalam satu platform.",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${plusJakarta.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
