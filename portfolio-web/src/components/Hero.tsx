'use client'

import { motion } from 'framer-motion'
import { ArrowDown, MapPin, Mail } from 'lucide-react'
import { profile } from '@/data/portfolio'

const floatVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: 0.15 * i, duration: 0.6, ease: 'easeOut' },
  }),
}

const stats = [
  { val: '₹300 Cr', lbl: 'Target by Dec \'26', color: 'from-amber-500/20 to-orange-500/20 border-amber-500/20' },
  { val: '10M+',    lbl: 'Users Approved',      color: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/20' },
  { val: '53%',     lbl: 'Fraud Precision',      color: 'from-indigo-500/20 to-violet-500/20 border-indigo-500/20' },
  { val: '5ms',     lbl: 'Model Latency P90',    color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/20' },
]

export default function Hero() {
  const scrollDown = () => {
    const el = document.getElementById('experience')
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center bg-grid overflow-hidden"
    >
      {/* ambient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-100 animate-float-slow"
          style={{
            top: '-120px', right: '-80px',
            background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-100 animate-float-med"
          style={{
            bottom: '-80px', left: '5%',
            background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)',
            animationDelay: '3s',
          }}
        />
        <div
          className="absolute w-[360px] h-[360px] rounded-full"
          style={{
            top: '40%', left: '50%',
            background: 'radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-16 text-center">
        {/* company badges */}
        <motion.div
          custom={0} variants={floatVariants} initial="hidden" animate="visible"
          className="flex items-center justify-center gap-3 flex-wrap mb-8"
        >
          <span className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-sm font-semibold">
            <span className="live-dot" />
            Founding DS @ SuperMoney
          </span>
          <span className="px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-sm font-semibold">
            Previously @ Simpl · BNPL
          </span>
        </motion.div>

        {/* name */}
        <motion.h1
          custom={1} variants={floatVariants} initial="hidden" animate="visible"
          className="text-6xl sm:text-7xl md:text-8xl font-black leading-none mb-4"
        >
          <span className="gradient-text">{profile.name}</span>
        </motion.h1>

        {/* title */}
        <motion.p
          custom={2} variants={floatVariants} initial="hidden" animate="visible"
          className="text-xl sm:text-2xl text-slate-400 font-medium mb-6 tracking-wide"
        >
          {profile.title} &nbsp;·&nbsp; AI/ML Systems &nbsp;·&nbsp; FinTech
        </motion.p>

        {/* bio */}
        <motion.p
          custom={3} variants={floatVariants} initial="hidden" animate="visible"
          className="max-w-2xl mx-auto text-slate-400 text-base sm:text-lg leading-relaxed mb-8"
        >
          5+ years deploying production ML in FinTech. Building personal loans ML from scratch at SuperMoney —
          &nbsp;<span className="text-amber-400 font-semibold">₹60 Cr/month</span>&nbsp; incremental delta,
          targeting&nbsp;<span className="text-emerald-400 font-semibold">₹300 Cr by Dec 2026</span>.
        </motion.p>

        {/* meta chips */}
        <motion.div
          custom={4} variants={floatVariants} initial="hidden" animate="visible"
          className="flex items-center justify-center gap-4 flex-wrap mb-10 text-sm text-slate-500"
        >
          <span className="flex items-center gap-1.5"><MapPin size={14} /> {profile.location}</span>
          <span className="flex items-center gap-1.5"><Mail size={14} /> {profile.email}</span>
          <span className="px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-semibold text-xs">
            DTU Gold Medalist · 9.56 CGPA
          </span>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          custom={5} variants={floatVariants} initial="hidden" animate="visible"
          className="flex items-center justify-center gap-4 flex-wrap mb-16"
        >
          <button
            onClick={scrollDown}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-glow-indigo"
          >
            View Work
          </button>
          <a
            href="mailto:yvg1799@gmail.com"
            className="px-6 py-3 rounded-xl glass text-slate-300 font-semibold text-sm hover:text-white hover:border-white/20 transition-colors"
          >
            Get in touch
          </a>
        </motion.div>

        {/* stat cards */}
        <motion.div
          custom={6} variants={floatVariants} initial="hidden" animate="visible"
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto"
        >
          {stats.map((s) => (
            <div
              key={s.lbl}
              className={`glass glass-hover rounded-2xl p-4 bg-gradient-to-br ${s.color}`}
            >
              <div className="text-xl font-black text-white mb-1">{s.val}</div>
              <div className="text-xs text-slate-400 font-medium leading-tight">{s.lbl}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.button
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-600 hover:text-slate-400 transition-colors"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ArrowDown size={20} />
        </motion.div>
      </motion.button>
    </section>
  )
}
