'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { experience } from '@/data/portfolio'

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="experience" className="max-w-6xl mx-auto px-8 py-24">
      {/* section label */}
      <div className="flex items-baseline gap-4 mb-16">
        <span className="font-mono text-[0.62rem] text-g-600 tracking-widest2 uppercase">00</span>
        <h2 className="text-3xl font-light text-apple tracking-tight">Experience</h2>
      </div>

      <div ref={ref} className="relative">
        {/* vertical timeline rule */}
        <motion.div
          className="absolute left-0 top-2 bottom-2 w-px bg-white/[0.07] hidden sm:block"
          initial={{ scaleY: 0, originY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
        />

        <div className="space-y-0 sm:pl-10">
          {experience.map((job, i) => (
            <motion.div
              key={`${job.company}-${i}`}
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.5, ease: 'easeOut' }}
              className="relative group pb-12 last:pb-0"
            >
              {/* timeline dot */}
              <div className={`hidden sm:block absolute -left-[2.65rem] top-1.5 w-2 h-2 rounded-full border transition-colors duration-300 ${
                job.current
                  ? 'bg-white border-white'
                  : 'bg-black border-white/20 group-hover:border-white/40'
              }`} />

              {/* card */}
              <div className="border-b border-white/[0.06] pb-12 last:border-0">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-apple font-medium text-lg">{job.title}</h3>
                      {job.current && (
                        <span className="flex items-center gap-1.5 font-mono text-[0.6rem] text-g-300 uppercase tracking-widest2">
                          <span className="live-dot scale-75" />live
                        </span>
                      )}
                    </div>
                    <div className="font-mono text-xs text-g-400">
                      {job.company} <span className="text-g-600">· {job.type}</span>
                    </div>
                  </div>
                  <span className="font-mono text-[0.65rem] text-g-600 uppercase tracking-widest2 mt-1">
                    {job.period}
                  </span>
                </div>

                <ul className="space-y-2.5 mt-5">
                  {job.bullets.map((b, bi) => (
                    <li key={bi} className="flex gap-4 text-sm text-g-300 leading-relaxed font-light">
                      <span className="font-mono text-g-700 mt-0.5 flex-shrink-0 text-xs select-none">—</span>
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
