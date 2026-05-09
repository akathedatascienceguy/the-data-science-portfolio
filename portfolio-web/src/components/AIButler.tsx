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
  { num: '01', title: 'Knowledge Base',   desc: 'Curated DS problem-solution pairs, papers, competition insights — structured for fast, precise retrieval' },
  { num: '02', title: 'Context Graph',    desc: 'Connects concepts, methods, datasets, and failure modes. The system knows what it knows and what it doesn\'t' },
  { num: '03', title: 'Fine-tuned LLM',   desc: 'Trained on DS reasoning chains — not generic instruction following. Thinks like a senior practitioner' },
  { num: '04', title: 'DS Engine',        desc: 'Automated EDA → Feature Eng → Model Selection → Eval → Ensemble. Competes and solves, not just advises' },
]

export default function AIButler() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="aibutler" className="max-w-6xl mx-auto px-8 py-24">
      <div ref={ref}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          <div className="flex items-baseline gap-4 mb-4">
            <span className="font-mono text-[0.62rem] text-g-600 tracking-widest2 uppercase">04</span>
            <h2 className="text-3xl font-light text-apple tracking-tight">AI Butler</h2>
          </div>
          <p className="font-mono text-xs text-g-500 uppercase tracking-widest2 mb-12">
            Personal Project · Agentic AI · Data Science Engine
          </p>
        </motion.div>

        {/* manifesto */}
        <Reveal delay={0.1}>
          <blockquote className="border-l border-white/20 pl-8 mb-16">
            <p className="text-2xl sm:text-3xl font-light text-apple leading-relaxed tracking-tight mb-4">
              Imagine hiring a world-class data science team — one that never sleeps, has solved thousands of business problems, and learns from every dataset it touches.
            </p>
            <p className="font-mono text-xs text-g-500 uppercase tracking-widest2">That&apos;s AI Butler.</p>
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
            <div className="font-mono text-[0.62rem] text-g-600 uppercase tracking-widest2 mb-5">vs. Generic RAG</div>
            <div className="space-y-0">
              {[
                ['KB + Context Graph', 'Structured problem→solution index', 'Fast retrieval of relevant prior art — no generic paraphrasing'],
                ['Fine-tuned Models',  'Domain-specific DS reasoning chains', 'Superior judgment vs. generic instruction following'],
                ['Specialised Engine', 'End-to-end EDA → model → ensemble', 'Full-stack execution, not just a prompt wrapper'],
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
              <div className="font-mono text-[0.62rem] text-g-600 uppercase tracking-widest2 mb-5">DS Competition Engine</div>
              <div className="font-mono text-[0.7rem] text-g-300 leading-loose">
                {`Problem Statement
      │
  EDA Agent ──► Profiling, anomaly detection
      │
  Feature Eng. Agent ──► Domain-aware transforms
      │
  Model Selection ──► Tabular / Sequence / Graph
      │
  Experiment Tracker ──► Optuna / CV strategy
      │
  Ensemble Agent ──► Stacking, blending, OOF
      │
  Submission Agent ──► Format + leaderboard`}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="bg-black p-8">
              <div className="font-mono text-[0.62rem] text-g-600 uppercase tracking-widest2 mb-5">DS GPT — Reasoning Mode</div>
              <div className="space-y-4 text-xs text-g-400 font-light leading-relaxed">
                {[
                  ['Dataset intake', 'Infers schema, dtypes, cardinality, target leakage automatically'],
                  ['Modelling', 'Selects paradigm (tabular / sequence / graph) based on data shape and task'],
                  ['Experimentation', 'Proposes, evaluates, feeds back — like a senior DS on autopilot'],
                  ['Failure diagnosis', 'Differential-diagnosis: distribution shift, label noise, calibration errors'],
                  ['Research retrieval', 'Surfaces papers and competition solutions from knowledge graph'],
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
