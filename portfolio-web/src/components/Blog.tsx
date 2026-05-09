'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { blogArticles } from '@/data/portfolio'

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay, duration: 0.5, ease: 'easeOut' }}>
      {children}
    </motion.div>
  )
}

export default function Blog() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="blog" className="max-w-6xl mx-auto px-8 py-24">
      <div ref={ref}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          <div className="flex items-baseline gap-4 mb-2">
            <span className="font-mono text-[0.62rem] text-g-600 tracking-widest2 uppercase">05</span>
            <h2 className="text-3xl font-light text-apple tracking-tight">Writing</h2>
          </div>
          <p className="font-mono text-xs text-g-500 uppercase tracking-widest2 mb-12">
            Culture × Data Science · Co-founded Medium Publication
          </p>
        </motion.div>

        <div className="space-y-0">
          {blogArticles.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.07}>
              <div className="group flex gap-6 py-7 border-b border-white/[0.06] last:border-0 cursor-default">
                <div className="text-xl flex-shrink-0 mt-0.5 opacity-70 group-hover:opacity-100 transition-opacity">
                  {a.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
                    <h3 className="text-apple text-sm font-medium leading-snug group-hover:text-white transition-colors">
                      {a.title}
                    </h3>
                    <div className="flex flex-wrap gap-1.5 flex-shrink-0">
                      {(a.tags as [string, string][]).map(([l]) => (
                        <span key={l} className="tag">{l}</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-g-500 leading-relaxed font-light">{a.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}

          {/* non-article entries */}
          {[
            { icon: '🎤', title: 'Research Roundtable — Transformers', desc: 'Simpl\'s first internal roundtable on self-attention, positional encodings, and transformer architectures for sequential event modeling in FinTech.' },
            { icon: '🥈', title: '2nd Prize — Simpl Hackathon (Ads Platform)', desc: 'Hybrid collaborative + content-based recommendation engine: LTR candidate generation, exponentially weighted merchant scoring, non-conflict re-ranking.' },
          ].map((a, i) => (
            <Reveal key={a.title} delay={0.35 + i * 0.07}>
              <div className="group flex gap-6 py-7 border-b border-white/[0.06] last:border-0 cursor-default">
                <div className="text-xl flex-shrink-0 mt-0.5 opacity-70 group-hover:opacity-100 transition-opacity">{a.icon}</div>
                <div>
                  <div className="text-apple text-sm font-medium mb-1 group-hover:text-white transition-colors">{a.title}</div>
                  <p className="text-xs text-g-500 leading-relaxed font-light">{a.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
