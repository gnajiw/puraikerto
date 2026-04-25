// components/ArticleCard.tsx
import Link from 'next/link'
import type { Article } from '@/types/article'
import { formatDate } from '@/lib/articles'

interface Props {
  article: Article
  index?: number
  variant?: 'grid' | 'side' | 'hero'
}

export default function ArticleCard({ article, index, variant = 'grid' }: Props) {
  if (variant === 'side') {
    return (
      <Link href={`/artikel/${article.slug}`} style={{
        display: 'block',
        padding: '18px 20px',
        borderBottom: '0.5px solid var(--border)',
        transition: 'background 0.2s',
      }}
        className={`hover-bg article-card article-card-side`}
      >
        <span className="tag" style={{ marginBottom: 8, display: 'inline-block' }}>{article.category}</span>
        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 13,
          lineHeight: 1.5,
          color: '#d8d5ce',
          fontWeight: 600,
          marginBottom: 8,
        }}>
          {article.title}
        </p>
        <span style={{ fontSize: 10, color: 'var(--text-dim)' }}>
          {formatDate(article.created_at)} · {article.read_time} mnt
        </span>
      </Link>
    )
  }

  if (variant === 'hero') {
    return (
      <Link href={`/artikel/${article.slug}`} style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '28px 24px',
        borderRight: '0.5px solid var(--border)',
        minHeight: 260,
        position: 'relative',
        background: article.cover_url
          ? `linear-gradient(to top, rgba(10,10,15,0.95) 40%, rgba(10,10,15,0.4) 100%), url(${article.cover_url}) center/cover`
          : 'repeating-linear-gradient(45deg, rgba(212,168,83,0.03) 0px, rgba(212,168,83,0.03) 1px, transparent 1px, transparent 20px)',
      }}
        className="article-card article-card-hero hover-bg"
      >
        <span className="tag" style={{ marginBottom: 12 }}>{article.category}</span>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 20,
          fontWeight: 600,
          lineHeight: 1.35,
          color: '#f0ede6',
          marginBottom: 10,
        }}>
          {article.title}
        </h2>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>
          {article.excerpt}
        </p>
        <span style={{ fontSize: 11, color: 'var(--text-dim)' }}>
          {formatDate(article.created_at)} · {article.read_time} mnt baca
        </span>
      </Link>
    )
  }

  // grid variant
  return (
    <Link href={`/artikel/${article.slug}`} style={{
      display: 'block',
      padding: '18px 20px',
      borderRight: '0.5px solid var(--border)',
      borderBottom: '0.5px solid var(--border)',
      transition: 'background 0.2s',
    }}
      className={`hover-bg article-card article-card-grid`}
    >
      <div style={{
        fontSize: 30,
        fontWeight: 700,
        color: 'var(--gold-dim)',
        lineHeight: 1,
        marginBottom: 8,
        fontFamily: 'var(--font-serif)',
      }}>
        {String(index ?? 1).padStart(2, '0')}
      </div>
      <div className="tag" style={{ marginBottom: 8 }}>{article.category}</div>
      <p style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 13,
        lineHeight: 1.55,
        color: '#ccc9c1',
        fontWeight: 600,
        marginBottom: 10,
      }}>
        {article.title}
      </p>
      <span style={{ fontSize: 10, color: 'var(--text-dim)' }}>
        {formatDate(article.created_at)} · {article.read_time} mnt
      </span>
    </Link>
  )
}
