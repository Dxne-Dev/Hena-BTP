"use client"

import { useEffect, useRef, useState } from "react"
import { MessageCircle, X, ChevronDown, Check } from "lucide-react"
import { whatsappLink } from "@/lib/site"

type Props = {
  onClose: () => void
}

const TOTAL_FRAMES = 116 // From 002.webp to 117.webp (inclusive)
const FRAME_START = 2
const FRAME_END = 117

const slides = [
  {
    start: 0,
    end: 0.18,
    title: "Bienvenue à la Villa Émeraude",
    description: "Découvrez une architecture contemporaine d'exception livrée clé en main au Bénin, alliant élégance et confort absolu.",
  },
  {
    start: 0.22,
    end: 0.42,
    title: "Espace de Vie & Salon",
    description: "Un séjour spacieux et lumineux avec de grandes baies vitrées s'ouvrant sur l'extérieur, idéal pour se détendre ou recevoir.",
  },
  {
    start: 0.46,
    end: 0.66,
    title: "Cuisine Moderne Équipée",
    description: "Un espace fonctionnel aux finitions irréprochables, équipé de matériaux haut de gamme pour sublimer vos moments culinaires.",
  },
  {
    start: 0.70,
    end: 0.86,
    title: "Suite & Finitions Premium",
    description: "Des chambres chaleureuses avec placards intégrés, faux plafonds modernes et éclairages LED intégrés pour une ambiance cosy.",
  },
  {
    start: 0.90,
    end: 1.0,
    title: "Votre projet clé en main",
    description: "Avec HENA BTP, construisez en toute sérénité. Nos équipes s'occupent de tout, du plan à la remise des clés.",
    showCTA: true,
  },
]

