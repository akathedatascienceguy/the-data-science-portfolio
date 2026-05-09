'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  AreaChart, Area, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { ChevronDown } from 'lucide-react'
import { supermoneyTrajectory } from '@/data/portfolio'

const projects = [
  {
    icon: '💳',
    title: 'Personal Loans ML System',
    subtitle: 'End-to-end · Replaced rules + trad models',
    accent: 'from-amber-500/20 to-orange-500/20',
    border: 'border-amber-500/20',
    tags: [['LTR', 'amber'], ['Reject Inferencing', 'cyan'], ['LightGBM', ''], ['₹60 Cr/mo', 'green']] as [string,string][],
    bullets: [
      'Completely replaced traditional scoring models and hard rule-based eligibility with a modern ML stack',
      'Learning-to-Rank (LTR) surfaces optimal loan products per user — maximises conversion and approval quality simultaneously',
      'Reject inferencing eliminates confirmation bias on the rejected population, exposing the model to the full applicant distribution',
      'Incremental delta ₹60 Cr/month → ₹300 Cr target by Dec 2026',
    ],
  },
  {
    icon: '3️⃣',
    title: 'Pay in 3 Charter',
    subtitle: 'Cold Start · Built from scratch',
    accent: 'from-indigo-500/20 to-violet-500/20',
    border: 'border-indigo-500/20',
    tags: [['Cold Start', 'red'], ['Unsupervised Clustering', 'cyan'], ['BNPL', 'amber'], ['0→1', 'green']] as [string,string][],
    bullets: [
      'Designed the complete underwriting charter for a new Pay in 3 product from zero — no historical repayment data, no prior labels',
      'Solved cold-start via unsupervised clustering: grouped users by behavioural and demographic signals to create risk segments',
      'Segments serve as proxy risk tiers for initial credit decisions until supervised signal accumulates',
      'Architecture transitions gracefully from cluster-based heuristics → supervised ML as label volume grows',
    ],
  },
  {
    icon: '🎯',
    title: 'Personalisation Systems',
    subtitle: 'Offer ordering · Credit limits · Product surfaces',
    accent: 'from-cyan-500/20 to-teal-500/20',
    border: 'border-cyan-500/20',
    tags: [['Personalisation', 'cyan'], ['Ranking', ''], ['User Segmentation', 'green']] as [string,string][],
    bullets: [
      'Individual-level offer ordering and re-ranking to surface the most relevant loan product per user intent signal',
      'Credit limit personalisation using behavioural features — balancing risk appetite with revenue potential',
      'Product surface customisation: tailoring what each user sees based on segment, intent, and risk profile',
      'Feeds directly into the LTR scoring pipeline for a unified ranking → personalisation loop',
    ],
  },
]

function Tag({ label, color }: { label: string; color: string }) {
  const cls = color ? `tag tag-${color}` : 'tag'
  return <span className={cls}>{label}</span>
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string }[]; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="custom-tooltip">
      <div className="font-semibold mb-1">{label}</div>
      {payload.map(p => (
        <div key={p.name} style={{ color: p.name === 'actual' ? '#10b981' : '#f59e0b' }}>
          {p.name === 'actual' ? 'Actual' : 'Projected'}: ₹{p.value} Cr
        </div>
      ))}
    </div>
  )
}

