import { ADDRESS, WHATSAPP_DISPLAY } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-primary py-10 text-primary-foreground">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-baseline gap-2">
          <span className="font-serif text-xl font-bold tracking-tight">HENA</span>
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">
            BTP
          </span>
        </div>
        <div className="flex flex-col gap-1 text-sm text-primary-foreground/70 lg:text-right">
          <span>{ADDRESS}</span>
          <span>WhatsApp : {WHATSAPP_DISPLAY}</span>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-7xl px-5 lg:px-8">
        <p className="border-t border-white/10 pt-6 text-xs text-primary-foreground/50">
          © {new Date().getFullYear()} HENA BTP · Construction clé en main à Godomey, Bénin. Tous droits réservés.
        </p>
      </div>
    </footer>
  )
}
