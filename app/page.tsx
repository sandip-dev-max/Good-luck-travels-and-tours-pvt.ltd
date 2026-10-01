import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Globe2, Headphones, MessageCircle, ShieldCheck, Star, WalletCards } from 'lucide-react'
import { destinations, posts, testimonials, tours } from '@/data/site'
import { Hero } from '@/components/home/Hero'
import { DestinationCard } from '@/components/destinations/DestinationCard'
import { TourCard } from '@/components/tours/TourCard'
import { Reveal } from '@/components/shared/Reveal'
import { waLink } from '@/lib/whatsapp'

const travel = 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1500&q=85'

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

      {/* packages */}
      <section className="container-luxury py-20 sm:py-24">
        <Reveal><Heading kicker="Featured packages" href="/tours" cta="See all packages">Go somewhere <span className="text-gradient">beautiful.</span></Heading></Reveal>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {tours.slice(0, 3).map((t, i) => <Reveal key={t.slug} delay={i * 0.05}><TourCard item={t} /></Reveal>)}
        </div>
      </section>

      {/* WhatsApp band */}
      <section className="container-luxury pb-20 sm:pb-24">
        <div className="on-dark relative isolate overflow-hidden rounded-[30px] bg-gradient-to-br from-sea via-navy-2 to-navy">
          <div className="grid-fade absolute inset-0 -z-10" />
          <div className="grid lg:grid-cols-[.95fr_1.05fr]">
            <div className="relative min-h-[320px]">
              <Image src={travel} alt="Traveller overlooking a destination" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-navy/60" />
            </div>
            <div className="relative flex items-center p-8 sm:p-12">
              <div className="text-white">
                <span className="eyebrow">One conversation can start it</span>
                <h2 className="mt-4 max-w-xl text-4xl leading-[1.02] sm:text-6xl">Tell us where you want to <span className="text-gradient">go.</span></h2>
                <p className="mt-5 max-w-lg text-base leading-7 text-white/75">Send your destination, dates and group size on WhatsApp. We will help you explore the options.</p>
                <a href={waLink()} target="_blank" rel="noreferrer" className="btn-gold mt-7"><MessageCircle size={17} /> Chat on WhatsApp</a>
              </div>
            </div>
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
        <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:items-end">
          <div>
            <span className="section-kicker">Traveller notes</span>
            <h2 className="mt-4 text-4xl leading-[1.02] text-navy sm:text-6xl">Good planning feels <span className="text-gradient">personal.</span></h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-[22px] border border-line bg-white p-6 shadow-card">
                <div className="flex gap-1 text-gold" aria-label="5 out of 5 stars">{Array.from({ length: 5 }).map((_, j) => <Star key={j} size={14} fill="currentColor" />)}</div>
                <blockquote className="mt-5 text-sm leading-6 text-ink-2">“{t.quote}”</blockquote>
                <figcaption className="mt-6 border-t border-line pt-4"><div className="text-sm font-semibold text-navy">{t.name}</div><div className="mt-1 text-xs text-subtle">{t.meta}</div></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
