'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { blogArticles } from '@/data/portfolio'

function Tag({ label, color }: { label: string; color: string }) {
  return <span className={`tag${color ? ` tag-${color}` : ''}`}>{label}</span>
}

export default function Blog() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="blog" className="max-w-7xl mx-auto px-6 py-24">
      <div ref={ref}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <div className="section-line" />
          <h2 className="text-3xl font-bold text-white mb-2">Culture × Data Science</h2>
          <p className="text-slate-400 mb-8">Co-founded Medium publication · Exploring data science through real-world lenses</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {blogArticles.map((a, i) => (
            <motion.article
              key={a.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="glass glass-hover rounded-2xl p-6 flex flex-col"
            >
              <div className="text-3xl mb-4">{a.icon}</div>
              <h3 className="text-white font-bold text-sm leading-snug mb-2">{a.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed flex-1 mb-4">{a.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {(a.tags as [string, string][]).map(([l, c]) => <Tag key={l} label={l} color={c} />)}
              </div>
            </motion.article>
          ))}
        </div>

        {/* research roundtable */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="mt-6 glass rounded-2xl p-6 flex gap-4 items-start"
        >
          <div className="text-3xl flex-shrink-0">🎤</div>
          <div>
            <h3 className="text-white font-bold text-sm mb-1">Research Roundtable @ Simpl</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Conducted Simpl&apos;s first Research Roundtable on Transformers — covering self-attention,
              positional encodings, and practical applications of transformer architectures for sequential
              event modeling in FinTech. First of its kind internally.
            </p>
          </div>
        </motion.div>

        {/* hackathon */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-4 glass rounded-2xl p-6 flex gap-4 items-start"
        >
          <div className="text-3xl flex-shrink-0">🥈</div>
          <div>
            <h3 className="text-white font-bold text-sm mb-1">2nd Prize — Simpl Internal Hackathon (Ads Platform)</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Hybrid collaborative + content-based ad recommendation engine: candidate generation (repeat users ≥5 txns),
              exponentially weighted merchant × category scoring, non-conflict re-ranking, undiscovered merchant uplift,
              and high-presence penalties.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
