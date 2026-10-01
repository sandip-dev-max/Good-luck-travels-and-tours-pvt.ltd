'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
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

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 })

  const [from, setFrom] = useState('Kathmandu (KTM)')
  const [to, setTo] = useState('')
  const [date, setDate] = useState('')
  const [pax, setPax] = useState(1)
  const [missing, setMissing] = useState(false)

  // Jet starts dead center, flies up, grows slightly and fades out
  const jetY = useTransform(p, [0, 0.5], ['-50%', '-108%'])
  const jetScale = useTransform(p, [0, 0.5], [1, 1.15])
  const jetOpacity = useTransform(p, [0.3, 0.52], [1, 0])

  const leftX = useTransform(p, [0, 0.3], ['0%', '-22%'])
  const leftO = useTransform(p, [0, 0.28], [1, 0])
  const rightX = useTransform(p, [0, 0.3], ['0%', '18%'])
  const rightY = useTransform(p, [0, 0.3], ['0%', '-40%'])
  const rightO = useTransform(p, [0, 0.28], [1, 0])
  const cloudY = useTransform(p, [0.08, 0.5], ['100%', '0%'])
  const barBottom = useTransform(p, [0, 0.45], ['1.5%', '80%'])
  const copyO = useTransform(p, [0.5, 0.68], [0, 1])
  const copyY = useTransform(p, [0.5, 0.68], [40, 0])
  const copyPE = useTransform(copyO, (o) => (o > 0.5 ? 'auto' : 'none'))

  const search = (e: React.FormEvent) => {
    e.preventDefault()
    const msg = `Hello Good Luck Travels, I'd like flight options from ${from || 'Kathmandu'} to ${to || 'a destination you suggest'}${date ? ` on ${date}` : ''} for ${pax} passenger${pax > 1 ? 's' : ''}.`
    window.open(wa(msg), '_blank', 'noopener')
  }

  return (
    <section ref={ref} className="relative h-[300svh] bg-[#e9f1f7]">
      <div className="sticky top-0 h-[100svh] p-3 pt-[5.5rem] sm:p-5 sm:pt-[6rem]">
        <div className="relative isolate h-full overflow-hidden rounded-[28px] bg-gradient-to-b from-[#1c6a98] via-[#5fa3c6] to-[#d5e8f2] shadow-[0_30px_80px_rgba(12,45,80,.25)] sm:rounded-[36px]">
          <h1 className="sr-only">Flights, hotels, holiday packages and visa help from Kathmandu — Good Luck International Travels &amp; Tours</h1>
          {/* Split headline: sits behind the jet, hugging the center */}
          <div className="absolute inset-x-0 top-[6%] z-0 grid grid-cols-2 px-[4%] text-white">
            <motion.div style={{ x: leftX, opacity: leftO }} className="pr-[clamp(1.5rem,5vw,5rem)] text-right">
              <p aria-hidden className="text-[clamp(3.2rem,11.5vw,10.5rem)] font-medium leading-[.92] tracking-tight">Flying</p>
              <p className="text-[clamp(3.2rem,11.5vw,10.5rem)] font-light leading-[.92] tracking-tight text-white/45">Abroad</p>
              <p className="ml-auto mt-6 hidden max-w-[16rem] text-sm leading-6 text-white/85 sm:block">
                Flights, hotels, holidays and visas from Kathmandu, planned by people who reply the same day.
              </p>
            </motion.div>
            <motion.div style={{ x: rightX, y: rightY, opacity: rightO }} className="pl-[clamp(1.5rem,5vw,5rem)] text-left">
              <p className="text-[clamp(3.2rem,11.5vw,10.5rem)] font-medium leading-[.92] tracking-tight">Made</p>
              <p className="text-[clamp(3.2rem,11.5vw,10.5rem)] font-light leading-[.92] tracking-tight text-white/45">Simple</p>
            </motion.div>
          </div>

          {/* Jet: dead center, flies up on scroll */}
          <motion.div
            aria-hidden
            style={{ x: '-50%', y: jetY, scale: jetScale, opacity: jetOpacity }}
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-[min(92vw,78svh)] will-change-transform"
          >
            {missing ? (
              <JetFallback />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={JET_SRC}
                alt=""
                onError={() => setMissing(true)}
                className="h-auto w-full drop-shadow-[0_40px_50px_rgba(5,25,50,.35)]"
              />
            )}
          </motion.div>

          {/* Haze at the horizon */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-white/80 to-transparent" />

          {/* Cloud bank rises and takes over the card */}
          <motion.div style={{ y: cloudY }} className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[135%]">
            <div className="absolute -top-10 left-[-12%] h-56 w-[60%] rounded-full bg-white blur-3xl" />
            <div className="absolute -top-16 left-[35%] h-64 w-[55%] rounded-full bg-white blur-3xl" />
            <div className="absolute -top-8 right-[-12%] h-56 w-[50%] rounded-full bg-white blur-3xl" />
            <div className="absolute inset-x-0 top-16 bottom-0 bg-white" />
          </motion.div>

          {/* Booking bar rides up to the top as you scroll */}
          <motion.form
            onSubmit={search}
            style={{ bottom: barBottom }}
            className="absolute inset-x-3 z-30 mx-auto grid max-w-5xl grid-cols-2 items-center gap-1 rounded-3xl bg-white/90 p-2 shadow-[0_20px_50px_rgba(10,40,70,.25)] backdrop-blur-xl sm:inset-x-6 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]"
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
          </motion.form>

          {/* Second scene, on the clouds */}
          <motion.div
            style={{ opacity: copyO, y: copyY, pointerEvents: copyPE }}
            className="absolute inset-x-0 top-[48%] z-30 -translate-y-1/2 px-6 text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-[#f4b73f]/20 px-3.5 py-1.5 text-sm text-[#8a5a00]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f4b73f]" /> Talk to a real person
            </span>
            <h2 className="mx-auto mt-5 max-w-3xl text-[clamp(2.2rem,5.6vw,4.6rem)] font-semibold leading-[1.05] tracking-tight text-[#06152e]">
              Fly your way.
              <span className="block text-[#c98a10]">Choose what fits you.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-slate-600">
              Tell us the trip. We reply on WhatsApp with fares, stays and visa steps, with nothing hidden.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a href={wa("Hello Good Luck Travels, I'm travelling on my own or with family and want to plan a trip.")} target="_blank" rel="noreferrer" className="rounded-full bg-[#06152e] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#0d2954]">
                For travellers
              </a>
              <a href={wa("Hello Good Luck Travels, I'd like to arrange travel for a group or business.")} target="_blank" rel="noreferrer" className="rounded-full bg-slate-900/10 px-6 py-3 text-sm font-medium text-slate-800 transition hover:bg-slate-900/15">
                For groups and business
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}