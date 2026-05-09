'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { profile } from '@/data/portfolio'

/* ── animated data constellation ── */
function Constellation() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const N = 80, CONNECT = 140
    const pts = Array.from({ length: N }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      r:  Math.random() * 1.6 + 0.3,
      vx: (Math.random() - 0.5) * 0.16,
      vy: (Math.random() - 0.5) * 0.16,
      a:  Math.random() * 0.28 + 0.06,
    }))

    let raf: number
    const tick = () => {
      const { width, height } = canvas
      ctx.clearRect(0, 0, width, height)

      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > width)  p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1
      })

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < CONNECT) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(255,255,255,${0.055 * (1 - d / CONNECT)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.stroke()
          }
        }
      }

      pts.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${p.a})`
        ctx.fill()
      })

      raf = requestAnimationFrame(tick)
    }
    tick()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />
}

/* word-level stagger — prevents mid-word line breaks */
const container = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.14 } },
}
const wordAnim = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function Hero() {
  const words = profile.name.split(' ')

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <Constellation />

      {/* vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.72) 100%)' }}
      />

      <div className="relative z-10 max-w-5xl w-full mx-auto px-8 text-center">

        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="eyebrow mb-8 flex items-center justify-center gap-3"
        >
          <span className="live-dot" />
          <span>Founding Data Scientist &nbsp;·&nbsp; SuperMoney &nbsp;·&nbsp; New Delhi</span>
        </motion.div>

        {/* name — word by word, never breaks mid-word */}
        <motion.h1
          variants={container}
          initial="hidden"
          animate="visible"
          className="font-light tracking-tight text-apple leading-[1.1] mb-8 select-none"
          style={{ fontSize: 'clamp(2.6rem, 6.5vw, 5.8rem)' }}
        >
          {words.map((w, i) => (
            <motion.span
              key={i}
              variants={wordAnim}
              style={{
                display: 'inline-block',
                whiteSpace: 'nowrap',
                marginRight: i < words.length - 1 ? '0.28em' : 0,
              }}
            >
              {w}
            </motion.span>
          ))}
        </motion.h1>

        {/* rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
          className="h-px bg-white/10 max-w-sm mx-auto mb-8 origin-center"
        />

        {/* bio */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="text-g-300 text-base sm:text-lg font-light max-w-xl mx-auto leading-relaxed mb-10"
        >
          Building ML systems that replaced rules with intelligence —&nbsp;
          <span className="text-apple font-normal">&#8377;60&nbsp;Cr/month</span> and growing.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="flex items-center justify-center gap-8"
        >
          <button
            onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
            className="font-mono text-xs text-g-400 hover:text-apple uppercase tracking-widest2 transition-colors"
          >
            view work &#8595;
          </button>
          <span className="text-g-700 font-mono text-xs select-none">&#183;</span>
          <a
            href="mailto:yvg1799@gmail.com"
            className="font-mono text-xs text-g-400 hover:text-apple uppercase tracking-widest2 transition-colors"
          >
            yvg1799@gmail.com
          </a>
        </motion.div>
      </div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-transparent to-white/15 mx-auto"
        />
      </motion.div>
    </section>
  )
}
