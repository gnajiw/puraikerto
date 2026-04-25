// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Public client — untuk frontend (read only via RLS)
export const supabase = createClient(supabaseUrl, supabaseAnon)

// Service client — untuk API routes (insert/update artikel)
// Ini HANYA dipakai di server-side (API routes), jangan expose ke browser
export function getServiceClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  return createClient(supabaseUrl, serviceKey)
}
