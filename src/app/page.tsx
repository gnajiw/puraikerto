// app/page.tsx
import { getAllArticles, getFeaturedArticle, getSideArticles, getGridArticles } from '@/lib/articles'
import ArticleCard from '@/components/ArticleCard'
import Navbar from '@/components/Navbar'
import Ticker from '@/components/Ticker'

export const revalidate = 60 // ISR: refresh tiap 60 detik

export default async function HomePage() {
  const [featured, sideArticles, gridArticles, allForTicker] = await Promise.all([
    getFeaturedArticle(),
    getSideArticles(),
    getGridArticles(9),
    getAllArticles(),
  ])

  return (
    <>
      <Navbar />
      <Ticker articles={allForTicker.slice(0, 6)} />

      <main style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* HERO SECTION */}
        {featured && (
          <section style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            borderBottom: '0.5px solid var(--border)',
          }}>
            <ArticleCard article={featured} variant="hero" />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {sideArticles.map(a => (
                <ArticleCard key={a.id} article={a} variant="side" />
              ))}
            </div>
          </section>
        )}

        {/* SECTION HEADER */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '16px 24px 8px',
          borderBottom: '0.5px solid var(--border)',
          gap: 12,
        }}>
          <span style={{
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
          }}>
            Berita Terbaru
          </span>
          <div style={{ flex: 1, height: '0.5px', background: 'var(--border)' }} />
        </div>

        {/* GRID */}
        <section style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
        }}>
          {gridArticles.map((a, i) => (
            <ArticleCard key={a.id} article={a} index={i + 1} variant="grid" />
          ))}
          {gridArticles.length === 0 && (
            <div style={{ gridColumn: '1/-1', padding: '60px 24px', textAlign: 'center', color: 'var(--text-dim)' }}>
              Belum ada artikel. Minta Claude untuk nulis yang pertama!
            </div>
          )}
        </section>

        {/* FOOTER */}
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
          <span style={{ fontSize: 11, color: 'var(--text-dim)' }}>
            puraikerto.my.id
          </span>
        </footer>
      </main>

      <style>{`
        .hover-bg:hover { background: var(--bg-hover) !important; }
      `}</style>
    </>
  )
}
