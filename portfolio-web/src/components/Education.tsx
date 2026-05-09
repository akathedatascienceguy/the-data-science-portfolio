'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { education, achievements } from '@/data/portfolio'

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

export default function Education() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="education" className="max-w-6xl mx-auto px-8 py-24">
      <div ref={ref} className="grid lg:grid-cols-2 gap-20">

        {/* Education */}
        <div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            <div className="flex items-baseline gap-4 mb-12">
              <span className="font-mono text-[0.62rem] text-g-600 tracking-widest2 uppercase">07</span>
              <h2 className="text-3xl font-light text-apple tracking-tight">Education</h2>
            </div>
          </motion.div>

          <div className="space-y-0">
            {education.map((e, i) => (
              <Reveal key={e.school} delay={i * 0.1}>
                <div className="py-6 border-b border-white/[0.06] last:border-0">
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <div className="text-apple text-sm font-medium">{e.school}</div>
                    {e.badge && (
                      <span className="font-mono text-[0.58rem] text-g-500 border border-white/[0.1] px-2 py-0.5 rounded flex-shrink-0">
                        {e.badge}
                      </span>
                    )}
                  </div>
                  <div className="font-mono text-xs text-g-500 mb-0.5">{e.degree}</div>
                  <div className="font-mono text-[0.65rem] text-g-700">{e.detail}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1, duration: 0.5 }}>
            <div className="flex items-baseline gap-4 mb-12">
              <span className="font-mono text-[0.62rem] text-g-600 tracking-widest2 uppercase opacity-0">07</span>
              <h2 className="text-3xl font-light text-apple tracking-tight">Achievements</h2>
            </div>
          </motion.div>

          <div className="space-y-0">
            {achievements.map((a, i) => (
              <Reveal key={a.title} delay={0.1 + i * 0.08}>
                <div className="flex gap-5 py-6 border-b border-white/[0.06] last:border-0 group">
                  <span className="text-lg flex-shrink-0 mt-0.5 opacity-60 group-hover:opacity-100 transition-opacity">{a.icon}</span>
                  <div>
                    <div className="text-apple text-sm font-medium mb-1">{a.title}</div>
                    <div className="text-xs text-g-500 font-light leading-relaxed">{a.desc}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
