"use client"

import { createClient } from "@/lib/supabase"
import { LogOut, User as UserIcon, Settings } from "lucide-react"
import { useRouter } from "next/navigation"
import type { User } from "@supabase/supabase-js"

export function UserMenu({ user }: { user: User }) {
  const supabase = createClient()
  const router = useRouter()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <div className="relative group">
      <button className="flex items-center gap-1.5 bg-dark-card border border-border rounded-lg px-2.5 py-1.5 text-sm hover:border-ai transition-colors">
        <div className="w-6 h-6 rounded-full bg-ai/20 flex items-center justify-center">
          {user.user_metadata?.avatar_url ? (
            <img src={user.user_metadata.avatar_url} className="w-6 h-6 rounded-full" />
          ) : (
            <UserIcon className="w-3.5 h-3.5 text-ai" />
          )}
        </div>
        <span className="text-xs text-white max-w-20 truncate">
          {user.email?.split("@")[0]}
        </span>
      </button>

      <div className="absolute right-0 mt-1 w-44 bg-dark-card border border-border rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
        <div className="px-3 py-2 border-b border-border">
          <p className="text-xs font-medium text-white truncate">{user.email}</p>
        </div>
        <div className="p-1">
          <a href="/admin" className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-text-muted hover:text-white hover:bg-card rounded transition-colors">
            <Settings className="w-3.5 h-3.5" /> Dashboard
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-text-muted hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Keluar
          </button>
        </div>
      </div>
    </div>
  )
}
