import { MessageCircle } from "lucide-react"

type Props = {
  href: string
  label: string
  full?: boolean
  variant?: "solid" | "outline"
}

export function WhatsappButton({ href, label, full, variant = "solid" }: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
  const styles =
    variant === "solid"
      ? "bg-[#25D366] text-[#0b2e13] hover:bg-[#1fb457]"
      : "border border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10"

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${styles} ${full ? "w-full" : ""}`}
    >
      <MessageCircle className="size-4" />
      {label}
    </a>
  )
}
