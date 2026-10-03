import Image from 'next/image';import {ArrowRight,CheckCircle2,Clock3,FileCheck2,FolderOpen,Globe2,MessageCircle,ShieldCheck,Star} from 'lucide-react';import Link from 'next/link';import {PageHero} from '@/components/shared/PageHero'
const visaImage='/visa/visa-top-banner.png'
const countries=[
  {name:'Dubai / UAE',description:'Tourist visa support, document checklist and travel coordination.',duration:'1–2 months'},
  {name:'Thailand',description:'Tourist visa document guidance for holiday travel.',duration:'About 1 month'},
  {name:'UK',description:'Guidance around documentation, itinerary and application preparation.',duration:'About 1 month'},
  {name:'Bali',description:'Tourist visa guidance for travel to Bali, Indonesia.',duration:'About 1 month'},
  {name:'Japan',description:'Guidance around documentation, itinerary and application preparation.',duration:'About 1 month'},
  {name:'Switzerland',description:'Support for a structured visa application file and travel plan.',duration:'About 1 month'},
  {name:'Maldives',description:'Tourist entry guidance, travel documents and trip coordination.',duration:'About 1 month'},
  {name:'Italy',description:'Support for a structured visa application file and travel plan.',duration:'About 1 month'},
  {name:'Singapore',description:'Document checklist and trip-planning support for short visits.',duration:'About 1 month'},
  {name:'Australia',description:'Application preparation guidance and travel documentation support.',duration:'About 1 month'},
  {name:'Türkiye',description:'Guidance around tourist visa documents and travel preparation.',duration:'About 1 month'},
  {name:'Nepal',description:'Travel document and itinerary guidance for your Nepal trip.',duration:'About 1 month'},
  {name:'India',description:'Tourist visa document guidance and travel coordination.',duration:'About 1 month'},
  {name:'China',description:'Guidance around tourist visa documentation and application preparation.',duration:'About 1 month'},
  {name:'Indonesia',description:'Tourist visa document guidance and travel coordination.',duration:'About 1 month'},
  {name:'Sri Lanka',description:'Tourist entry guidance, travel documents and trip coordination.',duration:'About 1 month'},
  {name:'Malaysia',description:'Tourist visa document guidance and travel coordination.',duration:'About 1 month'},
  {name:'Oman',description:'Tourist visa guidance, document checklist and travel coordination.',duration:'10 days–1 month'},
]
export default function Visa(){return <main><PageHero eyebrow="Visa assistance" title="Clearer preparation for the paperwork behind your journey." description="Visa requirements depend on destination, passport and circumstances. Our role is to help you organise the travel side of the process with a clear checklist and next steps." image={visaImage} crumb="Visa Assistance" button="Ask about visa support"/><section className="container-luxury py-20"><div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-center"><div><div className="section-kicker">How we help</div><h2 className="mt-3 text-4xl font-semibold leading-[.98] tracking-[-.06em] text-navy sm:text-6xl">Less confusion. <span className="text-gradient">Better preparation.</span></h2><p className="mt-5 text-sm leading-7 text-muted">We help you understand the document list, organise the travel information you need and keep your application preparation structured. We do not promise visa approval.</p><div className="mt-7 grid gap-3">{[['Document checklist','Understand what needs to be prepared before submission.'],['Visa insurance','Helpful guidance on travel insurance and protection as part of your trip planning.'],['Travel assurance','Support for trip confidence, policy clarity and smoother preparation.'],['Travel plan guidance','Keep flights, hotels and itinerary details consistent.'],['Application readiness','Review the practical pieces before you move forward.']].map(([t,d])=><div key={t} className="flex gap-3 rounded-2xl border border-mist bg-white p-4"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-sea"/><div><div className="text-sm font-semibold text-navy-2">{t}</div><div className="mt-1 text-xs leading-5 text-muted">{d}</div></div></div>)}</div></div><div className="relative min-h-[440px] overflow-hidden rounded-[30px]"><Image src="/visa/documentation.png" alt="Travel documents and planning" fill className="object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent"/><div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/30 bg-white/12 p-5 text-white backdrop-blur-xl"><div className="text-[11px] font-semibold text-white/65">Good Luck visa desk</div><div className="mt-2 text-2xl font-semibold">A clear next step is better than a guess.</div></div></div></div></section>
<section className="relative overflow-hidden bg-paper py-20 sm:py-24">
  <div className="container-luxury relative">
    <div className="mx-auto max-w-3xl text-center">
      <div className="section-kicker">Visa duration guidance</div>
      <h2 className="mt-3 text-4xl font-semibold tracking-[-.06em] text-navy sm:text-5xl">Visa support for every destination.</h2>
      <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted">Typical stay durations are a general guide and depend on visa type and approval. If you need a longer stay, we can help you explore extension options, subject to the destination’s rules.</p>
    </div>
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-5">
      {countries.map(({name,description,duration},i)=>(
        <article key={name} className={`group relative flex h-full flex-col rounded-[24px] border bg-white p-5 shadow-[0_12px_35px_rgba(12,45,80,.05)] transition duration-300 hover:-translate-y-1 hover:border-sky/40 hover:shadow-[0_22px_50px_rgba(12,45,80,.11)] sm:p-6 ${name === 'Dubai / UAE' ? 'border-gold shadow-[0_16px_42px_rgba(244,183,63,.17)] ring-1 ring-gold/50' : 'border-line'}`}>
          <div className="flex items-center justify-between">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-cloud text-sea transition group-hover:bg-gold/20 group-hover:text-gold-ink">{i%2?<Globe2 size={19}/>:<FileCheck2 size={19}/>}</span>
            <div className="flex items-center gap-2">
              {name === 'Dubai / UAE' && <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.08em] text-gold-ink"><Star size={12} className="fill-gold text-gold-ink"/> Most popular</span>}
              <span className="text-[11px] font-semibold tracking-[.08em] text-subtle">{String(i+1).padStart(2,'0')} <span className="text-mist">/ {countries.length}</span></span>
            </div>
          </div>
          <h3 className="mt-5 text-xl font-semibold text-navy">{name}</h3>
          <p className="mt-2 min-h-12 text-sm leading-6 text-muted">{description}</p>
          <div className="mt-5 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-navy to-navy-2 px-4 py-3.5 text-white">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 text-gold"><Clock3 size={17}/></span>
            <div><div className="text-[10px] font-semibold uppercase tracking-[.12em] text-white/60">Typical stay</div><div className="mt-0.5 text-sm font-semibold">{duration}</div></div>
          </div>
          <Link href="/contact" className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-sea transition group-hover:text-navy">Ask about this destination <ArrowRight size={14} className="transition-transform group-hover:translate-x-1"/></Link>
        </article>
      ))}
    </div>
  </div>
</section>
<section className="container-luxury py-20"><div className="grid gap-4 md:grid-cols-4">{[['01','Share your destination','Tell us where you plan to travel.'],['02','Get your checklist','We explain the practical documents to prepare.'],['03','Organise the trip','Keep travel bookings and information consistent.'],['04','Move forward','Submit through the relevant official process.']].map(([n,t,d])=><div key={n} className="rounded-[22px] border border-mist p-6"><div className="text-sm font-semibold text-sea">{n}</div><h3 className="mt-6 text-base font-semibold text-navy-2">{t}</h3><p className="mt-2 text-xs leading-6 text-muted">{d}</p></div>)}</div><div className="mt-8 on-dark rounded-[28px] bg-gradient-to-br from-sea via-navy-2 to-navy p-8 text-white sm:p-10"><div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between"><div><div className="eyebrow text-white/60">Have a destination in mind?</div><h3 className="mt-2 text-3xl font-semibold tracking-[-.04em]">Send us your passport destination and travel dates.</h3></div><a href="https://wa.me/9779816800052" target="_blank" rel="noreferrer" className="btn-gold"><MessageCircle size={16}/> WhatsApp visa desk</a></div></div></section></main>}
