"use client"

import { Coffee, Briefcase, ShoppingBag, Calendar } from "lucide-react"

const communityItems = [
  {
    icon: Coffee,
    title: "Warung Kopi Digital",
    desc: "Forum diskusi bebas warga Banyumas",
    count: "1.240 thread aktif",
  },
  {
    icon: Briefcase,
    title: "Lowongan Kerja",
    desc: "Info loker Purwokerto & sekitarnya",
    count: "45 lowongan baru",
  },
  {
    icon: ShoppingBag,
    title: "Jual-Beli UMKM",
    desc: "Marketplace produk lokal Banyumas",
    count: "320 produk",
  },
  {
    icon: Calendar,
    title: "Kalender Event",
    desc: "Jadwal acara & kegiatan lokal",
    count: "12 event bulan ini",
  },
]

export function CommunitySection() {
  return (
    <section className="bg-gradient-to-b from-[rgba(16,185,129,0.06)] to-transparent border border-community/12 rounded-xl p-4 lg:p-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold flex items-center gap-2 text-community">
          👥 Komunitas & Forum
        </h2>
        <a
          href="/forum"
          className="text-xs text-text-muted hover:text-white flex items-center gap-1 transition-colors"
        >
          Lihat Semua <span>→</span>
        </a>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {communityItems.map((item) => (
          <div
            key={item.title}
            className="bg-dark-card border border-border rounded-xl p-4 text-center hover:border-community hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(16,185,129,0.1)] transition-all cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-community/15 flex items-center justify-center mx-auto mb-2">
              <item.icon className="w-5 h-5 text-community" />
            </div>
            <h3 className="text-sm font-bold mb-0.5">{item.title}</h3>
            <p className="text-[11px] text-text-muted">{item.desc}</p>
            <div className="mt-1.5 text-[11px] text-community font-semibold">
              {item.count}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
