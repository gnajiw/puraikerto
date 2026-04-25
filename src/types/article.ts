// types/article.ts

export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  cover_url: string | null
  read_time: number
  published: boolean
  created_at: string
  updated_at: string
}

export type ArticleInsert = Omit<Article, 'id' | 'created_at' | 'updated_at' | 'published'> & {
  published?: boolean
}

export const CATEGORIES = [
  'Terkini',
  'Model AI',
  'Industri',
  'Riset',
  'Open Source',
  'Hardware',
  'Regulasi',
  'Tools',
  'Agen AI',
  'Lokal',
  'Tentang',
] as const

export type Category = typeof CATEGORIES[number]
