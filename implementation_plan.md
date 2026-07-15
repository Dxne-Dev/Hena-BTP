# Plan d'implémentation : Visite Immersive au Scroll (HENA BTP)

Ce plan décrit l'implémentation d'une visite virtuelle immersive contrôlée par le défilement (scroll) pour la **Villa Émeraude**, en utilisant la séquence d'images WebP (de `002.webp` à `117.webp`) copiée dans `/public/walkthrough/`.

## Fonctionnalités Principales

1. **Overlay Plein Écran Immersif** :
   - Lancement au clic sur la réalisation avec "Visite disponible".
   - Arrière-plan noir luxueux (`bg-black`), masquage du scroll global pour éviter les conflits.

2. **Rendu Canvas Haute Performance** :
   - Rendu de la séquence d'images sur un `<canvas>` ajusté pour occuper tout l'écran (`object-cover` logique en 2D Canvas).
   - Préchargement des 116 images WebP avec barre de progression de chargement pour éviter tout clignotement ou retard.
   - Interpolation linéaire (lerp) pour un défilement ultra-fluide même lors de coups de scroll brusques.

3. **Narration Visuelle (Textes Révélés au Défilement)** :
   - Apparition de cartes élégantes semi-transparentes (flou de verre) décrivant les différentes pièces/étapes au fur et à mesure de l'avancement :
     - **0% - 20%** : Introduction & Façade Moderne.
     - **20% - 40%** : Le Salon & Espace de Vie Lumineux.
     - **40% - 65%** : La Cuisine Équipée & Design.
     - **65% - 85%** : La Suite Parentale & Finitions Premium.
     - **85% - 100%** : Demande d'information finale avec bouton WhatsApp.

4. **Contrôles et Navigation** :
   - Indicateur de progression discret en haut de l'écran.
   - Bouton de fermeture élégant en haut à droite.
   - Indicateur de scroll animé invitant l'utilisateur à faire défiler pour commencer.

---

## Modifications Proposées

### [Component Name] : `ImmersiveTour`

#### [NEW] [immersive-tour.tsx](file:///c:/Dev/HENA-BTP/components/immersive-tour.tsx)
Création d'un composant React autonome qui gère :
- Le préchargement des images.
- L'écoute des événements de défilement dans un conteneur dédié de hauteur `h-[500vh]`.
- L'animation Canvas via `requestAnimationFrame`.
- L'affichage synchronisé des cartes textuelles.

#### [MODIFY] [constructions.tsx](file:///c:/Dev/HENA-BTP/components/constructions.tsx)
- Importer `ImmersiveTour` et ajouter un état local pour savoir si la visite virtuelle immersive est active.
- Remplacer le comportement par défaut pour la **Villa Émeraude** afin de lancer directement la visite immersive au lieu de la modale standard.

---

## Plan de Vérification

### Vérification Manuelle
- Lancer le serveur local avec `npm run dev`.
- Cliquer sur le projet "Villa Émeraude".
- Vérifier que l'overlay se charge bien avec un indicateur d'attente (loader).
- Faire défiler la page et s'assurer que les images s'enchaînent de manière fluide sans à-coups ni trous.
- Confirmer que les textes descriptifs apparaissent et disparaissent harmonieusement.
- Cliquer sur le bouton de fermeture pour quitter la visite.
- Tester sur différents formats d'écran.
