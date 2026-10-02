'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Minus, Plus, Users } from 'lucide-react'
import { waLink } from '@/lib/whatsapp'

/**
 * Put a transparent (background removed), top-down (nose up) jet PNG at /public/images/jet-top.webp.
 * Until it exists, a drawn top-view jet is shown instead.
 */
const JET_SRC = '/images/jet-top.webp'

const wa = waLink

function JetFallback() {
  return (
    <svg viewBox="0 0 400 420" className="h-auto w-full" aria-hidden>
      <path d="M200 150 20 250v18l180-36Zm0 0 180 100v18l-180-36Z" fill="#dde5ee" stroke="#b9c6d6" />
      <path d="M200 340 120 385v10l80-20Zm0 0 80 45v10l-80-20Z" fill="#dde5ee" stroke="#b9c6d6" />
      <rect x="146" y="270" width="26" height="84" rx="13" fill="#cfd8e3" />
      <rect x="228" y="270" width="26" height="84" rx="13" fill="#cfd8e3" />
      <path d="M200 8c22 32 26 112 26 192v180c0 25-12 35-26 35s-26-10-26-35V200C174 120 178 40 200 8Z" fill="#fff" stroke="#c6d1de" />
      <path d="M188 55q12-8 24 0l-2 20q-10 6-20 0Z" fill="#0b2148" />
      <path d="M186 372h28v30h-28Z" fill="#c8102e" />
    </svg>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-0.5 rounded-2xl px-3 py-2 text-left transition hover:bg-slate-900/5 focus-within:bg-slate-900/5">
      <span className="text-[11px] text-slate-500">{label}</span>
      {children}
    </label>
  )
}

const input = 'w-full bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400'

// Easing helpers
const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v))
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

