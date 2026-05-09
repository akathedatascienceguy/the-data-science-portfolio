'use client'
import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { ChevronDown } from 'lucide-react'
import { supermoneyTrajectory } from '@/data/portfolio'

function Tag({ label }: { label: string }) {
  return <span className="tag">{label}</span>
}

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

const Tip = ({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string }[]; label?: string }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="chart-tooltip">
      <div className="text-g-400 mb-1">{label}</div>
      {payload.map(p => p.value != null && (
        <div key={p.name} className="text-apple">{p.name === 'actual' ? 'Actual' : 'Projected'}: ₹{p.value} Cr</div>
      ))}
    </div>
  )
}

const projects = [
  {
    num: '01', title: 'Personal Loans ML',
    tags: ['Learning to Rank', 'Reject Inferencing', 'LightGBM'],
    bullets: [
      'Replaced all traditional models and rule-based eligibility with a unified ML stack end-to-end',
      'LTR optimises offer ordering per user — maximising good conversion simultaneously with approval quality',
      'Reject inferencing exposes the model to the full applicant distribution, eliminating survivor bias',
    ],
  },
  {
    num: '02', title: 'Pay in 3 Charter',
    tags: ['Cold Start', 'Unsupervised Clustering', 'BNPL'],
    bullets: [
      'Designed entire underwriting charter from zero — no historical repayment labels, no prior signal',
      'Unsupervised clustering creates risk segments from behavioural + demographic + bureau proxy signals',
      'Architecture transitions gracefully to supervised ML as label volume accumulates',
    ],
  },
  {
    num: '03', title: 'Personalisation',
    tags: ['Offer Ranking', 'Credit Limits', 'User Segmentation'],
    bullets: [
      'Individual-level offer ordering and re-ranking per user intent and risk profile',
      'Credit limit personalisation balancing risk appetite with revenue potential at user level',
      'Unified ranking → personalisation feedback loop via the LTR scoring pipeline',
    ],
  },
]

