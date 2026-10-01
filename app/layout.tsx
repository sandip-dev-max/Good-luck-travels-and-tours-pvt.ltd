import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Bricolage_Grotesque, Figtree } from 'next/font/google'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat'

const display=Bricolage_Grotesque({subsets:['latin'],variable:'--font-display',display:'swap'})
const sans=Figtree({subsets:['latin'],variable:'--font-sans',display:'swap'})
export const metadata:Metadata={title:{default:'Good Luck International Travels & Tours | Kathmandu',template:'%s | Good Luck Travels'},description:'Good Luck International Travels & Tours — flights, hotels, holiday packages, visa assistance and personal travel planning from Kathmandu, Nepal.',metadataBase:new URL('https://goodluckintl.com'),robots:{index:true,follow:true},alternates:{canonical:'/'},openGraph:{locale:'en_NP',title:'Good Luck International Travels & Tours',description:'Flights, hotels, holiday packages, visa assistance and travel planning from Kathmandu, Nepal.',url:'https://goodluckintl.com',siteName:'Good Luck International Travels & Tours',type:'website'}}
export const viewport:Viewport={themeColor:'#1c6a98',width:'device-width',initialScale:1}
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body className={`${display.variable} ${sans.variable}`}><a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:font-semibold focus:text-navy">Skip to content</a><Navbar/><div id="main">{children}</div><Footer/><WhatsAppFloat/></body></html>}
