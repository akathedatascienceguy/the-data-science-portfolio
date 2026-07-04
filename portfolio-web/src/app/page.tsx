import Nav          from '@/components/Nav'
import Hero         from '@/components/Hero'
import KPIStrip     from '@/components/KPIStrip'
import Experience   from '@/components/Experience'
import SuperMoney   from '@/components/SuperMoney'
import SeLMoRe      from '@/components/SeLMoRe'
import Underwriting from '@/components/Underwriting'
import AIButler     from '@/components/AIButler'
import DukaanAI    from '@/components/DukaanAI'
import Blog         from '@/components/Blog'
import Skills       from '@/components/Skills'
import Education    from '@/components/Education'

function Rule() {
  return <div className="max-w-6xl mx-auto px-8"><div className="divider" /></div>
}

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Nav />
      <Hero />
      <Rule />
      <KPIStrip />
      <Rule />
      <Experience />
      <Rule />
      <SuperMoney />
      <Rule />
      <SeLMoRe />
      <Rule />
      <Underwriting />
      <Rule />
      <AIButler />
      <Rule />
      <DukaanAI />
      <Rule />
      <Blog />
      <Rule />
      <Skills />
      <Rule />
      <Education />

      <footer className="max-w-6xl mx-auto px-8 py-12 mt-8 border-t border-white/[0.06]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="font-mono text-[0.62rem] text-g-700 uppercase tracking-widest2">Yash Vardhan Gupta</span>
          <span className="font-mono text-[0.62rem] text-g-700 uppercase tracking-widest2">Next.js · Tailwind · Framer Motion</span>
        </div>
      </footer>
    </main>
  )
}
