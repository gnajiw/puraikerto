"use client"

import { Thermometer, MapPin, Bell } from "lucide-react"

export function QuickBar() {
  return (
    <div className="bg-dark-card border-b border-border px-4 lg:px-8 py-2.5">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-1.5 text-xs text-text-muted">
          <Thermometer className="w-4 h-4" />
          <strong className="text-white">28°C</strong> Purwokerto
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-text-muted" />
          <span className="text-xs text-text-muted">Filter Lokasi:</span>
          {["Semua", "Purwokerto", "Baturaden", "Ajibarang", "Sokaraja"].map(
            (loc) => (
              <button
                key={loc}
                className="text-xs px-2 py-0.5 rounded-full bg-card text-text-muted border border-border hover:bg-secondary hover:text-dark hover:border-secondary transition-all"
              >
                {loc}
              </button>
            )
          )}
        </div>

        <div className="flex items-center gap-1 text-xs text-text-muted">
          <Bell className="w-3.5 h-3.5" />
          <strong className="text-secondary">5</strong> berita baru
        </div>
      </div>
    </div>
  )
}
