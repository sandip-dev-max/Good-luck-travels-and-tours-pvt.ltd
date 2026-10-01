import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock3, MapPin } from 'lucide-react'
import type { Tour } from '@/data/site'

export function TourCard({ item }: { item: Tour }) {
  return (
    <article className="group overflow-hidden rounded-[24px] border border-line bg-white shadow-card transition hover:-translate-y-1 hover:shadow-soft">
      <Link href={`/tours/${item.slug}`} className="relative block aspect-[1.25] overflow-hidden">
        <Image src={item.image} alt={item.title} fill sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-navy">{item.tag}</span>
      </Link>
      <div className="p-5">
        <div className="flex items-center gap-3 text-xs font-medium text-subtle">
          <span className="flex items-center gap-1"><MapPin size={12} />{item.destination}</span>
          <span className="flex items-center gap-1"><Clock3 size={12} />{item.duration}</span>
        </div>
        <h3 className="mt-2 text-xl text-navy">{item.title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p>
        <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
          <div>
            <div className="text-xs text-subtle">From</div>
            <div className="text-base font-semibold text-gold-deep">{item.price}</div>
          </div>
          <Link href={`/tours/${item.slug}`} className="inline-flex items-center gap-1.5 rounded-full bg-cloud px-3.5 py-2 text-sm font-semibold text-navy transition group-hover:bg-gold">
            View details <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  )
}
