export interface Kecamatan {
  id: number
  nama: string
  slug: string
  latitude: number | null
  longitude: number | null
  created_at: string
}

export interface Category {
  id: number
  name: string
  slug: string
  type: "news" | "ai" | "event" | "forum"
  color: string
  icon: string | null
  sort_order: number
  created_at: string
}

export interface NewsSource {
  id: number
  name: string
  slug: string
  website_url: string
  rss_url: string | null
  logo_url: string | null
  is_active: boolean
  fetch_interval: number
  last_fetched: string | null
  created_at: string
}

export interface User {
  id: number
  username: string
  email: string
  full_name: string
  avatar_url: string | null
  role: "admin" | "editor" | "user"
  kecamatan_id: number | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Article {
  id: number
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  featured_image: string | null
  source_id: number | null
  category_id: number | null
  kecamatan_id: number | null
  author_name: string | null
  author_id: number | null
  original_url: string | null
  published_at: string | null
  is_featured: boolean
  view_count: number
  status: "draft" | "published" | "archived"
  created_at: string
  updated_at: string
  // Joined fields
  category_name?: string
  category_slug?: string
  category_color?: string
  source_name?: string
  kecamatan_name?: string
}

export interface AIProfile {
  id: number
  name: string
  slug: string
  tagline: string | null
  description: string | null
  logo_url: string | null
  website_url: string | null
  email: string | null
  phone: string | null
  type: "startup" | "academic" | "community" | "individual"
  kecamatan_id: number | null
  address: string | null
  latitude: number | null
  longitude: number | null
  founded_year: number | null
  team_size: number | null
  is_verified: boolean
  view_count: number
  created_at: string
  updated_at: string
}

export interface AIProduct {
  id: number
  ai_profile_id: number
  name: string
  description: string | null
  image_url: string | null
  tech_stack: string[] | null
  is_active: boolean
  created_at: string
}

export interface Event {
  id: number
  title: string
  slug: string
  description: string | null
  event_type: "workshop" | "meetup" | "webinar" | "competition" | "seminar"
  category_id: number | null
  organizer_id: number | null
  ai_profile_id: number | null
  location_name: string
  address: string | null
  kecamatan_id: number | null
  latitude: number | null
  longitude: number | null
  start_datetime: string
  end_datetime: string | null
  registration_url: string | null
  max_participants: number | null
  price: number
  currency: string
  featured_image: string | null
  status: "upcoming" | "ongoing" | "completed" | "cancelled"
  created_at: string
  updated_at: string
}

export interface ForumThread {
  id: number
  title: string
  slug: string
  content: string
  user_id: number
  category_id: number | null
  kecamatan_id: number | null
  view_count: number
  reply_count: number
  is_pinned: boolean
  created_at: string
  updated_at: string
}

export interface ForumReply {
  id: number
  thread_id: number
  user_id: number
  content: string
  created_at: string
}

export interface Database {
  public: {
    Tables: {
      kecamatan: { Row: Kecamatan }
      categories: { Row: Category }
      news_sources: { Row: NewsSource }
      users: { Row: User }
      articles: { Row: Article }
      ai_profiles: { Row: AIProfile }
      ai_products: { Row: AIProduct }
      events: { Row: Event }
      forum_threads: { Row: ForumThread }
      forum_replies: { Row: ForumReply }
    }
  }
}
