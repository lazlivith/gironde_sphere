# Songolo Fast-Food — PWA

Stack : React (Vite) + Tailwind CSS. Zéro backend — le panier vit en mémoire,
la commande part directement sur WhatsApp.

## Démarrer

    npm install
    npm run dev

## Personnaliser

- `src/data/menu.json` — produits, catégories, zones de livraison et numéro WhatsApp.
- `src/services/whatsappService.js` — format du message envoyé au restaurant.
- Couleurs / polices : `tailwind.config.js` et `index.html` (Google Fonts).
- Icônes PWA à ajouter dans `public/icons/` (192x192 et 512x512), déjà référencées
  dans `public/manifest.json`.

## Design

Inspiré du langage visuel food-delivery (cartes produits arrondies, chips de
catégorie, panier flottant, bottom sheet) avec palette blanc / beige / vert
naturel / noir. Le lien Figma fourni n'a pas pu être ouvert automatiquement
(Figma bloque l'accès aux prototypes sans être connecté) — envoyez des
captures d'écran des frames clés si vous voulez un calage pixel-perfect.
# gironde_sphere
