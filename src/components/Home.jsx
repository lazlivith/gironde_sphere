/* Home.jsx — Discovery Page — schéma menu actuel (categories > items imbriqués) */
import { useState } from "react";
import { useCart } from "../context/CartContext";
import menu from "../data/menu.json";
import { StatusBar, StarRating, FCFA } from "./ui";

const allItems = menu.categories.flatMap((c) => c.items);

function ProductThumb({ item, className = "" }) {
  return item.image ? (
    <img src={item.image} alt={item.name} className={`h-full w-full object-cover transition-transform duration-500 hover:scale-110 ${className}`} loading="lazy" />
  ) : (
    <span className="text-5xl transition-transform duration-500 hover:scale-110">{item.emoji || "🍽"}</span>
  );
}

export default function Home({ onOpenItem, onOpenCart, onNavigate }) {
  const { itemCount, subtotal } = useCart();
  const [activeBanner] = useState(0);

  const fastestItems = allItems.slice(0, 4);
  const popularItems  = allItems.slice(0, 3);

  return (
    <div className="pb-24 overflow-y-auto min-h-screen bg-white">
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
        <div className="w-9" />
      </div>

      {/* Promo Banner */}
      <div className="mx-4 overflow-hidden rounded-3xl bg-primary relative animate-fade-up" style={{ height: 160 }}>
        <div className="absolute inset-0 flex flex-col justify-center pl-5 pr-36 z-10">
          <p className="font-display text-[18px] font-bold leading-tight text-white whitespace-pre-line">
            {menu.banners[0].title}
          </p>
          <button
            onClick={() => onNavigate("categories")}
            className="mt-4 w-fit rounded-full bg-[#1A1A1A] px-5 py-2.5 text-[13px] font-semibold text-white"
          >
            {menu.banners[0].cta}
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
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent"></div>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`rounded-full transition-all duration-300 ${i === activeBanner ? "w-4 h-2 bg-white" : "w-2 h-2 bg-white/40"}`} />
          ))}
        </div>
      </div>

      {/* Livraison rapide */}
      <div className="mt-6 px-5 animate-fade-up" style={{ animationDelay: '100ms' }}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-[17px] font-bold text-ink">Livraison rapide 🔥</h2>
          <button onClick={() => onNavigate("categories")} className="rounded-full bg-primary/10 px-3 py-1 text-[12px] font-semibold text-primary">
            Voir tout
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-1 px-1">
          {fastestItems.map((item) => {
            const displayPrice = item.price ?? item.sizes?.[0]?.price ?? 0;
            return (
              <button
                key={item.id}
                onClick={() => onOpenItem(item)}
                className="flex-shrink-0 w-40 rounded-2xl bg-white shadow-sm ring-1 ring-black/5 overflow-hidden text-left transition-all active:scale-95 hover:shadow-md"
              >
                <div className="relative h-28 bg-[#FFF5EE] flex items-center justify-center overflow-hidden">
                  <ProductThumb item={item} />
                  {item.tag && (
                    <span className="absolute top-2 left-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-white">
                      {item.tag}
                    </span>
                  )}
                </div>
                <div className="p-2.5">
                  <p className="truncate text-[13px] font-semibold text-ink">{item.name}</p>
                  <p className="mt-0.5 line-clamp-1 text-[11px] text-muted">{item.description}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[13px] font-bold text-ink">{FCFA(displayPrice)}</span>
                    <StarRating value="9.2" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Plats populaires */}
      <div className="mt-6 px-5 pb-4 animate-fade-up" style={{ animationDelay: '200ms' }}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-[17px] font-bold text-ink">Plats populaires 👋</h2>
          <button onClick={() => onNavigate("categories")} className="rounded-full bg-primary/10 px-3 py-1 text-[12px] font-semibold text-primary">
            Voir tout
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-1 px-1">
          {popularItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onOpenItem(item)}
              className="flex-shrink-0 w-36 rounded-2xl bg-white shadow-sm ring-1 ring-black/5 overflow-hidden text-left transition-all active:scale-95 hover:shadow-md"
            >
              <div className="h-28 bg-[#FFF5EE] flex items-center justify-center overflow-hidden">
                <ProductThumb item={item} />
              </div>
              <div className="p-2">
                <p className="truncate text-[12px] font-semibold text-ink">{item.name}</p>
                <p className="text-[12px] font-bold text-primary mt-1">{FCFA(item.price ?? item.sizes?.[0]?.price ?? 0)}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Floating Cart */}
      {itemCount > 0 && (
        <button
          onClick={onOpenCart}
          className="fixed bottom-20 left-1/2 z-40 flex w-[calc(100%-32px)] max-w-[398px] -translate-x-1/2 items-center justify-between rounded-2xl bg-ink px-5 py-4 text-white shadow-xl animate-pop transition-transform active:scale-95"
        >
          <span className="flex items-center gap-2.5 text-sm font-semibold">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold">{itemCount}</span>
            Voir ma commande
          </span>
          <span className="font-display text-sm font-bold">{FCFA(subtotal)}</span>
        </button>
      )}
    </div>
  );
}
