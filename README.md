# 🍔 GirondeSphere — Fast-Food PWA (Bilan Complet)

**GirondeSphere** est une Progressive Web App (PWA) de restauration rapide moderne, conçue pour offrir une expérience utilisateur haut de gamme (similaire à UberEats ou Glovo) sans nécessiter de base de données backend complexe. 

Le système repose sur un catalogue alimenté en temps réel par Google Sheets et un tunnel de commande décentralisé via WhatsApp Business.

---

## 🚀 Architecture & Technologies

- **Frontend Framework :** React (Vite)
- **Styling :** Tailwind CSS (Mobile-First, "Safe Areas" pour iOS/Android)
- **State Management :** Context API (`MenuContext` pour les données, `CartContext` pour le panier)
- **Base de Données :** Flux CSV distant via Google Sheets
- **Backend / Commandes :** 100% Client-Side. Redirection vers WhatsApp Web/App
- **Déploiement :** Vercel
- **PWA (Hors-Ligne) :** `vite-plugin-pwa` (Workbox) avec Service Worker pour la mise en cache agressive des images et des assets statiques.

---

## 🌟 Fonctionnalités Clés

### 1. 📲 Expérience Utilisateur (UX) Premium
- **Interface Mobile-First :** Barre de navigation inférieure (`BottomNav`), zones tactiles larges (44x44px), animations fluides de chargement (`animate-fade-up`) et de transition.
- **Gestion des Modales :** Superposition propre des fenêtres (`z-[100]`) pour la page produit, le panier et le paiement, garantissant que les boutons d'actions (CTA) restent toujours au-dessus de la ligne de flottaison.
- **PWA Installable :** L'application propose une popup native pour être installée directement sur l'écran d'accueil du téléphone du client (Add to Home Screen).

### 2. 🛒 Tunnel de Commande & Upsell
- **Panier Persistant :** Validation stricte des options obligatoires, sélection multiple limitée, et recalcul instantané des prix.
- **Ventes Croisées (Upsell) :** L'écran du panier propose intelligemment au client de "compléter son repas" avec des petits articles (frites, boissons) qu'il n'a pas encore commandés.
- **Validation WhatsApp :** La commande génère un ticket de caisse clair et structuré (avec calcul des frais de livraison dynamiques par quartier) et redirige l'utilisateur vers le WhatsApp du restaurant. Le Tabnabbing est empêché (`noopener,noreferrer`).

### 3. 🔥 Promotions Dynamiques
- L'onglet "Promos" n'est plus statique : il scanne en direct les produits du Google Sheets qui ont un `originalPrice` (Prix barré) supérieur au `price` de vente.
- L'algorithme **génère automatiquement les filtres (onglets)** correspondants aux catégories en promotion (Ex: Si un sandwich est en promo, l'onglet "Sandwichs" apparaîtra dans l'espace Promo).

### 4. ⚡ Performances & Sécurité (Lighthouse 90+)
- **Lazy Loading :** Composant `<LazyImage>` universel. Toutes les images sont chargées de manière différée avec un Fallback intelligent (Emoji 🍽️) en cas d'erreur réseau.
- **Security by Design :**
  - Pas d'API keys exposées.
  - Prévention de l'injection XSS en ne permettant aucun rendu HTML (`dangerouslySetInnerHTML`) à partir des données Sheet.
  - Validation forte des prix via `parseInt` lors du traitement CSV.
  - **Production Clean :** Suppression automatique de tous les `console.log` et `debugger` lors de la compilation Vercel (via la configuration `esbuild`).
- **Accessibilité (A11y) & SEO :** Balises OpenGraph intégrées, attributs ALT obligatoires, contraste vérifié (WCAG 2.1).

---

## 📂 Organisation du Projet

```bash
📦 src
 ┣ 📂 components
 ┃ ┣ 📂 layout     # BottomNav, StatusBar (Structurels)
 ┃ ┣ 📂 modals     # Detail, Checkout, OrderScreen, HistoryScreen (Écrans pleins)
 ┃ ┗ 📂 ui         # LazyImage, Buttons, Stepper (Primitives réutilisables)
 ┣ 📂 context      # CartContext, MenuContext (État global)
 ┣ 📂 data         # menu.json (Structure de base et fallback)
 ┣ 📂 pages        # Home, CategoriesPage, PromoPage, SearchPage, FavoritePage
 ┣ 📂 services     # menuService (Parseur CSV), whatsappService (Générateur)
 ┣ 📜 App.jsx      # Routeur de l'application et gestionnaire des modales
 ┣ 📜 index.css    # Tailwind et variables CSS (Safe Areas)
 ┗ 📜 main.jsx     # Point d'entrée (interception des erreurs globales)
```

---

## 🛠️ Instructions pour l'Administrateur

### Mettre à jour le Menu
1. Ouvrez votre **Google Sheets**.
2. Modifiez les colonnes (Nom, Description, Prix, Catégorie, Tag, Image, Prix Barré).
3. L'application récupérera automatiquement les modifications au prochain chargement ou au rafraîchissement du cache (PWA).

### Mettre à jour les Quartiers & le Numéro de Téléphone
- Ces données de base se modifient dans `src/data/menu.json`.

---
*Ce projet a été finalisé avec succès. Il est prêt pour le déploiement grand public.* 🎉
