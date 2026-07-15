"use client"

import { useState } from "react"
import { MapPin, Phone, Send } from "lucide-react"
import { ADDRESS, WHATSAPP_DISPLAY, whatsappLink } from "@/lib/site"
import { WhatsappButton } from "./whatsapp-button"

export function Contact() {
  const [name, setName] = useState("")
  const [type, setType] = useState("Villa")
  const [message, setMessage] = useState("")

  const composed = whatsappLink(
    `Bonjour HENA BTP,\nJe m'appelle ${name || "[votre nom]"}.\nProjet : ${type}.\n${message || "Je souhaiterais discuter de mon projet de construction."}`,
  )

  return (
    <section id="contact" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left: info */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-foreground/70">
              Contact
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-balance text-foreground sm:text-5xl">
              Parlons de votre projet
            </h2>
            <p className="mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
              Devis, visite ou simple question : notre équipe vous répond
              rapidement sur WhatsApp.
            </p>

            <div className="mt-8 flex flex-col gap-5">
              <div className="flex items-start gap-4">
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <MapPin className="size-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Adresse</p>
                  <p className="text-sm text-muted-foreground">{ADDRESS}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Phone className="size-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">WhatsApp</p>
                  <p className="text-sm text-muted-foreground">{WHATSAPP_DISPLAY}</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <WhatsappButton
                href={whatsappLink("Bonjour HENA BTP, je souhaite un devis.")}
                label="Discuter directement sur WhatsApp"
              />
            </div>
          </div>

          {/* Right: form */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:p-8">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                window.open(composed, "_blank", "noopener,noreferrer")
              }}
              className="flex flex-col gap-5"
            >
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                  Votre nom
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex. Awa Koffi"
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/30"
                />
              </div>

              <div>
                <label htmlFor="type" className="mb-2 block text-sm font-medium text-foreground">
                  Type de projet
                </label>
                <select
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/30"
                >
                  <option>Villa</option>
                  <option>Immeuble</option>
                  <option>Rénovation</option>
                  <option>Finitions</option>
                  <option>Autre</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                  Votre message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Décrivez votre projet, votre budget, votre terrain..."
                  className="w-full resize-none rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/30"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                <Send className="size-4" />
                Envoyer via WhatsApp
              </button>
              <p className="text-center text-xs text-muted-foreground">
                Votre message s&apos;ouvre pré-rempli dans WhatsApp.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
