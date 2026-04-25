export function Footer() {
  return (
    <footer className="mt-12 border-t border-border bg-dark-card px-4 lg:px-8 pt-12 pb-8">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h2 className="text-xl font-extrabold mb-2">
            <span className="text-secondary">Purai</span>kerto
          </h2>
          <p className="text-sm text-text-muted leading-relaxed">
            Pusat Informasi AI Purwokerto & Agregasi Berita Lokal Banyumas.
            Bersama membangun ekosistem digital Banyumas.
          </p>
        </div>

        {[
          {
            title: "Navigasi",
            links: ["Beranda", "AI Hub", "Berita", "Komunitas"],
          },
          {
            title: "Layanan",
            links: ["Direktori AI", "Kalender Event", "Forum Diskusi", "Pasang Iklan"],
          },
          {
            title: "Hukum",
            links: ["Kebijakan Privasi", "Syarat & Ketentuan", "Kontak", "FAQ"],
          },
        ].map((section) => (
          <div key={section.title}>
            <h4 className="text-sm font-bold mb-3">{section.title}</h4>
            <ul className="space-y-1.5">
              {section.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-text-muted hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto mt-8 pt-6 border-t border-border text-center text-xs text-text-muted">
        &copy; 2026 Puraikerto.my.id. All rights reserved.
      </div>
    </footer>
  )
}
