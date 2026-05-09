'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const pillars = [
  { icon: '📚', title: 'Knowledge Base', desc: 'Curated DS problem-solution pairs, papers, competition insights — structured for fast retrieval', color: '#6366f1' },
  { icon: '🕸️', title: 'Context Graph', desc: 'Connects concepts, methods, datasets, and failure modes — so the system knows what it doesn\'t know', color: '#06b6d4' },
  { icon: '🎯', title: 'Fine-tuned LLM', desc: 'Trained on DS reasoning chains for superior domain judgment — not generic instruction following', color: '#8b5cf6' },
  { icon: '⚙️', title: 'DS Engine', desc: 'Automated EDA → Feature Eng → Model Selection → Evaluation → Ensemble loop', color: '#10b981' },
]

export default function AIButler() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="aibutler" className="max-w-7xl mx-auto px-6 py-24">
      <div ref={ref}>
        {/* banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden mb-12 p-8 sm:p-12"
          style={{
            background: 'linear-gradient(135deg, #0c0c1a 0%, #16003a 50%, #0a1628 100%)',
            border: '1px solid rgba(139,92,246,0.25)',
            boxShadow: '0 0 60px rgba(139,92,246,0.08)',
          }}
        >
          <div className="pointer-events-none absolute top-0 right-0 w-96 h-96"
            style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)' }} />
          <div className="pointer-events-none absolute bottom-0 left-0 w-72 h-72"
            style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)' }} />

          <div className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-2">Personal Project · Agentic AI</div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            AI Butler —&nbsp;
            <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              The Data Science Engine
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mb-0">
            Imagine hiring a world-class data science team — one that never sleeps, has solved thousands of
            business problems, and learns from every dataset it touches.
            &nbsp;<strong className="text-violet-300">That&apos;s AI Butler.</strong>
          </p>
          <p className="text-slate-500 text-sm mt-4 max-w-2xl">
            While most teams stop at RAG / context layers over existing LLMs, AI Butler combines structured
            knowledge infrastructure, fine-tuned domain models, and full-stack specialised tooling — creating
            a system that doesn&apos;t just <em>answer</em> data science questions, it <em>executes</em> data science.
          </p>
        </motion.div>

        {/* pillars */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
              className="glass glass-hover rounded-2xl p-5"
              style={{ borderLeft: `3px solid ${p.color}` }}
            >
              <div className="text-2xl mb-3">{p.icon}</div>
              <div className="text-white font-bold text-sm mb-1.5">{p.title}</div>
              <div className="text-slate-500 text-xs leading-relaxed">{p.desc}</div>
            </motion.div>
          ))}
        </div>

        {/* comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="glass rounded-2xl p-6 mb-6"
        >
          <h3 className="text-white font-semibold mb-4">What makes AI Butler different</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.07]">
                  {['Track', 'What', 'Why Better Than Generic RAG'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-2 pr-6">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {[
                  ['KB + Context Graph', 'Structured DS knowledge indexed as problem→solution pairs', 'Fast retrieval of relevant prior art — no generic paraphrasing'],
                  ['Fine-tuned Models', 'Domain-specific fine-tuning on DS reasoning chains', 'Superior judgment on DS tasks vs. generic instruction following'],
                  ['Specialised Systems', 'End-to-end tooling for EDA, modelling, evaluation, ensembling', 'Full-stack execution, not just a prompt wrapper'],
                ].map(([track, what, why]) => (
                  <tr key={track}>
                    <td className="py-3 pr-6 text-violet-400 font-semibold text-xs">{track}</td>
                    <td className="py-3 pr-6 text-slate-300 text-xs">{what}</td>
                    <td className="py-3 text-slate-400 text-xs">{why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* two-panel: DS Engine + DS GPT */}
        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-white font-semibold mb-4">DS Competition Engine</h3>
            <div className="bg-black/30 rounded-xl p-4 font-mono text-xs text-slate-300 leading-loose">
              Problem Statement<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br/>
              EDA Agent ──► Profiling, anomaly detection,<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;distribution analysis<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br/>
              Feature Engineering Agent ──► Domain-aware<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;transforms, embeddings<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br/>
              Model Selection Agent ──► Tabular / Sequence /<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Graph paradigms<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br/>
              Ensemble Agent ──► Stacking, blending, OOF<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br/>
              Submission Agent ──► Format + leaderboard
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-white font-semibold mb-4">DS GPT — Reasoning Mode</h3>
            <div className="space-y-3 text-sm text-slate-400">
              {[
                ['Dataset intake', 'Infers schema, dtypes, cardinality, target leakage automatically'],
                ['Modelling choices', 'Selects paradigm (tabular ML, sequence, graph) based on data shape and task type'],
                ['Experimentation', 'Proposes experiments, evaluates, feeds back into reasoning loop — like a senior DS on autopilot'],
                ['Failure diagnosis', 'Applies differential-diagnosis framework: rules out distribution shift, label noise, calibration errors'],
                ['Research retrieval', 'Surfaces relevant papers and competition solutions from the knowledge graph in context'],
              ].map(([title, desc]) => (
                <div key={title as string} className="flex gap-3">
                  <span className="text-violet-400 mt-0.5 flex-shrink-0 text-xs">▸</span>
                  <div>
                    <span className="text-white font-medium text-xs">{title}: </span>
                    <span className="text-xs">{desc}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 px-4 py-3 rounded-xl bg-violet-500/10 border border-violet-500/20 text-xs text-violet-300 italic">
              Fine-tuned on DS reasoning chains — the goal is a model that <em>thinks</em> like a senior data scientist, not one that paraphrases Wikipedia.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
