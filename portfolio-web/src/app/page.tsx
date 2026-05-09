import Nav         from '@/components/Nav'
import Hero        from '@/components/Hero'
import KPIStrip    from '@/components/KPIStrip'
import Experience  from '@/components/Experience'
import SuperMoney  from '@/components/SuperMoney'
import SeLMoRe     from '@/components/SeLMoRe'
import Underwriting from '@/components/Underwriting'
import AIButler    from '@/components/AIButler'
import Blog        from '@/components/Blog'
import Skills      from '@/components/Skills'
import Education   from '@/components/Education'

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: '#0a0e1a' }}>
      <Nav />
      <Hero />

      {/* subtle section divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      <KPIStrip />

      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      <Experience />

      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      <SuperMoney />

      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      <SeLMoRe />

      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      <Underwriting />

      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      <AIButler />

      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      <Blog />

      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      <Skills />

      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      <Education />

      {/* footer */}
      <footer className="border-t border-white/[0.05] mt-8 py-10 text-center text-slate-600 text-sm">
        <div className="mb-1 font-semibold text-slate-500">Yash Vardhan Gupta</div>
        <div>Built with Next.js · Tailwind CSS · Framer Motion</div>
      </footer>
    </main>
  )
}
