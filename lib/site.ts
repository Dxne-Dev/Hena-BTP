export const WHATSAPP_NUMBER = "22941423660"
export const WHATSAPP_DISPLAY = "+229 41 42 36 60"
export const ADDRESS = "Godomey, Abomey-Calavi, Bénin"

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export type Project = {
  id: string
  title: string
  type: string
  price: string
  area: string
  cover: string
  status: "available" | "soon"
  // Online tour
  poster?: string
  video?: string
  bedrooms?: string
  land?: string
  finishes?: string
  description?: string
}

export const projects: Project[] = [
  {
    id: "villa-emeraude",
    title: "Villa Émeraude",
    type: "Villa 4 chambres",
    price: "30.000.000 FCFA",
    area: "250 m²",
    cover: "/villa-emeraude.png",
    status: "available",
    poster: "/tour-poster.png",
    // Vidéo de démonstration — remplacez par le lien de votre reel / visite réelle
    video:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    bedrooms: "4 chambres · 3 salles de bain",
    land: "Terrain de 400 m²",
    finishes: "Carrelage grand format, cuisine équipée, faux plafond, peinture premium",
    description:
      "Une villa contemporaine livrée clé en main, pensée pour le confort d'une famille. Espaces de vie ouverts et lumineux, matériaux haut de gamme et finitions soignées jusque dans les moindres détails.",
  },
  {
    id: "residence-palmiers",
    title: "Résidence Les Palmiers",
    type: "Immeuble R+3",
    price: "85.000.000 FCFA",
    area: "420 m²",
    cover: "/residence-palmiers.png",
    status: "soon",
    bedrooms: "8 appartements",
    land: "Terrain de 600 m²",
    finishes: "Parties communes soignées, ascenseur, parking sécurisé",
    description:
      "Un immeuble résidentiel moderne offrant plusieurs appartements de standing, idéal pour l'investissement locatif.",
  },
  {
    id: "renovation-cotonou",
    title: "Rénovation Villa Cotonou",
    type: "Rénovation complète",
    price: "18.000.000 FCFA",
    area: "180 m²",
    cover: "/renovation-villa.png",
    status: "soon",
    bedrooms: "3 chambres",
    land: "Existant réhabilité",
    finishes: "Reprise complète des sols, murs et plomberie, décoration intérieure",
    description:
      "Transformation complète d'une maison existante avec des finitions modernes et élégantes.",
  },
  {
    id: "villa-prestige",
    title: "Villa Prestige Godomey",
    type: "Villa 5 chambres",
    price: "45.000.000 FCFA",
    area: "320 m²",
    cover: "/villa-prestige.png",
    status: "soon",
    bedrooms: "5 chambres · double garage",
    land: "Terrain de 500 m²",
    finishes: "Domotique, dressing, terrasse aménagée, finitions bois noble",
    description:
      "Une villa d'exception alliant volumes généreux et prestations premium pour un cadre de vie haut de gamme.",
  },
]