export default function SuperMoney() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [open, setOpen] = useState<string | null>(null)
  const toggle = (t: string) => setOpen(e => e === t ? null : t)

  return (
    <section id="supermoney" className="max-w-6xl mx-auto px-8 py-24">
      <div ref={ref}>

        {/* header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          <div className="flex items-baseline gap-4 mb-4">
            <span className="font-mono text-[0.62rem] text-g-600 tracking-widest2 uppercase">01</span>
            <h2 className="text-3xl font-light text-apple tracking-tight">SuperMoney</h2>
          </div>
          <p className="font-mono text-xs text-g-500 uppercase tracking-widest2 mb-12">
            Founding Data Scientist · 2025 – Present
          </p>
        </motion.div>

        {/* big stat */}
        <Reveal delay={0.1}>
          <div className="border border-white/[0.07] p-10 mb-12 grid sm:grid-cols-2 gap-8">
            <div>
              <div className="font-mono text-[0.62rem] text-g-600 uppercase tracking-widest2 mb-3">Current Delta</div>
              <div className="font-mono text-6xl font-light text-apple tracking-tight mb-1">₹60 Cr<span className="text-g-500 text-2xl">/mo</span></div>
              <div className="font-mono text-xs text-g-500">Incremental · Personal Loans ML</div>
            </div>
            <div className="flex flex-col justify-center sm:border-l border-white/[0.07] sm:pl-8">
              <div className="font-mono text-[0.62rem] text-g-600 uppercase tracking-widest2 mb-3">Target · Dec 2026</div>
              <div className="font-mono text-6xl font-light text-apple tracking-tight mb-1">₹300 Cr<span className="text-g-500 text-2xl">/mo</span></div>
              <div className="font-mono text-xs text-g-500">5× projected growth</div>
            </div>
          </div>
        </Reveal>

        {/* chart */}
        <Reveal delay={0.2}>
          <div className="mb-12">
            <div className="font-mono text-[0.62rem] text-g-600 uppercase tracking-widest2 mb-6">
              Trajectory — Actual vs Projected (₹ Cr/month)
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={supermoneyTrajectory}>
                <CartesianGrid strokeDasharray="2 4" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={v => `₹${v}`} />
                <Tooltip content={<Tip />} />
                <Line type="monotone" dataKey="actual" stroke="#f5f5f7" strokeWidth={1.5}
                  dot={{ r: 3, fill: '#f5f5f7', strokeWidth: 0 }} connectNulls={false} name="actual" />
                <Line type="monotone" dataKey="projected" stroke="#636366" strokeWidth={1} strokeDasharray="4 4"
                  dot={{ r: 3, fill: '#636366', strokeWidth: 0 }} connectNulls={false} name="projected" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Reveal>

        {/* projects */}
        <div className="grid md:grid-cols-3 gap-px bg-white/[0.06] mb-12">
          {projects.map((p, i) => (
            <Reveal key={p.num} delay={0.1 + i * 0.08}>
              <div className="bg-black p-7 h-full">
                <div className="font-mono text-[0.6rem] text-g-600 mb-4">{p.num}</div>
                <div className="text-apple font-medium mb-3">{p.title}</div>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {p.tags.map(t => <Tag key={t} label={t} />)}
                </div>
                <ul className="space-y-2.5">
                  {p.bullets.map((b, bi) => (
                    <li key={bi} className="flex gap-3 text-xs text-g-400 leading-relaxed font-light">
                      <span className="text-g-700 flex-shrink-0 mt-0.5">—</span>{b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* expandables */}
        {[
          {
            key: 'ltr',
            title: 'Learning to Rank — Methodology',
            body: (
              <div className="grid sm:grid-cols-2 gap-8 text-xs text-g-400 leading-relaxed font-light">
                <div>
                  <p className="text-g-200 font-medium mb-3">Why LTR over a binary classifier?</p>
                  <p className="mb-4">A classifier answers &quot;approve or not?&quot;. LTR answers &quot;which offer should we show first?&quot; — optimising the <em className="text-g-200">ordering</em>, not just a threshold. Objective: NDCG / MAP over the offer list.</p>
                  <div className="bg-g-950 border border-white/[0.06] p-4 font-mono text-[0.7rem] leading-loose text-g-300">
                    User signals  ─┐<br/>
                    Loan features ─┼─► Feature Vec ─► LTR Model ─► Ranked List<br/>
                    Context       ─┘
                  </div>
                </div>
                <div>
                  <p className="text-g-200 font-medium mb-3">Reject inferencing pipeline</p>
                  <p className="mb-4">Standard training sets contain only approved users → survivor bias. In personal loans rejection rates can be 60–70%+, making purely supervised models dangerously unrepresentative.</p>
                  <div className="bg-g-950 border border-white/[0.06] p-4 font-mono text-[0.7rem] leading-loose text-g-300">
                    All Applicants<br/>
                    ├─ Approved ──► Observed labels<br/>
                    └─ Rejected ──► Fuzzy / EM pseudo-labels<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Unbiased full model
                  </div>
                </div>
              </div>
            ),
          },
          {
            key: 'cold',
            title: 'Pay in 3 — Cold-Start Architecture',
            body: (
              <div className="bg-g-950 border border-white/[0.06] p-5 font-mono text-[0.7rem] text-g-300 leading-loose overflow-x-auto">
                {`NEW USERS (no repayment history)
          │
  ┌───────┴───────┐───────────┐
  Behavioural  Demographic  Bureau Proxy
  Signals      Signals      Signals
  (velocity,   (age, city,  (thin file,
  device,      income)      enquiries)
  app usage)
          │
  Unsupervised Clustering (K-Means / GMM)
          │
  ┌───────┴───────┐───────────┐
  Low Risk    Med Risk    High Risk
          │
  Monitor repayment signal
          │
  Enough labels? → Bootstrap Supervised Model → Retire clusters`}
              </div>
            ),
          },
        ].map(item => (
          <div key={item.key} className="border-b border-white/[0.06] last:border-0">
            <button onClick={() => toggle(item.key)}
              className="w-full flex items-center justify-between py-4 text-xs font-mono text-g-400 hover:text-g-200 uppercase tracking-widest2 transition-colors">
              <span>{item.title}</span>
              <motion.span animate={{ rotate: open === item.key ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={14} />
              </motion.span>
            </button>
            <AnimatePresence>
              {open === item.key && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                  <div className="pb-6">{item.body}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  )
}
