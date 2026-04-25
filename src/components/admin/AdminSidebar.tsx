"use client"

import Link from "next/link"
import { LayoutDashboard, FileText, Users, Calendar, MessageSquare, Briefcase, Cpu, LogOut } from "lucide-react"
import { createClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export function AdminSidebar({ role }: { role: string }) {
  const supabase = createClient()
  const router = useRouter()

  const menu = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/berita", label: "Berita", icon: FileText },
    { href: "/admin/ai", label: "AI Directory", icon: Cpu },
    { href: "/admin/event", label: "Event", icon: Calendar },
    { href: "/admin/forum", label: "Forum", icon: MessageSquare },
    { href: "/admin/jobs", label: "Lowongan", icon: Briefcase },
    ...(role === "admin" ? [{ href: "/admin/users", label: "Users", icon: Users }] : []),
  ]

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-56 bg-dark-card border-r border-border z-40 overflow-y-auto">
      <div className="p-3 border-b border-border">
        <p className="text-xs text-text-muted">Panel Admin</p>
        <p className="text-xs font-medium capitalize">{role}</p>
      </div>
      <nav className="p-2 space-y-0.5">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-2.5 px-3 py-2 text-sm text-text-muted hover:text-white hover:bg-card rounded-lg transition-colors"
          >
            <item.icon className="w-4 h-4" /> {item.label}
          </Link>
        ))}
      </nav>
      <div className="absolute bottom-0 left-0 right-0 p-2 border-t border-border">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-text-muted hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" /> Keluar
        </button>
      </div>
    </aside>
  )
}
