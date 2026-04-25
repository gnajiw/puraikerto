// components/Navbar.tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { label: 'Terkini',   href: '/' },
  { label: 'Model AI',  href: '/?kategori=Model AI' },
  { label: 'Industri',  href: '/?kategori=Industri' },
  { label: 'Riset',     href: '/?kategori=Riset' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header style={{ borderBottom: '0.5px solid var(--border)', position: 'sticky', top: 0, zIndex: 50, background: 'var(--bg)' }}>
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 24px', maxWidth: 1100, margin: '0 auto',
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
          <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: -0.5, color: '#f0ede6' }}>
            Purai
          </span>
          <span style={{
            width: 5, height: 5, background: 'var(--gold)', borderRadius: '50%',
            display: 'inline-block', margin: '0 1px 2px',
          }} />
          <span style={{ fontSize: 18, fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: '#c8b89a' }}>
            kerto
          </span>
        </Link>

        {/* Nav links */}
        <ul style={{ display: 'flex', gap: 20, listStyle: 'none', margin: 0, padding: 0 }}>
          {NAV.map(item => (
            <li key={item.href}>
              <Link
                href={item.href}
                style={{
                  fontSize: 11,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: pathname === item.href ? 'var(--gold)' : 'var(--text-muted)',
                  transition: 'color 0.2s',
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Badge */}
        <span style={{
          fontSize: 10, background: 'var(--gold)', color: '#0a0a0f',
          padding: '3px 10px', borderRadius: 20, fontWeight: 700,
          letterSpacing: '0.05em',
        }}>
          Purwokerto
        </span>
      </nav>
    </header>
  )
}