export default function SuperMoney() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [expanded, setExpanded] = useState<string | null>(null)

  const toggle = (t: string) => setExpanded(e => e === t ? null : t)

  return (
    <section id="supermoney" className="max-w-7xl mx-auto px-6 py-24">
      <div ref={ref}>
        {/* header banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden mb-12 p-8 sm:p-12"
          style={{
            background: 'linear-gradient(135deg, #0f2010 0%, #0a1f14 50%, #0a1628 100%)',
            border: '1px solid rgba(16,185,129,0.2)',
            boxShadow: '0 0 60px rgba(16,185,129,0.08)',
          }}
        >
          <div className="pointer-events-none absolute top-0 right-0 w-80 h-80"
            style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)' }} />

          <div className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2 flex items-center gap-2">
            <span className="live-dot" /> Founding Data Scientist · Current Role
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Building ML from scratch at&nbsp;
            <span className="gradient-text-green">SuperMoney</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mb-6">
            Zero to one — replacing the entire rule-based + traditional model stack with a modern ML system.
            Currently at&nbsp;
            <strong className="text-amber-400">₹60 Cr/month incremental delta</strong>, targeting&nbsp;
            <strong className="text-emerald-400">₹300 Cr/month by December 2026</strong>.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
            {[
              ['₹60 Cr', 'Current/Month'],
              ['₹300 Cr', 'Target Dec 2026'],
              ['5×', 'Projected Growth'],
              ['100%', 'ML-Replaced Rules'],
            ].map(([v, l]) => (
              <div key={l} className="bg-white/[0.04] border border-white/[0.07] rounded-xl p-3 text-center">
                <div className="text-lg font-black text-white">{v}</div>
                <div className="text-xs text-slate-500 font-medium">{l}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="glass rounded-2xl p-6 mb-10"
        >
          <h3 className="text-white font-semibold mb-4">Personal Loans Incremental Delta — Actual vs Projected (₹ Cr/month)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={supermoneyTrajectory}>
              <defs>
                <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="projGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#f59e0b" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false}
                tickFormatter={v => `₹${v}`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="actual"    stroke="#10b981" strokeWidth={2.5} fill="url(#actualGrad)" connectNulls={false} name="actual" dot={{ r: 4, fill: '#10b981' }} />
              <Area type="monotone" dataKey="projected" stroke="#f59e0b" strokeWidth={2} strokeDasharray="6 4" fill="url(#projGrad)" connectNulls={false} name="projected" dot={{ r: 4, fill: '#f59e0b' }} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* project cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-8">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              className={`glass glass-hover rounded-2xl p-6 bg-gradient-to-br ${p.accent} border ${p.border}`}
            >
              <div className="text-3xl mb-3">{p.icon}</div>
              <h3 className="text-white font-bold text-lg mb-1">{p.title}</h3>
              <p className="text-slate-500 text-xs mb-3">{p.subtitle}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.tags.map(([l, c]) => <Tag key={l} label={l} color={c} />)}
              </div>
              <ul className="space-y-2">
                {p.bullets.map((b, bi) => (
                  <li key={bi} className="flex gap-2.5 text-xs text-slate-400 leading-relaxed">
                    <span className="mt-1.5 flex-shrink-0 w-1 h-1 rounded-full bg-emerald-400/60" />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* expandable: LTR methodology */}
        {[
          {
            title: 'Learning to Rank — Methodology',
            content: (
              <div className="grid sm:grid-cols-2 gap-6 text-sm text-slate-400 leading-relaxed">
                <div>
                  <p className="font-semibold text-white mb-2">Why LTR over a binary classifier?</p>
                  <p>A binary classifier answers &quot;approve or not?&quot;. LTR answers &quot;given this user, which loan product should we show first to maximise the probability of a good conversion?&quot; — it optimises the <em className="text-indigo-300">ordering</em> of offers, not just a threshold.</p>
                  <div className="mt-4 bg-black/30 rounded-xl p-4 font-mono text-xs text-slate-300">
                    User signals  ─┐<br/>
                    Loan features ─┼─► Feature Vector ─► LTR Model ─► Ranked Offers<br/>
                    Context       ─┘       │<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Objective: NDCG / MAP
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-white mb-2">Reject Inferencing integration</p>
                  <p>Standard train set = only approved users → <span className="text-red-400 font-medium">survivor bias</span>. Rejection rates in personal loans can be 60–70%+, meaning a purely supervised model is trained on a tiny, unrepresentative slice of the market.</p>
                  <div className="mt-4 bg-black/30 rounded-xl p-4 font-mono text-xs text-slate-300">
                    All Applicants<br/>
                    ├── Approved ──► Observed label<br/>
                    └── Rejected ──► No label ← PROBLEM<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Reject Inferencing<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Unbiased model
                  </div>
                </div>
              </div>
            ),
          },
          {
            title: 'Pay in 3 — Cold-Start Clustering Architecture',
            content: (
              <div className="bg-black/30 rounded-xl p-5 font-mono text-xs text-slate-300 leading-loose overflow-x-auto">
                {'          NEW USERS (no repayment history)\n                      │\n       ┌──────────────┼──────────────┐\n       │              │              │\n Behavioural     Demographic    Bureau Proxy\n  Signals          Signals        Signals\n(txn velocity,   (age, city,   (thin file,\n device price,  income proxy)  enquiry cnt)\n  app usage)\n       │              │              │\n       └──────────────┴──────────────┘\n                      │\n          Unsupervised Clustering\n         (K-Means / DBSCAN / GMM)\n                      │\n          ┌───────────┴───────────┐\n     Cluster A    Cluster B   Cluster C\n     Low Risk     Med Risk    High Risk\n          │\n   Monitor repayment signal\n          │\n   Enough labels? ─► Bootstrap Supervised Model\n                      └─► Retire clusters → full ML'}
              </div>
            ),
          },
        ].map(item => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mb-3 glass rounded-2xl overflow-hidden"
          >
            <button
              className="w-full flex items-center justify-between px-6 py-4 text-sm font-semibold text-slate-300 hover:text-white transition-colors"
              onClick={() => toggle(item.title)}
            >
              <span>▸  {item.title}</span>
              <motion.div animate={{ rotate: expanded === item.title ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={16} />
              </motion.div>
            </button>
            <AnimatePresence>
              {expanded === item.title && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 border-t border-white/[0.06] pt-4">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
