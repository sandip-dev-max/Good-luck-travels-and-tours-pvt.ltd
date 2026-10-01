import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function PageHero({
  eyebrow, title, description, image, crumb = 'Home', button = 'Plan your journey',
}: { eyebrow: string; title: string; description: string; image: string; crumb?: string; button?: string }) {
  return (
    <section className="px-3 pt-[5.5rem] sm:px-5 sm:pt-24">
      <div className="on-dark relative isolate mx-auto flex min-h-[440px] max-w-[1440px] items-end overflow-hidden rounded-[28px] shadow-lux sm:min-h-[520px] sm:rounded-[36px]">
        <Image src={image} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/90 via-sea/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-navy/60 to-transparent" />
        <div className="w-full px-6 pb-10 pt-24 sm:px-12 sm:pb-14 lg:px-16">
          <div className="max-w-3xl text-white">
            <nav aria-label="Breadcrumb" className="mb-5 flex gap-2 text-sm text-white/70">
              <Link href="/" className="hover:text-white">Home</Link><span aria-hidden>/</span><span aria-current="page">{crumb}</span>
            </nav>
            <span className="eyebrow">{eyebrow}</span>
            <h1 className="mt-4 text-[clamp(2.4rem,6.4vw,5rem)] leading-[1.02]">{title}</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/80">{description}</p>
            <Link href="/contact" className="btn-gold mt-7">{button}<ArrowRight size={16} /></Link>
          </div>
        </div>
      </div>
    </section>
  )
}
