'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { education, achievements } from '@/data/portfolio'

export default function Education() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="education" className="max-w-7xl mx-auto px-6 py-24">
      <div ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12">
          {/* education */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
              <div className="section-line" />
              <h2 className="text-3xl font-bold text-white mb-8">Education</h2>
            </motion.div>

            <div className="space-y-4">
              {education.map((e, i) => (
                <motion.div
                  key={e.school}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  className="glass glass-hover rounded-2xl p-5 flex gap-4 items-start"
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.25)' }}>
                    {e.icon}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <span className="text-white font-bold text-sm">{e.school}</span>
                      {e.badge && (
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30 text-amber-400">
                          ⭐ {e.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-cyan-400 font-medium mb-0.5">{e.degree}</div>
                    <div className="text-xs text-slate-500">{e.detail}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* achievements */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1, duration: 0.6 }}>
              <div className="section-line" style={{ background: 'linear-gradient(90deg, #f59e0b, #d97706, transparent)' }} />
              <h2 className="text-3xl font-bold text-white mb-8">Achievements</h2>
            </motion.div>

            <div className="space-y-3">
              {achievements.map((a, i) => (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                  className="glass rounded-2xl p-5 flex gap-4 items-start hover:border-amber-500/25 transition-colors cursor-default"
                >
                  <span className="text-2xl flex-shrink-0">{a.icon}</span>
                  <div>
                    <div className="text-white font-semibold text-sm mb-1">{a.title}</div>
                    <div className="text-slate-400 text-xs leading-relaxed">{a.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
