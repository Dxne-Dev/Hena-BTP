"use client"

import { useEffect, useState } from "react"
import { Maximize2, Ruler, Tag } from "lucide-react"
import { projects, type Project } from "@/lib/site"
import { TourModal } from "./tour-modal"
import { ImmersiveTour } from "./immersive-tour"

export function Constructions() {
  const [active, setActive] = useState<Project | null>(null)
  const [immersiveActive, setImmersiveActive] = useState(false)

  // Lock scroll while modal is open
  useEffect(() => {
    if (immersiveActive) return // ImmersiveTour handles its own scroll lock
    document.body.style.overflow = active ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [active, immersiveActive])

  return (
    <section id="constructions" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-foreground/70">
            Nos réalisations
          </span>
          <h2 className="mt-3 font-serif text-3xl font-bold text-balance text-foreground sm:text-5xl">
            Des projets à visiter en ligne
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Explorez nos biens clé en main. Cliquez sur une réalisation pour
            démarrer la visite vidéo et découvrir chaque détail.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => {
                if (project.id === "villa-emeraude") {
                  setImmersiveActive(true)
                } else {
                  setActive(project)
                }
              }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={project.cover || "/placeholder.svg"}
                  alt={project.title}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-60" />

                {/* Status / play badge */}
                <div className="absolute left-4 top-4">
                  {project.status === "available" ? (
                    <span className="rounded-full bg-gold px-3 py-1 text-xs font-semibold text-gold-foreground">
                      Visite disponible
                    </span>
                  ) : (
                    <span className="rounded-full bg-primary/80 px-3 py-1 text-xs font-semibold text-primary-foreground backdrop-blur">
                      Bientôt disponible
                    </span>
                  )}
                </div>

                <div className="absolute bottom-4 right-4 flex size-11 items-center justify-center rounded-full bg-background/90 text-foreground shadow-lg transition-transform group-hover:scale-110">
                  <Maximize2 className="size-5" />
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-accent-foreground/60">
                  {project.type}
                </p>
                <h3 className="mt-1 font-serif text-xl font-bold text-foreground">
                  {project.title}
                </h3>

                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
                    <Tag className="size-4 text-gold" />
                    {project.price}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Ruler className="size-4" />
                    {project.area}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <TourModal project={active} onClose={() => setActive(null)} />
      {immersiveActive && (
        <ImmersiveTour onClose={() => setImmersiveActive(false)} />
      )}
    </section>
  )
}
