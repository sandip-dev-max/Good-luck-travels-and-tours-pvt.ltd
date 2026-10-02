import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Globe2, Headphones, MessageCircle, ShieldCheck, Star, WalletCards } from 'lucide-react'
import { destinations, posts, testimonials, tours } from '@/data/site'
import { Hero } from '@/components/home/Hero'
import { DestinationCard } from '@/components/destinations/DestinationCard'
import { TourCard } from '@/components/tours/TourCard'
import { Reveal } from '@/components/shared/Reveal'
import { waLink } from '@/lib/whatsapp'

const trust = [
  ['Best value', 'Smart travel planning', WalletCards],
  ['Human support', 'Real people, clear answers', Headphones],
  ['Secure planning', 'Travel with confidence', ShieldCheck],
  ['Curated journeys', 'Routes worth remembering', Globe2],
] as const

const reasons = [
  ['01', 'Routes that make sense', 'We shape practical itineraries around your time, budget and priorities.'],
  ['02', 'Support when it matters', 'Ask a real travel specialist when plans change or questions come up.'],
  ['03', 'Details, clearly handled', 'From bookings to documentation, every step has a clear next action.'],
  ['04', 'Journeys with character', 'Choose from classic destinations or build something personal.'],
]

const faqs = [
  {
    question: 'How early should I book my trip?',
    answer: 'For international trips, especially during peak seasons, it is best to book 2 to 6 months in advance. This gives you more flight and hotel options and keeps visa and planning steps smoother.',
  },
  {
    question: 'Can I customize a package to fit my budget?',
    answer: 'Yes. We regularly adjust destinations, hotel categories, duration and activities to match your budget and travel style while still keeping the itinerary practical and comfortable.',
  },
  {
    question: 'Do you help with visa and documentation?',
    answer: 'Absolutely. We provide guidance on the documents needed, help you understand the process and keep the steps organized so you know exactly what to prepare before departure.',
  },
  {
    question: 'Is support available while I am travelling?',
    answer: 'Yes. We stay reachable during the planning phase and can help with practical updates or travel support when needed, so you are not left figuring things out alone.',
  },
  {
    question: 'Can I book flights, hotels and tours together?',
    answer: 'Yes. We can coordinate complete trip planning, including flights, accommodation, transfers and guided experiences, so everything feels connected from start to finish.',
  },
]

const startingPrices = [
  { country: 'Thailand', packages: 22, price: 'NRs 28,000' },
  { country: 'Vietnam', packages: 11, price: 'NRs 40,000' },
  { country: 'Indonesia / Bali', packages: 10, price: 'NRs 39,000' },
  { country: 'Maldives', packages: 7, price: 'NRs 55,000' },
  { country: 'China', packages: 10, price: 'NRs 1,04,500' },
  { country: 'Sri Lanka', packages: 13, price: 'NRs 61,500' },
  { country: 'Malaysia', packages: 9, price: 'NRs 59,800' },
  { country: 'Singapore', packages: 8, price: 'NRs 77,000' },
  { country: 'Kenya', packages: 2, price: 'NRs 4,20,000' },
  { country: 'India', packages: 16, price: 'NRs 28,000' },
  { country: 'Dubai', packages: 3, price: 'On request' },
  { country: 'Nepal', packages: 7, price: 'NRs 31,000' },
  { country: 'Philippines', packages: 6, price: 'On request' },
]

function Heading({ kicker, children, href, cta }: { kicker: string; children: React.ReactNode; href?: string; cta?: string }) {
  return (
    <div className="flex items-end justify-between gap-5">
      <div>
        <span className="section-kicker">{kicker}</span>
        <h2 className="mt-4 max-w-3xl text-4xl leading-[1.02] text-navy sm:text-6xl">{children}</h2>
      </div>
      {href && <Link href={href} className="btn-soft hidden shrink-0 md:inline-flex">{cta} <ArrowRight size={15} /></Link>}
    </div>
  )
}