export function ImmersiveTour({ onClose }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [images, setImages] = useState<HTMLImageElement[]>([])
  const [loadedCount, setLoadedCount] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  
  // Animation state for lerped scroll progress
  const progressRef = useRef(0)
  const targetProgressRef = useRef(0)
  const animationFrameId = useRef<number | null>(null)

  // Block global body scroll when tour is open
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  // Preload all frames
  useEffect(() => {
    let loaded = 0
    const imageList: HTMLImageElement[] = []

    for (let i = FRAME_START; i <= FRAME_END; i++) {
      const img = new Image()
      const filename = String(i).padStart(3, "0")
      img.src = `/walkthrough/${filename}.webp`
      
      img.onload = () => {
        loaded++
        setLoadedCount(loaded)
        if (loaded === TOTAL_FRAMES) {
          setIsLoaded(true)
        }
      }
      img.onerror = () => {
        // Fallback or skip failed frames
        loaded++
        setLoadedCount(loaded)
        if (loaded === TOTAL_FRAMES) {
          setIsLoaded(true)
        }
      }
      imageList.push(img)
    }

    setImages(imageList)

    return () => {
      // Cancel animation frame if unmounting
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [])

  // Handle scroll events in the container.
  // Only the (cheap) ref is updated synchronously; the React state is throttled
  // via rAF to avoid re-rendering the blurred cards on every scroll event.
  const stateTickingRef = useRef(false)
  const handleScroll = () => {
    if (!containerRef.current) return
    const container = containerRef.current
    const scrollTop = container.scrollTop
    const maxScroll = container.scrollHeight - container.clientHeight
    const progress = maxScroll > 0 ? scrollTop / maxScroll : 0

    // Clamp progress
    const clampedProgress = Math.max(0, Math.min(1, progress))
    targetProgressRef.current = clampedProgress

    if (!stateTickingRef.current) {
      stateTickingRef.current = true
      requestAnimationFrame(() => {
        setScrollProgress(targetProgressRef.current)
        stateTickingRef.current = false
      })
    }
  }

  // Draw frame on canvas (maintain aspect-ratio cover)
  const drawFrame = (progress: number) => {
    const canvas = canvasRef.current
    if (!canvas || images.length === 0) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Calculate frame index
    const frameIndex = Math.min(
      images.length - 1,
      Math.max(0, Math.floor(progress * images.length))
    )
    
    const img = images[frameIndex]
    if (!img || !img.complete) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Cover-fit logic
    const canvasWidth = canvas.width
    const canvasHeight = canvas.height
    const imgWidth = img.naturalWidth
    const imgHeight = img.naturalHeight

    const imgRatio = imgWidth / imgHeight
    const canvasRatio = canvasWidth / canvasHeight

    let drawWidth = canvasWidth
    let drawHeight = canvasHeight
    let offsetX = 0
    let offsetY = 0

    // Contain-fit: whole frame stays visible (no cropping of 9:16 images)
    if (canvasRatio > imgRatio) {
      drawHeight = canvasHeight
      drawWidth = canvasHeight * imgRatio
      offsetX = (canvasWidth - drawWidth) / 2
    } else {
      drawWidth = canvasWidth
      drawHeight = canvasWidth / imgRatio
      offsetY = (canvasHeight - drawHeight) / 2
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
  }

  // Resize canvas handler
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawFrame(progressRef.current)
    }

    window.addEventListener("resize", handleResize)
    // Run once initially if loaded
    if (isLoaded) {
      handleResize()
    }

    return () => window.removeEventListener("resize", handleResize)
  }, [isLoaded, images])

  // Animation Loop (Lerp Scroll Progress)
  useEffect(() => {
    if (!isLoaded || images.length === 0) return

    // Force initial resize setup
    const canvas = canvasRef.current
    if (canvas) {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const tick = () => {
      const diff = targetProgressRef.current - progressRef.current
      
      // Interpolate progress
      progressRef.current += diff * 0.12 // Lerp speed

      if (Math.abs(diff) < 0.0002) {
        progressRef.current = targetProgressRef.current
      }

      drawFrame(progressRef.current)
      animationFrameId.current = requestAnimationFrame(tick)
    }

    tick()

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [isLoaded, images])

  return (
    <div className="fixed inset-0 z-[100] bg-black text-white">
      {/* Loading Screen */}
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black px-6">
          <div className="w-16 h-16 border-t-2 border-b-2 border-gold rounded-full animate-spin mb-6"></div>
          <span className="font-serif text-2xl font-bold tracking-wide text-gold">HENA BTP</span>
          <p className="mt-2 text-sm text-gray-400">Préparation de votre visite immersive...</p>
          <div className="mt-6 w-full max-w-xs bg-gray-800 h-1 rounded-full overflow-hidden">
            <div 
              className="bg-gold h-full transition-all duration-150"
              style={{ width: `${Math.round((loadedCount / TOTAL_FRAMES) * 100)}%` }}
            ></div>
          </div>
          <span className="mt-2 text-xs font-semibold text-gold">
            {Math.round((loadedCount / TOTAL_FRAMES) * 100)}%
          </span>
        </div>
      )}

      {/* Main Tour view */}
      {isLoaded && (
        <div 
          ref={containerRef}
          onScroll={handleScroll}
          className="absolute inset-0 overflow-y-auto overflow-x-hidden"
          style={{ scrollbarWidth: "none" }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Fermer la visite virtuelle"
            className="fixed right-6 top-6 z-50 flex items-center justify-center size-12 rounded-full bg-black/50 border border-white/20 text-white backdrop-blur-md transition-all hover:bg-black/80 hover:scale-105"
          >
            <X className="size-6" />
          </button>

          {/* Top progress indicator */}
          <div className="fixed top-0 left-0 w-full h-1.5 bg-white/10 z-40">
            <div 
              className="h-full bg-gold transition-all duration-75"
              style={{ width: `${scrollProgress * 100}%` }}
            ></div>
          </div>

          {/* Sticky Canvas Viewport */}
          <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-black select-none pointer-events-none">
            <canvas ref={canvasRef} className="w-full h-full block object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
          </div>

          {/* Scroll instruction indicator (visible only at the start) */}
          {scrollProgress < 0.05 && (
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 pointer-events-none animate-bounce">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-white/70">
                Faites défiler pour visiter
              </span>
              <ChevronDown className="size-6 text-gold" />
            </div>
          )}

          {/* Scroll milestones - slides overlay */}
          <div className="relative z-30 pointer-events-none">
            {slides.map((slide, index) => {
              const isActive = scrollProgress >= slide.start && scrollProgress <= slide.end
              return (
                <div 
                  key={index} 
                  className="h-[160vh] w-full flex items-center justify-center px-4"
                >
                  <div 
                    className={`max-w-md w-full p-6 sm:p-8 rounded-2xl border border-white/15 bg-black/60 backdrop-blur-md transition-all duration-700 pointer-events-auto ${
                      isActive 
                        ? "opacity-100 translate-y-0 scale-100 shadow-2xl shadow-black/50" 
                        : "opacity-0 translate-y-8 scale-95"
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
                      Étape {index + 1} sur {slides.length}
                    </span>
                    <h3 className="mt-2 font-serif text-2xl font-bold text-white">
                      {slide.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-300">
                      {slide.description}
                    </p>

                    {slide.showCTA && (
                      <div className="mt-6 flex flex-col gap-3">
                        <a
                          href={whatsappLink(
                            "Bonjour HENA BTP, je viens de faire la visite immersive de la Villa Émeraude et je souhaite plus d'informations."
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gold px-6 text-sm font-semibold text-gold-foreground transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-gold/20"
                        >
                          <MessageCircle className="size-4" />
                          Discuter sur WhatsApp
                        </a>
                        <button
                          onClick={onClose}
                          className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/5 px-6 text-sm font-medium text-white transition-all hover:bg-white/10"
                        >
                          <Check className="size-4" />
                          Terminer la visite
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
