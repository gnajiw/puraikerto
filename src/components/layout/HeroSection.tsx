"use client"

import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative h-[400px] lg:h-[500px] flex items-center justify-center overflow-hidden mt-16"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)",
      }}
    >
      {/* Floating dots */}
      <div className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "100px 100px",
        }}
      />

      <div className="relative z-10 text-center max-w-2xl px-4 animate-in">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-secondary/30 bg-secondary/10 text-secondary text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          Portal Digital Pertama di Banyumas
        </div>

        <h1 className="text-3xl lg:text-5xl font-extrabold leading-tight mb-3">
          Purwokerto Bergerak,{" "}
          <span className="text-secondary">AI Bersama Kita</span>
        </h1>

        <p className="text-text-muted text-base lg:text-lg max-w-xl mx-auto mb-6">
          Pusat informasi ekosistem Artificial Intelligence Purwokerto & agregasi
          berita lokal Kabupaten Banyumas dalam satu platform.
        </p>

        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            href="/ai"
            className="bg-ai hover:bg-ai/90 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-all"
          >
            Eksplorasi AI
          </Link>
          <Link
            href="/berita"
            className="bg-news hover:bg-news/90 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-all"
          >
            Berita Hari Ini
          </Link>
        </div>
      </div>
    </section>
  )
}
