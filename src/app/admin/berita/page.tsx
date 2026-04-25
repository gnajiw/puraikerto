import { createServerSideClient } from "@/lib/supabase-server"
import Link from "next/link"
import { Plus, Pencil, ExternalLink } from "lucide-react"

export default async function AdminBerita() {
  const supabase = await createServerSideClient()
  const { data: articlesRaw } = await supabase
    .from("articles")
    .select("id, title, slug, status, category:categories(name), source:news_sources(name), published_at, is_featured, is_rewritten")
    .order("created_at", { ascending: false })
    .limit(50)
  const articles: any[] = articlesRaw ?? []

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Kelola Berita</h1>
        <Link
          href="/admin/berita/edit/baru"
          className="flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" /> Tulis Berita
        </Link>
      </div>

      <div className="bg-dark-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-text-muted text-xs uppercase">
                <th className="text-left px-4 py-3 font-medium">Judul</th>
                <th className="text-left px-4 py-3 font-medium">Kategori</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="text-left px-4 py-3 font-medium">Rewrite</th>
                <th className="text-left px-4 py-3 font-medium">Sumber</th>
                <th className="text-right px-4 py-3 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {articles && articles.length > 0 ? articles.map((a) => (
                <tr key={a.id} className="border-b border-border/50 hover:bg-card/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">{a.title}</span>
                      {a.is_featured && <span className="text-[10px] bg-news/20 text-news px-1.5 py-0.5 rounded">Featured</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-text-muted">{a.category?.name ?? "-"}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded ${
                      a.status === "published" ? "bg-community/20 text-community" :
                      a.status === "draft" ? "bg-news/20 text-news" : "bg-card text-text-muted"
                    }`}>{a.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    {a.is_rewritten ? (
                      <span className="text-[11px] text-community font-semibold">Ya</span>
                    ) : (
                      <span className="text-[11px] text-text-muted">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-text-muted text-xs">{a.source?.name ?? "-"}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/berita/edit/${a.slug}`} className="p-1.5 hover:bg-card rounded-lg text-text-muted hover:text-white transition-colors">
                        <Pencil className="w-3.5 h-3.5" />
                      </Link>
                      <Link href={`/berita/${a.slug}`} className="p-1.5 hover:bg-card rounded-lg text-text-muted hover:text-white transition-colors">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-text-muted text-sm">
                    Belum ada berita. Klik "Tulis Berita" untuk mulai.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
