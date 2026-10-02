'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, Menu, MessageCircle, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { waLink } from '@/lib/whatsapp'

const links = [
  ['Destinations', '/destinations'],
  ['Tours', '/tours'],
  ['Flights', '/flights'],
  ['Hotels', '/hotels'],
  ['Visa', '/visa'],
  ['Blog', '/blog'],
  ['About', '/about'],
] as const

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // close the mobile menu on navigation, lock page scroll while it is open
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <header className={`fixed inset-x-0 top-0 z-50 px-3 transition-all sm:px-5 ${scrolled ? 'pt-2.5' : 'pt-4'}`}>
      <div
        className={`mx-auto flex max-w-[1360px] items-center justify-between rounded-[22px] border px-2.5 py-2 backdrop-blur-xl transition-all ${
          scrolled ? 'border-line bg-white/95 shadow-soft' : 'border-white/80 bg-white/90 shadow-card'
        }`}
      >
        <Link href="/" className="flex items-center gap-2.5 px-1" aria-label="Good Luck International Travels & Tours — home">
          <Image src="/images/good-luck-navbar.png" alt="Good Luck logo" width={240} height={96} className="h-12 w-auto object-contain sm:h-14" priority unoptimized />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? 'page' : undefined}
              className={`relative rounded-full px-3.5 py-2.5 text-[13px] font-semibold transition ${
                isActive(href) ? 'bg-cloud text-navy' : 'text-ink-2 hover:bg-cloud hover:text-navy'
              }`}
            >
              {label}
              {isActive(href) && <span className="absolute inset-x-5 -bottom-0.5 h-0.5 rounded-full bg-gold" />}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={waLink('Hello Good Luck Travels, I would like to know about your packages.')}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-2 text-xs font-semibold text-navy transition hover:border-gold"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-gold/20 text-gold-ink"><MessageCircle size={14} /></span>
            WhatsApp
          </a>
          <Link href="/contact" className="inline-flex items-center gap-1.5 rounded-full bg-gold px-4 py-2.5 text-[13px] font-semibold text-[#1b1404] transition hover:bg-gold-soft">
            Enquire <ArrowUpRight size={14} />
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="grid h-10 w-10 place-items-center rounded-full bg-cloud text-navy lg:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="mx-auto mt-2 max-h-[calc(100svh-6rem)] max-w-[1360px] overflow-y-auto rounded-[22px] border border-line bg-white p-2 shadow-lux lg:hidden">
          <nav aria-label="Mobile">
            {links.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                aria-current={isActive(href) ? 'page' : undefined}
                className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-[15px] font-semibold ${isActive(href) ? 'bg-cloud text-navy' : 'text-ink-2 hover:bg-cloud'}`}
              >
                {label}
                {isActive(href) && <span className="h-1.5 w-1.5 rounded-full bg-gold" />}
              </Link>
            ))}
          </nav>
          <div className="mt-1 grid gap-2 border-t border-line p-2 pt-3">
            <Link href="/contact" className="btn-gold">Enquire now <ArrowUpRight size={15} /></Link>
            <a href={waLink()} target="_blank" rel="noreferrer" className="btn-primary"><MessageCircle size={16} /> WhatsApp +977 981-680-0052</a>
          </div>
        </div>
      )}
    </header>
  )
}
