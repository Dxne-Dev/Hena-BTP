"use client"

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { WhatsappButton } from "./whatsapp-button"
import { whatsappLink } from "@/lib/site"

const NAV = [
  { label: "Accueil", href: "#accueil" },
  { label: "Nos constructions", href: "#constructions" },
  { label: "Contact", href: "#contact" },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-primary/95 backdrop-blur supports-[backdrop-filter]:bg-primary/80 border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="#accueil" className="flex items-baseline gap-2">
          <span className="font-serif text-xl font-bold tracking-tight text-primary-foreground lg:text-2xl">
            HENA
          </span>
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">
            BTP
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-primary-foreground/80 transition-colors hover:text-gold"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <WhatsappButton
            href={whatsappLink("Bonjour HENA BTP, je souhaite des informations.")}
            label="WhatsApp"
          />
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-md p-2 text-primary-foreground md:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-primary md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-base font-medium text-primary-foreground/90 hover:bg-white/5 hover:text-gold"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2">
              <WhatsappButton
                href={whatsappLink("Bonjour HENA BTP, je souhaite des informations.")}
                label="Nous écrire sur WhatsApp"
                full
              />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
