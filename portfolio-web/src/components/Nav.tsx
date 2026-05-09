'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks, profile } from '@/data/portfolio'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active,   setActive]   = useState('')
  const [open,     setOpen]     = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      const ids = navLinks.map(l => l.href.replace('#', ''))
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 140) { setActive(id); break }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (href: string) => {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'border-b border-white/[0.06]' : ''
      }`}
      style={{ background: scrolled ? 'rgba(0,0,0,0.88)' : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none' }}
    >
      <div className="max-w-6xl mx-auto px-8 h-14 flex items-center justify-between">
        <button onClick={() => go('#hero')} className="font-mono text-sm text-g-400 hover:text-apple transition-colors tracking-widest2 uppercase">
          {profile.initials}
        </button>

        {/* desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(l => {
            const id = l.href.replace('#', '')
            return (
              <button key={l.href} onClick={() => go(l.href)}
                className={`text-xs tracking-widest2 uppercase font-mono transition-colors duration-200 ${
                  active === id ? 'text-apple' : 'text-g-400 hover:text-g-200'
                }`}
              >
                {l.label}
              </button>
            )
          })}
        </nav>

        {/* mobile */}
        <button onClick={() => setOpen(o => !o)} className="md:hidden font-mono text-xs text-g-400 uppercase tracking-widest2">
          {open ? 'close' : 'menu'}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }} className="md:hidden border-t border-white/[0.06] overflow-hidden"
            style={{ background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)' }}
          >
            <div className="px-8 py-6 flex flex-col gap-4">
              {navLinks.map(l => (
                <button key={l.href} onClick={() => go(l.href)}
                  className="text-left font-mono text-xs text-g-300 hover:text-apple uppercase tracking-widest2 transition-colors">
                  {l.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
