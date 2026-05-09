'use client'
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const tabs = ['LTV Model', 'Reject Inferencing', 'TU V3']

function Tag({ label }: { label: string }) { return <span className="tag">{label}</span> }
function Row({ v, l }: { v: string; l: string }) {
  return (
    <div className="flex items-baseline justify-between py-3 border-b border-white/[0.05] last:border-0">
      <span className="font-mono text-[0.65rem] text-g-500 uppercase tracking-widest2">{l}</span>
      <span className="font-mono text-sm text-apple">{v}</span>
    </div>
  )
}

const aucData = [{ label: 'Baseline', auc: 71 }, { label: '+Reject Inf.', auc: 76 }]

export default function Underwriting() {
  const [tab, setTab] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="underwriting" className="max-w-6xl mx-auto px-8 py-24">
      <div ref={ref}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          <div className="flex items-baseline gap-4 mb-12">
            <span className="font-mono text-[0.62rem] text-g-600 tracking-widest2 uppercase">03</span>
            <h2 className="text-3xl font-light text-apple tracking-tight">Underwriting</h2>
          </div>
        </motion.div>

        {/* tab bar — text underline style */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.1 }}
          className="flex gap-8 border-b border-white/[0.07] mb-10">
          {tabs.map((t, i) => (
            <button key={t} onClick={() => setTab(i)}
              className={`font-mono text-[0.65rem] uppercase tracking-widest2 pb-3 -mb-px border-b transition-all duration-200 ${
                tab === i ? 'text-apple border-apple' : 'text-g-500 border-transparent hover:text-g-300'
              }`}
            >{t}</button>
          ))}
        </motion.div>

        <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>

          {/* LTV Model */}
          {tab === 0 && (
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {['Stacked LSTM', 'Multi-Task', 'DPD30 + LTV', '10M+ Users'].map(t => <Tag key={t} label={t} />)}
                </div>
                <div className="bg-g-950 border border-white/[0.06] p-5 font-mono text-[0.7rem] text-g-300 leading-loose mb-6">
                  Input → Embedding → LSTM₁(64) → LSTM₂(32)<br/>
                  &nbsp;├─ Dense → Dense → Sigmoid → <span className="text-apple">DPD30</span><br/>
                  &nbsp;└─ Dense → Dense → Sigmoid → <span className="text-g-300">LTV</span>
                </div>
                <div className="space-y-3">
                  {[
                    'Masking for variable-length sequences; Dropout + Layer + Batch Normalisation',
                    'Split 80/20 → 90/10 for additional training signal',
                    'Formula D/(1-D)×R → +6pp retention uplift with only 0.089% delinquency trade-off at same recall',
                    'CTR uplift for high-intent users: 0.1% → 0.26%',
                    'Features: merchant, txn amount log/ratio, time-of-day, device price, demographics, rate-of-events, device-city',
                  ].map((b, i) => (
                    <div key={i} className="flex gap-4 text-xs text-g-400 font-light leading-relaxed">
                      <span className="text-g-700 flex-shrink-0">—</span>{b}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-0">
                {[['71%', 'ROC-AUC · Approval'], ['65%', 'ROC-AUC · Retention'], ['10M+', 'Users Approved'], ['₹121.5 Cr', 'Revenue Generated'], ['3K/day', 'New User Acquisition'], ['80%', 'Share of Total Approvals']].map(([v, l]) => <Row key={l} v={v} l={l} />)}
              </div>
            </div>
          )}

          {/* Reject Inferencing */}
          {tab === 1 && (
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {['Autoencoder', 'USL→SL', 'CRIF · TU · Myntra · Zepto'].map(t => <Tag key={t} label={t} />)}
                </div>
                <div className="space-y-4 text-xs text-g-400 font-light leading-relaxed mb-6">
                  <p><span className="text-apple font-medium">Problem:</span> Supervised models trained on approved users only → confirmation bias. Rejected population never observed.</p>
                  <p><span className="text-apple font-medium">Solution:</span> Autoencoder (Encoder → Bottleneck → Decoder, minimise reconstruction loss) trained on alternate merchant and bureau data to generate latent representations for rejected users.</p>
                  <p><span className="text-g-300 font-medium">Why AE &gt; PCA:</span> Captures non-linear interactions. VAE extension uses KL divergence to regularise the latent space to a Gaussian — enabling generation.</p>
                </div>
                <div className="bg-g-950 border border-white/[0.06] p-5 font-mono text-[0.7rem] text-g-300 leading-loose">
                  X → Encoder → Z → Decoder → X̂ · min RE Loss<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Z as user embedding<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Supervised training with pseudo-labels
                </div>
              </div>
              <div>
                <div className="font-mono text-[0.62rem] text-g-600 uppercase tracking-widest2 mb-5">OOT ROC-AUC Uplift</div>
                <ResponsiveContainer width="100%" height={160}>
                  <LineChart data={aucData}>
                    <CartesianGrid strokeDasharray="2 4" />
                    <XAxis dataKey="label" />
                    <YAxis domain={[68, 80]} tickFormatter={v => `${v}%`} />
                    <Tooltip content={({ active, payload, label }) => {
                      if (!active || !payload?.length) return null
                      return <div className="chart-tooltip">{label}: <span className="text-apple font-medium">{payload[0].value}%</span></div>
                    }} />
                    <Line type="monotone" dataKey="auc" stroke="#f5f5f7" strokeWidth={1.5}
                      dot={{ r: 5, fill: '#000', stroke: '#f5f5f7', strokeWidth: 1.5 }} />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-6 space-y-0">
                  {[['71% → 76%', 'OOT ROC-AUC'], ['+5pp', 'Uplift'], ['4 sources', 'Alternate Data'], ['No labels', 'Unsupervised']].map(([v, l]) => <Row key={l} v={v} l={l} />)}
                </div>
              </div>
            </div>
          )}

          {/* TU V3 */}
          {tab === 2 && (
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {['LightGBM', 'TransUnion CIBIL', '+8% ROC-AUC', '2.3M Approvals', '−3% Delinquency'].map(t => <Tag key={t} label={t} />)}
                </div>
                <div className="space-y-3">
                  {[
                    'Integrated TransUnion bureau data with merchant and user activity features into an enhanced LightGBM credit model',
                    'End-to-end ownership: EDA → feature engineering (identity + credit-level) → model selection → containerised prediction pipeline',
                    '+8% ROC-AUC over existing model, enabling 2.3M previously unapproved users to gain approval',
                    'Drove 200–300 incremental transaction users/day — largest contributor to approvals after baseline',
                    'Outperformed TU V2 on high-risk unapproved users, contributing to −3% delinquency rate',
                  ].map((b, i) => (
                    <div key={i} className="flex gap-4 text-xs text-g-400 font-light leading-relaxed">
                      <span className="text-g-700 flex-shrink-0">—</span>{b}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-0">
                {[['+8%', 'ROC-AUC Uplift'], ['2.3M+', 'New Approvals'], ['200–300', 'Users/Day Incremental'], ['−3%', 'Delinquency Drop']].map(([v, l]) => <Row key={l} v={v} l={l} />)}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
