// components/Ticker.tsx
import type { Article } from '@/types/article'

export default function Ticker({ articles }: { articles: Article[] }) {
  const text = articles.map(a => a.title).join(' · ')

  return (
    <div style={{
      background: 'var(--gold)',
      padding: '6px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      overflow: 'hidden',
    }}>
      <span style={{
        fontSize: 9,
        fontWeight: 700,
        color: '#0a0a0f',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
      }}>
        Live
      </span>
      <div style={{ overflow: 'hidden', flex: 1 }}>
        <p style={{
          fontSize: 11,
          color: '#2a1f08',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {text}
        </p>
      </div>
    </div>
  )
}
