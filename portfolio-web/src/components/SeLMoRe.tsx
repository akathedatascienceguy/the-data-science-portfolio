'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from 'recharts'
import { selmoreVersions, selmoreSavings } from '@/data/portfolio'

function Tag({ label, color }: { label: string; color: string }) {
  return <span className={`tag${color ? ` tag-${color}` : ''}`}>{label}</span>
}

function MetricPill({ val, lbl }: { val: string; lbl: string }) {
  return (
    <div className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-3 text-center min-w-[100px]">
      <div className="text-lg font-black text-white">{val}</div>
      <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-0.5">{lbl}</div>
    </div>
  )
}

export default function SeLMoRe() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="selmore" className="max-w-7xl mx-auto px-6 py-24">
      <div ref={ref}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <div className="section-line" />
          <h2 className="text-3xl font-bold text-white mb-2">Antifraud · SeLMoRe</h2>
          <p className="text-slate-400 mb-8">Sequence-Level Model for Repeat-user fraud · Real-Time Deep Learning · Simpl</p>
        </motion.div>

        {/* tags */}
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.1, duration: 0.5 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {[
            ['Stacked LSTM', ''], ['Multi-Task Learning', 'cyan'], ['MaaS', 'green'],
            ['5ms Latency', 'green'], ['TF Serving', 'cyan'], ['Apache Flink', ''],
            ['DynamoDB→MongoDB', 'amber'], ['Databricks / PySpark', 'cyan'],
          ].map(([l, c]) => <Tag key={l} label={l} color={c} />)}
        </motion.div>

        {/* metric pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15, duration: 0.5 }}
          className="flex flex-wrap gap-3 mb-10"
        >
          {[
            ['53%', 'Precision'], ['34.7%', 'Recall'], ['86.44%', 'In-Time ROC-AUC'],
            ['79.23%', 'OOT ROC-AUC'], ['5ms', 'P90 Latency'], ['₹12.54 Cr', 'Net Savings'],
            ['~15K', 'Blocks/Month'], ['2+ yrs', 'In Production'],
          ].map(([v, l]) => <MetricPill key={l} val={v} lbl={l} />)}
        </motion.div>

        {/* charts row */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* precision evolution */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2, duration: 0.5 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-white font-semibold mb-4">Precision Evolution (2+ Years)</h3>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={selmoreVersions}>
                <defs>
                  <linearGradient id="precGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="version" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} domain={[0, 65]} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null
                    const d = payload[0].payload
                    return (
                      <div className="custom-tooltip">
                        <div className="font-semibold">{d.version} — {d.label}</div>
                        <div className="text-indigo-400 font-bold">{d.precision}% precision</div>
                      </div>
                    )
                  }}
                />
                <ReferenceLine y={50} stroke="rgba(16,185,129,0.3)" strokeDasharray="4 3" label={{ value: '50% target', fill: '#10b981', fontSize: 10, position: 'insideTopRight' }} />
                <Area type="monotone" dataKey="precision" stroke="#6366f1" strokeWidth={2.5} fill="url(#precGrad)"
                  dot={{ r: 5, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 7, fill: '#6366f1' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* financial impact */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3, duration: 0.5 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-white font-semibold mb-4">Cumulative Financial Impact (₹ Cr)</h3>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={selmoreSavings}>
                <defs>
                  <linearGradient id="grossGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="netGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v}`} />
                <Tooltip content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null
                  return (
                    <div className="custom-tooltip">
                      <div className="font-semibold mb-1">{label}</div>
                      {payload.map(p => (
                        <div key={p.dataKey as string} className="flex justify-between gap-4" style={{ color: p.stroke as string }}>
                          <span>{p.name === 'gross' ? 'Gross' : p.name === 'net' ? 'Net' : 'Cost'}</span>
                          <span className="font-bold">₹{p.value} Cr</span>
                        </div>
                      ))}
                    </div>
                  )
                }} />
                <Area type="monotone" dataKey="gross" stroke="#10b981" strokeWidth={2} fill="url(#grossGrad)" name="gross" />
                <Area type="monotone" dataKey="net"   stroke="#6366f1" strokeWidth={2} strokeDasharray="5 3" fill="url(#netGrad)" name="net" />
                <Area type="monotone" dataKey="cost"  stroke="#ef4444" strokeWidth={1.5} fill="none" name="cost" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* version history */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4, duration: 0.5 }}
          className="glass rounded-2xl p-6"
        >
          <h3 className="text-white font-semibold mb-5">Version History — 2+ Years of Iteration</h3>
          <div className="space-y-4">
            {[
              {
                v: 'V1 → V2', prec: '14.6% → 37%', color: '#8b5cf6',
                items: ['Skipped events ~40% → <1%; added approval amounts, removed redundant features', 'Coverage: 2–8 → 2–15 cycle users', 'Pipeline: training time 2 months → 2.5 days; JSON generation 66 min → 8 min for 100K records'],
              },
              {
                v: 'V3', prec: '37% → 44%', color: '#6366f1',
                items: ['Novel user_m_e_act feature: time since last identical event at a merchant — flags suspicious velocity', '13 key events including approvals for point-in-time savings', 'Tolerance testing under 5–20% skipped events + precision/recall alerting'],
              },
              {
                v: 'V4', prec: '44% → 53%', color: '#06b6d4',
                items: ['Simultaneously trained on DPD30 & DPD90; training lifecycle 7 days → 1 day', 'DynamoDB → MongoDB (50% storage cost reduction); TF Serving integration', 'Exchange rate improved ₹31L → ₹18L per crore blocked'],
              },
              {
                v: 'V5', prec: '53%+', color: '#10b981',
                items: ['Self-attention over event sequence for global context capture', 'Transformer encoder layers replace upper LSTM stack for parallelised training'],
              },
            ].map((row, i) => (
              <div key={row.v} className="flex gap-4 items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-white"
                    style={{ background: `${row.color}25`, border: `1px solid ${row.color}50` }}>
                    {row.v.split(' → ')[0]}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="text-sm font-bold text-white">{row.v}</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: `${row.color}20`, color: row.color }}>
                      {row.prec} precision
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {row.items.map((item, ii) => (
                      <li key={ii} className="text-xs text-slate-400 flex gap-2">
                        <span style={{ color: row.color }} className="mt-1 flex-shrink-0">▸</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
