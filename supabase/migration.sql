-- ============================================================
-- PURAIKERTO.MY.ID - SUPABASE SCHEMA MIGRATION
-- Pusat Informasi AI Purwokerto + Agregasi Berita Lokal Banyumas
-- ============================================================

-- 1. MASTER DATA
CREATE TABLE IF NOT EXISTS kecamatan (
    id SERIAL PRIMARY KEY,
    nama VARCHAR(50) NOT NULL,
    slug VARCHAR(50) NOT NULL UNIQUE,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    slug VARCHAR(50) NOT NULL UNIQUE,
    type TEXT NOT NULL DEFAULT 'news' CHECK (type IN ('news', 'ai', 'event', 'forum')),
    color VARCHAR(7) DEFAULT '#1A5F7A',
    icon VARCHAR(50),
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS news_sources (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(50) NOT NULL UNIQUE,
    website_url VARCHAR(255) NOT NULL,
    rss_url VARCHAR(255),
    logo_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    fetch_interval INT DEFAULT 60,
    last_fetched TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PROFILES (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username VARCHAR(50) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    avatar_url VARCHAR(255),
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'editor', 'user')),
    kecamatan_id INT REFERENCES kecamatan(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 3. NEWS SYSTEM
CREATE TABLE IF NOT EXISTS articles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT,
    featured_image VARCHAR(255),
    source_id INT REFERENCES news_sources(id) ON DELETE SET NULL,
    category_id INT REFERENCES categories(id) ON DELETE SET NULL,
    kecamatan_id INT REFERENCES kecamatan(id) ON DELETE SET NULL,
    author_name VARCHAR(100),
    author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    is_rewritten BOOLEAN DEFAULT FALSE,
    original_url VARCHAR(500),
    original_content TEXT,
    published_at TIMESTAMPTZ,
    is_featured BOOLEAN DEFAULT FALSE,
    view_count INT DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_articles_status ON articles(status, published_at);
CREATE INDEX idx_articles_category ON articles(category_id);
CREATE INDEX idx_articles_kecamatan ON articles(kecamatan_id);
CREATE INDEX idx_articles_featured ON articles(is_featured);

-- 4. AI DIRECTORY
CREATE TABLE IF NOT EXISTS ai_profiles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    tagline VARCHAR(255),
    description TEXT,
    logo_url VARCHAR(255),
    website_url VARCHAR(255),
    email VARCHAR(100),
    phone VARCHAR(20),
    type TEXT NOT NULL DEFAULT 'startup' CHECK (type IN ('startup', 'academic', 'community', 'individual')),
    kecamatan_id INT REFERENCES kecamatan(id) ON DELETE SET NULL,
    address TEXT,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    founded_year INT,
    team_size INT,
    is_verified BOOLEAN DEFAULT FALSE,
    view_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE ai_profiles ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS ai_products (
    id SERIAL PRIMARY KEY,
    ai_profile_id INT NOT NULL REFERENCES ai_profiles(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    tech_stack JSONB DEFAULT '[]',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE ai_products ENABLE ROW LEVEL SECURITY;

-- 5. EVENTS
CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    event_type TEXT NOT NULL DEFAULT 'workshop' CHECK (event_type IN ('workshop', 'meetup', 'webinar', 'competition', 'seminar')),
    category_id INT REFERENCES categories(id) ON DELETE SET NULL,
    organizer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    ai_profile_id INT REFERENCES ai_profiles(id) ON DELETE SET NULL,
    location_name VARCHAR(255) NOT NULL,
    address TEXT,
    kecamatan_id INT REFERENCES kecamatan(id) ON DELETE SET NULL,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    start_datetime TIMESTAMPTZ NOT NULL,
    end_datetime TIMESTAMPTZ,
    registration_url VARCHAR(255),
    max_participants INT,
    price DECIMAL(12,2) DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'IDR',
    featured_image VARCHAR(255),
    status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS event_registrations (
    id SERIAL PRIMARY KEY,
    event_id INT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    organization VARCHAR(100),
    kecamatan_id INT REFERENCES kecamatan(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'attended', 'cancelled')),
    registered_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(event_id, email)
);

ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

-- 6. COMMUNITY (FORUM)
CREATE TABLE IF NOT EXISTS forum_threads (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    content TEXT NOT NULL,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    category_id INT REFERENCES categories(id) ON DELETE SET NULL,
    kecamatan_id INT REFERENCES kecamatan(id) ON DELETE SET NULL,
    view_count INT DEFAULT 0,
    reply_count INT DEFAULT 0,
    is_pinned BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE forum_threads ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS forum_replies (
    id SERIAL PRIMARY KEY,
    thread_id INT NOT NULL REFERENCES forum_threads(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE forum_replies ENABLE ROW LEVEL SECURITY;

-- 7. JOBS
CREATE TABLE IF NOT EXISTS jobs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    company_name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT,
    location VARCHAR(100),
    kecamatan_id INT REFERENCES kecamatan(id) ON DELETE SET NULL,
    salary_min DECIMAL(12,2),
    salary_max DECIMAL(12,2),
    job_type TEXT NOT NULL DEFAULT 'fulltime' CHECK (job_type IN ('fulltime', 'parttime', 'freelance', 'internship')),
    contact_email VARCHAR(100),
    deadline DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- 8. NEWSLETTER
CREATE TABLE IF NOT EXISTS newsletters (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(100),
    kecamatan_id INT REFERENCES kecamatan(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT TRUE,
    subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE newsletters ENABLE ROW LEVEL SECURITY;

-- 9. WEATHER LOGS
CREATE TABLE IF NOT EXISTS weather_logs (
    id SERIAL PRIMARY KEY,
    kecamatan_id INT NOT NULL REFERENCES kecamatan(id) ON DELETE CASCADE,
    temperature DECIMAL(4,1) NOT NULL,
    condition VARCHAR(50) NOT NULL,
    humidity INT,
    wind_speed DECIMAL(5,2),
    recorded_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE weather_logs ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- SEED DATA
-- ============================================================

-- Kecamatan
INSERT INTO kecamatan (nama, slug, latitude, longitude) VALUES
('Purwokerto', 'purwokerto', -7.4270, 109.2424),
('Purwokerto Barat', 'purwokerto-barat', -7.4300, 109.2300),
('Purwokerto Timur', 'purwokerto-timur', -7.4200, 109.2500),
('Purwokerto Selatan', 'purwokerto-selatan', -7.4400, 109.2400),
('Purwokerto Utara', 'purwokerto-utara', -7.4100, 109.2400),
('Baturaden', 'baturaden', -7.3167, 109.2167),
('Ajibarang', 'ajibarang', -7.4000, 109.0833),
('Sokaraja', 'sokaraja', -7.4500, 109.2833),
('Purbalingga', 'purbalingga', -7.3881, 109.3639),
('Wangon', 'wangon', -7.5167, 109.0500),
('Rawalo', 'rawalo', -7.5333, 109.1667),
('Kebasen', 'kebasen', -7.5500, 109.2333),
('Sumbang', 'sumbang', -7.3667, 109.2833),
('Kembaran', 'kembaran', -7.4500, 109.1833),
('Kalibagor', 'kalibagor', -7.4667, 109.3000),
('Cilongok', 'cilongok', -7.3500, 109.1333),
('Lumbir', 'lumbir', -7.4333, 109.0167),
('Tambak', 'tambak', -7.4833, 109.0667),
('Somagede', 'somagede', -7.5167, 109.3167),
('Jatilawang', 'jatilawang', -7.5333, 109.1333),
('Gumelar', 'gumelar', -7.4167, 109.0000),
('Pejagoan', 'pejagoan', -7.5833, 109.1000),
('Banyumas', 'banyumas', -7.5167, 109.3000),
('Patikraja', 'patikraja', -7.4833, 109.2167),
('Purwojati', 'purwojati', -7.5500, 109.0833)
ON CONFLICT (slug) DO NOTHING;

-- Kategori Berita
INSERT INTO categories (name, slug, type, color, icon, sort_order) VALUES
('Pemerintahan', 'pemerintahan', 'news', '#1A5F7A', 'building', 1),
('Pariwisata', 'pariwisata', 'news', '#10b981', 'mountain', 2),
('Ekonomi & UMKM', 'ekonomi-umkm', 'news', '#f59e0b', 'briefcase', 3),
('Pendidikan', 'pendidikan', 'news', '#8b5cf6', 'graduation-cap', 4),
('Budaya', 'budaya', 'news', '#ec4899', 'palette', 5),
('Olahraga', 'olahraga', 'news', '#ef4444', 'trophy', 6),
('Teknologi AI', 'teknologi-ai', 'news', '#0ea5e9', 'cpu', 7),
('Cuaca & Lalin', 'cuaca-lalin', 'news', '#64748b', 'cloud', 8)
ON CONFLICT (slug) DO NOTHING;

-- Kategori AI
INSERT INTO categories (name, slug, type, color, icon, sort_order) VALUES
('Startup AI', 'startup-ai', 'ai', '#0ea5e9', 'rocket', 1),
('Riset & Akademik', 'riset-akademik', 'ai', '#8b5cf6', 'flask', 2),
('Komunitas', 'komunitas', 'ai', '#10b981', 'users', 3),
('Individu', 'individu', 'ai', '#f59e0b', 'user', 4)
ON CONFLICT (slug) DO NOTHING;

-- Kategori Event
INSERT INTO categories (name, slug, type, color, icon, sort_order) VALUES
('Workshop', 'workshop', 'event', '#0ea5e9', 'wrench', 1),
('Meetup', 'meetup', 'event', '#10b981', 'coffee', 2),
('Webinar', 'webinar', 'event', '#8b5cf6', 'video', 3),
('Kompetisi', 'kompetisi', 'event', '#ef4444', 'award', 4)
ON CONFLICT (slug) DO NOTHING;

-- Kategori Forum
INSERT INTO categories (name, slug, type, color, icon, sort_order) VALUES
('Warung Kopi Digital', 'warung-kopi', 'forum', '#f59e0b', 'coffee', 1),
('Tanya Jawab', 'tanya-jawab', 'forum', '#0ea5e9', 'help-circle', 2),
('Jual-Beli', 'jual-beli', 'forum', '#10b981', 'shopping-bag', 3),
('Lowongan', 'lowongan', 'forum', '#ef4444', 'briefcase', 4)
ON CONFLICT (slug) DO NOTHING;

-- Sumber Berita
INSERT INTO news_sources (name, slug, website_url, is_active, fetch_interval) VALUES
('Tribun Jateng', 'tribun-jateng', 'https://jateng.tribunnews.com', TRUE, 30),
('Radar Banyumas', 'radar-banyumas', 'https://radarbanyumas.co.id', TRUE, 30),
('Banyumas Online', 'banyumas-online', 'https://banyumasonline.com', TRUE, 60),
('Banyumas Explore', 'banyumas-explore', 'https://banyumasesplore.com', TRUE, 60),
('Pemkab Banyumas', 'pemkab-banyumas', 'https://banyumaskab.go.id', TRUE, 120),
('Detik Jateng', 'detik-jateng', 'https://jateng.detik.com', TRUE, 30),
('Kompas Jateng', 'kompas-jateng', 'https://regional.kompas.com/jateng', TRUE, 60)
ON CONFLICT (slug) DO NOTHING;
