import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Instagram, Mail, MapPin, MessageCircle, Phone, ShieldCheck, Youtube } from 'lucide-react'
import { company } from '@/data/site'
import { WA_DISPLAY, waLink } from '@/lib/whatsapp'

const socialIcon = { Instagram, Facebook, YouTube: Youtube }

const explore = [['Destinations', '/destinations'], ['Tour packages', '/tours'], ['Flights', '/flights'], ['Hotels', '/hotels'], ['Visa assistance', '/visa']]
const about = [['About Good Luck', '/about'], ['Travel journal', '/blog'], ['Contact us', '/contact'], ['Privacy policy', '/privacy'], ['Terms of service', '/terms']]

function Col({ title, items }: { title: string; items: string[][] }) {
  return (
    <div>
      <h2 className="font-display text-base font-semibold text-white">{title}</h2>
      <ul className="mt-5 grid gap-3">
        {items.map(([label, href]) => (
          <li key={href}>
            <Link href={href} className="text-sm text-white/65 transition hover:text-gold">{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="mt-8 px-0 pb-0 sm:px-5 sm:pb-5">
      <div className="on-dark relative isolate overflow-hidden rounded-none bg-gradient-to-b from-navy via-navy-2 to-[#14376b] text-white sm:rounded-[36px]">
        <div className="grid-fade absolute inset-0 -z-10" />
        <div className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-sky/25 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 -z-10 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />

        <div className="container-luxury py-14 sm:py-16">
          {/* call to action */}
          <div className="flex flex-col gap-6 border-b border-white/10 pb-12 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="eyebrow">Ready when you are</span>
              <p className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Your next journey can start with <span className="text-gold">one message.</span>
              </p>
            </div>
            <a href={waLink()} target="_blank" rel="noreferrer" className="btn-gold shrink-0"><MessageCircle size={17} /> WhatsApp {WA_DISPLAY}</a>
          </div>

          <div className="grid gap-10 py-12 lg:grid-cols-[1.3fr_.7fr_.7fr_1fr]">
            <div>
              <Link href="/" className="flex items-center gap-3">
                <Image src="/images/good-luck-footer.png" alt="Good Luck logo" width={240} height={92} className="h-14 w-auto object-contain" unoptimized />
              </Link>
              <p className="mt-5 max-w-md text-sm leading-7 text-white/65">
                Flights, hotels, holiday packages and visa guidance, arranged by people who reply the same day, from Kathmandu to the world.
              </p>
              {company.socials.length > 0 && (
                <div className="mt-6 flex gap-2">
                  {company.socials.map(({ label, url }) => {
                    const Icon = socialIcon[label]
                    return (
                      <a key={label} href={url} target="_blank" rel="noreferrer" aria-label={label} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-gold hover:text-navy">
                        <Icon size={16} />
                      </a>
                    )
                  })}
                </div>
              )}
            </div>

            <Col title="Explore" items={explore} />
            <Col title="Company" items={about} />

            <div>
              <h2 className="font-display text-base font-semibold text-white">Talk to our travel desk</h2>
              <p className="mt-5 text-sm leading-6 text-white/65">Have a destination in mind? Message us and a real person will guide you.</p>
              <ul className="mt-5 grid gap-3 text-sm text-white/80">
                <li><a href={`tel:${company.phones[0].replace(/\s/g, '')}`} className="flex items-center gap-2.5 hover:text-gold"><Phone size={15} className="text-gold" />{company.phones[0]}</a></li>
                <li><a href={`tel:${company.phones[1].replace(/\s/g, '')}`} className="flex items-center gap-2.5 hover:text-gold"><Phone size={15} className="text-gold" />{company.phones[1]}</a></li>
                <li><a href={`mailto:${company.email}`} className="flex items-center gap-2.5 whitespace-nowrap text-xs hover:text-gold"><Mail size={15} className="shrink-0 text-gold" />{company.email}</a></li>
              </ul>
            </div>
          </div>

          <div className="grid gap-5 border-t border-white/10 pt-8 text-sm text-white/65 md:grid-cols-3">
            {company.locations.map((location) => (
              <a key={location.label} href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`} target="_blank" rel="noreferrer" className="flex items-start gap-2.5 transition hover:text-gold">
                <MapPin size={15} className="mt-0.5 shrink-0 text-gold" />
                <span><strong className="font-semibold text-white">{location.label}</strong><br />{location.address}</span>
              </a>
            ))}
            <div className="flex items-center gap-2.5 md:justify-end"><ShieldCheck size={15} className="text-gold" /> Human support · Clear travel guidance</div>
          </div>
        </div>

        <div className="border-t border-white/10 bg-black/15">
          <div className="container-luxury flex flex-col items-center gap-2 py-5 text-center text-xs text-white/55">
            <span>© {new Date().getFullYear()} {company.name} All rights reserved.</span>
            <span>Designed &amp; developed with ❤️ by <a href="https://sandipbhatta.com.np" target="_blank" rel="noreferrer" className="transition hover:text-gold">sandipbhatta.com.np</a></span>
          </div>
        </div>
      </div>
    </footer>
  )
}
