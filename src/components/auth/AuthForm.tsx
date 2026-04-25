"use client"

import { createClient } from "@/lib/supabase"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Eye, EyeOff } from "lucide-react"

export function AuthForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setError(error.message === "Invalid login credentials"
          ? "Email atau password salah"
          : error.message)
      } else {
        router.push("/")
        router.refresh()
      }
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) {
        setError(error.message)
      } else {
        setSuccess("Akun berhasil dibuat! Cek email kamu untuk verifikasi.")
      }
    }
    setLoading(false)
  }

  async function handleGitHub() {
    setLoading(true)
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: `${location.origin}/auth/callback` },
    })
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#0f172a" }}>
      <div className="w-full max-w-sm bg-dark-card border border-border rounded-xl p-6">
        <div className="text-center mb-6">
          <h1 className="text-xl font-extrabold">
            <span className="text-secondary">Purai</span>kerto
          </h1>
          <p className="text-sm text-text-muted mt-1">
            {isLogin ? "Masuk ke akun kamu" : "Buat akun baru"}
          </p>
        </div>

        {error && (
          <div className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2 mb-3">
            {error}
          </div>
        )}
        {success && (
          <div className="text-xs text-green-400 bg-green-400/10 border border-green-400/20 rounded-lg px-3 py-2 mb-3">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-xs text-text-muted block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-dark border border-border rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-ai"
              placeholder="kamu@email.com"
              required
            />
          </div>
          <div>
            <label className="text-xs text-text-muted block mb-1">Password</label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-dark border border-border rounded-lg px-3 py-2 pr-9 text-sm text-white outline-none focus:border-ai"
                placeholder="Min. 6 karakter"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-white"
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2 rounded-lg text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-1.5"
          >
            {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            {isLogin ? "Masuk" : "Daftar"}
          </button>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
          <div className="relative flex justify-center text-xs"><span className="bg-dark-card px-2 text-text-muted">atau</span></div>
        </div>

        <button
          onClick={handleGitHub}
          disabled={loading}
          className="w-full bg-dark hover:bg-card border border-border text-white font-semibold py-2 rounded-lg text-sm transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          Masuk dengan GitHub
        </button>

        <p className="text-xs text-text-muted text-center mt-4">
          {isLogin ? (
            <>Belum punya akun?{" "}
              <button onClick={() => setIsLogin(false)} className="text-ai hover:underline">Daftar</button>
            </>
          ) : (
            <>Sudah punya akun?{" "}
              <button onClick={() => setIsLogin(true)} className="text-ai hover:underline">Masuk</button>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
