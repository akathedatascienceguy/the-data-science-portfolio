'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks, profile } from '@/data/portfolio'

export default function Nav() {
  const [scrolled, setScrolled]   = useState(false)
  const [active,   setActive]     = useState('')
  const [open,     setOpen]       = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const sections = navLinks.map(l => l.href.replace('#', ''))
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href: string) => {
    setOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0e1a]/80 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo('#hero')}
          className="flex items-center gap-3 group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-black text-sm shadow-glow-indigo">
            YVG
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-bold text-white leading-none">{profile.name}</div>
            <div className="text-xs text-emerald-400 font-semibold mt-0.5">{profile.currentCompany}</div>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(link => {
            const id = link.href.replace('#', '')
            const isActive = active === id
            return (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`relative px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white/[0.08] rounded-lg border border-white/[0.08]"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </button>
            )
          })}
          <a
            href="mailto:yvg1799@gmail.com"
            className="ml-3 px-4 py-1.5 text-sm font-semibold rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 text-white hover:opacity-90 transition-opacity"
          >
            Contact
          </a>
        </nav>

        {/* Mobile burger */}
        <button
          className="md:hidden text-slate-400 hover:text-white p-1"
          onClick={() => setOpen(o => !o)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0e1a]/95 backdrop-blur-xl border-b border-white/[0.06] overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map(link => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-left px-3 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <a
                href="mailto:yvg1799@gmail.com"
                className="mt-2 px-4 py-2.5 text-sm font-semibold rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-center"
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
