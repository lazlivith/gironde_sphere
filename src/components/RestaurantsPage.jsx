/* RestaurantsPage.jsx — Restaurants screen (Figma faithful) */
import { useState } from "react";
import menu from "../data/menu.json";
import { StatusBar, StarRating, FCFA } from "./ui";

const CATEGORIES = menu.categories.map((c) => ({
  id: c.id,
  label: c.label,
  emoji: c.emoji,
  count: c.count,
}));

const RESTAURANTS = [
  {
    id: "songolo-ff",
    name: menu.brand,
    description: menu.tagline,
    rating: menu.rating,
    deliveryTime: menu.deliveryTime,
    priceRange: "€€",
    emoji: "🏠",
    featured: true,
    categories: menu.categories,
  },
];

export default function RestaurantsPage({ onOpenRestaurant }) {
  const [view, setView] = useState("grid"); // grid | list

  return (
    <div className="pb-24 overflow-y-auto min-h-screen bg-white">
      <StatusBar />

      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-2 pb-3">
        <button className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
          <div>
            <p className="text-[11px] text-muted">Accueil</p>
            <div className="flex items-center gap-1">
              <p className="text-[13px] font-semibold text-ink truncate max-w-[160px]">{menu.address}</p>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9E9E9E" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
          </div>
        </button>
        <div className="flex items-center gap-2">
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-surface">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round">
              <line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="14" y2="12"/><line x1="4" y1="18" x2="10" y2="18"/>
            </svg>
          </button>
          <button
            onClick={() => setView(v => v === "grid" ? "list" : "grid")}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-surface"
          >
            {view === "grid" ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Page title */}
      <div className="px-5 pb-4">
        <h1 className="font-display text-[28px] font-bold text-ink">Restaurants</h1>
      </div>

      {/* Categories */}
      <div className="px-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-[16px] font-bold text-ink">Catégories</h2>
          <button className="rounded-full bg-primary/10 px-3 py-1 text-[12px] font-semibold text-primary">Voir tout</button>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-1 px-1">
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className="flex-shrink-0 w-28 rounded-2xl overflow-hidden">
              <div className="h-20 bg-[#FFF5EE] flex items-center justify-center">
                <span className="text-4xl">{cat.emoji}</span>
              </div>
              <div className="bg-white px-2 py-2">
                <p className="text-[12px] font-semibold text-ink">{cat.label}</p>
                <p className="text-[11px] text-muted">{cat.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Restaurants */}
      <div className="mt-6 px-5">
        <h2 className="font-display text-[16px] font-bold text-ink mb-3">Tous les restaurants</h2>
        <div className="space-y-4">
          {RESTAURANTS.map((r) => (
            <button
              key={r.id}
              onClick={() => onOpenRestaurant(r)}
              className="w-full text-left rounded-3xl overflow-hidden bg-white shadow-sm ring-1 ring-black/5"
            >
              {/* Cover image */}
              <div className="h-48 bg-[#FFF5EE] flex items-center justify-center">
                <span className="text-8xl">{r.emoji}</span>
              </div>
              <div className="p-4">
                <h3 className="font-display text-[16px] font-bold text-ink">{r.name}</h3>
                <p className="mt-0.5 text-[12px] text-muted line-clamp-1">{r.description}</p>
                <div className="mt-2 flex items-center gap-3">
                  <StarRating value={r.rating} />
                  <span className="text-[11px] text-muted">•</span>
                  <span className="text-[12px] text-muted">{r.priceRange}</span>
                  <span className="text-[11px] text-muted">•</span>
                  <span className="flex items-center gap-1 text-[12px] text-muted">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FF6B2C" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    {r.deliveryTime}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
