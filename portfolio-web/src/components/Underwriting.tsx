'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const tabs = ['LTV Approval & Retention', 'Reject Inferencing', 'TU V3 Credit Model']

function Tag({ label, color }: { label: string; color: string }) {
  return <span className={`tag${color ? ` tag-${color}` : ''}`}>{label}</span>
}
function M({ v, l }: { v: string; l: string }) {
  return (
    <div className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-3 text-center">
      <div className="text-lg font-black text-white">{v}</div>
      <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-0.5">{l}</div>
    </div>
  )
}

const oocData = [
  { label: 'Supervised Only', auc: 71 },
  { label: 'With Reject Inf.', auc: 76 },
]

export default function Underwriting() {
  const [tab, setTab] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="underwriting" className="max-w-7xl mx-auto px-6 py-24">
      <div ref={ref}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <div className="section-line" />
          <h2 className="text-3xl font-bold text-white mb-8">Underwriting Systems · Simpl</h2>
        </motion.div>

        {/* tab switcher */}
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.1, duration: 0.4 }}
          className="flex gap-1 p-1 bg-white/[0.03] border border-white/[0.07] rounded-xl w-fit mb-8 flex-wrap"
        >
          {tabs.map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(i)}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                tab === i ? 'bg-indigo-500 text-white shadow-glow-indigo' : 'text-slate-400 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </motion.div>

        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* ── LTV Model ── */}
          {tab === 0 && (
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 glass rounded-2xl p-6">
                <div className="flex flex-wrap gap-2 mb-5">
                  {[['Stacked LSTM', ''], ['Multi-Task', 'cyan'], ['DPD30 + LTV', 'green'], ['10M+ Users', 'amber']].map(([l, c]) => <Tag key={l} label={l} color={c} />)}
                </div>
                <h3 className="text-white font-bold text-lg mb-1">LSTM-based LTV Underwriting Model</h3>
                <p className="text-sm text-slate-500 mb-4">Approval · Retention · Multi-Task Learning</p>

                <div className="bg-black/30 rounded-xl p-4 font-mono text-xs text-slate-300 mb-5 leading-relaxed">
                  Input → Embedding Layer → LSTM₁(64) → LSTM₂(32)<br/>
                  &nbsp;&nbsp;├─ Dense₁ → Dense₂ → Sigmoid → <span className="text-indigo-400">DPD30</span><br/>
                  &nbsp;&nbsp;└─ Dense₃ → Dense₄ → Sigmoid → <span className="text-emerald-400">LTV</span>
                </div>

                <div className="space-y-2 text-sm text-slate-400">
                  {[
                    'Masking layer for variable-length sequences + Dropout + Layer + Batch Normalisation',
                    'Split 80/20 → 90/10 for more training signal',
                    'Formula D/(1-D)×R → +6 pp retention uplift with only 0.089% delinquency trade-off at same recall',
                    'CTR uplift for high-intent users: 0.1% → 0.26%',
                    'Features: Merchant, Txn amount (log/ratio), Time-of-day, Device price/affluence, Demographics, Rate-of-events, Device-city interaction',
                  ].map((b, i) => (
                    <div key={i} className="flex gap-2">
                      <span className="text-indigo-400 mt-1 flex-shrink-0 text-xs">▸</span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {[
                  ['71%', 'ROC-AUC (Approval)'],
                  ['65%', 'ROC-AUC (Retention)'],
                  ['10M+', 'Users Approved'],
                  ['₹121.5 Cr', 'Revenue Generated'],
                  ['3K/day', 'New User Acquisition'],
                  ['80%', 'Share of Total Approvals'],
                ].map(([v, l]) => <M key={l} v={v} l={l} />)}
              </div>
            </div>
          )}

          {/* ── Reject Inferencing ── */}
          {tab === 1 && (
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="glass rounded-2xl p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {[['Autoencoder', ''], ['USL→SL', 'cyan'], ['CRIF · TU · Myntra · Zepto', 'amber']].map(([l, c]) => <Tag key={l} label={l} color={c} />)}
                </div>
                <h3 className="text-white font-bold text-lg mb-4">Autoencoder-based Reject Inferencing</h3>

                <div className="space-y-4 text-sm text-slate-400">
                  <p><span className="text-red-400 font-semibold">Problem:</span> Supervised models trained only on approved users suffer from confirmation bias — rejected users are never observed.</p>
                  <p><span className="text-emerald-400 font-semibold">Solution:</span> Autoencoder pipeline (Encoder → Bottleneck → Decoder, minimise reconstruction loss) trained on alternate merchant (Myntra, Zepto) and bureau data (CRIF, TransUnion) to generate enriched latent representations for rejected users.</p>
                  <p><span className="text-indigo-300 font-semibold">Why AE &gt; PCA?</span> Captures non-linear interactions (PCA/SVD are purely linear). VAE extension uses KL divergence to regularise latent distribution to a Gaussian — enabling generation.</p>
                </div>

                <div className="mt-5 bg-black/30 rounded-xl p-4 font-mono text-xs text-slate-300 leading-relaxed">
                  X ──► Encoder ──► Bottleneck Z ──► Decoder ──► X̂<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Minimise RE Loss<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Z as enriched user vector<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Supervised training with pseudo-labels
                </div>
              </div>

              <div className="glass rounded-2xl p-6 flex flex-col gap-5">
                <h3 className="text-white font-semibold">OOT ROC-AUC Uplift</h3>
                <ResponsiveContainer width="100%" height={180}>
                  <AreaChart data={oocData}>
                    <defs>
                      <linearGradient id="aucGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} domain={[68, 80]} />
                    <Tooltip content={({ active, payload, label }) => {
                      if (!active || !payload?.length) return null
                      return <div className="custom-tooltip">{label}: <strong>{payload[0].value}%</strong> ROC-AUC</div>
                    }} />
                    <Area type="monotone" dataKey="auc" stroke="#10b981" strokeWidth={3} fill="url(#aucGrad)" dot={{ r: 7, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }} />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-3">
                  {[['71%→76%', 'OOT ROC-AUC'], ['+5pp', 'Uplift'], ['4 Sources', 'Alternate Data'], ['No Labels', 'Unsupervised']].map(([v, l]) => <M key={l} v={v} l={l} />)}
                </div>
              </div>
            </div>
          )}

          {/* ── TU V3 ── */}
          {tab === 2 && (
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 glass rounded-2xl p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {[['LightGBM', ''], ['TransUnion CIBIL', 'amber'], ['+8% ROC-AUC', 'green'], ['2.3M Approvals', 'cyan'], ['-3% Delinquency', 'green']].map(([l, c]) => <Tag key={l} label={l} color={c} />)}
                </div>
                <h3 className="text-white font-bold text-lg mb-1">TU V3 — Growth Credit Scoring Model</h3>
                <p className="text-slate-500 text-sm mb-5">LightGBM · TransUnion Bureau Integration · 2.3M+ Approvals</p>
                <div className="space-y-2.5 text-sm text-slate-400">
                  {[
                    'Integrated TransUnion (CIBIL) bureau data with merchant and user activity features into an enhanced LightGBM credit model',
                    'End-to-end ownership: EDA → feature engineering (identity + credit-level) → model selection → containerised prediction pipeline',
                    '+8% ROC-AUC over existing model, enabling 2.3M previously unapproved users to gain approval',
                    'Drove 200–300 incremental transaction users/day — largest contributor to approvals after baseline models',
                    'Outperformed TU V2 on high-risk UNT (unapproved) users, contributing to −3% delinquency rate',
                  ].map((b, i) => (
                    <div key={i} className="flex gap-2">
                      <span className="text-amber-400 mt-1 flex-shrink-0 text-xs">▸</span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                {[['+8%', 'ROC-AUC Improvement'], ['2.3M+', 'New Users Approved'], ['200–300', 'Incremental Users/Day'], ['−3%', 'Delinquency Drop']].map(([v, l]) => <M key={l} v={v} l={l} />)}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
