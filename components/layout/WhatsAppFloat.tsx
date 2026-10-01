import { MessageCircle } from 'lucide-react'
import { waLink } from '@/lib/whatsapp'

export function WhatsAppFloat() {
  return (
    <a
      href={waLink('Hello Good Luck Travels, I saw your website and would like to ask about a travel package.')}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Good Luck on WhatsApp"
      className="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full bg-gold px-4 py-3 text-sm font-semibold text-[#1b1404] shadow-gold ring-4 ring-white/70 transition hover:-translate-y-1 hover:bg-gold-soft sm:bottom-6 sm:right-6"
    >
      <MessageCircle size={18} />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  )
}
