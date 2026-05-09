'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import CountUp from 'react-countup'
import { kpis } from '@/data/portfolio'

export default function KPIStrip() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className="max-w-6xl mx-auto px-8 py-16">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06]">
        {kpis.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="bg-black p-8 group"
          >
            <div className="font-mono text-[2.4rem] font-medium text-apple tracking-tight leading-none mb-3 tabular-nums">
              {inView
                ? <CountUp start={0} end={k.value} decimals={k.decimals ?? 0} duration={1.8}
                    delay={i * 0.1} prefix={k.prefix ?? ''} suffix={k.suffix ?? ''} preserveValue />
                : <span>{k.prefix ?? ''}{k.value}{k.suffix ?? ''}</span>
              }
            </div>
            <div className="font-mono text-[0.65rem] text-g-500 uppercase tracking-widest2 mb-1">{k.label}</div>
            <div className="font-mono text-[0.62rem] text-g-600">{k.sub}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
