/* Home.jsx — Discovery Page — schéma menu actuel (categories > items imbriqués) */
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useMenu } from "../context/MenuContext";
import { StatusBar, StarRating, FCFA } from "./ui";
import { isStoreOpen } from "../utils/time";
import { useInstallPrompt } from "../utils/useInstallPrompt";

function ProductThumb({ item, className = "" }) {
  return item.image ? (
    <img src={item.image} alt={item.name} className={`h-full w-full object-cover transition-transform duration-500 hover:scale-110 ${className}`} loading="lazy" />
  ) : (
    <span className="text-5xl transition-transform duration-500 hover:scale-110">{item.emoji || "🍽"}</span>
  );
}

export default function Home({ onOpenItem, onOpenCart, onNavigate, onOpenHistory }) {
  const { menu } = useMenu();
  const allItems = menu.categories.flatMap((c) => c.items);
  const { itemCount, subtotal } = useCart();
  const [activeBanner, setActiveBanner] = useState(0);

  // Auto-rotate banner every 4 seconds
  useEffect(() => {
    if (!menu.banners || menu.banners.length <= 1) return;
    const timer = setInterval(() => {
      setActiveBanner((prev) => (prev + 1) % menu.banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const fastestItems = allItems.slice(0, 4);
  const popularItems  = allItems.slice(0, 3);
  const isOpen = isStoreOpen();
  const { deferredPrompt, promptToInstall } = useInstallPrompt();

  return (
    <div className="pb-24 overflow-y-auto min-h-screen bg-surface">
      <StatusBar />

      {/* Header location */}
      <div className="flex items-center justify-between px-5 pt-2 pb-3">
        <button className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
          <div className="text-left">
            <p className="text-[11px] text-muted leading-none">Accueil</p>
            <div className="flex items-center gap-1">
              <p className="text-[13px] font-semibold text-ink leading-tight truncate max-w-[180px]">
                {menu.address}
              </p>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9E9E9E" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
          </div>
        </button>
        <button onClick={onOpenHistory} className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink transition active:scale-95 shadow-sm border border-gray-100">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3v5h5"/>
            <path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/>
            <path d="M12 7v5l4 2"/>
          </svg>
        </button>
      </div>

      {/* Bannière Cuisines Fermées */}
      {!isOpen && (
        <div className="mx-4 mb-4 rounded-2xl bg-red-50 p-4 border border-red-100 flex items-start gap-3 animate-fade-up">
          <span className="text-xl">😴</span>
          <div>
            <h3 className="text-[14px] font-bold text-red-800">Cuisines fermées</h3>
            <p className="text-[12px] text-red-600 mt-0.5 leading-tight">
              Nous sommes ouverts tous les jours de 10h à 22h30. À très vite !
            </p>
          </div>
        </div>
      )}

      {/* Promo Banner */}
      <div className="mx-4 overflow-hidden rounded-3xl bg-primary relative animate-fade-up" style={{ height: 160 }}>
        <div className="absolute inset-0 flex flex-col justify-center pl-5 pr-36 z-10">
          <p className="font-display text-[18px] font-bold leading-tight text-white whitespace-pre-line drop-shadow-md">
            {menu.banners[activeBanner]?.title || menu.banners[0].title}
          </p>
          <button
            onClick={() => onNavigate("categories")}
            className="mt-4 w-fit rounded-full bg-white px-5 py-2.5 text-[13px] font-semibold text-ink shadow-md"
          >
            {menu.banners[activeBanner]?.cta || menu.banners[0].cta}
          </button>
        </div>
        {/* Background Video (with beautiful fallback poster) */}
        <video 
          src="/assets/promos/home-banner.mp4" 
          poster="/assets/promos/home-banner-poster.png"
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {menu.banners.map((_, i) => (
            <div key={i} className={`rounded-full transition-all duration-300 ${i === activeBanner ? "w-4 h-2 bg-white" : "w-2 h-2 bg-white/40"}`} />
          ))}
        </div>
      </div>

      {/* Install PWA Prompt */}
      {deferredPrompt && (
        <div className="mx-4 mt-6 overflow-hidden rounded-3xl bg-white border border-gray-100 p-5 flex items-center justify-between gap-4 animate-fade-up shadow-sm">
          <div className="flex items-center gap-4">
            <img src="/assets/Logo.png" alt="Logo" className="w-12 h-12 rounded-2xl shadow-sm border border-gray-50" />
            <div>
              <h3 className="font-display text-[15px] font-bold text-ink leading-tight">Installer l'app</h3>
              <p className="text-[12px] text-muted mt-1 leading-tight">Accès direct depuis l'écran d'accueil</p>
            </div>
          </div>
          <button 
            onClick={promptToInstall}
            className="flex-shrink-0 rounded-full bg-primary px-4 py-2.5 text-[13px] font-bold text-white shadow-md shadow-primary/30 active:scale-95 transition"
          >
            Ajouter
          </button>
        </div>
      )}

      {/* Plats populaires */}
      <div className="mt-6 px-5 pb-2 animate-fade-up" style={{ animationDelay: '100ms' }}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-[17px] font-bold text-ink">Plats populaires 👋</h2>
          <button onClick={() => onNavigate("categories")} className="rounded-full bg-primary/10 px-3 py-1 text-[12px] font-semibold text-primary">
            Voir tout
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-1 px-1 pb-2">
          {popularItems.map((item) => (
            <button
              key={`pop-${item.id}`}
              onClick={() => onOpenItem(item)}
              className="flex-shrink-0 w-40 rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden text-left transition-all active:scale-95 hover:shadow-md"
            >
              <div className="relative h-28 bg-surface flex items-center justify-center overflow-hidden">
                <ProductThumb item={item} />
                {item.tag && (
                  <span className={`absolute top-2 left-2 rounded-full px-2 py-0.5 text-[10px] font-bold text-white ${item.tag === 'PROMO' ? 'bg-promo' : 'bg-primary'}`}>
                    {item.tag}
                  </span>
                )}
              </div>
              <div className="p-2.5">
                <p className="truncate text-[13px] font-semibold text-ink">{item.name}</p>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <span className="text-[13px] font-bold text-ink">{FCFA(item.price ?? item.sizes?.[0]?.price ?? 0)}</span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink text-white">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Categories */}
      {menu.categories.map((category, index) => (
        <div key={category.id} className="mt-4 px-5 pb-2 animate-fade-up" style={{ animationDelay: `${200 + index * 100}ms` }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-[17px] font-bold text-ink">{category.label} {category.emoji}</h2>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-1 px-1 pb-2">
            {category.items.map((item) => {
              const displayPrice = item.price ?? item.sizes?.[0]?.price ?? 0;
              return (
                <button
                  key={`cat-${item.id}`}
                  onClick={() => onOpenItem(item)}
                  className="flex-shrink-0 w-36 rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden text-left transition-all active:scale-95 hover:shadow-md"
                >
                  <div className="relative h-24 bg-surface flex items-center justify-center overflow-hidden">
                    <ProductThumb item={item} />
                    {item.tag && (
                      <span className={`absolute top-2 left-2 rounded-full px-2 py-0.5 text-[9px] font-bold text-white ${item.tag === 'PROMO' ? 'bg-promo' : 'bg-primary'}`}>
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <div className="p-2.5">
                    <p className="truncate text-[12px] font-semibold text-ink">{item.name}</p>
                    <p className="mt-0.5 line-clamp-1 text-[11px] text-muted">{item.description}</p>
                    <div className="mt-1 flex items-center justify-between gap-2">
                      <p className="text-[12px] font-bold text-ink">{FCFA(displayPrice)}</p>
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink text-white">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}

    </div>
  );
}
