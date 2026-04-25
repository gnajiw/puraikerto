// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Puraikerto — Berita AI dari Purwokerto',
    template: '%s · Puraikerto',
  },
  description:
    'Portal berita kecerdasan buatan pilihan — dirangkum dari Purwokerto, untuk pembaca di mana saja.',
  metadataBase: new URL('https://puraikerto.my.id'),
  openGraph: {
    siteName: 'Puraikerto',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
