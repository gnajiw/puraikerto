"use client"

import {
  TrendingUp,
  CloudSun,
  Users,
  Mail,
  ArrowRight,
  Thermometer,
  Droplets,
  Wind,
} from "lucide-react"

const popularNews = [
  { rank: 1, title: "Pembangunan Jembatan Baru di Ajibarang", views: "2.4k", top: true },
  { rank: 2, title: "Baturaden Kembali Ramai Dikunjungi Wisatawan", views: "1.8k", top: false },
  { rank: 3, title: "UMKM Banyumas Tumbuh 20%", views: "1.2k", top: false },
  { rank: 4, title: "UNS Luncurkan Prodi AI dan Data Science", views: "980", top: false },
  { rank: 5, title: "Macet di Jalan Sudirman Akibat Proyek", views: "720", top: false },
]

export function Sidebar() {
  return (
    <div className="space-y-4">
      {/* Popular */}
      <div className="bg-dark-card border border-border rounded-xl overflow-hidden">
        <div className="bg-news text-white px-4 py-2.5 flex items-center gap-2 text-sm font-bold">
          <TrendingUp className="w-4 h-4" /> Populer
        </div>
        <div className="px-4 py-2">
          {popularNews.map((item) => (
            <div
              key={item.rank}
              className="flex gap-2.5 py-2.5 border-b border-border last:border-0 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div
                className={`w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  item.top
                    ? "bg-news text-dark"
                    : "bg-card text-text-muted"
                }`}
              >
                {item.rank}
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="text-xs font-semibold leading-snug">{item.title}</h5>
                <span className="text-[10px] text-text-muted">{item.views} dilihat</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weather */}
      <div className="bg-dark-card border border-border rounded-xl overflow-hidden">
        <div className="bg-ai text-white px-4 py-2.5 flex items-center gap-2 text-sm font-bold">
          <CloudSun className="w-4 h-4" /> Cuaca Hari Ini
        </div>
        <div className="px-4 py-3 text-center">
          <div className="text-3xl font-extrabold text-ai">28°C</div>
          <div className="text-xs text-text-muted mt-1">Cerah Berawan</div>
          <div className="grid grid-cols-2 gap-2 mt-3">
            {[
              { label: "Kelembaban", value: "72%", icon: Droplets },
              { label: "Angin", value: "12 km/h", icon: Wind },
              { label: "UV Index", value: "5 Sedang", icon: Thermometer },
              { label: "Jarak Pandang", value: "10 km", icon: CloudSun },
            ].map((d) => (
              <div
                key={d.label}
                className="bg-dark p-2 rounded text-[10px] text-text-muted"
              >
                <d.icon className="w-3 h-3 mx-auto mb-1 opacity-60" />
                <span className="block">{d.label}</span>
                <strong className="text-white text-xs">{d.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-dark-card border border-border rounded-xl overflow-hidden">
        <div className="bg-purple text-white px-4 py-2.5 flex items-center gap-2 text-sm font-bold">
          <Mail className="w-4 h-4" /> Newsletter
        </div>
        <div className="px-4 py-3">
          <p className="text-xs text-text-muted mb-2.5">
            Dapatkan update berita & event setiap minggu.
          </p>
          <input
            type="email"
            placeholder="Email kamu..."
            className="w-full text-xs bg-dark border border-border rounded-lg px-3 py-2 outline-none focus:border-purple mb-2"
          />
          <button className="w-full text-xs bg-purple hover:opacity-90 text-white font-semibold py-2 rounded-lg transition-opacity">
            Berlangganan
          </button>
        </div>
      </div>

      {/* Ad placeholder */}
      <div className="bg-gradient-to-br from-card to-dark-card border-2 border-dashed border-border rounded-lg p-6 text-center text-[10px] text-text-muted">
        🏢 Iklan
      </div>
    </div>
  )
}
