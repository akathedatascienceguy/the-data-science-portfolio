'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import CountUp from 'react-countup'
import { kpis } from '@/data/portfolio'

export default function KPIStrip() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className="max-w-7xl mx-auto px-6 py-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.5, ease: 'easeOut' }}
          >
            <div
              className="relative glass glass-hover rounded-2xl p-5 overflow-hidden cursor-default h-full"
              style={{ boxShadow: inView ? `0 0 40px ${k.glowColor}` : undefined }}
            >
              {/* top gradient bar */}
              <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${k.accent}`} />

              <div className="text-2xl mb-2">{k.icon}</div>

              <div className="text-3xl font-black text-white leading-none mb-1 tabular-nums">
                {inView ? (
                  <CountUp
                    start={0}
                    end={k.value}
                    decimals={k.decimals ?? 0}
                    duration={1.6}
                    delay={i * 0.1}
                    prefix={k.prefix ?? ''}
                    suffix={k.suffix ?? ''}
                    preserveValue
                  />
                ) : (
                  <span>{k.prefix ?? ''}{k.value}{k.suffix ?? ''}</span>
                )}
              </div>

              <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">
                {k.label}
              </div>
              <div className="text-xs text-emerald-400 font-medium">{k.sub}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
