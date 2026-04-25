import { HeroSection } from "@/components/layout/HeroSection"
import { QuickBar } from "@/components/layout/QuickBar"
import { Footer } from "@/components/layout/Footer"
import { AiHubSection } from "@/components/ai/AiHubSection"
import { NewsSection } from "@/components/news/NewsSection"
import { Sidebar } from "@/components/layout/Sidebar"
import { CommunitySection } from "@/components/forum/CommunitySection"

export default function Home() {
  return (
    <>
      <HeroSection />
      <QuickBar />

      <main className="max-w-[1400px] mx-auto px-4 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
        <div>
          <AiHubSection />
          <NewsSection />
          <CommunitySection />
        </div>
        <aside className="hidden lg:block">
          <Sidebar />
        </aside>
      </main>

      <Footer />
    </>
  )
}
