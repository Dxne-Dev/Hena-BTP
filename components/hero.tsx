import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section id="accueil" className="relative isolate min-h-[100svh] overflow-hidden">
      {/* Background image */}
      <img
        src="/hero-villa.png"
        alt="Villa moderne construite par HENA BTP à Godomey"
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      {/* Overlays for legibility */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-primary via-primary/70 to-primary/40" />
      <div className="absolute inset-0 -z-10 bg-primary/30" />

      <div className="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-32 lg:px-8 lg:pb-24">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-primary/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold backdrop-blur">
            Godomey · Bénin
          </span>

          <h1 className="mt-6 font-serif text-4xl font-bold leading-[1.05] text-balance text-primary-foreground sm:text-6xl lg:text-7xl">
            La construction <span className="text-gold">clé en main</span>, du terrain à la remise des clés.
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-primary-foreground/80 sm:text-lg">
            Villas, immeubles, rénovations et finitions. HENA BTP conçoit et
            réalise votre projet avec des délais tenus et des finitions soignées.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#constructions"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-gold-foreground transition-transform hover:-translate-y-0.5"
            >
              Voir nos réalisations
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary-foreground/30 bg-primary-foreground/5 px-7 py-3.5 text-sm font-semibold text-primary-foreground backdrop-blur transition-colors hover:bg-primary-foreground/10"
            >
              Demander un devis
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
