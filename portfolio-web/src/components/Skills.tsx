'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { skills } from '@/data/portfolio'

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="skills" className="max-w-6xl mx-auto px-8 py-24">
      <div ref={ref}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          <div className="flex items-baseline gap-4 mb-12">
            <span className="font-mono text-[0.62rem] text-g-600 tracking-widest2 uppercase">06</span>
            <h2 className="text-3xl font-light text-apple tracking-tight">Skills</h2>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-x-16 gap-y-12">
          {Object.entries(skills).map(([category, items], ci) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: ci * 0.1, duration: 0.5, ease: 'easeOut' }}
            >
              <div className="font-mono text-[0.62rem] text-g-600 uppercase tracking-widest2 mb-6">{category}</div>
              <div className="space-y-5">
                {items.map((skill, i) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="text-xs text-g-300 font-light">{skill.name}</span>
                      <span className="font-mono text-[0.65rem] text-g-600">{skill.pct}%</span>
                    </div>
                    {/* ultra-thin track */}
                    <div className="h-px bg-white/[0.07] relative overflow-hidden">
                      <motion.div
                        className="absolute top-0 left-0 h-full bg-apple"
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.pct}%` } : { width: 0 }}
                        transition={{ delay: ci * 0.1 + i * 0.04 + 0.3, duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
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
