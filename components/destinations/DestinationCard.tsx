import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, MapPin } from 'lucide-react'
import type { Destination } from '@/data/site'

export function DestinationCard({ item, large = false }: { item: Destination; large?: boolean }) {
  return (
    <Link
      href={`/destinations/${item.slug}`}
      className={`on-dark group relative isolate block h-full overflow-hidden rounded-[24px] bg-navy ${large ? 'min-h-[460px]' : 'min-h-[260px]'}`}
    >
      <Image src={item.image} alt={item.name} fill sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw" className="-z-10 object-cover transition duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy/90 via-navy/10 to-sea/10" />
      <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1.5 text-xs font-semibold text-[#1b1404]">{item.tag}</span>
      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <div className="flex items-center gap-1 text-xs font-medium text-white/75"><MapPin size={12} />{item.city}, {item.country}</div>
        <div className="mt-1 flex items-end justify-between gap-4">
          <div>
            <h3 className={`${large ? 'text-3xl' : 'text-xl'} font-semibold`}>{item.name}</h3>
            <p className="mt-1 max-w-sm text-sm leading-5 text-white/75">{item.description}</p>
          </div>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-navy transition group-hover:rotate-45 group-hover:bg-gold"><ArrowUpRight size={17} /></span>
        </div>
        <div className="mt-3 text-sm font-semibold text-gold">{item.price}</div>
      </div>
    </Link>
  )
}
