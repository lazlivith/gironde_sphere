/* RestaurantDetail.jsx — schéma actuel (menu.brand, categories > items) */
import { useState } from "react";
import menu from "../data/menu.json";
import { BackButton, HeartButton, StarRating, FCFA } from "./ui";

const allItems = menu.categories.flatMap((c) => c.items);

export default function RestaurantDetail({ restaurant, onBack, onOpenItem }) {
  const [isFav, setIsFav] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Cover photo */}
      <div className="relative h-64 bg-[#FFF5EE] flex items-center justify-center overflow-hidden">
        <span className="text-[120px] opacity-80">🏠</span>
        <div className="absolute top-12 left-4 right-4 flex items-center justify-between">
          <BackButton onClick={onBack} />
          <HeartButton active={isFav} onClick={() => setIsFav((v) => !v)} />
        </div>
      </div>

      {/* Info card */}
      <div className="bg-white -mt-4 rounded-t-3xl px-5 pt-5 pb-2">
        <div className="flex items-start justify-between">
          <h1 className="font-display text-[24px] font-bold text-ink leading-tight flex-1">{menu.brand}</h1>
          <HeartButton active={isFav} onClick={() => setIsFav((v) => !v)} className="mt-1" />
        </div>
        <p className="mt-1 text-[13px] text-muted">{menu.tagline}</p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <StarRating value={menu.rating} />
          <span className="text-muted text-[12px]">Excellent</span>
          <span className="text-muted mx-1">•</span>
          <div className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FF6B2C" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            <span className="text-[11px] font-medium text-primary">Livraison {menu.deliveryTime}</span>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-1.5">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          <span className="text-[12px] text-muted">{menu.address}</span>
        </div>

        <div className="mt-1.5 flex items-center gap-1.5">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          <span className="text-[12px] text-muted">{menu.hours}</span>
        </div>
      </div>

      {/* Products */}
      <div className="px-5 pt-4 pb-24">
        <h2 className="font-display text-[17px] font-bold text-ink mb-3">Plats populaires 🔥</h2>
        <div className="space-y-4">
          {allItems.map((item, index) => {
            const displayPrice = item.price ?? item.sizes?.[0]?.price ?? 0;
            return (
              <button
                key={item.id}
                onClick={() => onOpenItem(item)}
                className="flex w-full items-center gap-4 text-left"
              >
                <span className="font-display text-[13px] font-bold text-muted w-5 flex-shrink-0">{index + 1}.</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-ink">{item.name}</p>
                  <p className="text-[12px] text-muted line-clamp-2 mt-0.5">{item.description}</p>
                  <p className="mt-1 text-[13px] font-bold text-primary">{FCFA(displayPrice)}</p>
                </div>
                <div className="flex-shrink-0 h-16 w-16 rounded-2xl bg-[#FFF5EE] overflow-hidden flex items-center justify-center">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" loading="lazy" />
                  ) : (
                    <span className="text-3xl">{item.emoji || "🍽"}</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