export default function Home() {
  return (
    <main>
      <Hero />

      {/* trust strip */}
      <section aria-label="Why travellers choose us" className="bg-white">
        <ul className="mx-auto grid max-w-[1220px] grid-cols-2 sm:grid-cols-4">
          {trust.map(([a, b, Icon]) => (
            <li key={a} className="flex items-center gap-3 border-b border-r border-line px-5 py-6 last:border-r-0 sm:border-b-0 sm:[&:nth-child(2)]:border-r">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold/20 text-gold-ink"><Icon size={17} /></span>
              <div><div className="text-sm font-semibold text-navy">{a}</div><div className="mt-0.5 text-xs text-subtle">{b}</div></div>
            </li>
          ))}
        </ul>
      </section>

      {/* destinations */}
      <section className="container-luxury py-20 sm:py-24">
        <Reveal><Heading kicker="Travel without the clutter" href="/destinations" cta="View all">Places worth <span className="text-gradient">the journey.</span></Heading></Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-12 md:grid-rows-[230px_230px]">
          <div className="md:col-span-5 md:row-span-2"><DestinationCard item={destinations[3]} large /></div>
          <div className="md:col-span-4"><DestinationCard item={destinations[0]} /></div>
          <div className="md:col-span-3"><DestinationCard item={destinations[4]} /></div>
          <div className="md:col-span-4"><DestinationCard item={destinations[1]} /></div>
          <div className="md:col-span-3"><DestinationCard item={destinations[6]} /></div>
        </div>
      </section>

      {/* why */}
      <section className="bg-cloud py-20 sm:py-24">
        <div className="container-luxury">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
              <div>
                <span className="section-kicker">Why Good Luck</span>
                <h2 className="mt-4 text-4xl leading-[1.02] text-navy sm:text-6xl">Travel planning, <span className="text-gradient">made human.</span></h2>
              </div>
              <p className="max-w-xl text-base leading-7 text-muted">From the first WhatsApp message to the final return flight, we focus on the practical details that make a trip feel easy: routes, stays, documentation and experiences.</p>
            </div>
          </Reveal>
          <div className="mt-11 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {reasons.map(([n, t, d], i) => (
              <Reveal key={n} delay={i * 0.05}>
                <div className="h-full rounded-[22px] border border-line bg-white p-6 shadow-card">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-navy text-xs font-semibold text-gold">{n}</span>
                  <h3 className="mt-7 text-lg text-navy">{t}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* journal */}
      <section className="bg-cloud py-20 sm:py-24">
        <div className="container-luxury">
          <Reveal><Heading kicker="Travel journal" href="/blog" cta="Read the journal">Ideas for your <span className="text-gradient">next trip.</span></Heading></Reveal>
          <div className="mt-10 grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
            {posts.slice(0, 3).map((p, i) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className={`${i === 0 ? 'lg:row-span-2' : ''} group overflow-hidden rounded-[24px] border border-line bg-white shadow-card`}>
                {i === 0 ? (
                  <div className="on-dark relative isolate h-full min-h-[420px]">
                    <Image src={p.image} alt={p.title} fill sizes="(min-width:1024px) 60vw, 100vw" className="-z-10 object-cover transition duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy/90 via-navy/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                      <div className="text-xs font-semibold text-gold">{p.category} · {p.read}</div>
                      <h3 className="mt-2 max-w-2xl text-3xl">{p.title}</h3>
                      <p className="mt-2 max-w-xl text-sm leading-6 text-white/75">{p.excerpt}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex min-h-[200px] gap-5 p-4">
                    <div className="relative w-36 shrink-0 overflow-hidden rounded-[18px] sm:w-40"><Image src={p.image} alt={p.title} fill sizes="160px" className="object-cover transition duration-700 group-hover:scale-105" /></div>
                    <div className="py-2">
                      <div className="text-xs font-semibold text-gold-deep">{p.category}</div>
                      <h3 className="mt-2 text-xl text-navy">{p.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted">{p.excerpt}</p>
                    </div>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* testimonials */}
      <section className="container-luxury py-20 sm:py-24">
        <div className="mb-8">
          <span className="section-kicker">Traveller stories</span>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-navy sm:text-5xl">The trips they’ll never forget</h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#5d6976]">Real reviews from travellers we’ve sent across Asia and beyond, verified on Google.</p>
        </div>
        <div className="overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="grid min-w-[980px] grid-flow-col gap-5 md:min-w-[1200px]">
            {testimonials.map((t, index) => {
              const initials = t.name
                .split(' ')
                .map((part) => part[0])
                .slice(0, 2)
                .join('')
                .toUpperCase()

              return (
                <figure key={t.name} className="flex h-[260px] w-[320px] flex-col justify-between rounded-[28px] border border-[#dfe7ee] bg-[#f4f6f8] p-5 shadow-[0_8px_24px_rgba(16,28,40,0.04)] sm:w-[360px] sm:p-6">
                  <div className="flex gap-1 text-[#f4b73f]" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, j) => <Star key={j} size={18} fill="currentColor" />)}
                  </div>

                  <blockquote className="text-[1.02rem] leading-[1.8rem] text-[#1b2d3d] sm:text-[1.15rem]">
                    “{t.quote.length > 130 && index === 0 ? `${t.quote.slice(0, 120)}...` : t.quote}”
                  </blockquote>

                  <figcaption className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#d5e9ff] via-[#9ec5ff] to-[#5d8adb] text-sm font-bold text-white shadow-sm">
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-[1.05rem] font-semibold text-[#1d2a37]">{t.name}</div>
                        <div className="mt-1 truncate text-sm text-[#5d6976]">{t.meta}</div>
                      </div>
                    </div>

                    <div className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-[#dfe7ee]">
                      <Image src="/review/googlelogo.png" alt="Google logo" width={40} height={40} className="h-full w-full object-contain" />
                    </div>
                  </figcaption>
                </figure>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#f6f2e8] py-20 sm:py-24">
        <div className="container-luxury">
          <div className="rounded-[30px] border border-[#f0e3b8] bg-[#fffdf9] p-6 shadow-[0_14px_40px_rgba(122,96,18,0.08)] sm:p-8 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div className="flex flex-col justify-between">
                <div>
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#f1e2a7] bg-[#fff6d8] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8a5a00]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#f4b73f]" />
                    Let’s make it easy
                  </div>
                  <h2 className="max-w-[320px] text-4xl font-semibold leading-[0.95] tracking-[-0.05em] text-[#1a1a1d] sm:text-5xl">Frequently asked questions</h2>
                </div>

                <div className="mt-8 rounded-[24px] border border-[#f0e4ba] bg-[#fff8e9] p-5">
                  <h3 className="text-[1.85rem] font-semibold tracking-[-0.04em] text-[#1b1d22]">Still have a questions?</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5f6470]">Can’t find the answer to your question? Send us an email and we’ll get back to you as soon as possible.</p>
                  <a href="mailto:info@goodlucktravels.com.np" className="mt-5 inline-flex items-center justify-center rounded-full bg-[#f4b73f] px-5 py-3 text-sm font-semibold text-[#1b1404] shadow-[0_10px_24px_rgba(244,183,63,0.32)] transition hover:bg-[#f0b037]">
                    Send email
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                {faqs.map((item, index) => (
                  <details key={item.question} open={index === 0} className="group rounded-[18px] border border-[#efe7d8] bg-[#f7f7f4] p-4 text-left transition hover:border-[#ead7a6] sm:p-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold text-[#1b1d22] sm:text-lg">
                      <span className="pr-3">{item.question}</span>
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#f3ece0] text-xl font-light text-[#8a5a00] transition-transform duration-200 group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-4 max-w-[52ch] text-sm leading-7 text-[#5f6470]">{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