export function Hero() {
  const [from, setFrom] = useState('Kathmandu (KTM)')
  const [to, setTo] = useState('')
  const [date, setDate] = useState('')
  const [pax, setPax] = useState(1)
  const [missing, setMissing] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const jetRef = useRef<HTMLDivElement>(null)
  const cloudRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLFormElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)

  /**
   * Scroll loop: no React state, no re-render per scroll event.
   * - Target progress is read from scroll position.
   * - Displayed progress is lerped toward the target every frame (the "smooth" feel).
   * - Everything is written as transform/opacity only (GPU compositor, no layout).
   */
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let target = 0
    let current = 0
    let raf = 0
    let running = false
    let vh = window.innerHeight
    let barTravel = 0
    let runway = 1 // px of scroll the pinned hero actually lasts

    const measure = () => {
      vh = window.innerHeight
      // Bar rides from its resting spot near the bottom up to the top of the card.
      const card = barRef.current?.parentElement
      barTravel = (card?.clientHeight ?? vh) * 0.785
      // The pinned distance = section height - sticky height. The animation is mapped to
      // THIS, so it finishes right as the hero unpins (no dead "stuck" scroll at the end).
      const section = sectionRef.current
      const sticky = section?.firstElementChild as HTMLElement | null
      runway = Math.max((section?.offsetHeight ?? 0) - (sticky?.offsetHeight ?? vh), 1)
    }

    const readTarget = () => {
      const section = sectionRef.current
      if (!section) return
      const top = section.getBoundingClientRect().top
      // Finish at 88% of the runway so the end state is reached just before unpinning.
      target = clamp(-top / (runway * 0.88))
    }

    const apply = (p: number) => {
      const jetY = -50 - easeInOut(p) * 58
      const jetScale = 1 + p * 0.15
      const jetOpacity = clamp(1 - p / 0.52)

      const sp = easeOut(clamp(p / 0.3))
      const leftO = clamp(1 - p / 0.28)

      const cloudY = 100 - easeInOut(p) * 100

      const barY = -easeInOut(clamp(p / 0.62)) * barTravel

      // Second scene: each piece (badge, 2 headline lines, paragraph, buttons) reveals in turn.
      const copyP = clamp((p - 0.5) / 0.4)
      if (jetRef.current) {
        jetRef.current.style.transform = `translate3d(-50%, ${jetY}%, 0) scale(${jetScale})`
        jetRef.current.style.opacity = String(jetOpacity)
      }
      if (leftRef.current) {
        leftRef.current.style.transform = `translate3d(${-22 * sp}px, 0, 0)`
        leftRef.current.style.opacity = String(leftO)
      }
      if (rightRef.current) {
        rightRef.current.style.transform = `translate3d(${18 * sp}px, ${-40 * sp}px, 0)`
        rightRef.current.style.opacity = String(leftO)
      }
      if (cloudRef.current) {
        cloudRef.current.style.transform = `translate3d(0, ${cloudY}%, 0)`
      }
      if (barRef.current) {
        barRef.current.style.transform = `translate3d(0, ${barY}px, 0)`
      }
      if (copyRef.current) {
        const items = copyRef.current.querySelectorAll<HTMLElement>('[data-reveal]')
        items.forEach((el, i) => {
          const t = easeOut(clamp((copyP - i * 0.1) / 0.5))
          el.style.opacity = String(t)
          el.style.transform = `translate3d(0, ${(1 - t) * 28}px, 0)`
        })
        copyRef.current.style.pointerEvents = copyP > 0.6 ? 'auto' : 'none'
      }
    }

    const tick = () => {
      // Frame-rate independent-ish smoothing; 0.1 = silkier, 0.2 = snappier.
      const diff = target - current
      current = Math.abs(diff) < 0.0004 ? target : current + diff * 0.16
      apply(current)

      if (current !== target) {
        raf = requestAnimationFrame(tick)
      } else {
        running = false
      }
    }

    const kick = () => {
      if (running) return
      running = true
      raf = requestAnimationFrame(tick)
    }

    const onScroll = () => {
      readTarget()
      if (reduce) {
        current = target
        apply(current)
        return
      }
      kick()
    }

    const onResize = () => {
      measure()
      onScroll()
    }

    measure()
    readTarget()
    current = target
    apply(current)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(raf)
    }
  }, [])

  const search = (e: React.FormEvent) => {
    e.preventDefault()
    const msg = `Hello Good Luck Travels, I'd like flight options from ${from || 'Kathmandu'} to ${to || 'a destination you suggest'}${date ? ` on ${date}` : ''} for ${pax} passenger${pax > 1 ? 's' : ''}.`
    window.open(wa(msg), '_blank', 'noopener')
  }

  return (
    <section ref={sectionRef} className="relative h-[210svh] bg-[#e9f1f7]">
      <div className="sticky top-0 h-[100svh] p-3 pt-[5.5rem] sm:p-5 sm:pt-[6rem]">
        <div className="relative isolate h-full overflow-hidden rounded-[28px] bg-gradient-to-b from-[#1c6a98] via-[#5fa3c6] to-[#d5e8f2] shadow-[0_30px_80px_rgba(12,45,80,.25)] sm:rounded-[36px]">
          <h1 className="sr-only">Flights, hotels, holiday packages and visa help from Kathmandu — Good Luck International Travels &amp; Tours</h1>

          {/* Split headline: sits behind the jet, hugging the center */}
          <div className="absolute inset-x-0 top-[6%] z-0 grid grid-cols-2 px-[4%] text-white">
            <div ref={leftRef} className="pr-[clamp(1.5rem,5vw,5rem)] text-right will-change-transform">
              <p aria-hidden className="text-[clamp(3.2rem,11.5vw,10.5rem)] font-medium leading-[.92] tracking-tight">Flying</p>
              <p className="text-[clamp(3.2rem,11.5vw,10.5rem)] font-light leading-[.92] tracking-tight text-white/45">Abroad</p>
              <p className="ml-auto mt-6 hidden max-w-[16rem] text-sm leading-6 text-white/85 sm:block">
                Flights, hotels, holidays and visas from Kathmandu, planned by people who reply the same day.
              </p>
            </div>
            <div ref={rightRef} className="pl-[clamp(1.5rem,5vw,5rem)] text-left will-change-transform">
              <p className="text-[clamp(3.2rem,11.5vw,10.5rem)] font-medium leading-[.92] tracking-tight">Made</p>
              <p className="text-[clamp(3.2rem,11.5vw,10.5rem)] font-light leading-[.92] tracking-tight text-white/45">Simple</p>
            </div>
          </div>

          {/* Jet: dead center, flies up on scroll */}
          <div
            ref={jetRef}
            aria-hidden
            style={{ left: '50%', top: '50%', transform: 'translate3d(-50%, -50%, 0)' }}
            className="pointer-events-none absolute z-10 w-[min(92vw,78svh)] will-change-transform"
          >
            {missing ? (
              <JetFallback />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={JET_SRC}
                alt=""
                decoding="async"
                fetchPriority="high"
                onError={() => setMissing(true)}
                className="h-auto w-full drop-shadow-[0_40px_50px_rgba(5,25,50,.35)]"
              />
            )}
          </div>

          {/* Haze at the horizon */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-white/80 to-transparent" />

          {/*
            Cloud bank: blur-3xl on a moving layer is the biggest jank source, so the
            soft puffs are radial gradients (cheap) instead of live blur filters.
          */}
          <div
            ref={cloudRef}
            style={{ transform: 'translate3d(0, 100%, 0)' }}
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[135%] will-change-transform"
          >
            <div
              className="absolute -top-24 left-[-12%] h-72 w-[60%]"
              style={{ background: 'radial-gradient(closest-side, #fff 45%, rgba(255,255,255,0) 100%)' }}
            />
            <div
              className="absolute -top-32 left-[35%] h-80 w-[55%]"
              style={{ background: 'radial-gradient(closest-side, #fff 45%, rgba(255,255,255,0) 100%)' }}
            />
            <div
              className="absolute -top-24 right-[-12%] h-72 w-[50%]"
              style={{ background: 'radial-gradient(closest-side, #fff 45%, rgba(255,255,255,0) 100%)' }}
            />
            <div className="absolute inset-x-0 top-16 bottom-0 bg-white" />
          </div>

          {/* Booking bar: rides up to the top as you scroll (transform only, no layout) */}
          <form
            ref={barRef}
            onSubmit={search}
            style={{ bottom: '1.5%' }}
            className="absolute inset-x-3 z-30 mx-auto grid max-w-5xl grid-cols-2 items-center gap-1 rounded-3xl bg-white/90 p-2 shadow-[0_20px_50px_rgba(10,40,70,.25)] backdrop-blur-xl will-change-transform sm:inset-x-6 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]"
          >
            <Field label="From">
              <input className={input} value={from} onChange={(e) => setFrom(e.target.value)} />
            </Field>
            <Field label="To">
              <input className={input} value={to} onChange={(e) => setTo(e.target.value)} placeholder="Dubai, Bangkok, Tokyo…" />
            </Field>
            <Field label="Date">
              <input type="date" className={input} value={date} onChange={(e) => setDate(e.target.value)} />
            </Field>
            <div className="flex items-center justify-between rounded-2xl px-3 py-2">
              <span className="flex flex-col gap-0.5">
                <span className="text-[11px] text-slate-500">Passengers</span>
                <span className="flex items-center gap-1.5 text-sm font-medium text-slate-900"><Users size={14} />{pax}</span>
              </span>
              <span className="flex gap-1">
                <button type="button" aria-label="Fewer passengers" onClick={() => setPax((n) => Math.max(1, n - 1))} className="grid h-7 w-7 place-items-center rounded-full bg-slate-900/10 text-slate-700 hover:bg-slate-900/15"><Minus size={13} /></button>
                <button type="button" aria-label="More passengers" onClick={() => setPax((n) => Math.min(9, n + 1))} className="grid h-7 w-7 place-items-center rounded-full bg-slate-900/10 text-slate-700 hover:bg-slate-900/15"><Plus size={13} /></button>
              </span>
            </div>
            <button type="submit" className="col-span-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#06152e] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#0d2954] lg:col-span-1">
              Get fares <ArrowUpRight size={16} />
            </button>
          </form>

          {/* Second scene, on the clouds: pieces animate in one after another as you scroll */}
          <div
            ref={copyRef}
            style={{ pointerEvents: 'none' }}
            className="absolute inset-x-0 top-[52%] z-30 -translate-y-1/2 px-6 text-center"
          >
            <span
              data-reveal
              style={{ opacity: 0 }}
              className="inline-flex items-center gap-2 rounded-full bg-[#f4b73f]/20 px-3.5 py-1.5 text-sm text-[#8a5a00] will-change-transform"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#f4b73f]" /> Talk to a real person
            </span>
            <h2 className="mx-auto mt-5 max-w-3xl text-[clamp(2.2rem,5.6vw,4.6rem)] font-semibold leading-[1.05] tracking-tight text-[#06152e]">
              <span data-reveal style={{ opacity: 0 }} className="block will-change-transform">Fly your way.</span>
              <span data-reveal style={{ opacity: 0 }} className="block text-[#c98a10] will-change-transform">Choose what fits you.</span>
            </h2>
            <p data-reveal style={{ opacity: 0 }} className="mx-auto mt-4 max-w-md text-slate-600 will-change-transform">
              Tell us the trip. We reply on WhatsApp with fares, stays and visa steps, with nothing hidden.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}