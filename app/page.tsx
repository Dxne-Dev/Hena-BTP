import { MessageCircle } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Constructions } from "@/components/constructions"
import { WhyHena } from "@/components/why-hena"
import { Contact } from "@/components/contact"
import { SiteFooter } from "@/components/site-footer"
import { whatsappLink } from "@/lib/site"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <Hero />
      <Constructions />
      <WhyHena />
      <Contact />
      <SiteFooter />

      {/* Bouton WhatsApp flottant, visible en permanence */}
      <a
        href={whatsappLink("Bonjour HENA BTP, je souhaite des informations.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Nous contacter sur WhatsApp"
        className="fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-[#0b2e13] shadow-lg shadow-primary/30 transition-transform hover:scale-105 md:hidden"
      >
        <MessageCircle className="size-7" />
      </a>
    </main>
  )
}
