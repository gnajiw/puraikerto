import { createServerSideClient } from "@/lib/supabase-server"

export default async function AdminDashboard() {
  const supabase = await createServerSideClient()

  const [{ count: articles }, { count: profiles }, { count: events }, { count: threads }] =
    await Promise.all([
      supabase.from("articles").select("*", { count: "exact", head: true }).eq("status", "published"),
      supabase.from("ai_profiles").select("*", { count: "exact", head: true }),
      supabase.from("events").select("*", { count: "exact", head: true }),
      supabase.from("forum_threads").select("*", { count: "exact", head: true }),
    ])

  const stats = [
    { label: "Artikel", value: articles ?? 0, color: "bg-news", href: "/admin/berita" },
    { label: "AI Profile", value: profiles ?? 0, color: "bg-ai", href: "/admin/ai" },
    { label: "Event", value: events ?? 0, color: "bg-purple", href: "/admin/event" },
    { label: "Forum Thread", value: threads ?? 0, color: "bg-community", href: "/admin/forum" },
  ]

  return (
    <div>
      <h1 className="text-xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <a
            key={s.label}
            href={s.href}
            className="bg-dark-card border border-border rounded-xl p-4 hover:border-ai/50 transition-colors"
          >
            <div className={`w-2.5 h-2.5 rounded-full ${s.color} mb-2`} />
            <p className="text-2xl font-extrabold">{s.value}</p>
            <p className="text-xs text-text-muted">{s.label}</p>
          </a>
        ))}
      </div>
    </div>
  )
}
