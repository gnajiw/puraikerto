"use client"

import { createClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Loader2, Save, Eye, Send } from "lucide-react"

interface Props {
  slug?: string
}

export function ArticleEditor({ slug }: Props) {
  const router = useRouter()
  const supabase = createClient() as any

  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [categories, setCategories] = useState<any[]>([])
  const [kecamatan, setKecamatan] = useState<any[]>([])
  const [sources, setSources] = useState<any[]>([])

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category_id: "",
    kecamatan_id: "",
    source_id: "",
    featured_image: "",
    original_url: "",
    status: "draft" as "draft" | "published",
    is_featured: false,
  })

  useEffect(() => {
    async function load() {
      const [catRes, kecRes, srcRes] = await Promise.all([
        supabase.from("categories").select("id, name").eq("type", "news").order("sort_order"),
        supabase.from("kecamatan").select("id, nama").order("nama"),
        supabase.from("news_sources").select("id, name").eq("is_active", true),
      ])
      setCategories(catRes.data ?? [])
      setKecamatan(kecRes.data ?? [])
      setSources(srcRes.data ?? [])

      if (slug && slug !== "baru") {
        setLoading(true)
        const { data: articleRaw } = await supabase.from("articles").select("*").eq("slug", slug).single()
        const data = articleRaw as any
        if (data) {
          setForm({
            title: data.title,
            slug: data.slug,
            excerpt: data.excerpt ?? "",
            content: data.content ?? "",
            category_id: String(data.category_id ?? ""),
            kecamatan_id: String(data.kecamatan_id ?? ""),
            source_id: String(data.source_id ?? ""),
            featured_image: data.featured_image ?? "",
            original_url: data.original_url ?? "",
            status: data.status,
            is_featured: data.is_featured,
          })
        }
        setLoading(false)
      }
    }
    load()
  }, [slug])

  function autoSlug(title: string) {
    if (slug === "baru" && !form.slug) {
      setForm((f) => ({ ...f, slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") }))
    }
  }

  async function handleSave(status?: "draft" | "published") {
    setSaving(true)
    const finalStatus = status ?? form.status
    const payload = {
      ...form,
      category_id: form.category_id ? Number(form.category_id) : null,
      kecamatan_id: form.kecamatan_id ? Number(form.kecamatan_id) : null,
      source_id: form.source_id ? Number(form.source_id) : null,
      status: finalStatus,
      published_at: finalStatus === "published" ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    }

    if (slug && slug !== "baru") {
      // Update existing
      await supabase.from("articles").update(payload).eq("slug", slug)
    } else {
      const { error } = await supabase.from("articles").insert(payload)
      if (!error) {
        router.push("/admin/berita")
        return
      }
    }

    setSaving(false)
    router.refresh()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-text-muted" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">{slug === "baru" ? "Tulis Berita Baru" : "Edit Berita"}</h1>
        <div className="flex gap-2">
          <button onClick={() => handleSave("draft")} className="flex items-center gap-1.5 bg-card hover:bg-border text-white text-sm px-4 py-2 rounded-lg transition-colors">
            <Save className="w-4 h-4" /> Simpan Draft
          </button>
          <button onClick={() => handleSave("published")} className="flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-white text-sm px-4 py-2 rounded-lg transition-colors">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            {slug === "baru" ? "Terbitkan" : "Update"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* Main content */}
        <div className="space-y-4">
          <div>
            <label className="text-xs text-text-muted block mb-1">Judul Berita</label>
            <input
              value={form.title}
              onChange={(e) => { setForm({ ...form, title: e.target.value }); autoSlug(e.target.value) }}
              className="w-full bg-dark-card border border-border rounded-lg px-4 py-3 text-sm text-white outline-none focus:border-ai"
              placeholder="Masukkan judul berita..."
            />
          </div>

          <div>
            <label className="text-xs text-text-muted block mb-1">Ringkasan (excerpt)</label>
            <input
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              className="w-full bg-dark-card border border-border rounded-lg px-4 py-2 text-sm text-white outline-none focus:border-ai"
              placeholder="Ringkasan singkat berita..."
            />
          </div>

          <div>
            <label className="text-xs text-text-muted block mb-1">Konten Berita</label>
            <p className="text-[10px] text-text-muted mb-1.5">Ini berita rewrite, jadi tulis versimu sendiri.</p>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="w-full bg-dark-card border border-border rounded-lg px-4 py-3 text-sm text-white outline-none focus:border-ai font-mono leading-relaxed resize-y"
              style={{ minHeight: "300px" }}
              placeholder="Tulis konten berita disini..."
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-text-muted block mb-1">URL Gambar</label>
              <input
                value={form.featured_image}
                onChange={(e) => setForm({ ...form, featured_image: e.target.value })}
                className="w-full bg-dark-card border border-border rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-ai"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="text-xs text-text-muted block mb-1">URL Asli (sumber)</label>
              <input
                value={form.original_url}
                onChange={(e) => setForm({ ...form, original_url: e.target.value })}
                className="w-full bg-dark-card border border-border rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-ai"
                placeholder="https://..."
              />
            </div>
          </div>
        </div>

        {/* Sidebar settings */}
        <div className="space-y-4">
          <div className="bg-dark-card border border-border rounded-xl p-4 space-y-3">
            <h3 className="text-xs font-bold text-text-muted uppercase">Pengaturan</h3>
            <div>
              <label className="text-xs text-text-muted block mb-1">Slug</label>
              <input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full bg-dark border border-border rounded-lg px-3 py-1.5 text-sm text-white outline-none focus:border-ai font-mono"
              />
            </div>
            <div>
              <label className="text-xs text-text-muted block mb-1">Kategori</label>
              <select
                value={form.category_id}
                onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                className="w-full bg-dark border border-border rounded-lg px-3 py-1.5 text-sm text-white outline-none focus:border-ai"
              >
                <option value="">Pilih kategori</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-text-muted block mb-1">Kecamatan</label>
              <select
                value={form.kecamatan_id}
                onChange={(e) => setForm({ ...form, kecamatan_id: e.target.value })}
                className="w-full bg-dark border border-border rounded-lg px-3 py-1.5 text-sm text-white outline-none focus:border-ai"
              >
                <option value="">Pilih kecamatan</option>
                {kecamatan.map((k) => <option key={k.id} value={k.id}>{k.nama}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-text-muted block mb-1">Sumber Berita</label>
              <select
                value={form.source_id}
                onChange={(e) => setForm({ ...form, source_id: e.target.value })}
                className="w-full bg-dark border border-border rounded-lg px-3 py-1.5 text-sm text-white outline-none focus:border-ai"
              >
                <option value="">Tidak ada (asli)</option>
                {sources.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} />
              <span className="text-text-muted text-xs">Featured</span>
            </label>
          </div>

          <div className="bg-ai/5 border border-ai/15 rounded-xl p-4">
            <h3 className="text-xs font-bold text-ai mb-1">Tips Rewrite</h3>
            <ul className="text-[11px] text-text-muted space-y-1 list-disc list-inside">
              <li>Ganti struktur kalimat</li>
              <li>Tambah konteks lokal Banyumas</li>
              <li>Pastikan fakta tetap akurat</li>
              <li>Sertakan link sumber asli</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
