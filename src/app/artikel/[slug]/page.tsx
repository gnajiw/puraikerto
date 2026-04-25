// app/artikel/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getArticleBySlug, getRelatedArticles, formatDate, getAllArticles } from '@/lib/articles'
import Navbar from '@/components/Navbar'
import ArticleCard from '@/components/ArticleCard'
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const articles = await getAllArticles()
  return articles.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug)
  if (!article) return { title: 'Artikel tidak ditemukan' }
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.cover_url ? [article.cover_url] : [],
    },
  }
}

// Markdown-to-HTML sederhana (tanpa library berat)
function renderMarkdown(md: string): string {
  return md
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    .replace(/^(?!<[h2h3ulliblockquote]).+$/gm, '<p>$&</p>')
    .replace(/<p><\/p>/g, '')
    .replace(/\n{2,}/g, '')
}

export const revalidate = 60

export default async function ArticlePage({ params }: Props) {
  const article = await getArticleBySlug(params.slug)
  if (!article) notFound()

  const related = await getRelatedArticles(article.category, article.slug)
  const html = renderMarkdown(article.content)

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* BREADCRUMB */}
        <div style={{ padding: '16px 24px', borderBottom: '0.5px solid var(--border)' }}>
          <span style={{ fontSize: 11, color: 'var(--text-dim)' }}>
            <Link href="/" style={{ color: 'var(--text-muted)' }}>Beranda</Link>
            {' / '}
            <span className="tag">{article.category}</span>
          </span>
        </div>

        {/* ARTICLE */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px' }}>

          {/* Main content */}
          <article style={{
            padding: '40px 48px 60px 24px',
            borderRight: '0.5px solid var(--border)',
          }}>
            {/* Header */}
            <div style={{ marginBottom: 32 }}>
              <h1 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 30,
                fontWeight: 600,
                lineHeight: 1.3,
                color: '#f0ede6',
                marginBottom: 16,
              }}>
                {article.title}
              </h1>
              <p style={{
                fontSize: 16,
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                lineHeight: 1.6,
                marginBottom: 20,
              }}>
                {article.excerpt}
              </p>
              <div style={{
                display: 'flex',
                gap: 16,
                fontSize: 11,
                color: 'var(--text-dim)',
                paddingBottom: 24,
                borderBottom: '0.5px solid var(--border)',
              }}>
                <span>{formatDate(article.created_at)}</span>
                <span>·</span>
                <span>{article.read_time} menit baca</span>
                <span>·</span>
                <span>Puraikerto</span>
              </div>
            </div>

            {/* Cover image */}
            {article.cover_url && (
              <div style={{ marginBottom: 32, borderRadius: 6, overflow: 'hidden' }}>
                <img
                  src={article.cover_url}
                  alt={article.title}
                  style={{ width: '100%', height: 300, objectFit: 'cover' }}
                />
              </div>
            )}

            {/* Body */}
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </article>

          {/* Sidebar */}
          <aside style={{ padding: '32px 24px 0' }}>
            {related.length > 0 && (
              <>
                <p style={{
                  fontSize: 9, fontWeight: 700, letterSpacing: '0.15em',
                  textTransform: 'uppercase', color: 'var(--text-muted)',
                  marginBottom: 16,
                }}>
                  Artikel Terkait
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {related.map(a => (
                    <Link key={a.id} href={`/artikel/${a.slug}`} style={{
                      display: 'block',
                      paddingBottom: 16,
                      marginBottom: 16,
                      borderBottom: '0.5px solid var(--border)',
                    }}>
                      <span className="tag" style={{ marginBottom: 8, display: 'inline-block' }}>{a.category}</span>
                      <p style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 13,
                        lineHeight: 1.5,
                        color: '#ccc9c1',
                        fontWeight: 600,
                        marginBottom: 6,
                      }}>
                        {a.title}
                      </p>
                      <span style={{ fontSize: 10, color: 'var(--text-dim)' }}>
                        {formatDate(a.created_at)} · {a.read_time} mnt
                      </span>
                    </Link>
                  ))}
                </div>
              </>
            )}

            {/* Back to home */}
            <Link href="/" style={{
              display: 'inline-block',
              marginTop: 24,
              fontSize: 11,
              color: 'var(--gold)',
              letterSpacing: '0.05em',
            }}>
              ← Kembali ke Beranda
            </Link>
          </aside>
        </div>

        {/* Footer */}
        <footer style={{
          padding: '20px 24px',
          borderTop: '0.5px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <span style={{ fontSize: 11, color: 'var(--text-dim)' }}>
            Kecerdasan buatan · dari{' '}
            <span style={{ color: 'var(--gold)', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
              Purwokerto
            </span>{' '}
            untuk dunia
          </span>
          <span style={{ fontSize: 11, color: 'var(--text-dim)' }}>puraikerto.my.id</span>
        </footer>
      </main>

      <style>{`
        .hover-bg:hover { background: var(--bg-hover) !important; }
      `}</style>
    </>
  )
}
