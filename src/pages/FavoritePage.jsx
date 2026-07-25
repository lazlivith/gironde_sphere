/* FavoritePage.jsx — schéma actuel (categories > items, menu.brand) */
import { useState } from "react";
import menu from "../data/menu.json";
import { FCFA } from "../components/ui/ui";

const allItems = menu.categories.flatMap((c) => c.items);
const FAVORITE_ITEMS = allItems.slice(0, 3);

function ProductThumb({ item }) {
  return item.image ? (
    <img src={item.image} alt={item.name} className="h-full w-full object-cover" loading="lazy" />
  ) : (
    <span className="text-7xl">{item.emoji || "🍽"}</span>
  );
}

export default function FavoritePage({ onOpenItem }) {
  const [activeTab, setActiveTab] = useState("food");

  return (
    <div className="pb-24 overflow-y-auto min-h-screen bg-white">
      {/* Search bar (décorative) */}
      <div className="px-5 pt-12 pb-4 bg-white sticky top-0 z-10">
        <div className="flex items-center gap-3 rounded-2xl bg-surface px-4 py-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <span className="text-[15px] text-muted">Rechercher dans vos favoris...</span>
        </div>
      </div>

      {/* Toggle Plats / Restaurants */}
      <div className="mx-5 mb-5 flex rounded-full bg-surface p-1">
        <button
          onClick={() => setActiveTab("food")}
          className={`flex-1 rounded-full py-2.5 text-[13px] font-semibold transition-all duration-200 ${
            activeTab === "food" ? "bg-primary text-white shadow-sm" : "text-muted"
          }`}
        >
          Plats
        </button>
        <button
          onClick={() => setActiveTab("restaurants")}
          className={`flex-1 rounded-full py-2.5 text-[13px] font-semibold transition-all duration-200 ${
            activeTab === "restaurants" ? "bg-primary text-white shadow-sm" : "text-muted"
          }`}
        >
          Restaurants
        </button>
      </div>

      <div className="px-5 space-y-4">
        {activeTab === "food" ? (
          FAVORITE_ITEMS.map((item) => {
            const displayPrice = item.price ?? item.sizes?.[0]?.price ?? 0;
            return (
              <button
                key={item.id}
                onClick={() => onOpenItem(item)}
                className="w-full text-left rounded-3xl overflow-hidden bg-[#FFF5EE] relative"
              >
                {/* Heart */}
                <div className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF3B30" stroke="#FF3B30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </div>
                <div className="h-44 flex items-center justify-center overflow-hidden">
                  <ProductThumb item={item} />
                </div>
                <div className="bg-white px-4 py-3">
                  <h3 className="font-display text-[15px] font-semibold text-ink">{item.name}</h3>
                  <p className="text-[12px] text-muted line-clamp-1">{item.description}</p>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="text-[12px] font-medium text-muted">{menu.brand}</span>
                    <span className="text-muted">•</span>
                    <span className="text-[12px] text-muted">30-50 min</span>
                    <div className="flex items-center gap-1 ml-auto">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFB800"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                      <span className="text-[12px] font-semibold text-ink">{menu.rating}</span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })
        ) : (
          <div className="rounded-3xl overflow-hidden bg-white shadow-sm ring-1 ring-black/5">
            <div className="h-44 bg-[#FFF5EE] flex items-center justify-center relative">
              <span className="text-8xl">🏠</span>
              <div className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF3B30" stroke="#FF3B30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-display text-[16px] font-bold text-ink">{menu.brand}</h3>
              <p className="text-[12px] text-muted">{menu.tagline}</p>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFB800"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  <span className="text-[12px] font-semibold text-ink">{menu.rating}</span>
                </div>
                <span className="text-muted">•</span>
                <span className="text-[12px] text-muted">{menu.deliveryTime}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
