import { Clock, Gem, HandshakeIcon } from "lucide-react"

const REASONS = [
  {
    icon: Clock,
    title: "Délais tenus",
    text: "Un planning clair et respecté, pour une remise des clés à la date convenue.",
  },
  {
    icon: Gem,
    title: "Finitions soignées",
    text: "Des matériaux de qualité et un souci du détail sur chaque m² livré.",
  },
  {
    icon: HandshakeIcon,
    title: "Accompagnement complet",
    text: "Un interlocuteur unique, du devis à la livraison, pour un projet serein.",
  },
]

export function WhyHena() {
  return (
    <section className="bg-primary py-20 text-primary-foreground lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Pourquoi HENA BTP
          </span>
          <h2 className="mt-3 font-serif text-3xl font-bold text-balance sm:text-5xl">
            Bâtir la confiance autant que les murs
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {REASONS.map((reason) => (
            <div
              key={reason.title}
              className="rounded-2xl border border-white/10 bg-primary-foreground/5 p-7 transition-colors hover:border-gold/40"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-gold text-gold-foreground">
                <reason.icon className="size-6" />
              </div>
              <h3 className="mt-5 font-serif text-xl font-bold">{reason.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">
                {reason.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
