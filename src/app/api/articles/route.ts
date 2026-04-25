// app/api/articles/route.ts
// Endpoint untuk Claude/agent publish artikel ke Supabase
// POST /api/articles
// Header: Authorization: Bearer <PURAIKERTO_API_SECRET>

import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'
import { generateSlug } from '@/lib/articles'
import type { ArticleInsert } from '@/types/article'

const SECRET = process.env.PURAIKERTO_API_SECRET!

function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}

// POST — publish artikel baru
export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (!auth || auth !== `Bearer ${SECRET}`) return unauthorized()

  try {
    const body = await req.json()
    const { title, excerpt, content, category, cover_url, read_time } = body

    if (!title || !content || !excerpt) {
      return NextResponse.json(
        { error: 'title, excerpt, dan content wajib ada' },
        { status: 400 }
      )
    }

    const slug = body.slug ?? generateSlug(title)
    const supabase = getServiceClient()

    const article: ArticleInsert = {
      slug,
      title,
      excerpt,
      content,
      category: category ?? 'Terkini',
      cover_url: cover_url ?? null,
      read_time: read_time ?? estimateReadTime(content),
    }

    const { data, error } = await supabase
      .from('articles')
      .insert(article)
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        article.slug = `${slug}-${Date.now()}`
        const retry = await supabase.from('articles').insert(article).select().single()
        if (retry.error) throw retry.error
        return NextResponse.json({ success: true, article: retry.data }, { status: 201 })
      }
      throw error
    }

    return NextResponse.json({ success: true, article: data }, { status: 201 })
  } catch (err: any) {
    console.error('API error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// GET — list artikel (untuk debugging/agent)
export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (!auth || auth !== `Bearer ${SECRET}`) return unauthorized()

  const supabase = getServiceClient()
  const { data, error } = await supabase
    .from('articles')
    .select('id, slug, title, category, created_at, published')
    .order('created_at', { ascending: false })
    .limit(20)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ articles: data })
}

function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}
