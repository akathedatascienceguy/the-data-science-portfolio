'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

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

const pillars = [
  { num: '01', title: 'Demand Forecasting',    desc: 'SKU-level inventory predictions using local seasonality, festive calendars, and hyperlocal demand signals — cutting wastage by 20–40%' },
  { num: '02', title: 'Customer Intelligence', desc: 'WhatsApp-native loyalty loops: purchase pattern clustering, churn nudges, and personalised reorder prompts — zero app install required' },
  { num: '03', title: 'Dynamic Pricing',       desc: 'Competitor-aware, demand-driven pricing engine. Trained on street-market data; adapts to mandi prices, footfall, and time-of-day elasticity' },
  { num: '04', title: 'Ops Dashboard',         desc: 'One-screen analytics for non-technical owners: daily P&L, fast/slow movers, credit exposure, and AI-generated reorder recommendations' },
]

export default function DukaanAI() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="dukaanai" className="max-w-6xl mx-auto px-8 py-24">
      <div ref={ref}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          <div className="flex items-baseline gap-4 mb-4">
            <span className="font-mono text-[0.62rem] text-g-600 tracking-widest2 uppercase">05</span>
            <h2 className="text-3xl font-light text-apple tracking-tight">Dukaan AI</h2>
          </div>
          <p className="font-mono text-xs text-g-500 uppercase tracking-widest2 mb-12">
            Personal Project · AI for Local Businesses · Delhi · Bengaluru · Bharat
          </p>
        </motion.div>

        {/* manifesto */}
        <Reveal delay={0.1}>
          <blockquote className="border-l border-white/20 pl-8 mb-16">
            <p className="text-2xl sm:text-3xl font-light text-apple leading-relaxed tracking-tight mb-4">
              India has 63 million small businesses. They run on instinct. Dukaan AI gives every kirana, salon, and street-side vendor the intelligence of a Fortune 500 analytics team — in their language, on their phone.
            </p>
            <p className="font-mono text-xs text-g-500 uppercase tracking-widest2">No code. No laptop. Just results.</p>
          </blockquote>
        </Reveal>

        {/* pillars */}
        <Reveal delay={0.15}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] mb-12">
            {pillars.map(p => (
              <div key={p.num} className="bg-black p-7">
                <div className="font-mono text-[0.6rem] text-g-600 mb-4">{p.num}</div>
                <div className="text-apple text-sm font-medium mb-3">{p.title}</div>
                <div className="text-g-500 text-xs leading-relaxed font-light">{p.desc}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* differentiation table */}
        <Reveal delay={0.2}>
          <div className="mb-12">
            <div className="font-mono text-[0.62rem] text-g-600 uppercase tracking-widest2 mb-5">Why this is hard</div>
            <div className="space-y-0">
              {[
                ['Cold Start',        'Most small businesses have zero digital history',       'Unsupervised clustering on transaction receipts + supplier invoices to bootstrap ML without labelled data'],
                ['Language & UX',     'Owners speak Hindi, Kannada, Tamil — not English dashboards', 'Voice-first WhatsApp interface; vernacular LLM layer translates intent into structured queries'],
                ['Data Sparsity',     'Weekly sales of 50 SKUs isn\'t enough for deep models',  'Transfer learning from aggregated anonymised city-wide signals; Bayesian priors for thin-data SKUs'],
              ].map(([track, what, why]) => (
                <div key={track} className="grid sm:grid-cols-3 gap-x-8 py-4 border-b border-white/[0.06] last:border-0 text-xs">
                  <div className="font-mono text-g-200 font-medium mb-1 sm:mb-0">{track}</div>
                  <div className="text-g-400 font-light mb-1 sm:mb-0">{what}</div>
                  <div className="text-g-500 font-light">{why}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* two panels */}
        <div className="grid lg:grid-cols-2 gap-px bg-white/[0.06]">
          <Reveal delay={0.25}>
            <div className="bg-black p-8">
              <div className="font-mono text-[0.62rem] text-g-600 uppercase tracking-widest2 mb-5">Intelligence Stack</div>
              <div className="font-mono text-[0.7rem] text-g-300 leading-loose">
                {`Owner WhatsApp Message
      │
  Intent Parser (Vernacular LLM)
      │
  ┌───┴────────────────────┐
  │                        │
Query Engine         Action Engine
  │                        │
Inventory / Sales    Reorder / Alert
Forecast / Pricing   Customer Nudge
  │                        │
  └───────────┬────────────┘
              │
      Plain-language Reply
              │
      Owner WhatsApp`}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="bg-black p-8">
              <div className="font-mono text-[0.62rem] text-g-600 uppercase tracking-widest2 mb-5">Target Impact — Delhi & Bengaluru Pilot</div>
              <div className="space-y-4 text-xs text-g-400 font-light leading-relaxed">
                {[
                  ['Wastage Reduction',    '20–40% cut in perishable waste via SKU-level demand forecasting'],
                  ['Revenue Uplift',       '12–18% through personalised reorder nudges and dynamic pricing'],
                  ['Credit Access',        'Structured transaction history unlocks formal MSME credit — no accountant needed'],
                  ['Competitive Edge',     'Street vendors gain the pricing intelligence of organised retail chains'],
                  ['Scalability',          'City-wide aggregation improves every individual model — network effects in ML'],
                ].map(([t, d]) => (
                  <div key={t as string} className="flex gap-3">
                    <span className="text-g-700 flex-shrink-0 mt-0.5">—</span>
                    <div><span className="text-g-200 font-medium">{t}: </span>{d}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
