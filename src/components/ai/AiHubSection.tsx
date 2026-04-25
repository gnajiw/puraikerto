"use client"

import {
  FolderOpen,
  Newspaper,
  Wrench,
  Calendar,
  Pen,
  Bot,
  ArrowRight,
} from "lucide-react"

const hubItems = [
  {
    icon: FolderOpen,
    title: "AI Directory",
    desc: "Database startup, peneliti, dan komunitas AI di Purwokerto & sekitarnya.",
    meta: "12 Startup · 5 Komunitas",
  },
  {
    icon: Newspaper,
    title: "AI News Feed",
    desc: "Berita terkini seputar perkembangan AI development lokal & nasional.",
    meta: "Update Harian",
  },
  {
    icon: Wrench,
    title: "AI Tools Lokal",
    desc: "Showcase aplikasi dan tools AI yang dikembangkan warga Banyumas.",
    meta: "8 Tools",
  },
  {
    icon: Calendar,
    title: "Event & Workshop",
    desc: "Kalender meetup, webinar, dan pelatihan AI di kota & kabupaten.",
    meta: "3 Event Bulan Ini",
  },
  {
    icon: Pen,
    title: "Kolom Opini",
    desc: "Artikel dan opini dari praktisi serta akademisi AI UNS Soedirman.",
    meta: "Baru",
  },
  {
    icon: Bot,
    title: "PuraBot AI",
    desc: "Asisten AI yang bisa menjawab pertanyaan seputar Banyumas.",
    meta: "Tanya Sekarang",
  },
]

export function AiHubSection() {
  return (
    <section className="bg-gradient-to-b from-[rgba(14,165,233,0.08)] to-transparent border border-ai/15 rounded-xl p-4 lg:p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold flex items-center gap-2 text-ai">
          🤖 AI Hub Purwokerto
        </h2>
        <a
          href="/ai"
          className="text-xs text-text-muted hover:text-white flex items-center gap-1 transition-colors"
        >
          Lihat Semua <ArrowRight className="w-3 h-3" />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {hubItems.map((item) => (
          <div
            key={item.title}
            className="bg-dark-card border border-border rounded-lg p-4 hover:border-ai hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(14,165,233,0.15)] transition-all cursor-pointer relative overflow-hidden group"
          >
            <div className="w-9 h-9 rounded-lg bg-ai/15 flex items-center justify-center mb-2.5 group-hover:bg-ai/20 transition-colors">
              <item.icon className="w-4.5 h-4.5 text-ai" />
            </div>
            <h3 className="text-sm font-bold mb-0.5">{item.title}</h3>
            <p className="text-xs text-text-muted leading-relaxed">{item.desc}</p>
            <span className="inline-block text-[10px] text-ai bg-ai/10 px-1.5 py-0.5 rounded mt-2">
              {item.meta}
            </span>
          </div>
        ))}
      </div>

      {/* Trending */}
      <div className="flex items-center gap-2 mt-3.5 p-2.5 bg-ai/5 border border-ai/10 rounded-lg">
        <span className="text-[11px] text-ai font-semibold whitespace-nowrap">🔥 Trending:</span>
        {["NLP", "Computer Vision", "Generatif AI", "LLM", "Drone AI"].map(
          (tag) => (
            <span
              key={tag}
              className="text-[11px] text-text-muted bg-dark-card border border-border px-1.5 py-0.5 rounded"
            >
              {tag}
            </span>
          )
        )}
      </div>
    </section>
  )
}
