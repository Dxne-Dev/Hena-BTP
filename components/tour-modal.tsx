"use client"

import { useEffect } from "react"
import { BedDouble, Landmark, Sparkles, X } from "lucide-react"
import { type Project, whatsappLink } from "@/lib/site"
import { WhatsappButton } from "./whatsapp-button"

type Props = {
  project: Project | null
  onClose: () => void
}

export function TourModal({ project, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  if (!project) return null

  const hasVideo = project.status === "available" && !!project.video

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-primary/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Visite en ligne — ${project.title}`}
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[92svh] w-full max-w-5xl flex-col overflow-hidden rounded-t-2xl bg-card shadow-2xl sm:rounded-2xl lg:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer la visite"
          className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full bg-background/90 text-foreground shadow-md transition-colors hover:bg-background"
        >
          <X className="size-5" />
        </button>

        {/* Video / poster */}
        <div className="relative aspect-video w-full shrink-0 bg-primary lg:aspect-auto lg:w-3/5">
          {hasVideo ? (
            <video
              controls
              playsInline
              preload="none"
              poster={project.poster}
              className="size-full object-cover"
            >
              <source src={project.video} type="video/mp4" />
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>
          ) : (
            <>
              <img
                src={project.poster || project.cover || "/placeholder.svg"}
                alt={`Aperçu de ${project.title}`}
                className="size-full object-cover opacity-70"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-primary/50 text-center text-primary-foreground">
                <span className="rounded-full bg-gold px-4 py-1.5 text-xs font-semibold text-gold-foreground">
                  Visite bientôt disponible
                </span>
                <p className="max-w-xs px-6 text-sm text-primary-foreground/80">
                  La visite vidéo de ce bien arrive prochainement. Contactez-nous
                  pour une visite privée.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-6 lg:p-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-accent-foreground/60">
              {project.type}
            </p>
            <h3 className="mt-1 font-serif text-2xl font-bold text-foreground">
              {project.title}
            </h3>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="text-lg font-bold text-gold">{project.price}</span>
              <span className="text-sm text-muted-foreground">· {project.area}</span>
            </div>
          </div>

          {project.description && (
            <p className="text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>
          )}

          <ul className="flex flex-col gap-3 border-t border-border pt-5">
            {project.bedrooms && (
              <li className="flex items-start gap-3 text-sm text-foreground">
                <BedDouble className="mt-0.5 size-5 shrink-0 text-gold" />
                <span>{project.bedrooms}</span>
              </li>
            )}
            {project.land && (
              <li className="flex items-start gap-3 text-sm text-foreground">
                <Landmark className="mt-0.5 size-5 shrink-0 text-gold" />
                <span>{project.land}</span>
              </li>
            )}
            {project.finishes && (
              <li className="flex items-start gap-3 text-sm text-foreground">
                <Sparkles className="mt-0.5 size-5 shrink-0 text-gold" />
                <span>{project.finishes}</span>
              </li>
            )}
          </ul>

          <div className="mt-auto pt-2">
            <WhatsappButton
              full
              href={whatsappLink(
                `Bonjour HENA BTP, je suis intéressé(e) par le bien "${project.title}" (${project.price}). Pouvez-vous m'en dire plus ?`,
              )}
              label={`Demander ce bien`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
