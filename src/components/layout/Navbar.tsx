"use client"

import Link from "next/link"
import { useState } from "react"
import { Search, Menu, X } from "lucide-react"
import { useUser } from "@/lib/useUser"
import { UserMenu } from "@/components/auth/UserMenu"

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/ai", label: "AI Hub" },
  { href: "/berita", label: "Berita" },
  { href: "/forum", label: "Komunitas" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, loading } = useUser()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/95 backdrop-blur-md border-b border-border">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="text-xl font-extrabold flex items-center gap-2">
          <span className="text-secondary">Purai</span>kerto
        </Link>

        <ul className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-text-muted hover:text-white text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center bg-dark-card border border-border rounded-lg px-3 py-1.5">
            <Search className="w-4 h-4 text-text-muted mr-2" />
            <input
              type="text"
              placeholder="Cari berita, AI, event..."
              className="bg-transparent text-sm text-white outline-none w-40 placeholder:text-text-muted"
            />
          </div>

          {loading ? (
            <div className="w-20 h-8 bg-card rounded-lg animate-pulse" />
          ) : user ? (
            <UserMenu user={user} />
          ) : (
            <Link
              href="/auth"
              className="hidden md:inline-flex bg-primary hover:bg-primary/90 text-white text-sm font-semibold px-4 py-1.5 rounded-lg transition-all"
            >
              Masuk
            </Link>
          )}

          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-dark-card border-t border-border px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-text-muted hover:text-white text-sm"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/auth"
            className="block text-center bg-primary text-white text-sm font-semibold px-4 py-2 rounded-lg"
          >
            {user ? "Dashboard" : "Masuk"}
          </Link>
        </div>
      )}
    </nav>
  )
}
