'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { selmoreVersions, selmoreSavings } from '@/data/portfolio'

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

function Tag({ label }: { label: string }) {
  return <span className="tag">{label}</span>
}

const versions = [
  { v: 'V1→V2', prec: '14.6% → 37%', items: ['Skipped events 40% → <1%; added approval amounts', 'Coverage: 2–8 → 2–15 cycle users', 'Pipeline: 2 months → 2.5 days; JSON gen 66 min → 8 min'] },
  { v: 'V3',    prec: '37% → 44%',   items: ['user_m_e_act: time since last identical merchant event', '13 events incl. approvals for point-in-time savings', 'Tolerance testing + precision/recall alerting pipeline'] },
  { v: 'V4',    prec: '44% → 53%',   items: ['DPD30 + DPD90 multi-task; training 7 days → 1 day', 'DynamoDB → MongoDB (50% cost reduction)', 'TF Serving; exchange rate ₹31L → ₹18L per crore blocked'] },
  { v: 'V5',    prec: '53%+',         items: ['Self-attention over event sequence', 'Transformer encoder replaces upper LSTM stack'] },
]

export default function SeLMoRe() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="selmore" className="max-w-6xl mx-auto px-8 py-24">
      <div ref={ref}>
        {/* header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          <div className="flex items-baseline gap-4 mb-4">
            <span className="font-mono text-[0.62rem] text-g-600 tracking-widest2 uppercase">02</span>
            <h2 className="text-3xl font-light text-apple tracking-tight">SeLMoRe</h2>
          </div>
          <p className="font-mono text-xs text-g-500 uppercase tracking-widest2 mb-2">
            Antifraud · Sequence-Level Model for Repeat-user Fraud · Simpl
          </p>
          <div className="flex flex-wrap gap-1.5 mb-12">
            {['Stacked LSTM', 'Multi-Task Learning', 'TF Serving', 'Apache Flink', 'MaaS', '5ms Latency'].map(t => <Tag key={t} label={t} />)}
          </div>
        </motion.div>

        {/* metrics grid */}
        <Reveal delay={0.1}>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-px bg-white/[0.06] mb-12">
            {[
              ['53%', 'Precision'], ['34.7%', 'Recall'], ['86.4%', 'In-Time AUC'],
              ['79.2%', 'OOT AUC'], ['5ms', 'P90 Lat.'], ['₹12.54Cr', 'Net Savings'],
              ['~15K', 'Blocks/mo'], ['2+ yrs', 'Production'],
            ].map(([v, l]) => (
              <div key={l} className="bg-black p-5 text-center">
                <div className="font-mono text-base font-medium text-apple mb-1">{v}</div>
                <div className="font-mono text-[0.58rem] text-g-600 uppercase tracking-widest2">{l}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* charts */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <Reveal delay={0.15}>
            <div>
              <div className="font-mono text-[0.62rem] text-g-600 uppercase tracking-widest2 mb-5">Precision Evolution — 2 Years</div>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={selmoreVersions}>
                  <CartesianGrid strokeDasharray="2 4" />
                  <XAxis dataKey="version" />
                  <YAxis tickFormatter={v => `${v}%`} domain={[0, 65]} />
                  <ReferenceLine y={50} stroke="rgba(255,255,255,0.12)" strokeDasharray="3 3" />
                  <Tooltip content={({ active, payload }) => {
                    if (!active || !payload?.length) return null
                    const d = payload[0].payload
                    return <div className="chart-tooltip"><div className="text-g-400">{d.version} · {d.label}</div><div className="text-apple font-medium">{d.precision}%</div></div>
                  }} />
                  <Line type="monotone" dataKey="precision" stroke="#f5f5f7" strokeWidth={1.5}
                    dot={{ r: 3.5, fill: '#000', stroke: '#f5f5f7', strokeWidth: 1.5 }}
                    activeDot={{ r: 5, fill: '#f5f5f7' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div>
              <div className="font-mono text-[0.62rem] text-g-600 uppercase tracking-widest2 mb-5">Cumulative Impact (₹ Cr)</div>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={selmoreSavings}>
                  <defs>
                    <linearGradient id="netG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%"   stopColor="#f5f5f7" stopOpacity={0.08} />
                      <stop offset="100%" stopColor="#f5f5f7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 4" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={v => `₹${v}`} />
                  <Tooltip content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null
                    return (
                      <div className="chart-tooltip">
                        <div className="text-g-400 mb-1">{label}</div>
                        {payload.map(p => p.value != null && (
                          <div key={p.dataKey as string} className="flex justify-between gap-4">
                            <span className="text-g-400">{String(p.dataKey)}</span>
                            <span className="text-apple">₹{p.value} Cr</span>
                          </div>
                        ))}
                      </div>
                    )
                  }} />
                  <Area type="monotone" dataKey="net"   stroke="#f5f5f7" strokeWidth={1.5} fill="url(#netG)" />
                  <Line type="monotone" dataKey="gross" stroke="#636366" strokeWidth={1} strokeDasharray="3 3" dot={false} />
                  <Line type="monotone" dataKey="cost"  stroke="#48484a" strokeWidth={0.8} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Reveal>
        </div>

        {/* version history */}
        <Reveal delay={0.25}>
          <div className="font-mono text-[0.62rem] text-g-600 uppercase tracking-widest2 mb-6">Version History</div>
          <div className="space-y-0">
            {versions.map((row, i) => (
              <div key={row.v} className="grid sm:grid-cols-[80px_120px_1fr] gap-x-8 gap-y-2 py-5 border-b border-white/[0.06] last:border-0">
                <div className="font-mono text-xs text-apple">{row.v}</div>
                <div className="font-mono text-xs text-g-500">{row.prec}</div>
                <ul className="space-y-1.5">
                  {row.items.map((item, ii) => (
                    <li key={ii} className="flex gap-3 text-xs text-g-400 font-light">
                      <span className="text-g-700 flex-shrink-0">—</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
