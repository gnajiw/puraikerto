"use client"

import { ArrowRight, MapPin } from "lucide-react"

const newsItems = [
  {
    category: "Pemerintahan",
    catClass: "bg-[rgba(26,95,122,0.2)] text-[#38bdf8]",
    title: "Pembangunan Jembatan Baru di Ajibarang Ditargetkan Selesai Juli",
    excerpt:
      "Proyek infrastruktur senilai Rp 12 miliar ini akan menghubungkan desa-desa di Kecamatan Ajibarang...",
    location: "Ajibarang",
    source: "Tribun Jateng",
    time: "2 jam lalu",
  },
  {
    category: "Pariwisata",
    catClass: "bg-[rgba(16,185,129,0.2)] text-[#34d399]",
    title: "Baturaden Kembali Ramai Dikunjungi Wisatawan Saat Libur Panjang",
    excerpt:
      "Kawasan wisata Baturaden mencatat kunjungan lebih dari 15 ribu wisatawan selama akhir pekan...",
    location: "Baturaden",
    source: "Radar Banyumas",
    time: "4 jam lalu",
  },
  {
    category: "Ekonomi",
    catClass: "bg-[rgba(245,158,11,0.2)] text-[#fbbf24]",
    title: "UMKM Banyumas Tumbuh 20% Berkat Program Digitalisasi",
    excerpt:
      "Dinas Koperasi dan UMKM Kabupaten Banyumas melaporkan pertumbuhan signifikan...",
    location: "Purwokerto",
    source: "Banyumas Online",
    time: "6 jam lalu",
  },
  {
    category: "Pendidikan",
    catClass: "bg-[rgba(139,92,246,0.2)] text-[#a78bfa]",
    title: "UNS Soedirman Luncurkan Program Studi Baru AI dan Data Science",
    excerpt:
      "Universitas Jenderal Soedirman resmi membuka program studi baru untuk menjawab kebutuhan...",
    location: "Purwokerto",
    source: "Detik Jateng",
    time: "8 jam lalu",
  },
  {
    category: "Cuaca",
    catClass: "bg-[rgba(100,116,139,0.2)] text-[#94a3b8]",
    title: "BMKG: Hujan Ringan Diprediksi Guyur Banyumas Sore Hari Ini",
    excerpt:
      "Masyarakat diimbau untuk membawa payung dan waspada genangan air di beberapa titik...",
    location: "Kab. Banyumas",
    source: "BMKG",
    time: "1 jam lalu",
  },
  {
    category: "Lalin",
    catClass: "bg-[rgba(255,107,53,0.2)] text-[#ff8a5c]",
    title: "Macet Panjang di Jalan Jenderal Sudirman Akibat Proyek Drainase",
    excerpt:
      "Pengendara diminta mencari jalur alternatif melalui Jalan Gerilya atau Jalan Overste...",
    location: "Purwokerto",
    source: "Lalin Banyumas",
    time: "30 menit lalu",
  },
]

export function NewsSection() {
  return (
    <section className="bg-gradient-to-b from-[rgba(245,158,11,0.06)] to-transparent border border-news/12 rounded-xl p-4 lg:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold flex items-center gap-2 text-news">
          📰 Berita Lokal Banyumas
        </h2>
        <a
          href="/berita"
          className="text-xs text-text-muted hover:text-white flex items-center gap-1 transition-colors"
        >
          Lihat Semua <ArrowRight className="w-3 h-3" />
        </a>
      </div>

      <div className="space-y-2">
        {newsItems.map((item) => (
          <div
            key={item.title}
            className="flex gap-3 p-3 bg-dark-card border border-border rounded-lg hover:border-news hover:translate-x-0.5 transition-all cursor-pointer"
          >
            <div className="w-20 h-14 rounded-lg bg-card flex-shrink-0 flex items-center justify-center text-[10px] text-text-muted">
              📸
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                <span
                  className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded ${item.catClass}`}
                >
                  {item.category}
                </span>
                <span className="text-[10px] text-text-muted">{item.time}</span>
              </div>
              <h4 className="text-sm font-semibold leading-snug truncate">
                {item.title}
              </h4>
              <div className="flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-accent" />
                <span className="text-[10px] text-text-muted">
                  {item.location} · {item.source}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
