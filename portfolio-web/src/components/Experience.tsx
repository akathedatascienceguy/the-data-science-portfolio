'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { experience } from '@/data/portfolio'

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="mb-10">
      <div className="section-line" />
      <h2 className="text-3xl font-bold text-white">{text}</h2>
    </div>
  )
}

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="experience" className="max-w-4xl mx-auto px-6 py-24">
      <SectionLabel text="Work Experience" />

      <div ref={ref} className="relative">
        {/* vertical line */}
        <motion.div
          className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-slate-700 to-transparent"
          initial={{ scaleY: 0, originY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />

        <div className="space-y-8">
          {experience.map((job, i) => (
            <motion.div
              key={`${job.company}-${i}`}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5, ease: 'easeOut' }}
              className="flex gap-6"
            >
              {/* dot */}
              <div className="relative flex-shrink-0 mt-1.5">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center border-2 text-sm"
                  style={{
                    background: `${job.color}20`,
                    borderColor: `${job.color}60`,
                    boxShadow: job.current ? `0 0 20px ${job.color}50` : undefined,
                    animation: job.current ? 'pulse-live 2s ease-in-out infinite' : undefined,
                  }}
                >
                  {job.current ? (
                    <span className="live-dot" />
                  ) : (
                    <div className="w-2 h-2 rounded-full" style={{ background: job.color }} />
                  )}
                </div>
              </div>

              {/* card */}
              <div className="flex-1 glass glass-hover rounded-2xl p-6">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-white font-bold text-lg leading-tight">{job.title}</h3>
                      {job.current && (
                        <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                          <span className="live-dot scale-75" />LIVE
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-semibold mt-0.5" style={{ color: job.color }}>
                      {job.company}
                      <span className="text-slate-500 font-normal ml-1.5">· {job.type}</span>
                    </p>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] text-slate-400 whitespace-nowrap">
                    {job.period}
                  </span>
                </div>

                <ul className="mt-4 space-y-2.5">
                  {job.bullets.map((b, bi) => (
                    <li key={bi} className="flex gap-3 text-sm text-slate-400 leading-relaxed">
                      <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-400 opacity-70" />
                      <span dangerouslySetInnerHTML={{ __html: b }} />
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
