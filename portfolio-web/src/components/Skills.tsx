'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { skills } from '@/data/portfolio'

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="skills" className="max-w-7xl mx-auto px-6 py-24">
      <div ref={ref}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <div className="section-line" />
          <h2 className="text-3xl font-bold text-white mb-10">Technical Skills</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-8">
          {Object.entries(skills).map(([category, items], ci) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: ci * 0.1, duration: 0.5 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="text-white font-bold text-sm mb-5 uppercase tracking-wider">{category}</h3>
              <div className="space-y-4">
                {items.map((skill, i) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm text-slate-300 font-medium">{skill.name}</span>
                      <span className="text-xs font-bold tabular-nums" style={{ color: skill.color }}>{skill.pct}%</span>
                    </div>
                    <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden border border-white/[0.04]">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: skill.color }}
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.pct}%` } : { width: 0 }}
                        transition={{ delay: ci * 0.1 + i * 0.05 + 0.2, duration: 0.7, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
