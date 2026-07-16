# Guide de Gestion des Médias (Images et Vidéos)

Pour que votre application s'affiche parfaitement, j'ai mis en place une structure claire pour organiser vos images de produits et vos vidéos de promotion.

## 📂 Où placer vos fichiers ?

Allez dans le dossier `public/assets/` de votre projet. Vous y trouverez deux sous-dossiers :

1. **`public/assets/products/`** : 
   - Mettez ici toutes les photos de vos plats (Tacos, Burger, Crêpes, Jus, etc.).
   - *Conseil :* Utilisez des images carrées au format `.jpg`, `.png` ou `.webp`.
   - *Exemple :* `tacos-standard.jpg`, `jus-fraise.png`.

2. **`public/assets/promos/`** : 
   - Mettez ici vos vidéos courtes (diaporamas, reels, tiktok-style) ou vos bannières promotionnelles.
   - *Conseil :* Pour les vidéos, utilisez le format `.mp4`. Restez en dessous de 10Mo par vidéo pour que l'application charge vite.
   - *Exemple :* `promo-burger.mp4`, `banniere-rentree.jpg`.

## ⚙️ Comment les lier dans l'application ?

Une fois que vos fichiers sont dans les bons dossiers, vous devez dire à l'application de les utiliser en modifiant le fichier **`src/data/menu.json`**.

### Pour un produit :
Dans `menu.json`, trouvez votre produit et ajoutez/modifiez la ligne `"image"`. Utilisez le chemin exact (qui commence par `/assets/...`).

```json
{
  "id": "ff-tacos",
  "name": "Tacos Standard",
  "price": 2500,
  "image": "/assets/products/tacos-standard.jpg"
}
```
*(Si vous ne mettez pas d'image, l'émoji s'affichera à la place).*

### Pour une vidéo dans la section Promos :
Si vous voulez afficher une vidéo en une de la page Promos, vous devez référencer cette vidéo dans le code ou via les recommandations dans `menu.json`. 
Pour l'instant, le composant `PromoPage.jsx` est prêt à lire une vidéo avec cette balise (voir `PromoPage.jsx`) :

```jsx
<video 
  src="/assets/promos/promo-burger.mp4" 
  autoPlay 
  loop 
  muted 
  playsInline 
  className="w-full h-full object-cover"
/>
```

C'est aussi simple que ça ! Mettez vos fichiers dans `public/assets`, référencez le chemin dans vos fichiers JSON/JSX, et l'application s'occupe du reste.
