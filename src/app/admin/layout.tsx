import { createServerSideClient } from "@/lib/supabase-server"
import { redirect } from "next/navigation"
import { AdminSidebar } from "@/components/admin/AdminSidebar"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createServerSideClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/auth")

  // Check role from user metadata (set via Supabase Admin API)
  const role = (user.app_metadata?.role as string) ?? "user"
  if (!["admin", "editor"].includes(role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Akses Ditolak</h1>
          <p className="text-text-muted text-sm">Kamu tidak punya akses ke halaman ini.</p>
          <a href="/" className="text-ai hover:underline text-sm mt-4 inline-block">Kembali ke Beranda</a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark flex">
      <AdminSidebar role={role} />
      <main className="flex-1 ml-56 mt-16 p-6">
        {children}
      </main>
    </div>
  )
}
